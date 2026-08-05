import { useState } from 'react'
import Lightbox from './Lightbox'
import Reveal from './Reveal'
import { Expand } from './ui'

/**
 * Floor and site plans.
 *
 * Plans carry dimensions in small type, so they are never cropped to a tile:
 * each sits at full width inside its own horizontal scroller (with a minimum
 * width so a phone still gets a readable scale), and opens full-screen on tap.
 */
export default function PlanViewer({ plans }) {
  const [openAt, setOpenAt] = useState(null)

  return (
    <>
      <div className="stack stack-5">
        {plans.map((plan, i) => (
          <Reveal key={plan.src} className="plan-frame">
            <div className="plan-frame__scroll">
              <img
                src={plan.src}
                alt={plan.caption}
                loading="lazy"
                onClick={() => setOpenAt(i)}
                title="Open full screen"
              />
            </div>
            <div className="plan-frame__cap">
              <span>{plan.caption}</span>
              <button
                type="button"
                onClick={() => setOpenAt(i)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'none',
                  border: 0,
                  cursor: 'pointer',
                  font: 'inherit',
                  letterSpacing: 'inherit',
                  textTransform: 'inherit',
                  color: 'var(--color-gold-deep)',
                }}
              >
                <Expand />
                {plan.note}
              </button>
            </div>
          </Reveal>
        ))}
      </div>

      {openAt !== null ? (
        <Lightbox
          images={plans.map((p) => ({ src: p.src, caption: p.caption }))}
          index={openAt}
          onIndexChange={setOpenAt}
          onClose={() => setOpenAt(null)}
        />
      ) : null}
    </>
  )
}
