import { Link } from '../lib/router'
import { GROUP_STATS } from '../data/site'
import { PROJECTS, PAST_PROJECTS } from '../data/projects'
import { Eyebrow, Stat, ArrowRight } from '../components/ui'
import Reveal from '../components/Reveal'
import HeroCinema from '../components/HeroCinema'
import WordReveal from '../components/WordReveal'
import ParallaxMedia from '../components/ParallaxMedia'
import RealEstateArrowsSection from '../components/RealEstateArrowsSection'
import ServicesSection from '../components/ServicesSection'
import ProjectShowcase from '../components/ProjectShowcase'
import TestimonialsSection from '../components/TestimonialsSection'
import ApproachAccordion from '../components/ApproachAccordion'

const APPROACH = [
  [
    '01',
    'Bones before beauty',
    'Structures engineered to code and finished as if our own names were on the doorbell. The strength you’ll never see, holding up everything you will.',
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
  return (
    <>
      {/* ---------- The scene ---------- */}
      <HeroCinema />

      {/* ---------- Statement ----------
          This sheet is what ends the hero: it rides up over the last stretch
          of the scene's scroll (--cinema-overlap). Because it covers the
          still-pinned stage, it has to claim the header tone back for itself
          — otherwise the header would stay reversed over white paper. */}
      <section className="statement" data-header-over="paper">
        <div className="wrap statement__body">
          <Eyebrow rule>Sumeet Group</Eyebrow>
          <WordReveal
            as="h2"
            className="sg-display statement__line"
            text="We have built in Raipur long enough to know an address is made of small decisions, the ones nobody sees, taken years before anyone *moves* *in.*"
          />
        </div>

        <div className="wrap numbers-band">
          {GROUP_STATS.map((s) => (
            <Stat key={s.label} value={s.value} label={s.label} sub={s.sub} />
          ))}
        </div>
      </section>

      {/* ---------- Statement band ---------- */}
      <RealEstateArrowsSection />

      {/* ---------- Services ---------- */}
      <ServicesSection />

      {/* ---------- Projects ---------- */}
      <ProjectShowcase selling={PROJECTS} delivered={PAST_PROJECTS} />

      {/* ---------- Full-bleed band ----------
          The hero's language at page scale: one image, moving slower than
          the copy laid over it. */}
      <section className="band">
        <ParallaxMedia
          className="band__media"
          src="/Assets/3D Images/VIEW_006_FRONT_PLAZA_DUSK_2025.01.15_HIRES_FINAL.webp"
          alt="The front plaza at Sumeet Trade Centre at dusk"
          amount={9}
          scale={1.2}
        />
        <div className="band__scrim" aria-hidden="true" />
        <div className="wrap band__copy">
          <Eyebrow tone="ondark" rule>
            Pachpedi Naka
          </Eyebrow>
          <WordReveal
            as="h2"
            className="sg-display band__title"
            text="Offices, showrooms and a plaza that stays busy after *six.*"
          />
          <Link to="/projects/sumeet-trade-centre" className="sg-btn sg-btn--lg band__cta">
            <span>See Sumeet Trade Centre</span>
            <span className="sg-btn__icon">
              <ArrowRight />
            </span>
          </Link>
        </div>
      </section>

      {/* ---------- Client stories ---------- */}
      <TestimonialsSection />

      {/* ---------- Approach ----------
          Last section on the page, so it carries the larger bottom rhythm
          the closing CTA band used to provide. */}
      <section className="wrap section section--lg">
        <div className="split-intro">
          <Reveal className="section-head">
            <Eyebrow rule>How we build</Eyebrow>
            <h2 className="sg-display h-section">
              The quiet marks of a serious <em>building.</em>
            </h2>
          </Reveal>

          <Reveal>
            <ApproachAccordion items={APPROACH} />
          </Reveal>
        </div>
      </section>
    </>
  )
}
