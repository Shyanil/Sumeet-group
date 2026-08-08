import { useEffect, useState } from 'react'
import { Link } from '../lib/router'
import { CONTACT } from '../data/site'
import './NotFound.css'

/**
 * The holding page.
 *
 * Every route but "/" lands here while the rest of the site is being built
 * (see the LIVE set in App.jsx). It is not an error page pretending to be a
 * feature: it names the path that was asked for, says plainly that the
 * section is not finished, and gives the two things that still work.
 */
export default function NotFound({ path = '' }) {
  const [dots, setDots] = useState(1)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const id = setInterval(() => setDots((d) => (d % 3) + 1), 620)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="soon">
      <div className="soon__grid" aria-hidden="true" />

      <div className="wrap soon__body">
        <span className="soon__label">
          <span className="soon__dot" />
          Under construction
        </span>

        <h1 className="soon__title">
          This floor is not <em>poured yet.</em>
        </h1>

        <p className="soon__copy">
          The page you asked for is being built. Everything we can show you today about the projects, the addresses
          and the people behind them is on the home page.
        </p>

        {path && path !== '/' ? (
          <p className="soon__path">
            <span className="soon__path-label">Requested</span>
            <code>{path}</code>
          </p>
        ) : null}

        <p className="soon__status" aria-live="off">
          <span className="soon__bar" aria-hidden="true">
            <span />
          </span>
          Our developers are on it{'.'.repeat(dots)}
        </p>

        <div className="soon__actions">
          <Link to="/" className="sg-btn sg-btn--primary sg-btn--lg">
            <span>Back to the home page</span>
          </Link>
          <a href={CONTACT.phoneHref} className="sg-btn sg-btn--outline-light sg-btn--lg">
            <span>Call {CONTACT.phone}</span>
          </a>
        </div>
      </div>
    </section>
  )
}
