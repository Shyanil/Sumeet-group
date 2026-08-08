import { useEffect, useRef, useState } from 'react'
import { Link, useRouter } from '../lib/router'
import { NAV, CONTACT } from '../data/site'
import BrandLockup from './BrandLockup'
import { Button, Menu, Close } from './ui'

/** A project detail route should still light up "Projects" in the nav. */
const isActive = (path, to) => (to === '/' ? path === '/' : path === to || path.startsWith(`${to}/`))

/** Past this, the header is no longer "at the top" and may hide itself. */
const REVEAL_FLOOR = 90
/** Ignore the jitter a trackpad produces when a finger rests on it. */
const DEAD_ZONE = 6

/**
 * Hide the bar on the way down, bring it back the moment the reader turns
 * around. Lenis lerps the *native* scroll position, so plain scroll events
 * are still the truth here and there is nothing to subscribe to on Lenis.
 */
function useScrollDirection(disabled) {
  const [hidden, setHidden] = useState(false)
  const last = useRef(0)

  useEffect(() => {
    if (disabled) {
      setHidden(false)
      return undefined
    }

    last.current = window.scrollY

    // No rAF throttle: the handler reads scrollY and compares two numbers,
    // which costs nothing and never invalidates layout, and deferring it to
    // the next frame only makes the bar lag the finger by a frame.
    const onScroll = () => {
      const y = window.scrollY
      const delta = y - last.current

      // The top of the page always shows the bar — that is where it is
      // transparent over the hero, and hiding it there would be a flicker.
      if (y <= REVEAL_FLOOR) setHidden(false)
      else if (delta > DEAD_ZONE) setHidden(true)
      else if (delta < -DEAD_ZONE) setHidden(false)

      if (Math.abs(delta) > DEAD_ZONE) last.current = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [disabled])

  return hidden
}

export default function Header() {
  const { path } = useRouter()
  const [open, setOpen] = useState(false)
  // A bar that slid away under an open drawer would strand the close button.
  const hidden = useScrollDirection(open)

  // Close the drawer whenever the route changes, and lock the page behind it.
  useEffect(() => setOpen(false), [path])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <header className={`site-header${hidden ? ' is-hidden' : ''}`}>
        <div className="wrap site-header__inner">
          <BrandLockup />

          <nav className="site-nav" aria-label="Primary">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="nav-link"
                aria-current={isActive(path, item.to) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
            <Button variant="primary" size="sm" href={CONTACT.phoneHref}>
              Book a visit
            </Button>
          </nav>

          <button
            className="nav-toggle"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu />
          </button>
        </div>
      </header>

      {open ? (
        <div className="mobile-nav" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="wrap mobile-nav__top">
            <BrandLockup onNavigate={() => setOpen(false)} />
            <button className="nav-toggle" onClick={() => setOpen(false)} aria-label="Close menu">
              <Close />
            </button>
          </div>

          <nav className="wrap mobile-nav__list" aria-label="Primary">
            {NAV.map((item, i) => (
              <Link
                key={item.to}
                to={item.to}
                className="mobile-nav__link"
                aria-current={isActive(path, item.to) ? 'page' : undefined}
                onNavigate={() => setOpen(false)}
              >
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="wrap mobile-nav__foot">
            <Button variant="primary" size="lg" fullWidth href={CONTACT.phoneHref}>
              Call {CONTACT.phone}
            </Button>
            <Button variant="outline" size="lg" fullWidth href={CONTACT.emailHref}>
              Email us
            </Button>
          </div>
        </div>
      ) : null}
    </>
  )
}
