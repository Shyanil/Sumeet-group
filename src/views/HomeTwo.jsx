'use client'

import { useState } from 'react'
import { Link } from '../lib/router'
import { BRAND, CONTACT, GROUP_STATS } from '../data/site'
import { PROJECTS, PAST_PROJECTS } from '../data/projects'
import Reveal from '../components/Reveal'
import Gallery from '../components/Gallery'
import LeadForm from '../components/LeadForm'
import './HomeTwo.css'

/** Client-approved homepage, server-rendered by Next.js and hydrated for motion. */

/* ---------- Copy that belongs to this treatment only -------- */

/** Four plain facts per project, for the boxed icon row in the panel. */
const PANEL_ICONS = {
  'sumeet-urban-nest': [
    ['plan', '2 & 3 BHK homes'],
    ['leaf', 'Three tiers of open space'],
    ['sun', 'Cross ventilation'],
    ['shield', 'Gated & Vaastu planned'],
  ],
  'sumeet-trade-centre': [
    ['tower', 'Offices & shopfronts'],
    ['glass', 'Glazed facade with fins'],
    ['snow', 'VRV air conditioning'],
    ['connect', 'On the busiest junction'],
  ],
}

/** What the status field means in words a buyer uses. */
const STATUS = {
  upcoming: 'Now selling',
  construction: 'Under construction',
  delivered: 'Delivered',
}

const GALLERY = [
  ['/Assets/3D Images/VIEW_010_MIDDLE_PLAZA_AREA_DAY_2025.01.21_HIRES.webp', 'The middle plaza by day'],
  ['/Assets/Sumeet Urban Nest (SUN)/renders/living-room.webp', 'A living room at Sumeet Urban Nest'],
  ['/Assets/3D Images/RECEPTION_AREA_CAM_2025.01.17_HIRES _FINAL.webp', 'The reception at Sumeet Trade Centre'],
  ['/Assets/Sumeet Urban Nest (SUN)/renders/swimming-pool.webp', 'The rooftop pool'],
  ['/Assets/3D Images/VIEW_013_TERRACE_PARTY_LAWN_DUSK_2025.01.02_HIRES_FINAL.webp', 'The terrace lawn at dusk'],
  ['/Assets/Sumeet Urban Nest (SUN)/renders/podium-courtyard.webp', 'The podium courtyard'],
  ['/Assets/3D Images/CONFERENCE_VIEW_2025.01.17_HIRES _FINAL.webp', 'A conference room'],
  ['/Assets/Sumeet Urban Nest (SUN)/renders/balcony-view.webp', 'The outdoor room of a residence'],
]

/* ---------- Line icons -------------------------------------- *
   One family, one weight, thin and geometric — the same drawing language as
   components/ui, sized for a medallion rather than a button. No emoji. */

const PATHS = {
  connect: 'M3 12h5m8 0h5M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0M12 3v5m0 8v5',
  seal: 'M12 3l7 3.5v5c0 4-3 7.4-7 8.5-4-1.1-7-4.5-7-8.5v-5L12 3zM9 12l2.2 2.2L15.5 10',
  leaf: 'M5 19c0-7 4.5-12 14-13 0 9-4.5 13.5-11 13.5H5zM8.5 16.5c2-3.2 4.4-5.4 7.5-7',
  plan: 'M4 4h16v16H4zM4 10h16M10 10v10M15 4v6',
  sun: 'M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19',
  shield: 'M12 3l7 3v5.5c0 4.2-2.9 7.8-7 9-4.1-1.2-7-4.8-7-9V6l7-3z',
  tower: 'M6 21V7l6-4 6 4v14M9.5 21v-4.5h5V21M9 10.5h1.5M13.5 10.5H15M9 13.5h1.5M13.5 13.5H15',
  glass: 'M4 3h16v18H4zM4 9h16M4 15h16M9 3v18M15 3v18',
  snow: 'M12 2v20M3.5 7l17 10M20.5 7l-17 10M12 6l-2.5-2M12 6l2.5-2M12 18l-2.5 2M12 18l2.5 2',
}

function Icon({ name, size = 24 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true" focusable="false">
      <path d={PATHS[name]} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const Arrow = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true" focusable="false">
    <path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const Chevron = ({ dir = 'right' }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true" focusable="false">
    <path
      d={dir === 'right' ? 'M9 5l7 7-7 7' : 'M15 5l-7 7 7 7'}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

/**
 * The section label used throughout: a short gold rule, then wide-tracked
 * mono. One shape, repeated, is what gives the page its rhythm.
 */
function Kicker({ children, tone = 'light', center = false }) {
  return (
    <span className={`ht-kicker${tone === 'dark' ? ' ht-kicker--dark' : ''}${center ? ' ht-kicker--center' : ''}`}>
      <i aria-hidden="true" />
      {children}
    </span>
  )
}

/* ============================================================
   1 · The hero
   ============================================================ */

const HERO_IMAGE = '/Assets/3D Images/VIEW_001_ELEVATION_TWILIGHT_2025.01.15_HIRES_FINAL.webp'

/** One clear offer and two actions in the first screen. */
function Hero() {
  const brochure = PROJECTS.find((project) => project.brochure)?.brochure
  return (
    <section className="ht-hero ht-hero--focused" aria-label={BRAND.name}>
      <div className="ht-hero__stage" data-header-over="light">
        <img className="ht-hero__img" src={HERO_IMAGE} alt="Sumeet Trade Centre at twilight" fetchPriority="high" />
        <div className="ht-hero__scrim" aria-hidden="true" />
        <div className="ht-hero__copy">
          <Kicker tone="dark">Homes & workspaces · Raipur</Kicker>
          <h1 className="ht-display ht-hero__single">A place to live.<br /><em>A space to grow.</em></h1>
          <p className="ht-hero__summary">Discover thoughtfully planned homes and commercial spaces from Sumeet Group.</p>
          <div className="ht-hero__actions">
            {brochure && <a className="ht-pill ht-pill--white" href={brochure.href} download={brochure.filename}><span>Download STC brochure</span><span aria-hidden="true">↓</span></a>}
            <a className="ht-pill ht-pill--ghost" href="#enquire"><span>Book a site visit</span><Arrow /></a>
          </div>
          <p className="ht-hero__caption">Sumeet Trade Centre · Artist’s impression</p>
        </div>
      </div>
    </section>
  )
}

function DeveloperTrust() {
  return (
    <section className="ht-trust" aria-label="About the developer" data-header-over="paper">
      <div className="wrap ht-trust__inner"><div><Kicker>The people behind your address</Kicker><h2>{BRAND.name}</h2><p>{BRAND.legal} · {BRAND.city}</p></div>
        <div className="ht-trust__facts">{GROUP_STATS.slice(0,3).map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div>
      </div>
    </section>
  )
}

/* ============================================================
   The portfolio
   ============================================================ */

function ProjectCard({ image, alt, place, title, note, to, position, index, status }) {
  const inner = (
    <>
      <span className="ht-card__media">
        <img src={image} alt={alt} loading="lazy" style={position ? { objectPosition: position } : undefined} />
        {status ? <span className="ht-card__status">{status}</span> : null}
      </span>

      <span className="ht-card__meta">
        <span className="ht-card__n">{index}</span>
        <span className="ht-card__place">{place}</span>
      </span>

      <span className="ht-display ht-card__title">
        {title}
        {to ? (
          <i className="ht-card__arrow" aria-hidden="true">
            <Arrow size={17} />
          </i>
        ) : null}
      </span>

      <span className="ht-card__note">{note}</span>
    </>
  )

  return to ? (
    <Link to={to} className="ht-card ht-card--link">
      {inner}
    </Link>
  ) : (
    <div className="ht-card">{inner}</div>
  )
}

function Portfolio() {
  return (
    <section className="ht-portfolio" data-header-over="paper">
      <div className="wrap">
        <Reveal className="ht-head">
          <Kicker center>The portfolio</Kicker>
          <h2 className="ht-display ht-head__title">
            Four addresses in <em>Raipur</em>
          </h2>
          <p className="ht-head__lede">
            Two selling now and two already lived in — homes, workspaces and plotted land, all of it inside the city
            that made the group.
          </p>
        </Reveal>

        <div className="ht-portfolio__grid">
          <section className="ht-set">
            <h3 className="ht-group">
              <Icon name="tower" size={19} />
              <span>Now selling</span>
              <em>{String(PROJECTS.length).padStart(2, '0')}</em>
            </h3>
            <div className="ht-set__cards">
              {PROJECTS.map((p, i) => (
                <ProjectCard
                  key={p.slug}
                  index={String(i + 1).padStart(2, '0')}
                  image={p.cover}
                  alt={p.coverAlt}
                  place={p.locality}
                  title={p.name}
                  note={p.blurb}
                  status={STATUS[p.status]}
                  to={`/projects/${p.slug}`}
                />
              ))}
            </div>
          </section>

          <section className="ht-set">
            <h3 className="ht-group">
              <Icon name="seal" size={19} />
              <span>Delivered</span>
              <em>{String(PAST_PROJECTS.length).padStart(2, '0')}</em>
            </h3>
            <div className="ht-set__cards">
              {PAST_PROJECTS.map((p, i) => (
                <ProjectCard
                  key={p.name}
                  index={String(i + 3).padStart(2, '0')}
                  image={p.cover}
                  alt={p.coverAlt}
                  position={p.coverPosition}
                  place={`${p.category} · Raipur`}
                  title={p.name}
                  note={p.note}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   5 · The plaza band
   ============================================================ */

function Residences() {
  const [i, setI] = useState(0)
  const project = PROJECTS[i]
  const step = (d) => setI((n) => (n + d + PROJECTS.length) % PROJECTS.length)

  return (
    <section className="ht-panel" data-header-over="paper">
      <div className="wrap ht-panel__inner">
        <Reveal className="ht-panel__media" key={`m-${project.slug}`}>
          <img src={project.hero} alt={project.heroAlt} loading="lazy" />
        </Reveal>

        <div className="ht-panel__body" key={`b-${project.slug}`} aria-live="polite">
          <Kicker>
            {project.category} · {project.locality}
          </Kicker>

          <h2 className="ht-display ht-panel__title">{project.name}</h2>
          <p className="ht-panel__lede">{project.kicker}.</p>

          <dl className="ht-specs">
            {project.specs.map((s) => (
              <div className="ht-specs__row" key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
            <div className="ht-specs__row">
              <dt>Price</dt>
              <dd>{project.price}</dd>
            </div>
          </dl>

          <ul className="ht-boxes">
            {(PANEL_ICONS[project.slug] || []).map(([icon, label]) => (
              <li className="ht-box" key={label}>
                <Icon name={icon} size={25} />
                <span>{label}</span>
              </li>
            ))}
          </ul>

          <div className="ht-panel__foot">
            <Link to={`/projects/${project.slug}`} className="ht-pill">
              <span>View project</span>
              <Arrow />
            </Link>

            <div className="ht-arrows">
              <button type="button" onClick={() => step(-1)} aria-label="Show the previous project">
                <Chevron dir="left" />
              </button>
              <span className="ht-arrows__count" aria-hidden="true">
                {String(i + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
              </span>
              <button type="button" onClick={() => step(1)} aria-label="Show the next project">
                <Chevron />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* The strip of names. The two live projects are toggles; the two
          delivered ones sit alongside as labels, not controls. */}
      <div className="ht-tabs">
        {PROJECTS.map((p, n) => (
          <button
            key={p.slug}
            type="button"
            aria-pressed={n === i}
            className={`ht-tab${n === i ? ' is-on' : ''}`}
            onClick={() => setI(n)}
          >
            <span className="ht-display">{p.name}</span>
            <span className="ht-tab__place">{p.locality}</span>
          </button>
        ))}
        {PAST_PROJECTS.map((p) => (
          <span className="ht-tab ht-tab--past" key={p.name}>
            <span className="ht-display">{p.name}</span>
            <span className="ht-tab__place">Delivered · {p.category}</span>
          </span>
        ))}
      </div>
    </section>
  )
}

/* ============================================================
   The interactive gallery
   ============================================================ */

function InteractiveGallery() {
  const [category, setCategory] = useState('All spaces')
  const images = GALLERY.map(([src, caption], i) => ({ src, caption, category: i % 2 ? 'Living' : 'Workspaces' }))
  const shown = images.filter((image) => category === 'All spaces' || image.category === category)
  return (
    <section className="ht-gallery" id="gallery" data-header-over="paper">
      <div className="wrap">
        <div className="ht-gallery__head"><div><Kicker>A closer look</Kicker><h2 className="ht-display">See the spaces.<br /><em>Picture your day.</em></h2></div><p>Explore the shared spaces, interiors and amenities. Select an image to open it.</p></div>
        <div className="ht-gallery__filters" aria-label="Filter gallery">{['All spaces', 'Living', 'Workspaces'].map((item) => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div>
        <Gallery images={shown} wideEvery={0} />
        <p className="ht-gallery__note">Artist’s impressions. Final finishes and features are subject to the project specifications.</p>
      </div>
    </section>
  )
}

/* ============================================================
   9 · The enquiry
   ============================================================ */

function Enquiry() {
  return (
    <section className="ht-enquiry ht-enquiry--focused" id="enquire" data-header-over="paper">
      <div className="wrap ht-enquiry__inner">
        <div className="ht-enquiry__head"><Kicker>Let’s make it personal</Kicker><h2 className="ht-display ht-enquiry__title">Your next address<br /><em>starts here.</em></h2><p className="ht-enquiry__lede">Arrange a visit, ask about availability, or talk through the right space for you.</p><a className="ht-enquiry__phone" href={CONTACT.phoneHref}>{CONTACT.phone} ↗</a><p className="ht-enquiry__hours">{CONTACT.hours}</p></div>
        <LeadForm label="Request a site visit" />
      </div>
    </section>
  )
}

/* ============================================================
   The contact rail
   ============================================================ */

/** Phone number as WhatsApp expects it: country code, digits only. */
const WHATSAPP = `https://wa.me/${CONTACT.phoneHref.replace(/\D/g, '')}`

function Rail() {
  return (
    <aside className="ht-rail" aria-label="Contact Sumeet Group">
      <a href={WHATSAPP} target="_blank" rel="noreferrer noopener" aria-label="Message us on WhatsApp">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
          <path
            d="M20 11.7a8 8 0 0 1-11.9 7L4 20l1.4-4A8 8 0 1 1 20 11.7z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M9 8.6c.3-.1.6 0 .8.3l.6 1c.1.3.1.6-.1.8l-.4.4c.4.9 1.1 1.6 2 2l.4-.4c.2-.2.5-.3.8-.1l1 .6c.3.2.4.5.3.8-.2.6-.8 1-1.5 1-2.2-.2-4.2-2.2-4.4-4.4 0-.7.3-1.3 1-1.5z"
            fill="currentColor"
          />
        </svg>
      </a>

      <a className="ht-rail__call" href={CONTACT.phoneHref}>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
          <path
            d="M6.5 4h3l1.2 3.2-1.8 1.4a11 11 0 0 0 5.5 5.5l1.4-1.8L19 13.5v3a2 2 0 0 1-2.2 2A14.5 14.5 0 0 1 4.5 6.2 2 2 0 0 1 6.5 4z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
        <span>Request a callback</span>
      </a>

      <a href={CONTACT.emailHref} aria-label="Email the sales team">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
          <path d="M3.5 5.5h17v13h-17zM3.5 6.5l8.5 6 8.5-6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      </a>
    </aside>
  )
}

/* ============================================================ */

export default function HomeTwo() {
  return (
    <div className="ht">
      <Hero />
      <DeveloperTrust />
      <Portfolio />
      <Residences />
      <InteractiveGallery />
      <Enquiry />
      <Rail />
    </div>
  )
}
