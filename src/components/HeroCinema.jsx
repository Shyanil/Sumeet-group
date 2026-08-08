import { useLayoutEffect, useRef } from 'react'
import { Link } from '../lib/router'
import { gsap, prefersReducedMotion } from '../lib/scroll'

/**
 * The home hero: one daylight scene, flown past the viewer in three acts as
 * the page scrolls.
 *
 *   Act 1 — sky, clouds and the building sitting low in frame, with the
 *           headline and a single call to action centred above it.
 *   Act 2 — the copy clears, the building rises and grows, and the wordmark
 *           draws itself over the glass as an outline.
 *   Act 3 — fog rolls up from the foreground, the building recedes into it,
 *           and the wordmark fills with the render as the page climbs over
 *           the scene from below and takes the frame.
 *
 * None of it is a video. The section is three viewports tall, the scene
 * inside is `position: sticky`, and one scrubbed GSAP timeline moves every
 * layer at a different rate — the sky barely, the building a lot. That
 * difference in rate is the entire illusion of depth.
 *
 * The only bitmap is a render we already ship. Cloud and fog are generated
 * at runtime from an `feTurbulence` filter clipped to an ellipse, so there
 * are no weather assets to download and they can be re-tinted from tokens.
 */

/** Fractal-noise vapour, clipped to a soft ellipse. No image required. */
function Vapor({ id, seed, frequency, blur, opacity, className }) {
  return (
    <svg className={className} viewBox="0 0 1200 460" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <defs>
        <filter id={id} x="-25%" y="-45%" width="150%" height="190%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency={frequency} numOctaves="4" seed={seed} result="noise" />
          {/* Flatten the noise to white, then drive alpha off its red channel
              so the mass is dense in the middle and ragged at the edges. */}
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  1.9 0 0 0 -0.68"
            result="alpha"
          />
          <feComposite in="alpha" in2="SourceGraphic" operator="in" result="clipped" />
          <feGaussianBlur in="clipped" stdDeviation={blur} />
        </filter>
      </defs>
      <ellipse cx="600" cy="230" rx="580" ry="190" fill="#fff" opacity={opacity} filter={`url(#${id})`} />
    </svg>
  )
}

const HOUSE = '/Assets/Sumeet Urban Nest (SUN)/renders/exterior-day.webp'

/** Two lines of the mark, rendered twice: once as outline, once filled. */
function Mark() {
  return (
    <>
      <span className="cinema__mark-a">SUMEET</span>
      <span className="cinema__mark-b">Real Estate</span>
    </>
  )
}

export default function HeroCinema() {
  const root = useRef(null)

  useLayoutEffect(() => {
    // Reduced motion gets the same scene, held still. The CSS resting state
    // is already act one, so there is no separate fallback layout.
    if (prefersReducedMotion()) return

    const ctx = gsap.context((self) => {
      const q = self.selector

      const tl = gsap.timeline({
        defaults: { ease: 'none', duration: 1 },
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: 1 },
      })

      tl
        /* ---- the scene, running the whole length ---- */
        .fromTo(q('.cinema__sky'), { yPercent: 0, scale: 1 }, { yPercent: -3, scale: 1.08 }, 0)
        .fromTo(q('.cinema__cloud--a'), { xPercent: -12, yPercent: 6 }, { xPercent: 16, yPercent: -18 }, 0)
        .fromTo(q('.cinema__cloud--b'), { xPercent: 14, yPercent: 12 }, { xPercent: -16, yPercent: -10 }, 0)
        .fromTo(q('.cinema__cloud--c'), { xPercent: -8, yPercent: 18 }, { xPercent: 10, yPercent: -6 }, 0)

        // The building carries the depth: furthest travel, biggest growth.
        .fromTo(q('.cinema__house'), { yPercent: 7, scale: 1 }, { yPercent: -14, scale: 1.62 }, 0)

        /* ---- act 1 → 2: the copy leaves, the outline arrives ---- */
        .fromTo(q('.cinema__copy'), { opacity: 1, y: 0 }, { opacity: 0, y: -70, duration: 0.26 }, 0)
        .fromTo(q('.cinema__outline'), { opacity: 0, scale: 1.14 }, { opacity: 1, scale: 1, duration: 0.26 }, 0.3)

        /* ---- act 2 → 3: fog rises, the mark fills, the building recedes ---- */
        .fromTo(q('.cinema__fog--a'), { xPercent: -18, yPercent: 30, opacity: 0.35 }, { xPercent: 14, yPercent: -4, opacity: 0.92 }, 0)
        .fromTo(q('.cinema__fog--b'), { xPercent: 20, yPercent: 46, opacity: 0.22 }, { xPercent: -14, yPercent: 0, opacity: 0.88 }, 0)
        .fromTo(q('.cinema__fogbank'), { yPercent: 92, opacity: 0.5 }, { yPercent: 6, opacity: 1, duration: 0.62 }, 0.3)

        .to(q('.cinema__outline'), { opacity: 0, duration: 0.14 }, 0.6)
        .fromTo(q('.cinema__filled'), { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1, duration: 0.18 }, 0.58)
        .to(q('.cinema__house'), { opacity: 0.2, duration: 0.2 }, 0.54)

        /* ---- the turn ----
           No curtain: the statement section climbs over the scene on its own
           (see --cinema-overlap in hero.css). All that is left to do here is
           clear the mark before the page reaches it. */
        .to(q('.cinema__filled'), { opacity: 0, duration: 0.12 }, 0.86)
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section className="cinema" ref={root} aria-label="Sumeet Group">
      <div className="cinema__stage" data-header-over="light">
        <div className="cinema__sky" aria-hidden="true" />

        <div className="cinema__layer cinema__cloud cinema__cloud--a" aria-hidden="true">
          <Vapor id="vapor-cloud-a" seed="7" frequency="0.006 0.013" blur="9" opacity="0.85" />
        </div>
        <div className="cinema__layer cinema__cloud cinema__cloud--b" aria-hidden="true">
          <Vapor id="vapor-cloud-b" seed="21" frequency="0.005 0.011" blur="12" opacity="0.7" />
        </div>

        <div className="cinema__layer cinema__house">
          <div className="cinema__house-frame">
            <img src={HOUSE} alt="Sumeet Urban Nest seen from the approach road" fetchPriority="high" />
          </div>
        </div>

        <div className="cinema__layer cinema__cloud cinema__cloud--c" aria-hidden="true">
          <Vapor id="vapor-cloud-c" seed="33" frequency="0.004 0.012" blur="14" opacity="0.6" />
        </div>

        {/* The mark, drawn over the glass — outline first, then filled with
            the render itself as the fog closes in. */}
        <div className="cinema__layer cinema__mark cinema__outline" aria-hidden="true">
          <Mark />
        </div>
        <div className="cinema__layer cinema__mark cinema__filled" aria-hidden="true">
          <Mark />
        </div>

        {/* Foreground weather, in front of everything but the copy. */}
        <div className="cinema__layer cinema__fog cinema__fog--a" aria-hidden="true">
          <Vapor id="vapor-fog-a" seed="4" frequency="0.0035 0.014" blur="18" opacity="0.95" />
        </div>
        <div className="cinema__layer cinema__fog cinema__fog--b" aria-hidden="true">
          <Vapor id="vapor-fog-b" seed="13" frequency="0.003 0.011" blur="22" opacity="0.9" />
        </div>
        <div className="cinema__fogbank" aria-hidden="true" />
        <div className="cinema__hem" aria-hidden="true" />

        <div className="cinema__copy">
          {/* Both lines are set `nowrap` and sized off the viewport, so the
              copy length is load-bearing — see .cinema__title in hero.css
              before editing either one. */}
          <h1 className="sg-display cinema__title">
            For the life you’ve <em>earned</em>
          </h1>
          <p className="cinema__lede">Homes and workspaces across Raipur.</p>
          <Link to="/projects" className="cinema__cta">
            <span>Explore projects</span>
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M5 12h13M12 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.75" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
