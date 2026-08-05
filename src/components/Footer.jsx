import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import {
  ADDRESS_LINES,
  BRAND,
  EMAIL,
  LOGO,
  MAP_DIRECTIONS,
  NAV_ITEMS,
  PHONE,
  PHONE_HREF,
  PROJECT_FACTS,
  scrollToSection,
} from '../data/site'

const YEAR = new Date().getFullYear()

export default function Footer() {
  const handleNavClick = (event, href) => {
    event.preventDefault()
    scrollToSection(href)
  }

  return (
    <footer className="stc-foot" aria-labelledby="stc-foot-heading">
      <span className="stc-foot__seam" aria-hidden="true" />

      <div className="stc-foot__inner">
        <div className="stc-foot__top">
          {/* Brand */}
          <div className="stc-foot__brand">
            <img className="stc-foot__logo" src={LOGO} alt={`${BRAND} logo`} loading="lazy" />
            <h2 className="stc-foot__title" id="stc-foot-heading">
              {BRAND}
            </h2>
            <p className="stc-foot__blurb">
              A premium commercial destination at the heart of Raipur — designed
              for clarity, growth, and everyday ease.
            </p>
            <p className="stc-foot__facts">{PROJECT_FACTS}</p>
          </div>

          {/* Explore */}
          <nav className="stc-foot__col" aria-label="Footer navigation">
            <h3 className="stc-foot__label">Explore</h3>
            <ul className="stc-foot__links">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a href={item.href} onClick={(event) => handleNavClick(event, item.href)}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="stc-foot__col">
            <h3 className="stc-foot__label">Get in Touch</h3>
            <ul className="stc-foot__contact">
              <li>
                <MapPin size={17} strokeWidth={1.75} aria-hidden="true" />
                <a href={MAP_DIRECTIONS} target="_blank" rel="noopener noreferrer">
                  {ADDRESS_LINES.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </a>
              </li>
              <li>
                <Phone size={17} strokeWidth={1.75} aria-hidden="true" />
                <a href={PHONE_HREF}>{PHONE}</a>
              </li>
              <li>
                <Mail size={17} strokeWidth={1.75} aria-hidden="true" />
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="stc-foot__bottom">
          <p className="stc-foot__copy">
            © {YEAR} {BRAND}. All rights reserved.
          </p>
          <p className="stc-foot__note">
            Renders are artistic impressions and subject to change. RERA registered.
          </p>
          <button
            type="button"
            className="stc-foot__top-link"
            onClick={() => scrollToSection('#home')}
          >
            Back to top
            <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  )
}
