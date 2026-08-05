import { Link } from '../lib/router'
import { ArrowRight } from './ui'

const STATUS_LABEL = {
  ready: 'Ready to move',
  construction: 'Under construction',
  upcoming: 'New launch',
  sold: 'Sold out',
}

/**
 * The project listing tile — the design system's PropertyCard, wired to a
 * route. Renders as a real <a> so the whole card is one link target.
 */
export default function ProjectCard({ project }) {
  const { slug, name, locality, status, cover, coverAlt, price, priceUnit, cardSpecs = [], blurb } = project

  return (
    <Link to={`/projects/${slug}`} className="sg-prop sg-prop--interactive">
      <div className="sg-prop__media">
        {cover ? (
          <img src={cover} alt={coverAlt || name} loading="lazy" />
        ) : (
          <div className="sg-prop__ph">Sumeet Group</div>
        )}
        <span className={`sg-prop__status sg-prop__status--${status}`}>
          <span className="d" />
          {STATUS_LABEL[status]}
        </span>
      </div>

      <div className="sg-prop__body">
        {locality ? <div className="sg-prop__loc">{locality}</div> : null}
        <h3 className="sg-prop__name">{name}</h3>
        {blurb ? <p className="sg-prop__blurb">{blurb}</p> : null}

        {cardSpecs.length ? (
          <div className="sg-prop__specs">
            {cardSpecs.map((s) => (
              <div className="sg-prop__spec" key={s.label}>
                <span className="v">{s.value}</span>
                <span className="l">{s.label}</span>
              </div>
            ))}
          </div>
        ) : null}

        <div className="sg-prop__foot">
          <div className="sg-prop__price">
            <span className={`amt${/\d/.test(price) ? '' : ' amt--text'}`}>{price}</span>
            {priceUnit ? <span className="unit">{priceUnit}</span> : null}
          </div>
          <span className="sg-prop__cta">
            View project
            <ArrowRight />
          </span>
        </div>
      </div>
    </Link>
  )
}
