import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/scroll'
import './RealEstateArrowsSection.css'

/**
 * An editorial statement band: one line of type, four photographs clipped
 * into thick right-facing chevrons, and a closing paragraph.
 *
 * The chevrons are the point of the section. Each one is a real photograph
 * behind a `clip-path` polygon — a notch cut out of the left edge and a
 * point pushed out of the right — so the white between them is not padding
 * but the geometry itself. The boxes actually overlap; the shapes do not.
 *
 * Everything is driven from three custom properties on the row
 * (`--arrow-w`, `--arrow-h`, `--arrow-overlap`), so re-proportioning the
 * whole composition is three numbers, not four rules.
 *
 * The arrows re-stagger in every time the row enters the frame, in either
 * direction — it is not a play-once reveal.
 */

/* Swap these paths to change the composition. The two portraits bookend the
   row and the interiors sit between them, which is what gives the band its
   people → place → people reading. */
export const ARROW_IMAGES = [
  { src: '/Assets/People/Woman.webp', position: '46% 20%' },
  { src: '/Assets/Sumeet Urban Nest (SUN)/renders/bedroom.webp', position: '50% 50%' },
  { src: '/Assets/Sumeet Urban Nest (SUN)/renders/living-room.webp', position: '50% 50%' },
  { src: '/Assets/People/man.webp', position: '54% 18%' },
]

export default function RealEstateArrowsSection({ images = ARROW_IMAGES }) {
  const root = useRef(null)
  const row = useRef(null)

  useLayoutEffect(() => {
    // The CSS resting state is the finished composition, so reduced motion
    // needs no fallback — it simply never gets animated away from it.
    if (prefersReducedMotion()) return

    const ctx = gsap.context((self) => {
      // fromTo, not from: a `from` tween re-reads the current values as its
      // end state each time it is restarted, so on the second play it would
      // animate from -30 to -30. An explicit fromTo is stable across replays.
      gsap.fromTo(
        self.selector('.real-estate-arrows__arrow'),
        { opacity: 0, x: -30, scale: 0.97 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.72,
          ease: 'power2.out',
          stagger: 0.14,
          scrollTrigger: {
            // Keyed to the arrow row rather than the whole section, so both
            // directions fire on the arrows themselves — the section is
            // 700px tall and its edges are nowhere near them.
            trigger: row.current,
            start: 'top 85%',
            // `bottom top` puts the far edge off-screen, which is what makes
            // the reset invisible: the arrows are always returned to their
            // start state above the fold, never in view.
            end: 'bottom top',
            // enter · leave · enterBack · leaveBack. Restart on both entries
            // replays it scrolling down *and* scrolling back up; reset on
            // both exits arms it again without playing a visible reverse.
            toggleActions: 'restart reset restart reset',
          },
        },
      )
    }, root)

    return () => ctx.revert()
  }, [images])

  return (
    <section className="real-estate-arrows" ref={root}>
      <div className="real-estate-arrows__container">
        <header className="real-estate-arrows__header">
          <h2 className="real-estate-arrows__heading">
            This isn’t just <span>about real estate.</span>
          </h2>
        </header>

        <div className="real-estate-arrows__visuals">
          <div className="real-estate-arrows__row" ref={row}>
            {images.map((image, i) => (
              <div className="real-estate-arrows__arrow" key={image.src ?? i}>
                <img
                  src={image.src ?? image}
                  alt=""
                  style={image.position ? { objectPosition: image.position } : undefined}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="real-estate-arrows__copy">
          <p>
            It’s about identity. Progress. Getting unstuck. You’re not just looking for a place.{' '}
            <span>You’re looking for alignment. That’s what we help you find.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
