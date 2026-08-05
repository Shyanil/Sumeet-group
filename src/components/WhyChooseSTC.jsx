import React, { useEffect, useRef, useState } from 'react'

const WHY_DATA = {
  eyebrow: 'Why Choose STC',
  lede:
    "Four reasons STC stands apart as Raipur's premier commercial address. Hover or tap a card to explore each one.",
}

const BLOOM_HALF = './Assets/3D Images/why_choose_stc_elm_1.webp'
const BLOOM_FULL = './Assets/3D Images/why_choose_stc_elm_2.webp'

// purely decorative sunflower accents — behind everything, non-interactive
const DECOR = [
  { cls: 'tr', src: BLOOM_HALF },
  { cls: 'bl', src: BLOOM_HALF },
  { cls: 'tl', src: BLOOM_FULL },
  { cls: 're', src: BLOOM_FULL },
]

const WHY_CARDS = [
  {
    area: 'left',
    num: '01',
    icon: 'pin',
    image: './Assets/3D Images/VIEW_001_ELEVATION_TWILIGHT_2025.01.15_HIRES_FINAL.webp',
    objectPosition: 'center 38%',
    alt: 'Sumeet Group tower elevation at twilight',
    title: 'Strategic Location',
    text: "At Pachpedi Naka, with easy access to every major city zone — Raipur's most connected commercial address.",
  },
  {
    area: 'mid-1',
    num: '02',
    icon: 'building',
    static: true,
    image: './Assets/3D Images/LOBBY_AREA_2025.01.17_HIRES_FINAL.webp',
    objectPosition: 'center',
    alt: 'Premium lobby interior at Sumeet Group',
    title: 'Premium Commercial Address',
    text: 'A landmark address that elevates your brand from day one.',
  },
  {
    area: 'mid-2',
    num: '03',
    icon: 'grid',
    static: true,
    image: './Assets/3D Images/WORKSTATION_2025.01.17_HIRES _FINAL.webp',
    objectPosition: 'center',
    alt: 'Modern flexible workstation interior at Sumeet Group',
    title: 'Future-Ready Infrastructure',
    text: 'Flexible, technology-ready spaces built to scale with you.',
  },
  {
    area: 'right',
    num: '04',
    icon: 'growth',
    image: './Assets/3D Images/VIEW_002_ELEVATION_DUSK_2025.01.15_HIRES_FINAL.webp',
    objectPosition: 'center 42%',
    alt: 'Dusk facade of Sumeet Group against the skyline',
    title: 'Investment Potential',
    text: 'A rapidly growing corridor offering strong appreciation and dependable long-term returns.',
  },
]

const Icon = ({ name }) => {
  const common = {
    width: '22',
    height: '22',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.8',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': 'true',
  }

  if (name === 'pin') {
    return (
      <svg {...common}>
        <path d="M12 21s6-5.2 6-11a6 6 0 0 0-12 0c0 5.8 6 11 6 11Z" />
        <circle cx="12" cy="10" r="2" />
      </svg>
    )
  }

  if (name === 'building') {
    return (
      <svg {...common}>
        <path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
        <path d="M16 8h2a2 2 0 0 1 2 2v11" />
        <path d="M8 7h4M8 11h4M8 15h4M3 21h18" />
      </svg>
    )
  }

  if (name === 'grid') {
    return (
      <svg {...common}>
        <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
      </svg>
    )
  }

  return (
    <svg {...common}>
      <path d="M4 18h16" />
      <path d="m6 15 4-4 3 3 5-7" />
      <path d="M16 7h2v2" />
    </svg>
  )
}

export default function WhyChooseSTC() {
  const sectionRef = useRef(null)
  const [openCards, setOpenCards] = useState(() => new Set())

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    if (typeof IntersectionObserver === 'undefined') {
      node.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0, rootMargin: '0px 0px -12% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const toggleCard = (num) => {
    setOpenCards((prev) => {
      const next = new Set(prev)
      if (next.has(num)) {
        next.delete(num)
      } else {
        next.add(num)
      }
      return next
    })
  }

  return (
    <section
      ref={sectionRef}
      className="stc-why"
      id="why-stc"
      aria-labelledby="stc-why-heading"
    >
      <div className="stc-why__grain" aria-hidden="true" />

      <div className="stc-why__decor" aria-hidden="true">
        {DECOR.map((bloom) => (
          <span
            className={`stc-why__bloom stc-why__bloom--${bloom.cls}`}
            key={bloom.cls}
          >
            <img src={bloom.src} alt="" loading="lazy" draggable="false" />
          </span>
        ))}
      </div>

      <div className="stc-why__inner">
        <p className="stc-why__eyebrow">
          <span className="stc-why__eyebrow-rule" aria-hidden="true" />
          {WHY_DATA.eyebrow}
          <span className="stc-why__eyebrow-rule" aria-hidden="true" />
        </p>

        <h2 className="stc-why__headline" id="stc-why-heading">
          <span className="stc-why__line">Reasons to</span>
          <span className="stc-why__line">Choose STC</span>
        </h2>

        <p className="stc-why__lede">{WHY_DATA.lede}</p>

        <div className="stc-why__stage">
          {WHY_CARDS.map((card, index) => {
            const isOpen = openCards.has(card.num)

            const media = (
              <>
                <img
                  className="stc-why__card-img"
                  src={card.image}
                  alt={card.alt}
                  loading="lazy"
                  style={{ objectPosition: card.objectPosition }}
                />
                <span className="stc-why__shade" aria-hidden="true" />
                <span className="stc-why__num" aria-hidden="true">
                  {card.num}
                </span>

                <span className="stc-why__glass">
                  <span className="stc-why__glass-head">
                    <span className="stc-why__glass-icon" aria-hidden="true">
                      <Icon name={card.icon} />
                    </span>
                    <span className="stc-why__glass-title">{card.title}</span>
                  </span>
                  <span className="stc-why__glass-text">
                    <span>{card.text}</span>
                  </span>
                </span>
              </>
            )

            // middle rectangles: static info cards — text always visible, no toggle
            if (card.static) {
              return (
                <article
                  key={card.num}
                  className={`stc-why__card stc-why__card--${card.area} stc-why__card--static`}
                  style={{ '--card-index': index }}
                >
                  {media}
                </article>
              )
            }

            // side squares: interactive — caption reveals on hover / focus / tap
            return (
              <button
                type="button"
                key={card.num}
                className={`stc-why__card stc-why__card--${card.area}${
                  isOpen ? ' is-open' : ''
                }`}
                style={{ '--card-index': index }}
                aria-pressed={isOpen}
                aria-label={`${card.title}: ${card.text}`}
                onClick={() => toggleCard(card.num)}
              >
                {media}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
