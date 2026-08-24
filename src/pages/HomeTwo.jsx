import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from '../lib/router'
import { gsap, prefersReducedMotion } from '../lib/scroll'
import { BRAND, CONTACT, GROUP_STATS } from '../data/site'
import { PROJECTS, PAST_PROJECTS } from '../data/projects'
import Reveal from '../components/Reveal'
import WordReveal from '../components/WordReveal'
import './HomeTwo.css'

/**
 * Home — alternate art direction ("home two").
 *
 * A second treatment of the same content, cut to the editorial-luxury
 * pattern the client shared (emaratrealty.com): a pinned photographic hero
 * whose headline changes in acts, cream and ink bands alternating full
 * width, display serif set very large and centred, wide-tracked mono labels
 * over hairlines, ring and pill controls, and a fixed contact rail down the
 * right edge.
 *
 * The palette is untouched — every colour here resolves to a token from
 * styles/tokens.css. Where the reference uses forest green and cream, this
 * uses the brand's own ink (#191A1F / #23242A) and sand (#F6F3EC), with the
 * logo gold (#DDAD67) doing the accent work.
 *
 * The live home page (pages/Home.jsx) is not touched by any of this: the
 * two pages share the header, the footer and the tokens, and nothing else.
 * All styling lives in HomeTwo.css behind the `.ht` namespace.
 */

/* ---------- Copy that belongs to this treatment only -------- */

/** The hero headline, in three acts, changing as the scene is scrolled. */
const ACTS = [
  ['Building spaces that', 'inspire better living'],
  ['Designed with a', 'quality that lasts'],
  ['Creating value for', 'years to come'],
]

/** The medallion strip laid over the plaza band. */
const MARKS = [
  ['connect', 'Seamless connectivity', 'Pachpedi Naka'],
  ['seal', 'RERA registered', 'Clear title'],
  ['leaf', 'Room to breathe', 'Low density'],
]

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

/**
 * One photograph held still under the reader while three headlines take
 * turns over it. The section is three viewports tall; the stage inside is
 * sticky, and a single scrubbed timeline drifts the image, hands the frame
 * from one act to the next, and moves the numeral that says which act you
 * are on.
 *
 * The acts are stacked in one grid cell rather than absolutely positioned,
 * so the tallest of them sets the height and a line that wraps on a narrow
 * phone cannot spill over the scroll cue.
 */
function HeroActs() {
  const root = useRef(null)

  useLayoutEffect(() => {
    // Reduced motion keeps act one, which is the CSS resting state.
    if (prefersReducedMotion()) return

    const ctx = gsap.context((self) => {
      const q = self.selector
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: 0.8 },
      })

      // The scene: one long, slow push in. Nothing else moves.
      tl.fromTo(q('.ht-hero__img'), { scale: 1.05, yPercent: 0 }, { scale: 1.22, yPercent: -4, duration: 1 }, 0)

      // The acts. Each rises in, holds, and leaves upward, so at any scroll
      // position exactly one line is at full strength.
      const acts = q('.ht-hero__act')
      const nums = q('.ht-hero__n')

      acts.forEach((act, i) => {
        const enter = 0.3 * i
        if (i > 0) {
          tl.fromTo(act, { opacity: 0, yPercent: 34 }, { opacity: 1, yPercent: 0, duration: 0.1 }, enter)
          tl.to(nums[i], { opacity: 1, duration: 0.1 }, enter)
          tl.to(nums[i - 1], { opacity: 0.28, duration: 0.1 }, enter)
        }
        if (i < acts.length - 1) tl.to(act, { opacity: 0, yPercent: -34, duration: 0.1 }, enter + 0.22)
      })

      tl.to(q('.ht-hero__cue'), { opacity: 0, duration: 0.08 }, 0.06)
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section className="ht-hero" ref={root} aria-label={BRAND.name}>
      <div className="ht-hero__stage" data-header-over="light">
        <img className="ht-hero__img" src={HERO_IMAGE} alt="Sumeet Trade Centre at twilight" fetchPriority="high" />
        <div className="ht-hero__scrim" aria-hidden="true" />
        <div className="ht-hero__vignette" aria-hidden="true" />

        <div className="ht-hero__copy">
          <Kicker tone="dark">{BRAND.tagline}</Kicker>

          <h1 className="ht-hero__acts">
            {ACTS.map(([a, b]) => (
              <span className="ht-hero__act" key={a}>
                <span>{a}</span>
                <em>{b}</em>
              </span>
            ))}
          </h1>

          <div className="ht-hero__foot">
            <Link to="/projects" className="ht-pill ht-pill--ghost">
              <span>Explore projects</span>
              <Arrow />
            </Link>

            <ol className="ht-hero__index" aria-hidden="true">
              {ACTS.map(([a], i) => (
                <li className="ht-hero__n" key={a}>
                  {String(i + 1).padStart(2, '0')}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="ht-hero__cue" aria-hidden="true">
          <span>Scroll</span>
          <i />
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   2 · The statement
   ============================================================ */

function Statement() {
  return (
    <section className="ht-statement" data-header-over="paper">
      <div className="wrap">
        <Reveal>
          <Kicker center>{BRAND.name}</Kicker>
        </Reveal>

        <WordReveal
          as="h2"
          className="ht-display ht-statement__line"
          text="More than a building. An address that keeps *its* *word.*"
        />

        <Reveal className="ht-statement__lede" delay={80}>
          <p>
            Sumeet Group has built in Raipur long enough to know that an address is made of small decisions — the ones
            nobody sees, taken years before anyone moves in.
          </p>
        </Reveal>
      </div>

      <Reveal className="ht-statement__media">
        <img
          src="/Assets/Sumeet Urban Nest (SUN)/renders/entrance-arrival.webp"
          alt="The arrival court at Sumeet Urban Nest at dusk"
          loading="lazy"
        />
      </Reveal>

      <div className="wrap ht-figures">
        {GROUP_STATS.map((s, i) => (
          <Reveal className="ht-figure" key={s.label} delay={i * 70}>
            <span className="ht-figure__v">{s.value}</span>
            <span className="ht-figure__l">{s.label}</span>
            {s.sub ? <span className="ht-figure__s">{s.sub}</span> : null}
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ============================================================
   3 · The ink band
   ============================================================ */

function InkBand() {
  return (
    <section className="ht-ink" data-header-over="light">
      <div className="ht-ink__facets" aria-hidden="true" />
      <div className="wrap ht-ink__body">
        <Reveal>
          <Kicker tone="dark" center>
            How we build
          </Kicker>
          <h2 className="ht-display ht-ink__title">
            Quality, <em>grounded.</em>
          </h2>
          <p className="ht-ink__lede">
            Bones before beauty. Addresses that give back. Ownership without asterisks. Four principles, held to on
            every site we have ever opened.
          </p>
        </Reveal>

        <Reveal delay={110}>
          <Link to="/about" className="ht-ring">
            <span>Our story</span>
            <Arrow size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

/* ============================================================
   4 · The portfolio index
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

function PlazaBand() {
  return (
    <section className="ht-band" data-header-over="light">
      <img
        className="ht-band__img"
        src="/Assets/3D Images/VIEW_006_FRONT_PLAZA_DUSK_2025.01.15_HIRES_FINAL.webp"
        alt="The front plaza at Sumeet Trade Centre at dusk"
        loading="lazy"
      />
      <div className="ht-band__tint" aria-hidden="true" />

      <div className="wrap ht-band__body">
        <Reveal>
          <Kicker tone="dark" center>
            Pachpedi Naka
          </Kicker>
          <h2 className="ht-display ht-band__title">
            Where the working day
            <em>finds its address</em>
          </h2>
        </Reveal>

        <div className="ht-marks">
          {MARKS.map(([icon, title, sub], i) => (
            <Reveal className="ht-mark" key={title} delay={i * 110}>
              <span className="ht-mark__ring">
                <Icon name={icon} size={25} />
              </span>
              <span className="ht-mark__text">
                <span className="ht-display ht-mark__title">{title}</span>
                <span className="ht-mark__sub">{sub}</span>
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   6 · The residence panel
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
   7 · The interior band
   ============================================================ */

function InteriorBand() {
  return (
    <section className="ht-interior" data-header-over="light">
      <img
        className="ht-interior__img"
        src="/Assets/Sumeet Urban Nest (SUN)/renders/living-room.webp"
        alt="A living room at Sumeet Urban Nest"
        loading="lazy"
      />
      <div className="ht-interior__scrim" aria-hidden="true" />

      <div className="wrap ht-interior__body">
        <Reveal>
          <h2 className="ht-display ht-interior__title">Built the way you always pictured it</h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="ht-display ht-interior__word">
            <em>Finished.</em>
          </p>
          <p className="ht-interior__lede">
            Light where you want it, air that moves, and the structural work done properly underneath — nothing
            missing, nothing quietly compromised.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ============================================================
   8 · The gallery marquee
   ============================================================ */

function Marquee() {
  return (
    <section className="ht-marquee" data-header-over="paper" aria-label="Renders from across the portfolio">
      {/* Two identical runs: the second covers the seam while the first
          loops back to the start. */}
      <div className="ht-marquee__track">
        {[0, 1].map((copy) => (
          <div className="ht-marquee__run" key={copy} aria-hidden={copy === 1 ? 'true' : undefined}>
            {GALLERY.map(([src, alt]) => (
              <figure className="ht-marquee__cell" key={`${copy}-${src}`}>
                <img src={src} alt={copy === 1 ? '' : alt} loading="lazy" />
              </figure>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

/* ============================================================
   9 · The enquiry
   ============================================================ */

const ENQUIRY_OPTIONS = [...PROJECTS.map((p) => p.name), 'Not sure yet']

/**
 * There is no backend on this site yet, so the form confirms client-side
 * and says plainly what happens next — the same contract as
 * components/EnquiryForm. Wire the submit to the CRM before launch.
 */
function Enquiry() {
  const [sent, setSent] = useState(false)
  const [interest, setInterest] = useState('')

  return (
    <section className="ht-enquiry" id="enquire" data-header-over="paper">
      <div className="wrap ht-enquiry__inner">
        <Reveal className="ht-enquiry__head">
          <span className="ht-script">Get in touch</span>
          <h2 className="ht-display ht-enquiry__title">
            Ready to find your <em>address?</em>
          </h2>
          <p className="ht-enquiry__lede">
            Leave your details and someone from the sales team will call you within one working day.
          </p>
        </Reveal>

        {sent ? (
          <div className="ht-done" role="status">
            <span className="ht-done__tick" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
                <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="ht-display">Thank you.</span>
            <p>We have your details. Expect a call within one working day — once, then it is up to you.</p>
          </div>
        ) : (
          <form
            className="ht-form"
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
            }}
          >
            <div className="ht-field">
              <input id="ht-name" name="name" type="text" placeholder=" " autoComplete="name" required />
              <label htmlFor="ht-name">
                Your name <span className="ht-req">*</span>
              </label>
            </div>

            <div className="ht-field">
              <input
                id="ht-phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                pattern="[0-9]{10}"
                placeholder=" "
                autoComplete="tel"
                aria-describedby="ht-phone-hint"
                required
              />
              <label htmlFor="ht-phone">
                Phone <span className="ht-req">*</span>
              </label>
              <span className="ht-hint" id="ht-phone-hint">
                10 digits, no country code
              </span>
            </div>

            <div className="ht-field">
              <input id="ht-email" name="email" type="email" placeholder=" " autoComplete="email" />
              <label htmlFor="ht-email">Email address</label>
            </div>

            <div className="ht-field ht-field--select">
              <select
                id="ht-project"
                name="project"
                value={interest}
                data-empty={interest === ''}
                onChange={(e) => setInterest(e.target.value)}
              >
                <option value="" disabled />
                {ENQUIRY_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              <label htmlFor="ht-project">Interested in</label>
              <span className="ht-field__chev" aria-hidden="true">
                <Chevron />
              </span>
            </div>

            <div className="ht-field ht-field--wide">
              <input id="ht-note" name="message" type="text" placeholder=" " />
              <label htmlFor="ht-note">Anything you would like us to know</label>
            </div>

            <button className="ht-pill ht-form__send" type="submit">
              <span>Send</span>
              <Arrow />
            </button>

            <p className="ht-form__fine">No spam. Your details stay with the Sumeet sales team.</p>
          </form>
        )}
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
      <HeroActs />
      <Statement />
      <InkBand />
      <Portfolio />
      <PlazaBand />
      <Residences />
      <InteriorBand />
      <Marquee />
      <Enquiry />
      <Rail />
    </div>
  )
}
