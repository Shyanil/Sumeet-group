import { useEffect, useState } from 'react'
import { Link, useRouter } from '../lib/router'
import { NAV, CONTACT } from '../data/site'
import BrandLockup from './BrandLockup'
import { Button, Menu, Close } from './ui'

/** A project detail route should still light up "Projects" in the nav. */
const isActive = (path, to) => (to === '/' ? path === '/' : path === to || path.startsWith(`${to}/`))

export default function Header() {
  const { path } = useRouter()
  const [open, setOpen] = useState(false)

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
      <header className="site-header">
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
