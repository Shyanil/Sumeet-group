import { Link } from '../lib/router'
import { Eyebrow, ArrowRight } from './ui'
import Reveal from './Reveal'
import './ServicesSection.css'

/**
 * Services — a dark editorial band: an intro, three full-bleed photographic
 * strips, and a closing statement with one CTA.
 *
 * The strips are the section. Each is a real photograph running the full
 * width of the viewport behind a flat scrim, with the row's content held to
 * the site container so the number, the giant word and the arrow line up
 * with every other section's left and right edges.
 *
 * The three services are the group's three ways in — a home to live in, a
 * floor to work from, an address to hold. Broker language (buy / sell /
 * rent) does not apply: Sumeet Group builds and sells its own buildings.
 *
 * Swap the photography by editing SERVICES below; nothing else reads it.
 */
const SERVICES = [
  {
    number: '1',
    title: 'Live',
    description:
      'Homes planned around light, air and an outdoor room. Low density, RERA registered, ready to walk today.',
    image: '/Assets/Sumeet Urban Nest (SUN)/renders/entrance-arrival.webp',
    imageAlt: 'The arrival court at Sumeet Urban Nest at dusk',
    position: '50% 58%',
    to: '/projects/sumeet-urban-nest',
  },
  {
    number: '2',
    title: 'Work',
    description:
      'Offices, showrooms and a plaza at Pachpedi Naka, built for a working day that does not end at six.',
    image: '/Assets/3D Images/VIEW_001_ELEVATION_TWILIGHT_2025.01.15_HIRES_FINAL.webp',
    imageAlt: 'The Sumeet Trade Centre elevation at twilight',
    position: '50% 62%',
    to: '/projects/sumeet-trade-centre',
  },
  {
    number: '3',
    title: 'Invest',
    description:
      'Commercial floors and plotted land on clear title, in the addresses Raipur is still growing towards.',
    image: '/Assets/3D Images/VIEW_019_AERIAL_VIEW_TWILIGHT_2025.01.15_HIRES_FINAL.webp',
    imageAlt: 'An aerial view of the Sumeet Trade Centre site at twilight',
    position: '50% 50%',
    to: '/projects',
  },
]

/* The oversized arrow: one long rule and an open head. Drawn rather than
   imported because the icon set's ArrowRight is a 20px UI glyph — scaled to
   120px its stroke would read as a bar. */
function LongArrow() {
  return (
    <svg className="services__arrow" viewBox="0 0 128 34" fill="none" aria-hidden="true">
      <path
        d="M0 17h122M105 3l17 14-17 14"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ServiceItem({ number, title, description, image, imageAlt, position, to }) {
  return (
    <Link to={to} className="services__row">
      <div className="services__media">
        <img src={image} alt={imageAlt} style={{ objectPosition: position }} loading="lazy" decoding="async" />
        <span className="services__scrim" aria-hidden="true" />
        <span className="services__sheen" aria-hidden="true" />
      </div>

      {/* `wrap` rather than a duplicated max-width: the row content has to
          sit on exactly the same left and right edges as every other
          section on the page, while the photograph stays full-bleed. */}
      <div className="wrap services__row-inner">
        <div className="services__meta">
          <span className="services__number" aria-hidden="true">
            {number}
          </span>
          <p className="services__desc">{description}</p>
        </div>

        <h3 className="services__title">{title}</h3>

        <span className="services__arrow-wrap" aria-hidden="true">
          <LongArrow />
        </span>
      </div>
    </Link>
  )
}

export default function ServicesSection({ services = SERVICES }) {
  return (
    <section className="services on-dark" aria-labelledby="services-heading">
      <Reveal className="wrap services__intro">
        <Eyebrow tone="ondark" className="services__label">
          Services
        </Eyebrow>
        <h2 id="services-heading" className="sg-display services__heading">
          How Sumeet Group
          <br />
          <span>Can Help You</span>
        </h2>
      </Reveal>

      <div className="services__list">
        {services.map((service) => (
          <ServiceItem key={service.title} {...service} />
        ))}
      </div>

      <Reveal className="wrap services__footer">
        <p className="sg-display services__statement">
          Our own team walks you through every stage: site, plan, paperwork and possession,{' '}
          <span>with answers you can hold us to.</span>
        </p>
        <Link to="/contact" className="sg-btn sg-btn--lg services__cta">
          <span>Talk to our team</span>
          <span className="sg-btn__icon">
            <ArrowRight />
          </span>
        </Link>
      </Reveal>
    </section>
  )
}
