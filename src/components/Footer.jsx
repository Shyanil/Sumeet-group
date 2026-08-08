import { useEffect, useMemo, useState } from 'react'
import { Link } from '../lib/router'
import { BRAND, CONTACT, RERA_PORTAL } from '../data/site'
import Reveal from './Reveal'
import './Footer.css'

/** Routes that are not being served yet say so, rather than 404ing silently. */
const EXPLORE = [
  { label: 'Projects', to: '/projects', soon: true },
  { label: 'About the group', to: '/about', soon: true },
  { label: 'Contact', to: '/contact', soon: true },
]

/** Derived from CONTACT.hours: open seven days, 10am to 7pm. */
const OPENS = 10
const CLOSES = 19

/**
 * The office clock, and whether anyone is at it.
 *
 * Real data rather than decoration: a visitor in another timezone gets to
 * know whether calling now will reach a person. IST never shifts for
 * daylight saving, so the offset is stable, but the reading is taken from
 * Intl against Asia/Kolkata rather than assumed from the browser.
 */
function useOfficeClock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])

  return useMemo(() => {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).formatToParts(now)

    const get = (t) => parts.find((p) => p.type === t)?.value ?? '00'
    const hour = Number(get('hour'))
    const open = hour >= OPENS && hour < CLOSES

    return {
      time: `${get('hour')}:${get('minute')}`,
      open,
      note: open ? 'Closes 7pm' : 'Opens 10am',
    }
  }, [now])
}

export default function Footer() {
  const year = new Date().getFullYear()
  const { time, open, note } = useOfficeClock()

  return (
    <footer className="fx">
      <div className="wrap">
        {/* ---------- 1 · the ask ---------- */}
        <div className="fx__top">
          <Reveal className="fx__lead">
            <span className="fx__label">Start here</span>
            <p className="fx__line">
              Come and stand in it. Site visits run seven days a week, and the <em>coffee is on us.</em>
            </p>

            <div className="fx__reach">
              <a className="fx__reach-item" href={CONTACT.phoneHref}>
                <span className="fx__reach-label">Call</span>
                <span className="fx__reach-value">{CONTACT.phone}</span>
              </a>
              <a className="fx__reach-item" href={CONTACT.emailHref}>
                <span className="fx__reach-label">Email</span>
                <span className="fx__reach-value">{CONTACT.email}</span>
              </a>
            </div>
          </Reveal>

          {/* The one thing a footer almost never tells you, and the one thing
              worth knowing before you dial. */}
          <Reveal className="fx__status" delay={80}>
            <span className={`fx__status-state${open ? ' is-open' : ''}`}>
              <span className="fx__status-dot" aria-hidden="true" />
              {open ? 'Open now' : 'Closed now'}
            </span>
            <p className="fx__status-time">
              <time>{time}</time>
              <span>IST in {BRAND.city}</span>
            </p>
            <p className="fx__status-note">
              {note} · {CONTACT.hours}
            </p>
          </Reveal>
        </div>

        {/* ---------- 2 · the index ---------- */}
        <div className="fx__cols">
          <div className="fx__col">
            <h2 className="fx__col-title">Explore</h2>
            <ul className="fx__list">
              {EXPLORE.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="fx__link">
                    <span>{item.label}</span>
                    {item.soon ? <span className="fx__soon">Soon</span> : null}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="fx__col">
            <h2 className="fx__col-title">Office</h2>
            <a className="fx__address" href={CONTACT.office.mapHref} target="_blank" rel="noreferrer noopener">
              {CONTACT.office.lines.map((line) => (
                <span key={line}>{line}</span>
              ))}
              <span className="fx__address-go">Open in maps</span>
            </a>
          </div>

          <div className="fx__col">
            <h2 className="fx__col-title">Compliance</h2>
            <ul className="fx__list">
              <li>
                <a className="fx__link" href={RERA_PORTAL} target="_blank" rel="noreferrer noopener">
                  <span>RERA Chhattisgarh</span>
                </a>
              </li>
              <li>
                <a className="fx__link" href={CONTACT.websiteHref} target="_blank" rel="noreferrer noopener">
                  <span>{CONTACT.website}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ---------- 3 · the plinth ----------
          The name set as signage: full bleed, solid, and sunk below the
          bottom edge of the page so it reads as something the site stands
          on rather than a last line of type. It wipes in from the left on
          arrival; Reveal falls back to the finished state when there is no
          IntersectionObserver, and reduced motion skips the wipe. */}
      <Reveal className="fx__plinth" aria-hidden="true">
        <span className="fx__plinth-word">{BRAND.name}</span>
      </Reveal>

      <div className="wrap fx__base">
        <span>{BRAND.legal}</span>
        <span>
          © {year} · RERA registered · {BRAND.city}, {BRAND.state}
        </span>
      </div>
    </footer>
  )
}
