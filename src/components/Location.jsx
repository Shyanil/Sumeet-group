import React, { useEffect, useRef } from 'react'
import { MapPin, Navigation, Building2, ArrowUpRight } from 'lucide-react'

/**
 * Location — quiet two-column closing section.
 * Left: address + a few connectivity notes + directions CTA.
 * Right: a framed live map of the junction with a floating address card.
 */

const ADDRESS = 'Pachpedi Naka Chowk, Raipur, Chhattisgarh'
const MAP_EMBED =
  'https://www.google.com/maps?q=Pachpedi%20Naka%20Chowk%2C%20Raipur%2C%20Chhattisgarh&z=14&output=embed'
const MAP_DIRECTIONS =
  'https://www.google.com/maps/dir/?api=1&destination=Pachpedi%20Naka%20Chowk%2C%20Raipur%2C%20Chhattisgarh'

const HIGHLIGHTS = [
  {
    icon: MapPin,
    title: 'Prime Junction',
    text: 'Positioned right at Pachpedi Naka Chowk — one of the city’s most recognised commercial addresses.',
  },
  {
    icon: Navigation,
    title: 'Seamless Connectivity',
    text: 'Direct access to Raipur’s key arterial roads, with smooth approach from every major city zone.',
  },
  {
    icon: Building2,
    title: 'Established Surroundings',
    text: 'Encircled by thriving retail, corporate offices, and civic landmarks already in motion.',
  },
]

export default function Location() {
  const sectionRef = useRef(null)

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

  return (
    <section
      ref={sectionRef}
      className="stc-loc"
      id="location"
      aria-labelledby="stc-loc-heading"
    >
      <span className="stc-loc__seam" aria-hidden="true" />

      <div className="stc-loc__inner">
        <div className="stc-loc__grid">
          {/* Left — information */}
          <div className="stc-loc__info">
            <p className="stc-loc__eyebrow">
              <span className="stc-loc__eyebrow-rule" aria-hidden="true" />
              Project Location
            </p>

            <h2 className="stc-loc__headline" id="stc-loc-heading">
              <span>At the Heart</span>
              <span>of Raipur</span>
            </h2>

            <p className="stc-loc__lede">
              Sumeet Group stands at Pachpedi Naka Chowk — a central,
              well-connected commercial junction with the entire city within
              easy reach.
            </p>

            <ul className="stc-loc__list">
              {HIGHLIGHTS.map((item) => {
                const Icon = item.icon
                return (
                  <li className="stc-loc__item" key={item.title}>
                    <span className="stc-loc__item-icon" aria-hidden="true">
                      <Icon size={20} strokeWidth={1.75} />
                    </span>
                    <span className="stc-loc__item-body">
                      <strong>{item.title}</strong>
                      <span>{item.text}</span>
                    </span>
                  </li>
                )
              })}
            </ul>

            <a
              className="stc-loc__cta"
              href={MAP_DIRECTIONS}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions
              <ArrowUpRight size={18} strokeWidth={2} aria-hidden="true" />
            </a>
          </div>

          {/* Right — framed map */}
          <div className="stc-loc__map">
            <span className="stc-loc__corner stc-loc__corner--tl" aria-hidden="true" />
            <span className="stc-loc__corner stc-loc__corner--tr" aria-hidden="true" />
            <span className="stc-loc__corner stc-loc__corner--bl" aria-hidden="true" />
            <span className="stc-loc__corner stc-loc__corner--br" aria-hidden="true" />

            <iframe
              className="stc-loc__map-frame"
              src={MAP_EMBED}
              title="Map showing Sumeet Group at Pachpedi Naka Chowk, Raipur"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            <div className="stc-loc__map-card">
              <span className="stc-loc__map-pin" aria-hidden="true">
                <MapPin size={18} strokeWidth={2} />
              </span>
              <div className="stc-loc__map-text">
                <strong>Sumeet Group</strong>
                <span>{ADDRESS}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
