import { useId, useState } from 'react'
import './ApproachAccordion.css'

/* Two strokes, not one path: the upright collapses into the bar on open, so
   the plus becomes a minus rather than spinning into a cross. */
const Plus = () => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
    <path d="M4 10h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path className="faq__icon-v" d="M10 4v12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
)

/**
 * "How we build", as an accordion.
 *
 * It was a four-up grid of numbered points, which read as four paragraphs
 * competing for the same attention. One question open at a time is the FAQ
 * shape: the titles are the whole list at a glance, and the prose is there
 * for whoever wants it.
 *
 * Open/close animates on `grid-template-rows: 0fr → 1fr`, so no height is
 * ever measured in JavaScript. The closed panel takes `visibility: hidden`
 * after the transition (see the stylesheet), which is what keeps its text
 * out of the accessibility tree rather than merely clipped from view.
 *
 * Single-open by design: `openIndex`, not a set. Clicking the open row
 * closes it, so the section can rest with everything shut.
 */
export default function ApproachAccordion({ items, defaultOpen = 0 }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen)
  const id = useId()

  return (
    <div className="faq">
      {items.map(([n, title, copy], i) => {
        const open = openIndex === i
        return (
          <div className={`faq__item${open ? ' is-open' : ''}`} key={n}>
            <h3 className="faq__h">
              <button
                type="button"
                className="faq__trigger"
                aria-expanded={open}
                aria-controls={`${id}-panel-${i}`}
                id={`${id}-trigger-${i}`}
                onClick={() => setOpenIndex(open ? -1 : i)}
              >
                <span className="faq__n">{n}</span>
                <span className="faq__t">{title}</span>
                <span className="faq__icon">
                  <Plus />
                </span>
              </button>
            </h3>

            <div
              className="faq__panel"
              id={`${id}-panel-${i}`}
              role="region"
              aria-labelledby={`${id}-trigger-${i}`}
            >
              <div className="faq__panel-clip">
                <p className="faq__d">{copy}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
