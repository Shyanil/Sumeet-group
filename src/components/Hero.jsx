import { useEffect, useState } from 'react'
import { BRAND, BROCHURE, downloadBrochure, scrollToSection } from '../data/site'

/**
 * Hero — a plain auto-advancing slider. Each slide holds for AUTOPLAY_MS,
 * then cross-fades to the next and loops forever. It never pauses on hover;
 * only reduced-motion users get a static first slide.
 */

const AUTOPLAY_MS = 3000

const HERO_SLIDES = [
  {
    image: './Assets/3D Images/VIEW_001_ELEVATION_TWILIGHT_2025.01.15_HIRES_FINAL.webp',
    alt: `${BRAND} building elevation at twilight`,
    eyebrow: 'Pachpedi Naka Chowk, Raipur',
    title: BRAND,
    intro:
      'Where every corner whispers serenity, our commercial spaces are more than structures; they are environments designed for clarity, growth, and everyday ease.',
    detail: '3 Towers · G+7 Floors · Vastu Compliant · RERA Registered',
  },
  {
    image: './Assets/3D Images/VIEW_019_AERIAL_VIEW_TWILIGHT_2025.01.15_HIRES_FINAL.webp',
    alt: `Aerial twilight view of ${BRAND}`,
    eyebrow: 'A Landmark Address',
    title: 'A Landmark Address',
    intro:
      'A commercial destination composed for visibility, approach, and everyday business movement in the centre of Raipur.',
    detail: 'Prime frontage · Planned circulation · Distinct skyline presence',
  },
  {
    image: './Assets/3D Images/VIEW_010_MIDDLE_PLAZA_AREA_DAY_2025.01.21_HIRES.webp',
    alt: `Middle plaza area at ${BRAND}`,
    eyebrow: 'The Central Plaza',
    title: 'Open Plaza Energy',
    intro:
      'The central plaza brings daylight, movement, and breathing room into the business environment without interrupting pace.',
    detail: 'Retail edge · Open-air pause points · Active arrival experience',
  },
  {
    image: './Assets/3D Images/LOBBY_AREA_2025.01.17_HIRES_FINAL.webp',
    alt: `Lobby area at ${BRAND}`,
    eyebrow: 'Arrival & Interiors',
    title: 'A Refined Welcome',
    intro:
      'Interior arrival spaces are calm, polished, and practical, giving every visitor a clear first impression.',
    detail: 'Premium lobby · Professional reception · Smooth vertical access',
  },
]

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function Hero() {
  const [index, setIndex] = useState(0)

  // Always advancing — hovering the hero must not stop the loop.
  useEffect(() => {
    if (prefersReducedMotion()) return
    const id = window.setTimeout(
      () => setIndex((current) => (current + 1) % HERO_SLIDES.length),
      AUTOPLAY_MS,
    )
    return () => window.clearTimeout(id)
  }, [index])

  const slide = HERO_SLIDES[index]

  return (
    <section
      className="stc-hero"
      id="home"
      aria-label={`${BRAND} highlights`}
      aria-roledescription="carousel"
    >
      <div className="stc-hero__stage">
        {HERO_SLIDES.map((item, i) => (
          <img
            className={`stc-hero__image${i === index ? ' is-active' : ''}`}
            src={item.image}
            alt={item.alt}
            loading={i === 0 ? 'eager' : 'lazy'}
            fetchPriority={i === 0 ? 'high' : 'low'}
            aria-hidden={i !== index}
            key={item.image}
          />
        ))}
      </div>

      <div className="stc-hero__scrim" aria-hidden="true" />

      <div className="stc-hero__inner">
        <div className="stc-hero__content" key={index}>
          <p className="stc-hero__eyebrow">
            <span className="stc-hero__eyebrow-rule" aria-hidden="true" />
            {slide.eyebrow}
          </p>

          <h1 className="stc-hero__title">{slide.title}</h1>

          <p className="stc-hero__intro">{slide.intro}</p>

          <div className="stc-hero__ctas">
            <a
              className="stc-hero__cta stc-hero__cta--primary"
              href="#amenities"
              onClick={(event) => {
                event.preventDefault()
                scrollToSection('#amenities')
              }}
            >
              Explore Spaces
              <svg
                className="stc-hero__cta-icon"
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
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </a>

            <a
              className="stc-hero__cta stc-hero__cta--ghost"
              href={BROCHURE}
              onClick={downloadBrochure}
            >
              Download Brochure
              <svg
                className="stc-hero__cta-icon stc-hero__cta-icon--down"
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
          </div>
        </div>

        <div className="stc-hero__bottom">
          <p className="stc-hero__detail" key={`detail-${index}`}>
            {slide.detail}
          </p>

          <div className="stc-hero__dots" role="tablist" aria-label="Choose a slide">
            {HERO_SLIDES.map((item, i) => (
              <button
                type="button"
                className={`stc-hero__dot${i === index ? ' is-active' : ''}`}
                role="tab"
                aria-selected={i === index}
                aria-label={`Slide ${i + 1}: ${item.title}`}
                onClick={() => setIndex(i)}
                key={item.image}
              >
                <span className="stc-hero__dot-num">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="stc-hero__dot-track" aria-hidden="true">
                  <span
                    className="stc-hero__dot-fill"
                    style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
                  />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live region so screen readers hear the slide change without the visuals. */}
      <p className="stc-hero__sr" aria-live="polite">
        {`Slide ${index + 1} of ${HERO_SLIDES.length}: ${slide.title}`}
      </p>
    </section>
  )
}
