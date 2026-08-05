import { Link } from '../lib/router'
import { GROUP_STATS, BRAND } from '../data/site'
import { PROJECTS, PAST_PROJECTS } from '../data/projects'
import { Eyebrow, Stat } from '../components/ui'
import Reveal from '../components/Reveal'

const VALUES = [
  [
    'Quality you can stand on',
    'Structures engineered to code, materials chosen as if our own names were on the doorbell. The parts nobody photographs get the same attention as the parts everybody does.',
  ],
  [
    'Transparent paperwork',
    'RERA registration and clear titles, explained plainly before you commit a single rupee. If a clause needs a lawyer to decode, it needs rewriting.',
  ],
  [
    'One promise, one person',
    'A single point of contact from your first site visit through handover — and long after the keys change hands.',
  ],
  [
    'Of this city',
    'We live and build in Raipur. Our reputation walks the same streets your family does, which is the only accountability that has ever really worked.',
  ],
]

export default function About() {
  return (
    <>
      <section className="wrap section">
        <Reveal className="section-head" style={{ maxWidth: '48rem' }}>
          <Eyebrow rule>About {BRAND.name}</Eyebrow>
          <h1 className="sg-display h-page">
            Build spaces that add <em>value</em> to how people live and work.
          </h1>
          <p className="lede" style={{ fontSize: '1.1875rem' }}>
            {BRAND.legal} is a Raipur-based developer with a foothold across Chhattisgarh’s property landscape — known
            for quality construction, modern amenities, and locations chosen for how they serve a working day rather
            than how they read on a map.
          </p>
        </Reveal>
      </section>

      <section className="section--ink">
        <div className="wrap numbers-band">
          {GROUP_STATS.map((s) => (
            <Stat key={s.label} tone="ondark" value={s.value} label={s.label} sub={s.sub} />
          ))}
        </div>
      </section>

      {/* ---------- Developer's note ---------- */}
      <section className="wrap section">
        <div className="split-intro">
          <Reveal className="section-head">
            <Eyebrow rule>Developer’s note</Eyebrow>
            <h2 className="sg-display h-section">What we’ve learned over time, built into every home here.</h2>
          </Reveal>

          <Reveal className="quote">
            <p className="quote__text">
              “Our journey has always been guided by a simple belief — build spaces that truly add value to the way
              people live and work. With Sumeet Urban Nest we continue that approach while taking a step forward in
              planning. The BOHK home lets us create spaces that are more usable, more flexible and better aligned with
              modern living.”
            </p>
            <p className="quote__by">Nameet Kankariya · Managing Director, Sumeet Infracon</p>
          </Reveal>
        </div>
      </section>

      {/* ---------- Values ---------- */}
      <section className="section section--sunken">
        <div className="wrap split-intro">
          <Reveal className="section-head">
            <Eyebrow rule>What we hold to</Eyebrow>
            <h2 className="sg-display h-section">Integrity, then everything else.</h2>
          </Reveal>

          <div className="point-grid">
            {VALUES.map(([title, copy], i) => (
              <Reveal key={title} delay={i * 60}>
                <h3 className="point__t" style={{ marginTop: 0 }}>
                  {title}
                </h3>
                <p className="point__d">{copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Track record ---------- */}
      <section className="wrap section">
        <Reveal className="section-head" style={{ marginBottom: 'var(--space-6)' }}>
          <Eyebrow rule>Track record</Eyebrow>
          <h2 className="sg-display h-section">Four projects, one standard.</h2>
        </Reveal>

        <div className="timeline">
          {PAST_PROJECTS.map((p) => (
            <div className="timeline__row" key={p.name}>
              <div className="timeline__year">Delivered</div>
              <div>
                <div className="timeline__t">{p.name}</div>
                <p className="timeline__d">{p.note}</p>
              </div>
            </div>
          ))}

          {PROJECTS.map((p) => (
            <div className="timeline__row" key={p.slug}>
              <div className="timeline__year">
                {p.status === 'upcoming' ? 'New launch' : 'Under construction'}
              </div>
              <div>
                <div className="timeline__t">
                  <Link to={`/projects/${p.slug}`} style={{ color: 'inherit' }}>
                    {p.name}
                  </Link>
                </div>
                <p className="timeline__d">
                  {p.locality} · {p.blurb}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 'var(--space-8)' }}>
          <Link to="/contact" className="sg-btn sg-btn--primary sg-btn--lg">
            <span>Talk to our team</span>
          </Link>
        </div>
      </section>
    </>
  )
}
