import { Link } from '../lib/router'
import { GROUP_STATS, CONTACT } from '../data/site'
import { PROJECTS } from '../data/projects'
import { Button, Eyebrow, Stat, ArrowRight } from '../components/ui'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/Reveal'

const APPROACH = [
  [
    '01',
    'Bones before beauty',
    'Structures engineered to code and finished as if our own names were on the doorbell — the strength you’ll never see, holding up everything you will.',
  ],
  [
    '02',
    'Addresses that give back',
    'Schools, markets, the expressway, the airport. We buy land for where it sits in a working day, not for how it reads on a map.',
  ],
  [
    '03',
    'Ownership without asterisks',
    'RERA registration, clear titles and paperwork in plain language. Peace of mind is the first amenity.',
  ],
  [
    '04',
    'Planning that leaves room',
    'Low density, generous circulation and real outdoor space. What you don’t build is as considered as what you do.',
  ],
]

export default function Home() {
  const featured = PROJECTS[0]

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="wrap section">
        <div className="hero">
          <Reveal>
            <Eyebrow rule>Real estate · Raipur</Eyebrow>
            <h1 className="sg-display h-hero" style={{ marginTop: 'var(--space-5)' }}>
              Built for the life
              <br />
              you’ve <em>earned</em>.
            </h1>
            <p className="lede" style={{ marginTop: 'var(--space-5)', maxWidth: '36ch' }}>
              Homes and workspaces across Raipur — made with the kind of care you can feel the moment you walk in.
            </p>
            <div className="hero__actions">
              <Link to="/projects" className="sg-btn sg-btn--primary sg-btn--lg">
                <span>Explore projects</span>
              </Link>
              <Button variant="outline" size="lg" href={CONTACT.phoneHref}>
                Book a site visit
              </Button>
            </div>
          </Reveal>

          <Reveal className="hero__media" delay={80}>
            <img src={featured.hero} alt={featured.heroAlt} fetchPriority="high" />
            <span className="media-caption">
              {featured.name} · {featured.locality}
            </span>
          </Reveal>
        </div>
      </section>

      {/* ---------- Numbers ---------- */}
      <section className="section--ink">
        <div className="wrap numbers-band">
          {GROUP_STATS.map((s) => (
            <Stat key={s.label} tone="ondark" value={s.value} label={s.label} sub={s.sub} />
          ))}
        </div>
      </section>

      {/* ---------- Projects ---------- */}
      <section className="wrap section">
        <Reveal className="section-head--split">
          <div className="section-head">
            <Eyebrow rule>Now selling</Eyebrow>
            <h2 className="sg-display h-section">Begin with the right address.</h2>
          </div>
          <Link to="/projects" className="sg-btn sg-btn--ghost sg-btn--md">
            <span>View all</span>
            <span className="sg-btn__icon">
              <ArrowRight />
            </span>
          </Link>
        </Reveal>

        <div className="project-grid">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Approach ---------- */}
      <section className="wrap section">
        <div className="split-intro">
          <Reveal className="section-head">
            <Eyebrow rule>How we build</Eyebrow>
            <h2 className="sg-display h-section">The quiet marks of a serious building.</h2>
          </Reveal>

          <div className="point-grid">
            {APPROACH.map(([n, title, copy], i) => (
              <Reveal key={n} delay={i * 60}>
                <div className="point__n">{n}</div>
                <h3 className="point__t">{title}</h3>
                <p className="point__d">{copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="wrap" style={{ paddingBottom: 'var(--section-y-lg)' }}>
        <Reveal className="cta-band">
          <div className="cta-band__inner">
            <div>
              <h2 className="cta-band__title">Some things, you have to stand inside.</h2>
              <p className="cta-band__copy">
                Walk the floors. Watch the evening light arrive. Bring every question you have — site visits run seven
                days a week.
              </p>
            </div>
            <Link to="/contact" className="sg-btn sg-btn--secondary sg-btn--lg">
              <span>Book a site visit</span>
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
