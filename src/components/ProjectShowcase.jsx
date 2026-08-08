import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from '../lib/router'
import { ArrowLeft, ArrowRight } from './ui'
import Reveal from './Reveal'
import './ProjectShowcase.css'

const STATUS_LABEL = {
  ready: 'Ready to move',
  construction: 'Under construction',
  upcoming: 'New launch',
  sold: 'Sold out',
  delivered: 'Delivered',
}

const COUNT_WORD = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten']

/**
 * Where the four-up row stops being readable.
 *
 * Four columns inside .wrap is ~280px of track — fine on a 22"/24" panel,
 * cramped on a laptop. So laptops (and the tablet-width range above the
 * stacked grid) get two at a time on a loop, and only a viewport wide enough
 * to hold four properly keeps the static row. 1800px is chosen against real
 * hardware: a 16" MacBook is 1728 logical px and lands in the carousel; a
 * 1920 desktop lands in the row.
 */
const CAROUSEL_MQ = '(min-width: 1024px) and (max-width: 1799.98px)'

/**
 * Cards on show, which is also what one press of an arrow moves by. The
 * matching width lives in the stylesheet as --pf-view; the two have to agree,
 * so change neither without the other.
 */
const PER_VIEW = 2

/** Dwell between automatic moves, and the length of the move itself. */
const DWELL_MS = 2000
const SLIDE_MS = 560

const pad = (n) => String(n).padStart(2, '0')

/** Live match, so a window dragged between a laptop and a monitor re-lays out. */
function useMedia(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mq = window.matchMedia(query)
    const sync = () => setMatches(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [query])

  return matches
}

/**
 * Every name in the portfolio is "Sumeet <something>", and the reference
 * composition wants the title stacked rather than wrapped on whatever word
 * happens to reach the edge. So the house name takes the first line and the
 * project takes the second.
 */
const titleLines = (name) => {
  const [first, ...rest] = name.split(' ')
  return rest.length ? [first, rest.join(' ')] : [name]
}

/** The photograph-as-card. Identical in both layouts — only its wrapper differs. */
function Tile({ card }) {
  return (
    <Link to={card.href} className="portfolio__card">
      <div className="portfolio__media">
        {card.cover ? (
          <img
            src={card.cover}
            alt={card.coverAlt}
            loading="lazy"
            decoding="async"
            style={card.coverPosition ? { objectPosition: card.coverPosition } : undefined}
          />
        ) : null}
      </div>
      <div className="portfolio__veil" aria-hidden="true" />

      <div className="portfolio__body">
        <span className={`portfolio__status portfolio__status--${card.tone}`}>{card.status}</span>

        <h3 className="portfolio__title">
          {titleLines(card.name).map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h3>

        {/* margin-top:auto lives on this group, so the buttons sit on
            one line across the row however long the copy runs. */}
        <div className="portfolio__foot">
          <p className="portfolio__copy">{card.copy}</p>
          <span className="portfolio__more">
            <span>Learn More</span>
            <span className="portfolio__more-icon">
              <ArrowRight />
            </span>
          </span>
        </div>
      </div>
    </Link>
  )
}

/**
 * The portfolio band on the home page.
 *
 * A dark editorial section: a two-column intro — stacked heading on the
 * left, a paragraph and one white pill on the right — over tall photographic
 * cards. The photograph *is* the card: no radius, no border, no shadow, no
 * panel. Only a gradient between the image and the type.
 *
 * Two layouts, one markup. Below 1024px the cards are a plain stacked grid,
 * and from 1800px up they are the four-up row. Between the two — every
 * laptop — they become a loop of two, which is the only mode with any
 * JavaScript in it.
 *
 * It moves every two seconds and does not stop for the pointer. That is a
 * deliberate departure from TestimonialsSection, which never moves unasked:
 * a quote that slides away mid-sentence is a reading problem, whereas these
 * are photographs with four words on them.
 *
 * The loop is done with a duplicate of the card list rather than a rewind.
 * Advancing past the last card slides onto the duplicate, which is the same
 * picture as the first, and the track is then repositioned to the head with
 * the transition switched off. Nothing is seen to jump, so the row only ever
 * travels one way. See `reposition` for the two-frame dance that needs.
 *
 * The listing grid on /projects keeps ProjectCard, the white tile, which is
 * the right component for a page whose job is side-by-side comparison. This
 * one is for the home page, where the job is to be looked at.
 *
 * Selling projects link to their own route; delivered ones have no brochure
 * and no detail page, so they carry a photograph and a line and point at the
 * portfolio page, where they already appear under "Delivered".
 */
export default function ProjectShowcase({ selling = [], delivered = [] }) {
  const cards = [
    ...selling.map((p) => ({
      key: p.slug,
      name: p.name,
      copy: p.blurb,
      cover: p.cover,
      coverAlt: p.coverAlt || p.name,
      coverPosition: p.coverPosition,
      status: STATUS_LABEL[p.status],
      tone: 'selling',
      href: `/projects/${p.slug}`,
    })),
    ...delivered.map((p) => ({
      key: p.name,
      name: p.name,
      copy: p.note,
      cover: p.cover,
      coverAlt: p.coverAlt || p.name,
      coverPosition: p.coverPosition,
      status: STATUS_LABEL.delivered,
      tone: 'delivered',
      href: '/projects',
    })),
  ]

  const total = cards.length
  const count = COUNT_WORD[total] || total

  const narrow = useMedia(CAROUSEL_MQ)
  const reduced = useMedia('(prefers-reduced-motion: reduce)')
  /* Nothing to page through if the whole portfolio already fits one view. */
  const paged = narrow && total > PER_VIEW

  /* `slide` is a card index, not a page index: it is what the track is
     translated by, and it runs one past the end (0 … total) because `total`
     is the position on the duplicate that the loop lands on. */
  const [slide, setSlide] = useState(0)
  const [instant, setInstant] = useState(false)
  /* Keyboard only. Hovering deliberately does not stop the loop — but focus
     has to, because a card that moves on is made inert a moment later, and
     that would throw the caret to the top of the document mid-tab. */
  const [held, setHeld] = useState(false)
  const [onScreen, setOnScreen] = useState(false)
  /* Counts moves, not positions. The dwell below is keyed to this rather than
     to `slide`, because `slide` also changes when the loop lands itself back
     on the head — and re-arming the timer there would hand one pair of the
     four an extra half-second every time round. */
  const [tick, setTick] = useState(0)
  const queued = useRef(null)
  const stageRef = useRef(null)

  const pages = Math.ceil(total / PER_VIEW)
  const page = Math.floor(slide / PER_VIEW) % pages

  /* Move with the transition switched off, then — once that frame has been
     painted — put it back and run `then`. Two frames, not one: within a
     single frame the browser coalesces both transforms into one style
     recalculation and animates straight through the reposition, which is the
     jump the duplicate exists to hide. */
  const reposition = useCallback((to, then = null) => {
    queued.current = then
    setInstant(true)
    setSlide(to)
  }, [])

  useEffect(() => {
    if (!instant) return undefined

    let inner = 0
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => {
        setInstant(false)
        if (queued.current !== null) {
          setSlide(queued.current)
          queued.current = null
        }
      })
    })

    return () => {
      cancelAnimationFrame(outer)
      cancelAnimationFrame(inner)
    }
  }, [instant])

  const step = useCallback(
    (dir) => {
      setTick((t) => t + 1)

      if (dir > 0) {
        /* Already riding out onto the duplicate — land now and carry on,
           rather than swallowing the press for the rest of the move. */
        if (slide >= total) reposition(0, PER_VIEW)
        else setSlide(Math.min(slide + PER_VIEW, total))
        return
      }

      if (slide > 0) {
        setSlide(Math.max(slide - PER_VIEW, 0))
        return
      }

      /* At the head there is nothing to the left, so drop onto the duplicate
         tail — the same picture — and slide back from there. */
      reposition(total, Math.max(total - PER_VIEW, 0))
    },
    [slide, total, reposition],
  )

  /* Landing the loop. A timer rather than `transitionend`, because under
     reduced motion there is no transition to end and the track would sit on
     the duplicate for good. Skipped while a move is already queued, which is
     the backwards case above passing through this same position. */
  useEffect(() => {
    if (!paged || slide < total || queued.current !== null) return undefined
    const id = setTimeout(() => reposition(0), reduced ? 0 : SLIDE_MS)
    return () => clearTimeout(id)
  }, [paged, slide, total, reduced, reposition])

  /* Only loops once the band is actually on screen — otherwise it has been
     round twice by the time it is scrolled to, and lands on a random pair.
     Re-run on `paged`, not once: crossing 1800px swaps the wrapper's element
     type, which remounts the stage and leaves the ref on a detached node. */
  useEffect(() => {
    const node = stageRef.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setOnScreen(true)
      return undefined
    }

    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), {
      threshold: 0.25,
    })
    io.observe(node)
    return () => io.disconnect()
  }, [paged])

  /* `step` is rebuilt on every move, so the timer reads it through a ref —
     otherwise its identity would re-arm the dwell and undo the point of
     counting ticks. */
  const stepRef = useRef(step)
  useEffect(() => {
    stepRef.current = step
  })

  useEffect(() => {
    if (!paged || reduced || held || !onScreen) return undefined
    const id = setTimeout(() => stepRef.current(1), DWELL_MS)
    return () => clearTimeout(id)
  }, [paged, reduced, held, onScreen, tick])

  /* The duplicate only exists in the looping layout; the grid renders the
     four cards it has. */
  const track = paged ? [...cards, ...cards] : cards
  const Stage = paged ? Reveal : 'div'

  return (
    <section className="portfolio" aria-labelledby="portfolio-heading">
      <div className="wrap">
        {/* ---------- intro ---------- */}
        <div className="portfolio__intro">
          <Reveal>
            <h2 className="portfolio__heading" id="portfolio-heading">
              <span>One Standard</span>
              <span>Across {count}</span>
              <span>Addresses.</span>
            </h2>
          </Reveal>

          <Reveal className="portfolio__aside" delay={80}>
            <p className="portfolio__lede">
              Two selling now, two delivered and lived in.{' '}
              <span>
                Every one of them in Raipur, on clear title and RERA registered. Bought for where it sits in a working
                day, not for how it reads on a map.
              </span>
            </p>

            <Link to="/projects" className="portfolio__cta">
              <span>View all projects</span>
              <span className="portfolio__cta-icon">
                <ArrowRight />
              </span>
            </Link>
          </Reveal>
        </div>

        {/* ---------- cards ---------- */}
        <Stage
          className={`portfolio__carousel${paged ? ' is-carousel' : ''}`}
          onFocusCapture={paged ? () => setHeld(true) : undefined}
          onBlurCapture={paged ? () => setHeld(false) : undefined}
        >
          <div className="portfolio__stage" ref={stageRef}>
            <div
              className={`portfolio__grid${instant ? ' is-instant' : ''}`}
              style={paged ? { '--pf-slide': slide, '--pf-dur': `${SLIDE_MS}ms` } : undefined}
            >
              {track.map((c, i) => {
                const key = i < total ? c.key : `${c.key}--loop`
                if (!paged) {
                  return (
                    <Reveal key={key} className="portfolio__slide" delay={i * 70}>
                      <Tile card={c} />
                    </Reveal>
                  )
                }

                /* `inert` on everything but the two on show. It keeps the
                   duplicate out of the accessibility tree, and it stops a Tab
                   into an off-screen card from scrolling the clipped stage
                   sideways and taking the track with it. */
                const showing = i >= slide && i < slide + PER_VIEW
                return (
                  <div className="portfolio__slide" key={key} inert={showing ? undefined : ''}>
                    <Tile card={c} />
                  </div>
                )
              })}
            </div>
          </div>

          {paged ? (
            <div className="portfolio__nav">
              <span className="portfolio__count">
                <span className="portfolio__count-now">{pad(page + 1)}</span>
                <span className="portfolio__count-sep" aria-hidden="true">
                  /
                </span>
                <span>{pad(pages)}</span>
              </span>

              <span className="portfolio__arrows">
                <button type="button" className="portfolio__arrow" onClick={() => step(-1)} aria-label="Previous projects">
                  <ArrowLeft />
                </button>
                <button type="button" className="portfolio__arrow" onClick={() => step(1)} aria-label="Next projects">
                  <ArrowRight />
                </button>
              </span>
            </div>
          ) : null}
        </Stage>
      </div>
    </section>
  )
}
