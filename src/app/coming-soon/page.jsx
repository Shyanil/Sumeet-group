import LeadForm from '../../components/LeadForm'
import { LOGO, BRAND } from '../../data/site'
import './teaser.css'

export const dynamic = 'force-dynamic'
const title = 'New real estate launch coming soon · Sumeet Group'
const description = 'Sumeet Group is preparing to unveil a new real estate project. Register your interest to receive the official launch announcement and project details.'
export const metadata = {
  title,
  description,
  robots: { index: false, follow: false },
  alternates: { canonical: '/coming-soon' },
  openGraph: { title, description, url: '/coming-soon', images: [] },
  twitter: { card: 'summary', title, description, images: [] },
}

const updates = [
  ['The project reveal', 'Discover the project name and the vision behind it.'],
  ['The details that matter', 'Receive the location and project information at the official launch.'],
  ['A conversation with our team', 'Ask questions and explore the next steps once the project is announced.'],
]

export default function ComingSoon() {
  return (
    <div className="teaser">
      <a className="skip-link" href="#teaser-main">Skip to content</a>
      <header className="teaser-header">
        <a className="teaser-brand" href="#" aria-label="Sumeet Group launch page"><img src={LOGO.mark} alt="" width="46" height="46" /><span>SUMEET GROUP<small>Considered spaces. Lasting value.</small></span></a>
        <nav aria-label="Launch page"><a className="teaser-nav-about" href="#the-launch">The launch</a><a className="teaser-nav-register" href="#register">Register interest <span aria-hidden="true">↗</span></a></nav>
      </header>
      <main id="teaser-main">
        <section className="teaser-hero" aria-labelledby="teaser-title">
          <img className="teaser-hero-image" src="/Assets/Teaser/sumeet-hero.webp" alt="Sumeet Group architectural project at twilight" width="1536" height="1024" fetchPriority="high" />
          <div className="teaser-hero-shade" />
          <div className="teaser-hero-copy">
            <span className="teaser-eyebrow teaser-eyebrow--light"><i /> A NEW REAL ESTATE LAUNCH</span>
            <h1 id="teaser-title"><span className="teaser-heading-line">A new address.</span><br /><em>A new possibility.</em></h1>
            <p>Sumeet Group is preparing to unveil a new real estate project. Register to receive the official announcement and discover what’s coming.</p>
            <div className="teaser-hero-actions"><a className="teaser-cta" href="#register">Register your interest <span aria-hidden="true">↗</span></a><a className="teaser-text-link" href="#the-launch">Explore what’s next <span aria-hidden="true">↓</span></a></div>
            <span className="teaser-hero-note">Coming soon. Full details at the official launch.</span>
          </div>
          <div className="teaser-hero-bottom"><span>SUMEET GROUP <i /> THE NEXT ADDRESS</span><span>AI concept imagery · Not a project render</span></div>
        </section>
        <div className="teaser-launch-strip"><span>From Sumeet Group</span><strong>A new real estate project. An invitation to discover it first.</strong><a href="#register">Join the launch list ↗</a></div>
        <section id="the-launch" className="teaser-intro" aria-labelledby="launch-title">
          <div className="teaser-intro-visual"><img src="/Assets/Teaser/sumeet-arrival.webp" alt="Sumeet Group arrival court" width="900" height="1350" loading="lazy" /><div className="teaser-image-stamp"><span>THOUGHTFULLY<br />IMAGINED.</span><span aria-hidden="true">↗</span></div><p>Sumeet Group portfolio image · Upcoming project details remain confidential</p></div>
          <div className="teaser-intro-copy"><span className="teaser-eyebrow">01 / THE UPCOMING LAUNCH</span><h2 id="launch-title">Real estate.<br /><em>With a new perspective.</em></h2><p className="teaser-intro-lede">A new project from {BRAND.name} is on its way. This is your invitation to stay informed before the full reveal.</p><p>We’re keeping the specifics for the official announcement. Join the launch list for the information you’ll need to take a closer look.</p>
            <div className="teaser-updates">{updates.map(([heading, copy], i) => <div key={heading}><span>0{i + 1}</span><div><h3>{heading}</h3><p>{copy}</p></div></div>)}</div>
            <div className="teaser-developer"><img src={LOGO.mark} alt="" width="38" height="38" /><div><strong>{BRAND.name}</strong><span>{BRAND.legal}</span></div></div>
          </div>
        </section>
        <section id="register" className="teaser-register" aria-labelledby="register-title">
          <div className="teaser-register-story"><img src="/Assets/Teaser/sumeet-courtyard.webp" alt="" width="1536" height="1024" loading="lazy" /><div className="teaser-register-copy"><span className="teaser-eyebrow teaser-eyebrow--light">02 / YOUR INVITATION</span><h2 id="register-title">Be first<br /><em>to hear the news.</em></h2><p>Register for the official project reveal.<br />We’ll be in touch when the launch is announced.</p><span className="teaser-register-foot">A new address, from Sumeet Group.</span></div></div>
          <div className="teaser-form-card"><span className="teaser-form-kicker">REGISTER FOR LAUNCH UPDATES</span><h3>Let’s keep you informed.</h3><p className="teaser-form-intro">Share your details to hear from our team.</p><LeadForm source="coming-soon" intent="launch" label="Register my interest" /></div>
        </section>
      </main>
      <footer className="teaser-footer"><div><strong>SUMEET GROUP</strong><span>© {new Date().getUTCFullYear()} {BRAND.legal}</span></div><p>Images are illustrative concepts and do not represent the upcoming project.</p><a href="#">Back to top ↑</a></footer>
    </div>
  )
}
