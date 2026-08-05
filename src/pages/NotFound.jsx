import { Link } from '../lib/router'
import { Eyebrow } from '../components/ui'

export default function NotFound() {
  return (
    <section className="wrap section section--lg">
      <div className="section-head" style={{ maxWidth: '40rem' }}>
        <Eyebrow rule>404</Eyebrow>
        <h1 className="sg-display h-page">This address doesn’t exist yet.</h1>
        <p className="lede">
          The page you were looking for has moved or was never built. Our projects are all here.
        </p>
        <div className="row" style={{ marginTop: 'var(--space-5)' }}>
          <Link to="/projects" className="sg-btn sg-btn--primary sg-btn--lg">
            <span>View projects</span>
          </Link>
          <Link to="/" className="sg-btn sg-btn--outline sg-btn--lg">
            <span>Back home</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
