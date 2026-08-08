import { Link, useRouter } from '../lib/router'
import { PROJECTS, findProject } from '../data/projects'
import { Badge, Button, Card, Eyebrow, Tag, ArrowRight } from '../components/ui'
import EnquiryForm from '../components/EnquiryForm'
import Gallery from '../components/Gallery'
import PlanViewer from '../components/PlanViewer'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/Reveal'
import NotFound from './NotFound'

const STATUS_TONE = { ready: 'success', construction: 'warning', upcoming: 'gold', sold: 'neutral' }
const STATUS_TEXT = {
  ready: 'Ready to move',
  construction: 'Under construction',
  upcoming: 'New launch',
  sold: 'Sold out',
}

/** Titles carry one italic gold word, written as <em> in the data. */
const RichTitle = ({ html, className }) => (
  <h2 className={`sg-display ${className}`} dangerouslySetInnerHTML={{ __html: html }} />
)

export default function ProjectDetail({ slug }) {
  const { navigate } = useRouter()
  const project = findProject(slug)
  if (!project) return <NotFound />

  const others = PROJECTS.filter((p) => p.slug !== project.slug)
  // "Price on request" is words, not a figure — it shouldn't wear the mono face.
  const hasFigure = /\d/.test(project.price)

  return (
    <>
      {/* ---------- Breadcrumb + hero ---------- */}
      <div className="wrap" style={{ paddingTop: 'var(--space-5)' }}>
        <button className="crumb" onClick={() => navigate('/projects')}>
          ← All projects
        </button>
      </div>

      <section className="wrap" style={{ paddingTop: 'var(--space-4)' }}>
        <div className="project-hero">
          <img src={project.hero} alt={project.heroAlt} fetchPriority="high" />
          <span className="media-caption" style={{ zIndex: 1 }}>
            {project.name} · {project.locality}
          </span>
        </div>
      </section>

      {/* ---------- Title ---------- */}
      <section className="wrap" style={{ paddingTop: 'var(--space-7)' }}>
        <div className="project-title-row">
          <div>
            <div className="badge-row" style={{ marginBottom: 'var(--space-3)' }}>
              <Badge tone={STATUS_TONE[project.status]} dot={project.status === 'ready'}>
                {STATUS_TEXT[project.status]}
              </Badge>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-gold-deep)',
                }}
              >
                {project.locality}
              </span>
            </div>
            <h1 className="sg-display h-page">{project.name}</h1>
            {project.kicker ? (
              <p style={{ marginTop: 10, color: 'var(--text-gold)', fontSize: 15, fontWeight: 500 }}>
                {project.kicker}
              </p>
            ) : null}
            <p className="lede" style={{ marginTop: 'var(--space-4)', maxWidth: '52ch' }}>
              {project.tagline}
            </p>
          </div>

          <div className="project-price">
            <div className="project-price__label">{hasFigure ? 'Starting' : 'Pricing'}</div>
            <div className={`project-price__amt${hasFigure ? '' : ' project-price__amt--text'}`}>
              {project.price}
            </div>
            <div className="project-price__unit">{project.priceUnit}</div>
          </div>
        </div>
      </section>

      {/* ---------- Body + sticky enquiry ---------- */}
      <section className="wrap" style={{ paddingTop: 'var(--space-7)' }}>
        <div className="project-body">
          <div>
            <div className="spec-strip">
              {project.specs.map((s) => (
                <div className="spec-cell" key={s.label}>
                  <div className="spec-cell__v">{s.value}</div>
                  <div className="spec-cell__l">{s.label}</div>
                </div>
              ))}
            </div>

            {project.quote ? (
              <Reveal className="quote" style={{ marginTop: 'var(--space-8)' }}>
                <p className="quote__text">“{project.quote.text}”</p>
                <p className="quote__by">{project.quote.by}</p>
              </Reveal>
            ) : null}

            {/* Highlights */}
            <div style={{ marginTop: 'var(--space-8)' }}>
              <Eyebrow rule>Why this project</Eyebrow>
              <div style={{ marginTop: 'var(--space-5)' }}>
                {project.highlights.map(([title, copy]) => (
                  <div className="highlight-row" key={title}>
                    <div className="highlight-row__t">{title}</div>
                    <div className="highlight-row__d">{copy}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div style={{ marginTop: 'var(--space-9)' }}>
              <Eyebrow rule>Amenities</Eyebrow>
              <div style={{ marginTop: 'var(--space-5)' }}>
                {project.amenityGroups.map((group) => (
                  <div className="amenity-group" key={group.title}>
                    <div className="amenity-group__title">{group.title}</div>
                    <div className="amenity-list">
                      {group.items.map((item) => (
                        <Tag key={item}>{item}</Tag>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky enquiry */}
          <div className="enquiry-rail">
            <Card padding="lg" facet>
              <h2 className="sg-display" style={{ fontSize: '1.5rem' }}>
                Book a visit
              </h2>
              <p style={{ fontSize: 14, color: 'var(--text-soft)', margin: '4px 0 20px' }}>
                See {project.name} in person. We’ll arrange a time that suits you.
              </p>
              <EnquiryForm project={project} compact />
            </Card>

            {project.brochure ? (
              <Button
                variant="outline"
                size="lg"
                fullWidth
                href={project.brochure.href}
                download={project.brochure.filename}
                style={{ marginTop: 'var(--space-4)' }}
              >
                Download brochure
              </Button>
            ) : null}
          </div>
        </div>
      </section>

      {/* ---------- Concept (BOHK) ---------- */}
      {project.concept ? (
        <section className="section section--sunken" style={{ marginTop: 'var(--section-y)' }}>
          <div className="wrap">
            <Reveal className="section-head" style={{ marginBottom: 'var(--space-7)' }}>
              <Eyebrow rule>{project.concept.eyebrow}</Eyebrow>
              <RichTitle html={project.concept.title} className="h-section" />
              <p className="lede">{project.concept.lede}</p>
            </Reveal>

            <div className="sg-card sg-card--pad-none" style={{ overflow: 'hidden' }}>
              {project.concept.pairs.map(([inside, outside], i) => (
                <div
                  key={inside}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto 1fr',
                    alignItems: 'center',
                    gap: 'var(--space-4)',
                    padding: 'var(--space-4) clamp(1rem, 3vw, 1.75rem)',
                    borderTop: i ? '1px solid var(--color-line)' : 0,
                  }}
                >
                  <span style={{ fontSize: 14.5, color: 'var(--text-soft)' }}>{inside}</span>
                  <span
                    aria-hidden="true"
                    style={{ color: 'var(--color-gold)', display: 'inline-flex', width: 18, height: 18 }}
                  >
                    <ArrowRight />
                  </span>
                  <span style={{ fontSize: 14.5, color: 'var(--text-strong)', fontWeight: 600 }}>{outside}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ---------- Connectivity ---------- */}
      {project.connectivity ? (
        <section className="wrap section">
          <div className="split-intro">
            <Reveal className="section-head">
              <Eyebrow rule>{project.connectivity.eyebrow}</Eyebrow>
              <RichTitle html={project.connectivity.title} className="h-section" />
              <p className="lede">{project.connectivity.lede}</p>
            </Reveal>

            <Reveal>
              <div className="connect-list">
                {project.connectivity.places.map((p) => (
                  <div className="connect-row" key={p.place}>
                    <span className="connect-row__place">{p.place}</span>
                    <span className="connect-row__dist">{p.dist}</span>
                  </div>
                ))}
              </div>
              {project.connectivity.approx ? (
                <p className="rera-note" style={{ marginTop: 'var(--space-4)' }}>
                  Distances are approximate road distances.
                </p>
              ) : null}
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* ---------- Gallery ---------- */}
      <section className="wrap section">
        <Reveal className="section-head" style={{ marginBottom: 'var(--space-6)' }}>
          <Eyebrow rule>Gallery</Eyebrow>
          <h2 className="sg-display h-section">See it before you see it.</h2>
        </Reveal>
        <Gallery images={project.gallery} />
      </section>

      {/* ---------- Plans ---------- */}
      {project.plans?.length ? (
        <section className="section section--sunken">
          <div className="wrap">
            <Reveal className="section-head" style={{ marginBottom: 'var(--space-6)' }}>
              <Eyebrow rule>Plans</Eyebrow>
              <h2 className="sg-display h-section">Every square foot accounted for.</h2>
              <p className="lede">Drag sideways to read a plan in full, or tap to open it large.</p>
            </Reveal>

            <PlanViewer plans={project.plans} />
          </div>
        </section>
      ) : null}

      {/* ---------- Specification ---------- */}
      {project.specification ? (
        <section className="wrap section">
          <div className="split-intro">
            <Reveal className="section-head">
              <Eyebrow rule>Specification</Eyebrow>
              <h2 className="sg-display h-section">
                Quality that stays <em>consistent</em>.
              </h2>
              <p className="lede">What goes into every home, written down rather than implied.</p>
            </Reveal>

            <Reveal className="spec-table">
              {project.specification.map((row) => (
                <div className="spec-table__row" key={row.k}>
                  <div className="spec-table__k">{row.k}</div>
                  <div className="spec-table__v">
                    <ul>
                      {row.v.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* ---------- Partners + RERA ---------- */}
      <section className="wrap" style={{ paddingBottom: 'var(--section-y)' }}>
        <div className="divider" style={{ marginBottom: 'var(--space-6)' }} />
        <div className="split-intro">
          <div>
            {project.partners ? (
              <div className="stack stack-5">
                {project.partners.map(([role, note]) => (
                  <div key={role}>
                    <div className="amenity-group__title" style={{ marginBottom: 6 }}>
                      {role}
                    </div>
                    <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--text-soft)' }}>{note}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div>
            <p className="rera-note">
              {project.rera?.number ? (
                <>
                  RERA No.: {project.rera.number} ·{' '}
                  <a href={project.rera.portal} target="_blank" rel="noreferrer noopener">
                    rera.cgstate.gov.in
                  </a>
                  <br />
                </>
              ) : null}
              Site address: {project.siteAddress}
              <br />
              All specifications, plans and images are indicative and subject to approval by the authorities.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- More ---------- */}
      <section className="section section--sunken">
        <div className="wrap">
          <Reveal className="section-head" style={{ marginBottom: 'var(--space-6)' }}>
            <Eyebrow rule>More from Sumeet Group</Eyebrow>
          </Reveal>
          <div className="project-grid">
            {others.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
            <Reveal className="sg-card sg-card--pad-lg" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'var(--space-4)' }}>
              <h3 className="sg-display h-card">Not sure which one fits?</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--text-soft)' }}>
                Tell us how you live or how you work, and we’ll point you at the right one, even if it isn’t ours yet.
              </p>
              <Link to="/contact" className="sg-btn sg-btn--outline sg-btn--md" style={{ alignSelf: 'flex-start' }}>
                <span>Talk to our team</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
