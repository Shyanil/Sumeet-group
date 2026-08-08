import { Link } from '../lib/router'
import { ArrowRight } from './ui'
import Reveal from './Reveal'
import './ProjectShowcase.css'

const STATUS_LABEL = {
  ready: 'Ready to move',
  construction: 'Under construction',
  upcoming: 'New launch',
  sold: 'Sold out',
  delivered: 'Delivered',
}

const COUNT_WORD = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten']

/**
 * Every name in the portfolio is "Sumeet <something>", and the reference
 * composition wants the title stacked rather than wrapped on whatever word
 * happens to reach the edge. So the house name takes the first line and the
 * project takes the second.
 */
const titleLines = (name) => {
  const [first, ...rest] = name.split(' ')
  return rest.length ? [first, rest.join(' ')] : [name]
}

/**
 * The portfolio band on the home page.
 *
 * A dark editorial section: a two-column intro — stacked heading on the
 * left, a paragraph and one white pill on the right — over a row of tall
 * photographic cards. The photograph *is* the card: no radius, no border,
 * no shadow, no panel. Only a gradient between the image and the type.
 *
 * The listing grid on /projects keeps ProjectCard, the white tile, which is
 * the right component for a page whose job is side-by-side comparison. This
 * one is for the home page, where the job is to be looked at.
 *
 * Selling projects link to their own route; delivered ones have no brochure
 * and no detail page, so they carry a photograph and a line and point at the
 * portfolio page, where they already appear under "Delivered".
 */
export default function ProjectShowcase({ selling = [], delivered = [] }) {
  const cards = [
    ...selling.map((p) => ({
      key: p.slug,
      name: p.name,
      copy: p.blurb,
      cover: p.cover,
      coverAlt: p.coverAlt || p.name,
      coverPosition: p.coverPosition,
      status: STATUS_LABEL[p.status],
      tone: 'selling',
      href: `/projects/${p.slug}`,
    })),
    ...delivered.map((p) => ({
      key: p.name,
      name: p.name,
      copy: p.note,
      cover: p.cover,
      coverAlt: p.coverAlt || p.name,
      coverPosition: p.coverPosition,
      status: STATUS_LABEL.delivered,
      tone: 'delivered',
      href: '/projects',
    })),
  ]

  const count = COUNT_WORD[cards.length] || cards.length

  return (
    <section className="portfolio" aria-labelledby="portfolio-heading">
      <div className="wrap">
        {/* ---------- intro ---------- */}
        <div className="portfolio__intro">
          <Reveal>
            <h2 className="portfolio__heading" id="portfolio-heading">
              <span>One Standard</span>
              <span>Across {count}</span>
              <span>Addresses.</span>
            </h2>
          </Reveal>

          <Reveal className="portfolio__aside" delay={80}>
            <p className="portfolio__lede">
              Two selling now, two delivered and lived in.{' '}
              <span>
                Every one of them in Raipur, on clear title and RERA registered. Bought for where it sits in a working
                day, not for how it reads on a map.
              </span>
            </p>

            <Link to="/projects" className="portfolio__cta">
              <span>View all projects</span>
              <span className="portfolio__cta-icon">
                <ArrowRight />
              </span>
            </Link>
          </Reveal>
        </div>

        {/* ---------- cards ---------- */}
        <div className="portfolio__grid">
          {cards.map((c, i) => (
            <Reveal key={c.key} delay={i * 70}>
              <Link to={c.href} className="portfolio__card">
                <div className="portfolio__media">
                  {c.cover ? (
                    <img
                      src={c.cover}
                      alt={c.coverAlt}
                      loading="lazy"
                      decoding="async"
                      style={c.coverPosition ? { objectPosition: c.coverPosition } : undefined}
                    />
                  ) : null}
                </div>
                <div className="portfolio__veil" aria-hidden="true" />

                <div className="portfolio__body">
                  <span className={`portfolio__status portfolio__status--${c.tone}`}>{c.status}</span>

                  <h3 className="portfolio__title">
                    {titleLines(c.name).map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </h3>

                  {/* margin-top:auto lives on this group, so the buttons sit on
                      one line across the row however long the copy runs. */}
                  <div className="portfolio__foot">
                    <p className="portfolio__copy">{c.copy}</p>
                    <span className="portfolio__more">
                      <span>Learn More</span>
                      <span className="portfolio__more-icon">
                        <ArrowRight />
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
