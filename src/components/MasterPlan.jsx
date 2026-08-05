import React, { useEffect, useRef, useState } from 'react'
import { Maximize2, Compass, X, ArrowUpRight } from 'lucide-react'

/**
 * MasterPlan — interactive "Project Layout" explorer.
 * The brochure site plans (Master / Terrace) sit inside a drafting-board
 * frame with corner brackets, a compass and an expand-to-lightbox control.
 * A live index panel decodes the plan legend and lets you step through the
 * three commercial towers. Reveal animation is driven by IntersectionObserver.
 */

const TOWERS = [
  {
    id: 'a',
    name: 'Block A',
    title: 'Block A Tower',
    desc: 'Premium commercial tower featuring modular office layouts, luxury showrooms, and double-height entrance lobbies.',
  },
  {
    id: 'b',
    name: 'Block B',
    title: 'Block B Tower',
    desc: 'The corporate heart of the complex — designed for corporate offices, banks, and standard business centres.',
  },
  {
    id: 'c',
    name: 'Block C',
    title: 'Block C Tower',
    desc: 'An exclusive professional workspace hub for clinical consultancies, chambers, and executive offices.',
  },
]

const PLANS = [
  {
    id: 'master',
    label: 'Master Plan',
    tagline: 'Ground-level site planning',
    src: './Assets/3D Images/STC BROCHURE_pages-to-jpg-0001.webp',
    legend: [
      { n: '01', name: 'Drop Off' },
      { n: '02', name: 'Sculpture' },
      { n: '03', name: 'Entrance Plaza Area' },
      { n: '04', name: 'Signage' },
      { n: '05', name: 'Block Drop-off' },
      { n: '06', name: 'Sculpture Pylon' },
      { n: '07', name: 'Security Cabin' },
    ],
  },
  {
    id: 'terrace',
    label: 'Terrace Plan',
    tagline: 'Rooftop amenity planning',
    src: './Assets/3D Images/STC BROCHURE_pages-to-jpg-0002.webp',
    legend: [
      { n: '01', name: 'Entry' },
      { n: '02', name: 'Toilet' },
      { n: '03', name: 'Hand Wash Zone' },
      { n: '04', name: 'Lift Lobby' },
      { n: '05', name: 'Cafe with Pergola Cover' },
      { n: '06', name: 'Gathering Lawn' },
      { n: '07', name: 'Stepping Pads' },
      { n: '08', name: 'Covered Lounge Seating' },
      { n: '09', name: 'Trees in Planters' },
      { n: '10', name: 'Congregation Lawn' },
    ],
  },
]

// Two line-art flower accents used purely as background aesthetic elements
const PLAN_DECOR = [
  { id: 'stem', src: './Assets/3D Images/plan_section_2.webp' },
  { id: 'bloom', src: './Assets/3D Images/plan_section_1.webp' },
]

const FACTS = [
  { value: '3', label: 'Commercial Towers' },
  { value: 'G+7', label: 'Floor Hierarchy' },
  { value: '100%', label: 'Vastu Compliant' },
  { value: 'RERA', label: 'Registered' },
]

export default function MasterPlan() {
  const sectionRef = useRef(null)
  const [activeTab, setActiveTab] = useState(0)
  const [activeTower, setActiveTower] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  const plan = PLANS[activeTab]
  const tower = TOWERS[activeTower]

  // Scroll-reveal
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

  // Lightbox: lock scroll + ESC to close
  useEffect(() => {
    if (!lightbox) return
    const onKey = (event) => {
      if (event.key === 'Escape') setLightbox(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox])

  return (
    <section
      ref={sectionRef}
      className="stc-master"
      id="master-plan"
      aria-labelledby="stc-master-heading"
    >
      <div className="stc-master__grain" aria-hidden="true" />
      <div className="stc-master__decor" aria-hidden="true">
        {PLAN_DECOR.map((item) => (
          <span
            className={`stc-master__decor-item stc-master__decor-item--${item.id}`}
            key={item.id}
          >
            <img src={item.src} alt="" loading="lazy" draggable="false" />
          </span>
        ))}
      </div>

      <div className="stc-master__inner">
        <p className="stc-master__eyebrow">
          <span className="stc-master__eyebrow-rule" aria-hidden="true" />
          Project Layout
          <span className="stc-master__eyebrow-rule" aria-hidden="true" />
        </p>
        <h2 className="stc-master__headline" id="stc-master-heading">
          The Master Plan
        </h2>
        <p className="stc-master__lede">
          A clean, interactive read of how Sumeet Group is planned —
          circulation, arrival, and the three commercial towers that anchor the
          site.
        </p>

        {/* Plan switcher */}
        <div className="stc-master__tabs" role="tablist" aria-label="Plan views">
          {PLANS.map((page, idx) => (
            <button
              key={page.id}
              className={`stc-master__tab${activeTab === idx ? ' is-active' : ''}`}
              type="button"
              role="tab"
              aria-selected={activeTab === idx}
              onClick={() => setActiveTab(idx)}
            >
              <span className="stc-master__tab-index">
                {String(idx + 1).padStart(2, '0')}
              </span>
              {page.label}
            </button>
          ))}
        </div>

        <div className="stc-master__layout">
          {/* Drafting-board viewer */}
          <figure className="stc-master__viewer">
            <button
              type="button"
              className="stc-master__board"
              onClick={() => setLightbox(true)}
              aria-label={`Expand ${plan.label}`}
            >
              <span className="stc-master__corner stc-master__corner--tl" aria-hidden="true" />
              <span className="stc-master__corner stc-master__corner--tr" aria-hidden="true" />
              <span className="stc-master__corner stc-master__corner--bl" aria-hidden="true" />
              <span className="stc-master__corner stc-master__corner--br" aria-hidden="true" />

              <img
                key={plan.id}
                className="stc-master__plan-art"
                src={plan.src}
                alt={`${plan.label} — Sumeet Group`}
              />

              <span className="stc-master__viewer-tag">
                <strong>{plan.label}</strong>
                <span>{plan.tagline}</span>
              </span>

              <span className="stc-master__expand" aria-hidden="true">
                <Maximize2 size={16} strokeWidth={2} />
                Expand
              </span>

              <span className="stc-master__compass" aria-hidden="true">
                <Compass size={26} strokeWidth={1.5} />
                <em>N</em>
              </span>
            </button>
          </figure>

          {/* Index panel */}
          <aside className="stc-master__panel" aria-label="Project index">
            <span className="stc-master__panel-kicker">Project Index</span>

            <div className="stc-master__towers" role="tablist" aria-label="Towers">
              {TOWERS.map((t, idx) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={activeTower === idx}
                  className={`stc-master__tower-chip${
                    activeTower === idx ? ' is-active' : ''
                  }`}
                  onClick={() => setActiveTower(idx)}
                >
                  {t.name.replace('Block ', '')}
                </button>
              ))}
            </div>

            <div className="stc-master__tower-detail" key={tower.id}>
              <span className="stc-master__tower-kicker">{tower.name}</span>
              <h3 className="stc-master__tower-title">{tower.title}</h3>
              <p className="stc-master__tower-desc">{tower.desc}</p>
            </div>

            <div className="stc-master__legend">
              <span className="stc-master__legend-head">
                {plan.label} · Legend
              </span>
              <ul className="stc-master__legend-list">
                {plan.legend.map((item) => (
                  <li className="stc-master__legend-item" key={item.n}>
                    <span className="stc-master__legend-num">{item.n}</span>
                    <span className="stc-master__legend-name">{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              className="stc-master__panel-cta"
              onClick={() => setLightbox(true)}
            >
              View full {plan.label}
              <ArrowUpRight size={17} strokeWidth={2} aria-hidden="true" />
            </button>
          </aside>
        </div>

        {/* Key facts strip */}
        <div className="stc-master__facts">
          {FACTS.map((fact) => (
            <div className="stc-master__fact" key={fact.label}>
              <strong>{fact.value}</strong>
              <span>{fact.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="stc-master__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${plan.label} full view`}
          onClick={() => setLightbox(false)}
        >
          <button
            type="button"
            className="stc-master__lightbox-close"
            aria-label="Close plan"
            onClick={() => setLightbox(false)}
          >
            <X size={22} strokeWidth={2} />
          </button>
          <figure
            className="stc-master__lightbox-frame"
            onClick={(event) => event.stopPropagation()}
          >
            <img src={plan.src} alt={`${plan.label} — full detail`} />
            <figcaption>
              <strong>{plan.label}</strong>
              <span>{plan.tagline}</span>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  )
}
