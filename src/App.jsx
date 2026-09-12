'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from './lib/router'
import { initSmoothScroll, destroySmoothScroll, resetScroll, ScrollTrigger } from './lib/scroll'
import Header from './components/Header'
import Footer from './components/Footer'

/**
 * Mirror the tone of whichever full-bleed section is currently passing under
 * the header onto <body>, so the header can go transparent over it.
 *
 * Sections opt in with `data-header-over`. "light" and "dark" both mean a
 * full-bleed scene the header goes transparent over, reversed out white;
 * "paper" is an ordinary page surface that takes the solid header back — it
 * exists so a sheet overlapping a scene can end the transparency.
 *
 * The observer root is squeezed to a thin band across the top of the
 * viewport (`rootMargin`), so "is intersecting" means "is currently behind
 * the header" rather than "is anywhere on screen".
 */
function useHeaderInversion(path) {
  useEffect(() => {
    const marks = document.querySelectorAll('[data-header-over]')
    if (!marks.length) {
      delete document.body.dataset.header
      return undefined
    }

    const behindHeader = new Set()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) behindHeader.add(entry.target)
          else behindHeader.delete(entry.target)
        }
        // Sections *can* overlap under the header — the statement sheet is
        // pulled up over the still-pinned hero — so the last one in document
        // order is the one actually on top, and the one to follow.
        const active = [...marks].reverse().find((mark) => behindHeader.has(mark))
        if (active) document.body.dataset.header = active.dataset.headerOver
        else delete document.body.dataset.header
      },
      { rootMargin: '-72px 0px -88% 0px', threshold: 0 },
    )

    marks.forEach((mark) => observer.observe(mark))
    return () => {
      observer.disconnect()
      delete document.body.dataset.header
    }
  }, [path])
}

export default function App({ children, initialTime }) {
  const { path } = useRouter()
  const firstRender = useRef(true)

  // One Lenis instance for the whole app, driving ScrollTrigger off a single
  // rAF loop. See lib/scroll.js — it no-ops under reduced motion.
  useEffect(() => {
    initSmoothScroll()
    // Late-loading renders change page height, which invalidates every
    // trigger's start/end.
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)
    return () => {
      window.removeEventListener('load', onLoad)
      destroySmoothScroll()
    }
  }, [])

  // A route change must land at the top instantly rather than let Lenis lerp
  // the entire document.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    resetScroll()
  }, [path])

  useHeaderInversion(path)

  if (path === "/coming-soon") return children

  return (
    <div className="app">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main className="app__main" id="main">
        {children}
      </main>
      <Footer initialTime={initialTime} />
    </div>
  )
}
