import { useEffect, useState } from 'react'
import { Link } from '../lib/router'

const SLIDES = [
  {
    image: '/Assets/Sumeet Urban Nest (SUN)/renders/exterior-day.webp',
    alt: 'Sumeet Urban Nest exterior in daylight',
    eyebrow: 'Sumeet Urban Nest · Residential',
    title: <><span>A home with room for</span><span><em>life outside.</em></span></>,
    lede: '2 & 3 BHK homes in Khamardih, Raipur.',
    href: '/projects/sumeet-urban-nest',
  },
  {
    image: '/Assets/3D Images/VIEW_001_ELEVATION_TWILIGHT_2025.01.15_HIRES_FINAL.webp',
    alt: 'Sumeet Trade Centre towers at twilight',
    eyebrow: 'Sumeet Trade Centre · Commercial',
    title: <><span>A sharper address for</span><span><em>business.</em></span></>,
    lede: 'Offices and retail at Pachpedi Naka, Raipur.',
    href: '/projects/sumeet-trade-centre',
  },
  {
    image: '/Assets/3D Images/VIEW_006_FRONT_PLAZA_DUSK_2025.01.15_HIRES_FINAL.webp',
    alt: 'Sumeet Trade Centre front plaza at dusk',
    eyebrow: 'Sumeet Trade Centre · The plaza',
    title: <><span>Where the working day</span><span><em>finds its second wind.</em></span></>,
    lede: 'A landscaped arrival that stays active after six.',
    href: '/projects/sumeet-trade-centre',
  },
  {
    image: '/Assets/Sumeet Urban Nest (SUN)/renders/aerial-twilight.webp',
    alt: 'Sumeet Urban Nest aerial view at twilight',
    eyebrow: 'Sumeet Urban Nest · The idea',
    title: <><span>More openness, built into</span><span>the <em>plan.</em></span></>,
    lede: 'Low-density homes designed around light, air and sky.',
    href: '/projects/sumeet-urban-nest',
  },
  {
    image: '/Assets/3D Images/LOBBY_AREA_2025.01.17_HIRES_FINAL.webp',
    alt: 'Sumeet Trade Centre lobby interior',
    eyebrow: 'Sumeet Trade Centre · Inside',
    title: <><span>A first impression</span><span>that does the <em>introducing.</em></span></>,
    lede: 'A considered lobby for a more confident arrival.',
    href: '/projects/sumeet-trade-centre',
  },
]

export default function HeroCinema() {
  const [active, setActive] = useState(0)
  const slide = SLIDES[active]

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % SLIDES.length)
    }, 4000)
    return () => window.clearInterval(timer)
  }, [])

  const goTo = (index) => setActive((index + SLIDES.length) % SLIDES.length)

  return (
    <section
      className="cinema hero-slider"
      aria-label="Featured Sumeet Group projects"
    >
      <div className="cinema__stage hero-slider__stage" data-header-over="light">
        <div className="hero-slider__media" aria-live="polite">
          {SLIDES.map((item, index) => (
            <img
              key={item.image}
              className={`hero-slider__image ${index === active ? 'is-active' : ''}`}
              src={item.image}
              alt={index === active ? item.alt : ''}
              aria-hidden={index !== active}
              fetchPriority={index === 0 ? 'high' : undefined}
            />
          ))}
        </div>
        <div className="hero-slider__veil" aria-hidden="true" />
        <div className="hero-slider__grain" aria-hidden="true" />

        <div className="cinema__copy hero-slider__copy">
          <p className="sg-eyebrow-c hero-slider__eyebrow">{slide.eyebrow}</p>
          <h1 className="sg-display cinema__title hero-slider__title">{slide.title}</h1>
          <p className="cinema__lede hero-slider__lede">{slide.lede}</p>
          <Link to={slide.href} className="cinema__cta hero-slider__cta">
            <span>Explore project</span>
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M5 12h13M12 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.75" />
            </svg>
          </Link>
        </div>

        <div className="hero-slider__controls" aria-label="Featured project slides">
          <button type="button" className="hero-slider__arrow" onClick={() => goTo(active - 1)} aria-label="Previous slide">
            <span aria-hidden="true">←</span>
          </button>
          <div className="hero-slider__dots">
            {SLIDES.map((item, index) => (
              <button
                type="button"
                key={item.image}
                className={`hero-slider__dot ${index === active ? 'is-active' : ''}`}
                onClick={() => goTo(index)}
                aria-label={`Show slide ${index + 1}`}
                aria-current={index === active ? 'true' : undefined}
              />
            ))}
          </div>
          <button type="button" className="hero-slider__arrow" onClick={() => goTo(active + 1)} aria-label="Next slide">
            <span aria-hidden="true">→</span>
          </button>
          <span className="hero-slider__count">0{active + 1} / 0{SLIDES.length}</span>
        </div>
      </div>
    </section>
  )
}
