import React, { useEffect, useRef } from 'react'

const ABOUT_DATA = {
  eyebrow: 'About The Project',
  image: './Assets/3D Images/VIEW_001_ELEVATION_TWILIGHT_1 building.webp',
  alt: 'Sumeet Group elevation rendered at twilight',
  lede:
    'Sumeet Group is a premium commercial destination designed to meet the evolving needs of modern businesses. With contemporary architecture, strategic connectivity, flexible workspaces, and world-class amenities, it offers an ideal environment for growth and success.',
}

export default function About() {
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
      className="stc-about"
      id="about"
      aria-labelledby="stc-about-heading"
    >
      <div className="stc-about__grain" aria-hidden="true" />

      <div className="stc-about__inner">
        <p className="stc-about__eyebrow">
          <span className="stc-about__eyebrow-rule" aria-hidden="true" />
          {ABOUT_DATA.eyebrow}
          <span className="stc-about__eyebrow-rule" aria-hidden="true" />
        </p>

        <h2 className="stc-about__headline" id="stc-about-heading">
          <span className="stc-about__line">The Future of</span>
          <span className="stc-about__line stc-about__line--with-media">
            <span>Business</span>
            <span className="stc-about__media">
              <img src={ABOUT_DATA.image} alt={ABOUT_DATA.alt} loading="lazy" />
            </span>
            <span>in Raipur</span>
          </span>
        </h2>

        <p className="stc-about__lede">{ABOUT_DATA.lede}</p>
      </div>
    </section>
  )
}
