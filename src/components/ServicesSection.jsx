import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from '../lib/router'
import { gsap, prefersReducedMotion } from '../lib/scroll'
import { Eyebrow, ArrowRight } from './ui'
import Reveal from './Reveal'
import './ServicesSection.css'

/**
 * Services — a typographic index with a photograph that follows the cursor.
 *
 * There is no grid of cards here. The section is three ruled rows of type,
 * the way a contents page or a plan schedule is set, and the photography is
 * kept off the layout entirely: one portrait plate rides the pointer across
 * the list, swapping to whichever row you are reading.
 *
 * Two reasons that is the right shape for this section rather than a
 * gallery. The rows stay a list — scannable in one pass, three lines of
 * type, no visual competition between them — and the image becomes an
 * answer to a question you asked by moving, which is a much lighter promise
 * than three photographs demanding attention at once.
 *
 * The plate lags the cursor by design (see `--_lag`). Motion that arrives
 * exactly under the pointer reads as an attached object; motion that
 * catches up reads as a thing being brought to you.
 *
 * The three services are the group's three ways in — a home to live in, a
 * floor to work from, an address to hold. Broker language (buy / sell /
 * rent) does not apply: Sumeet Group builds and sells its own buildings,
 * which is the claim the closing statement makes once the list has earned
 * it. The heading stays off that claim and anchors to the city instead.
 *
 * Below 900px, and under `prefers-reduced-motion` at any width, there is no
 * pointer to follow: the plate is dropped and each row carries its own
 * thumbnail instead. The two image sets are `display: none` to each other,
 * so only one of them is ever fetched.
 *
 * Swap the photography by editing SERVICES below; nothing else reads it.
 */
const SERVICES = [
  {
    number: '01',
    title: 'Live',
    category: 'Homes',
    description:
      'Planned around light, air and an outdoor room. Low density, RERA registered, ready to walk today.',
    image: '/Assets/Sumeet Urban Nest (SUN)/renders/entrance-arrival.webp',
    imageAlt: 'The arrival court at Sumeet Urban Nest at dusk',
    position: '50% 58%',
    to: '/projects/sumeet-urban-nest',
  },
  {
    number: '02',
    title: 'Work',
    category: 'Offices & showrooms',
    description:
      'Offices, showrooms and a plaza at Pachpedi Naka, built for a working day that does not end at six.',
    image: '/Assets/3D Images/VIEW_001_ELEVATION_TWILIGHT_2025.01.15_HIRES_FINAL.webp',
    imageAlt: 'The Sumeet Trade Centre elevation at twilight',
    position: '50% 62%',
    to: '/projects/sumeet-trade-centre',
  },
  {
    number: '03',
    title: 'Invest',
    category: 'Floors & land',
    description:
      'Commercial floors and plotted land on clear title, in the addresses Raipur is still growing towards.',
    image: '/Assets/3D Images/VIEW_019_AERIAL_VIEW_TWILIGHT_2025.01.15_HIRES_FINAL.webp',
    imageAlt: 'An aerial view of the Sumeet Trade Centre site at twilight',
    position: '50% 50%',
    to: '/projects',
  },
]

export default function ServicesSection({ services = SERVICES }) {
  /* `null` is the resting state: no row is being read, so the plate is
     parked. It is not an index into `services` — -1 would imply one. */
  const [active, setActive] = useState(null)
  const root = useRef(null)
  const list = useRef(null)
  const plate = useRef(null)

  /* ---- the plate follows the pointer ---- */
  useLayoutEffect(() => {
    const listEl = list.current
    const plateEl = plate.current
    if (!listEl || !plateEl) return
    // No pointer to follow: the CSS has already swapped in the per-row
    // thumbnails and hidden the plate, so there is nothing to drive.
    if (prefersReducedMotion() || !window.matchMedia('(hover: hover) and (min-width: 900px)').matches) return

    // quickTo keeps one tween alive per axis and re-targets it, rather than
    // spawning a tween per mousemove. The duration is the lag.
    const moveX = gsap.quickTo(plateEl, 'x', { duration: 0.72, ease: 'power3' })
    const moveY = gsap.quickTo(plateEl, 'y', { duration: 0.72, ease: 'power3' })

    // Held in viewport coordinates so a scroll can re-resolve the position
    // without the pointer having moved — otherwise the plate sticks to the
    // page while the list slides out from under it.
    let clientX = 0
    let clientY = 0
    let tracking = false

    const place = () => {
      if (!tracking) return
      const r = listEl.getBoundingClientRect()
      moveX(clientX - r.left)
      moveY(clientY - r.top)
    }

    const onMove = (e) => {
      clientX = e.clientX
      clientY = e.clientY
      if (!tracking) {
        tracking = true
        // Drop the plate straight onto the pointer on the way in; letting it
        // fly across from wherever it was parked is a gesture with no cause.
        const r = listEl.getBoundingClientRect()
        gsap.set(plateEl, { x: clientX - r.left, y: clientY - r.top })
      }
      place()
    }

    const onLeave = () => {
      tracking = false
      setActive(null)
    }

    listEl.addEventListener('pointermove', onMove)
    listEl.addEventListener('pointerleave', onLeave)
    window.addEventListener('scroll', place, { passive: true })

    return () => {
      listEl.removeEventListener('pointermove', onMove)
      listEl.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('scroll', place)
    }
  }, [])

  /* ---- the rows draw themselves in ---- */
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context((self) => {
      const trigger = {
        trigger: list.current,
        start: 'top 82%',
        end: 'bottom top',
        // enter · leave · enterBack · leaveBack — replays in both directions
        // and re-arms off-screen, so the reset is never seen.
        toggleActions: 'restart reset restart reset',
      }

      // The hairline is drawn first and the type walks in under it, which is
      // the order the rule is actually ruled on paper.
      gsap.fromTo(
        self.selector('.services__hairline'),
        { scaleX: 0 },
        { scaleX: 1, duration: 0.9, ease: 'power2.inOut', stagger: 0.1, scrollTrigger: trigger },
      )

      // Targets the row, never its children: the children carry the CSS
      // hover transforms, and GSAP's inline transform would outrank them.
      gsap.fromTo(
        self.selector('.services__row'),
        { opacity: 0, x: -28 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out', stagger: 0.1, delay: 0.12, scrollTrigger: trigger },
      )
    }, root)

    return () => ctx.revert()
  }, [services])

  return (
    <section className="services on-dark" aria-labelledby="services-heading" ref={root}>
      <Reveal className="wrap services__intro">
        <Eyebrow tone="ondark" rule className="services__label">
          Raipur · Chhattisgarh
        </Eyebrow>
        <h2 id="services-heading" className="sg-display services__heading">
          Three kinds of address,
          <br />
          <span>one city we know by heart.</span>
        </h2>
      </Reveal>

      <div className="wrap">
        <div className="services__list" ref={list} data-reading={active !== null}>
          {/* Decorative: the row copy already names every destination, so a
              screen reader gains nothing from three more image labels. */}
          <div className="services__plate" ref={plate} aria-hidden="true">
            <div className="services__plate-frame">
              {services.map((s, i) => (
                <img
                  key={s.title}
                  src={s.image}
                  alt=""
                  style={{ objectPosition: s.position }}
                  data-active={active === i}
                  loading="lazy"
                  decoding="async"
                />
              ))}

              {/* The row stays one line of type, so the description lives
                  here for sighted pointer users. The copy a screen reader
                  gets is the real one in the row, which desktop hides to
                  the eye but not to the tree. */}
              <span className="services__caption">
                {services.map((s, i) => (
                  <span key={s.title} data-active={active === i}>
                    {s.description}
                  </span>
                ))}
              </span>
            </div>
          </div>

          {services.map((service, i) => (
            <div className="services__item" key={service.title}>
              <span className="services__hairline" aria-hidden="true" />
              <Link
                to={service.to}
                className="services__row"
                data-active={active === i}
                data-dim={active !== null && active !== i}
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
              >
                <span className="services__no" aria-hidden="true">
                  {service.number}
                </span>
                <span className="services__mark" aria-hidden="true" />

                <h3 className="services__word">{service.title}</h3>

                {/* The thumbnail the plate replaces on a pointer device. */}
                <span className="services__thumb" aria-hidden="true">
                  <img
                    src={service.image}
                    alt=""
                    style={{ objectPosition: service.position }}
                    loading="lazy"
                    decoding="async"
                  />
                </span>

                <p className="services__cat">{service.category}</p>
                <p className="services__desc">{service.description}</p>

                <span className="services__go" aria-hidden="true">
                  <ArrowRight />
                </span>
              </Link>
            </div>
          ))}
          <span className="services__hairline services__hairline--last" aria-hidden="true" />
        </div>
      </div>

      <Reveal className="wrap services__footer">
        <p className="sg-display services__statement">
          We build what we sell. Site, plan, paperwork, possession. One team through all
          four, <span>with answers you can hold us to.</span>
        </p>
        <Link to="/contact" className="sg-btn sg-btn--lg services__cta">
          <span>Talk to our team</span>
          <span className="sg-btn__icon">
            <ArrowRight />
          </span>
        </Link>
      </Reveal>
    </section>
  )
}
