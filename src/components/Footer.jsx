import { Link } from '../lib/router'
import { BRAND, CONTACT, RERA_PORTAL } from '../data/site'
import { PROJECTS } from '../data/projects'
import BrandLockup from './BrandLockup'

function Column({ title, children }) {
  return (
    <div>
      <div className="footer-col__title">{title}</div>
      <div className="footer-col__list">{children}</div>
    </div>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="site-footer__grid">
          <div>
            <BrandLockup reversed />
            <p className="site-footer__tagline">{BRAND.promise}</p>
          </div>

          <Column title="Projects">
            {PROJECTS.map((p) => (
              <Link key={p.slug} to={`/projects/${p.slug}`} className="footer-link">
                {p.name}
              </Link>
            ))}
            <Link to="/projects" className="footer-link">
              All projects
            </Link>
          </Column>

          <Column title="Company">
            <Link to="/about" className="footer-link">
              About us
            </Link>
            <Link to="/about" className="footer-link">
              Track record
            </Link>
            <Link to="/contact" className="footer-link">
              Contact
            </Link>
            <a href={RERA_PORTAL} className="footer-link" target="_blank" rel="noreferrer noopener">
              RERA Chhattisgarh
            </a>
          </Column>

          <Column title="Get in touch">
            <a href={CONTACT.phoneHref} className="footer-link">
              {CONTACT.phone}
            </a>
            <a href={CONTACT.emailHref} className="footer-link">
              {CONTACT.email}
            </a>
            <a href={CONTACT.websiteHref} className="footer-link" target="_blank" rel="noreferrer noopener">
              {CONTACT.website}
            </a>
            <a href={CONTACT.office.mapHref} className="footer-link" target="_blank" rel="noreferrer noopener">
              {CONTACT.office.lines.join(', ')}
            </a>
          </Column>
        </div>

        <div className="site-footer__bottom">
          <span>
            {BRAND.legal} · {CONTACT.office.lines.join(', ')}
          </span>
          <span>
            © {year} {BRAND.name} · RERA registered
          </span>
        </div>
      </div>
    </footer>
  )
}
