import { useCallback, useEffect, useRef, useState } from 'react'
import { TESTIMONIALS } from '../data/testimonials'
import { prefersReducedMotion } from '../lib/scroll'
import Reveal from './Reveal'
import './TestimonialsSection.css'

/* Line-style arrows, matching the weight of the ui/ icon set. */
const ArrowLeftLine = () => (
  <svg viewBox="0 0 28 16" fill="none" aria-hidden="true" focusable="false">
    <path d="M27 8H1M8 1L1 8l7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ArrowRightLine = () => (
  <svg viewBox="0 0 28 16" fill="none" aria-hidden="true" focusable="false">
    <path d="M1 8h26M20 1l7 7-7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const pad = (n) => String(n).padStart(2, '0')

/** How long the outgoing quote takes to clear before the new one mounts. */
const OUT_MS = 240

/**
 * Client stories, as an editorial statement rather than a carousel.
 *
 * One testimonial is set large and everything else is a list beneath it —
 * so the quote is the composition and there is no card, no rating and no
 * decoration anywhere in the section.
 *
 * The transition is deliberately two-phase rather than a keyed remount:
 * `active` is what the controls point at, `shown` is what is on screen, and
 * the gap between them is the fade-out. Only when the outgoing quote has
 * cleared does `shown` catch up, which remounts the figure and plays the
 * entrance. GSAP and Framer Motion are both in this project, but a text
 * crossfade is two CSS properties — neither earns its bundle here.
 *
 * No autoplay: the rest of the site never moves without being asked to, and
 * a quote that slides away mid-sentence is a reading problem, not a feature.
 *
 * ⚠️ The copy is placeholder. See src/data/testimonials.js.
 */
export default function TestimonialsSection({ items = TESTIMONIALS }) {
  const [active, setActive] = useState(0)
  const [shown, setShown] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const timer = useRef(null)

  const go = useCallback(
    (next) => setActive(((next % items.length) + items.length) % items.length),
    [items.length],
  )

  useEffect(() => {
    if (active === shown) return undefined

    // Reduced motion gets the swap with no interval at all — not a slower one.
    if (prefersReducedMotion()) {
      setShown(active)
      return undefined
    }

    setLeaving(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setShown(active)
      setLeaving(false)
    }, OUT_MS)

    return () => clearTimeout(timer.current)
  }, [active, shown])

  useEffect(() => () => clearTimeout(timer.current), [])

  /* The rows below the quote are what comes next, wrapping past the end —
     so the list is never the thing you are already reading. */
  const upcoming = Array.from({ length: Math.min(3, items.length - 1) }, (_, i) => {
    const index = (shown + i + 1) % items.length
    return { ...items[index], index }
  })

  return (
    <section className="tm" aria-labelledby="tm-heading">
      <div className="wrap">
        {/* ---------- 1 · intro ---------- */}
        <div className="tm__intro">
          <Reveal>
            <span className="tm__label">Client stories</span>
          </Reveal>

          <Reveal className="tm__intro-copy" delay={80}>
            <h2 className="tm__heading" id="tm-heading">
              <span>Built on trust.</span>
              <span>Remembered for the results.</span>
            </h2>
            <p className="tm__lede">
              Families and business owners who took the decision, and have lived with it long enough to have an
              opinion worth repeating.
            </p>
          </Reveal>
        </div>

        {/* ---------- 2 · featured ---------- */}
        <Reveal className="tm__feature">
          <span className="tm__index" aria-hidden="true">
            {pad(shown + 1)}
          </span>

          {/* Every quote is rendered and they all share one grid cell, so the
              stage is permanently as tall as the longest one — the list below
              cannot shift when a quote is swapped, whatever the copy or the
              viewport. Only the active figure is `visible`, which is also what
              keeps the other four out of the accessibility tree.

              Polite, not assertive: the change is announced after whatever the
              reader is already hearing, and only when they asked for it. */}
          <div className="tm__stage" aria-live="polite">
            {items.map((t, i) => (
              <figure
                key={t.id}
                className={`tm__figure${i === shown ? (leaving ? ' is-leaving' : ' is-active') : ''}`}
              >
                <blockquote className="tm__quote">
                  <p>&ldquo;{t.quote}&rdquo;</p>
                </blockquote>
                <figcaption className="tm__who">
                  {t.portrait ? (
                    <img className="tm__portrait" src={t.portrait} alt="" loading="lazy" decoding="async" />
                  ) : null}
                  <span className="tm__who-text">
                    <span className="tm__name">{t.name}</span>
                    <span className="tm__role">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="tm__nav">
            <span className="tm__count">
              <span className="tm__count-now">{pad(shown + 1)}</span>
              <span className="tm__count-sep" aria-hidden="true">
                /
              </span>
              <span className="tm__count-all">{pad(items.length)}</span>
            </span>

            <span className="tm__arrows">
              <button type="button" className="tm__arrow" onClick={() => go(active - 1)} aria-label="Previous testimonial">
                <ArrowLeftLine />
              </button>
              <button type="button" className="tm__arrow" onClick={() => go(active + 1)} aria-label="Next testimonial">
                <ArrowRightLine />
              </button>
            </span>
          </div>
        </Reveal>

        {/* ---------- 3 · what's next ---------- */}
        <Reveal className="tm__list" delay={60}>
          {upcoming.map((t) => (
            <button type="button" className="tm__row" key={t.id} onClick={() => go(t.index)}>
              <span className="tm__row-n" aria-hidden="true">
                {pad(t.index + 1)}
              </span>

              <span className="tm__row-quote">&ldquo;{t.quote}&rdquo;</span>

              <span className="tm__row-who">
                <span className="tm__name">{t.name}</span>
                <span className="tm__role">{t.role}</span>
              </span>

              <span className="tm__row-go" aria-hidden="true">
                <ArrowRightLine />
              </span>
            </button>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
