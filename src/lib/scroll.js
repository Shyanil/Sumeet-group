/**
 * Smooth scroll + scroll-linked animation, wired together once.
 *
 * Lenis owns the scroll position (it lerps the native scroll), GSAP's ticker
 * drives Lenis's rAF loop, and ScrollTrigger is told to recompute on every
 * Lenis frame. Running them off two separate rAF loops is what makes
 * scrubbed timelines judder, so there is exactly one loop here.
 *
 * Everything no-ops under `prefers-reduced-motion` — the page then scrolls
 * natively and the hero renders as a still composition.
 */
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenis = null

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function initSmoothScroll() {
  if (lenis || typeof window === 'undefined') return lenis
  if (prefersReducedMotion()) return null

  lenis = new Lenis({
    duration: 1.05,
    // Exponential ease-out: fast off the wheel, long quiet settle.
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    // Touch keeps the native feel; smoothing it fights the OS and feels laggy.
    syncTouch: false,
    touchMultiplier: 1.6,
  })

  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(tickLenis)
  gsap.ticker.lagSmoothing(0)

  return lenis
}

function tickLenis(time) {
  lenis?.raf(time * 1000)
}

export function destroySmoothScroll() {
  if (!lenis) return
  gsap.ticker.remove(tickLenis)
  lenis.destroy()
  lenis = null
}

/** Jump to the top on route change without Lenis lerping the whole page. */
export function resetScroll() {
  if (lenis) lenis.scrollTo(0, { immediate: true })
  else window.scrollTo({ top: 0 })
  ScrollTrigger.refresh()
}

export { gsap, ScrollTrigger }
