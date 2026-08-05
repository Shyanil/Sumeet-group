import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

/**
 * HighlightsStrip — premium split-highlight showcase.
 * Shows three oversized editorial metrics at a time and cycles through the
 * groups every ~4.5s with fade / blur / vertical-slide + masked number reveals.
 * NOTE: positioning (`position: relative; z-index: 10`, flush under the hero)
 * is intentional — see `.stc-strip` in index.css. Keep it attached to the hero.
 */

const METRICS = [
  {
    value: 'Prime',
    unit: null,
    label: 'Location Advantage',
    caption: 'Pachpedi Naka Chowk, Raipur',
    srLabel: 'Prime location advantage at Pachpedi Naka Chowk, Raipur',
  },
  {
    value: '3',
    unit: 'Nos',
    label: 'Iconic Towers',
    caption: 'Master-planned commercial blocks',
    srLabel: '3 iconic towers, master-planned commercial blocks',
  },
  {
    value: 'G+7',
    unit: null,
    label: 'Floor Hierarchy',
    caption: 'Ground plus seven levels',
    srLabel: 'Ground plus seven floors',
  },
  {
    value: '100',
    unit: '%',
    label: 'Vastu Compliant',
    caption: 'Aligned for prosperity & flow',
    srLabel: '100 percent Vastu compliant, aligned for prosperity and flow',
  },
  {
    value: 'A+',
    unit: null,
    label: 'Energy Efficient',
    caption: 'Sustainable, low-cost operations',
    srLabel: 'A plus energy efficient, sustainable low-cost operations',
  },
  {
    value: '24×7',
    unit: null,
    label: 'Secured Premises',
    caption: 'Surveillance & manned access',
    srLabel: '24 by 7 secured premises with surveillance and manned access',
  },
]

const GROUP_SIZE = 3
const ROTATE_MS = 4500

const EASE_OUT = [0.16, 1, 0.3, 1]
const EASE_IN = [0.7, 0, 0.84, 0]

const chunk = (arr, size) => {
  const out = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

const GROUPS = chunk(METRICS, GROUP_SIZE)

const groupVariants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.14, delayChildren: 0.08 } },
  exit: { transition: { staggerChildren: 0.07, staggerDirection: -1 } },
}

const itemVariants = {
  initial: { opacity: 0, y: 46, filter: 'blur(16px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.95, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    y: -34,
    filter: 'blur(12px)',
    transition: { duration: 0.55, ease: EASE_IN },
  },
}

const revealVariants = {
  initial: { y: '112%' },
  animate: { y: '0%', transition: { duration: 1.0, ease: EASE_OUT, delay: 0.06 } },
  exit: { y: '-112%', transition: { duration: 0.5, ease: EASE_IN } },
}

const ruleVariants = {
  initial: { scaleY: 0 },
  animate: { scaleY: 1, transition: { duration: 0.8, ease: EASE_OUT, delay: 0.16 } },
  exit: { scaleY: 0, transition: { duration: 0.4, ease: EASE_IN } },
}

export default function HighlightsStrip() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  // Auto-advance; resets whenever `active` changes (incl. manual selection).
  useEffect(() => {
    if (reduce || paused || GROUPS.length <= 1) return
    const id = setTimeout(
      () => setActive((a) => (a + 1) % GROUPS.length),
      ROTATE_MS,
    )
    return () => clearTimeout(id)
  }, [active, paused, reduce])

  const group = GROUPS[active]

  return (
    <section className="stc-strip" aria-label="Project highlights and key metrics">
      <span className="stc-strip__seam" aria-hidden="true" />
      <div className="stc-strip__glass" aria-hidden="true" />

      {/* Ambient moving light + sweeping beam */}
      <div className="stc-show__ambient" aria-hidden="true">
        <span className="stc-show__orb stc-show__orb--a" />
        <span className="stc-show__orb stc-show__orb--b" />
        <span className="stc-show__beam" />
      </div>

      <div className="stc-strip__container">
        <div
          className="stc-show"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.ul
              key={active}
              className="stc-show__list"
              variants={groupVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              aria-hidden="true"
            >
              {group.map((metric, localIndex) => {
                const globalIndex = active * GROUP_SIZE + localIndex + 1
                return (
                  <motion.li
                    key={metric.label}
                    className="stc-show__item"
                    variants={itemVariants}
                  >
                    <div className="stc-show__value-mask">
                      <motion.div
                        className="stc-show__value-inner"
                        variants={revealVariants}
                      >
                        <span className="stc-show__value">{metric.value}</span>
                        {metric.unit && (
                          <span className="stc-show__unit">{metric.unit}</span>
                        )}
                      </motion.div>
                    </div>

                    <motion.span
                      className="stc-show__rule"
                      variants={ruleVariants}
                    />

                    <div className="stc-show__meta">
                      <span className="stc-show__index">
                        {String(globalIndex).padStart(2, '0')}
                      </span>
                      <span className="stc-show__label">{metric.label}</span>
                      <span className="stc-show__caption">{metric.caption}</span>
                    </div>
                  </motion.li>
                )
              })}
            </motion.ul>
          </AnimatePresence>

          {GROUPS.length > 1 && (
            <div className="stc-show__controls">
              <span className="stc-show__counter" aria-hidden="true">
                <span className="stc-show__counter-now">
                  {String(active + 1).padStart(2, '0')}
                </span>
                <span className="stc-show__counter-sep" />
                <span className="stc-show__counter-total">
                  {String(GROUPS.length).padStart(2, '0')}
                </span>
              </span>

              <div
                className="stc-show__progress"
                role="tablist"
                aria-label="Highlight groups"
              >
                {GROUPS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className="stc-show__dot"
                    role="tab"
                    aria-selected={i === active}
                    aria-label={`Show highlights group ${i + 1} of ${GROUPS.length}`}
                    onClick={() => setActive(i)}
                  >
                    <span className="stc-show__dot-track">
                      <motion.span
                        className="stc-show__dot-fill"
                        initial={false}
                        animate={{ scaleX: i === active ? 1 : 0 }}
                        transition={
                          i === active && !reduce && !paused
                            ? { duration: ROTATE_MS / 1000, ease: 'linear' }
                            : { duration: 0.4, ease: EASE_OUT }
                        }
                      />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Always-available static list for assistive tech */}
        <ul className="stc-strip__sr-only">
          {METRICS.map((metric) => (
            <li key={metric.label}>{metric.srLabel}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
