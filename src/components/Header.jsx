import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ADDRESS_LINES,
  BRAND,
  BROCHURE,
  EMAIL,
  LOGO,
  MAP_DIRECTIONS,
  NAV_ITEMS,
  PHONE,
  PHONE_HREF,
  PROJECT_FACTS,
  TAGLINE,
  downloadBrochure,
  scrollToSection,
} from '../data/site'

/**
 * Header — fixed bar carrying the logo and a hamburger on every breakpoint
 * (desktop included). The burger opens a full-screen curtain menu; the bar
 * itself turns from transparent to frosted glass once the hero scrolls away.
 */
export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const burgerRef = useRef(null)
  const panelRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock the page behind the curtain and wire up Escape while it is open.
  useEffect(() => {
    if (!open) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        burgerRef.current?.focus()
      }
    }

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)

    const firstLink = panelRef.current?.querySelector('a')
    firstLink?.focus({ preventScroll: true })

    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const handleNavClick = useCallback((event, href) => {
    event.preventDefault()
    setOpen(false)
    // Let the curtain start closing before the scroll kicks off.
    window.requestAnimationFrame(() => scrollToSection(href))
  }, [])

  const handleBrochure = useCallback((event) => {
    setOpen(false)
    downloadBrochure(event)
  }, [])

  return (
    <header
      className={`stc-nav${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}
    >
      <div className="stc-nav__bar">
        <a
          className="stc-nav__brand"
          href="#home"
          onClick={(event) => handleNavClick(event, '#home')}
          aria-label={`${BRAND} — back to top`}
        >
          <img className="stc-nav__logo" src={LOGO} alt="" aria-hidden="true" />
          <span className="stc-nav__wordmark">
            <strong>{BRAND}</strong>
            <em>{TAGLINE}</em>
          </span>
        </a>

        <div className="stc-nav__actions">
          <a
            className="stc-nav__brochure"
            href={BROCHURE}
            onClick={downloadBrochure}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 3v12" />
              <path d="m7 12 5 5 5-5" />
              <path d="M5 21h14" />
            </svg>
            <span>Brochure</span>
          </a>

          <button
            type="button"
            className="stc-nav__burger"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="stc-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            ref={burgerRef}
          >
            <span className="stc-nav__burger-lines" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span className="stc-nav__burger-label" aria-hidden="true">
              {open ? 'Close' : 'Menu'}
            </span>
          </button>
        </div>
      </div>

      <div className="stc-menu" id="stc-menu" aria-hidden={!open}>
        <button
          type="button"
          className="stc-menu__scrim"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => setOpen(false)}
        />

        <div
          className="stc-menu__panel"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          ref={panelRef}
        >
          <nav className="stc-menu__nav" aria-label="Primary">
            <ul>
              {NAV_ITEMS.map((item, index) => (
                <li key={item.href} style={{ '--stagger': index }}>
                  <a href={item.href} onClick={(event) => handleNavClick(event, item.href)}>
                    <span className="stc-menu__num">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="stc-menu__text">{item.label}</span>
                    <svg
                      className="stc-menu__arrow"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M7 17 17 7" />
                      <path d="M8 7h9v9" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <aside className="stc-menu__aside">
            <div className="stc-menu__block">
              <span className="stc-menu__label">The Project</span>
              <p>{PROJECT_FACTS}</p>
            </div>

            <div className="stc-menu__block">
              <span className="stc-menu__label">Site Address</span>
              <p>
                {ADDRESS_LINES.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </p>
              <a
                className="stc-menu__link"
                href={MAP_DIRECTIONS}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get directions
              </a>
            </div>

            <div className="stc-menu__block">
              <span className="stc-menu__label">Enquiries</span>
              <a className="stc-menu__link" href={PHONE_HREF}>
                {PHONE}
              </a>
              <a className="stc-menu__link" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
            </div>

            <a className="stc-menu__cta" href={BROCHURE} onClick={handleBrochure}>
              Download Brochure
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 3v12" />
                <path d="m7 12 5 5 5-5" />
                <path d="M5 21h14" />
              </svg>
            </a>
          </aside>
        </div>
      </div>
    </header>
  )
}
