import { CONTACT, BRAND } from '../data/site'
import { PROJECTS } from '../data/projects'
import { Card, Eyebrow } from '../components/ui'
import EnquiryForm from '../components/EnquiryForm'
import Reveal from '../components/Reveal'

export default function Contact() {
  return (
    <>
      <section className="wrap section">
        <div className="contact-grid">
          <Reveal>
            <Eyebrow rule>Visit us</Eyebrow>
            <h1 className="sg-display h-page" style={{ marginTop: 'var(--space-4)' }}>
              Let’s find your <em>address</em>.
            </h1>
            <p className="lede" style={{ marginTop: 'var(--space-4)', maxWidth: '44ch' }}>
              Come for a coffee at the sales office, or leave your number — we’ll plan a visit around your day, not
              ours. Seven days a week.
            </p>

            <div className="stack stack-5" style={{ marginTop: 'var(--space-8)' }}>
              <div className="contact-row">
                <div className="contact-row__k">{CONTACT.office.label}</div>
                <div className="contact-row__v">
                  <a href={CONTACT.office.mapHref} target="_blank" rel="noreferrer noopener">
                    {CONTACT.office.lines.join('\n')}
                  </a>
                </div>
              </div>

              <div className="contact-row">
                <div className="contact-row__k">Phone</div>
                <div className="contact-row__v">
                  <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
                  {'\n'}
                  <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>{CONTACT.hours}</span>
                </div>
              </div>

              <div className="contact-row">
                <div className="contact-row__k">Email</div>
                <div className="contact-row__v">
                  <a href={CONTACT.emailHref}>{CONTACT.email}</a>
                </div>
              </div>

              <div className="contact-row">
                <div className="contact-row__k">Sites</div>
                <div className="contact-row__v">
                  {PROJECTS.map((p) => (
                    <span key={p.slug} style={{ display: 'block', marginBottom: 6 }}>
                      <strong style={{ fontWeight: 600 }}>{p.shortName}</strong> — {p.siteAddress}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="rera-note" style={{ marginTop: 'var(--space-8)' }}>
              {BRAND.legal} · All projects RERA registered with the Chhattisgarh authority.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <Card padding="lg" facet>
              <EnquiryForm />
            </Card>
          </Reveal>
        </div>
      </section>
    </>
  )
}
