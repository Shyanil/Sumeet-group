import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  DoorOpen,
  ConciergeBell,
  ArrowUpDown,
  Presentation,
  Users,
  ShieldCheck,
  Zap,
  Flower2,
  Sofa,
  Car,
  Flame,
  Camera,
  Sparkles,
} from 'lucide-react'

/**
 * Amenities — filterable "world-class amenities" bento.
 * All twelve amenities live on one canvas (no paginated halves). Category
 * chips filter the deck with Framer Motion layout animation; one image-backed
 * feature card anchors each category. Details slide up as a frosted overlay on
 * hover / focus / tap, so the grid never reflows. Desktop-only experience.
 */

const CATEGORIES = [
  { id: 'all', label: 'All Amenities' },
  { id: 'arrival', label: 'Arrival & Welcome' },
  { id: 'work', label: 'Work & Meet' },
  { id: 'comfort', label: 'Comfort & Utility' },
  { id: 'safety', label: 'Safety & Security' },
]

const AMENITIES = [
  // — Arrival & Welcome —
  {
    icon: DoorOpen,
    category: 'arrival',
    featured: true,
    image: './Assets/3D Images/VIEW_024_DROP-OFF_TWILIGHT_2025.01.16_HIRES_FINAL.webp',
    title: 'Grand Entrance',
    desc: 'A composed arrival sequence designed to create an immediate sense of scale, clarity, and prestige.',
    features: ['Double-Height Gateway', 'Dedicated Drop-off'],
  },
  {
    icon: ConciergeBell,
    category: 'arrival',
    title: 'Reception Lobby',
    desc: 'A polished reception environment for visitor welcome, daily orientation, and professional first impressions.',
    features: ['Air-Conditioned Lounge', 'Luxury Marble Finishes'],
  },
  {
    icon: ArrowUpDown,
    category: 'arrival',
    title: 'High-Speed Elevators',
    desc: 'Efficient vertical movement planned for smooth daily circulation across every business floor.',
    features: ['Minimal Wait Times', 'Group Control Systems'],
  },
  // — Work & Meet —
  {
    icon: Presentation,
    category: 'work',
    featured: true,
    image: './Assets/3D Images/CONFERENCE_VIEW_2025.01.17_HIRES _FINAL.webp',
    title: 'Conference Spaces',
    desc: 'Purpose-built rooms for presentations, reviews, leadership meetings, and formal collaboration.',
    features: ['Smart Presentation Tools', 'Scalable Layouts'],
  },
  {
    icon: Users,
    category: 'work',
    title: 'Meeting Rooms',
    desc: 'Private rooms for focused discussions, client conversations, and quiet team alignment.',
    features: ['Private Huddle Spaces', 'Acoustic Insulation'],
  },
  {
    icon: Sofa,
    category: 'work',
    title: 'Lounge Areas',
    desc: 'Comfortable break-out zones shaped for waiting, informal exchange, and short restorative pauses.',
    features: ['Premium Seating', 'Refreshment Bar Ready'],
  },
  // — Comfort & Utility —
  {
    icon: Flower2,
    category: 'comfort',
    featured: true,
    image: './Assets/3D Images/VIEW_016_TERRACE_CABANA_TWILIGHT_2025.01.15_HIRES_FINAL.webp',
    title: 'Terrace Garden',
    desc: 'An elevated green pause point for fresh air, informal interaction, and everyday workday balance.',
    features: ['Seating Cabanas', 'Natural Landscaping'],
  },
  {
    icon: Zap,
    category: 'comfort',
    title: 'Power Backup',
    desc: 'Reliable backup infrastructure engineered to keep everyday business continuity uninterrupted.',
    features: ['100% DG Capacity', 'Automatic Transfer Sw.'],
  },
  {
    icon: Car,
    category: 'comfort',
    title: 'Parking Facilities',
    desc: 'Planned parking with organised access and clear circulation for occupants and visitors alike.',
    features: ['Structured Flow Zones', 'Dedicated Guest Slots'],
  },
  // — Safety & Security —
  {
    icon: ShieldCheck,
    category: 'safety',
    featured: true,
    image: './Assets/3D Images/CABIN_VIEW_2025.01.17_HIRES _FINAL.webp',
    title: 'Security Systems',
    desc: 'Layered access and monitoring systems supporting a genuinely secure commercial environment.',
    features: ['Biometric Scanners', 'RFID Vehicle Gates'],
  },
  {
    icon: Flame,
    category: 'safety',
    title: 'Fire Safety Systems',
    desc: 'Comprehensive fire planning with detection, rapid response, and protected exit systems.',
    features: ['Sprinkler Networks', 'Pressurized Fire Esc.'],
  },
  {
    icon: Camera,
    category: 'safety',
    title: 'CCTV Surveillance',
    desc: 'Continuous surveillance across key shared zones, circulation points, and every access area.',
    features: ['24/7 High-Res Feeds', 'Peripheral Coverage'],
  },
]

const CATEGORY_LABEL = CATEGORIES.reduce((map, cat) => {
  map[cat.id] = cat.label
  return map
}, {})

const cardVariants = {
  hidden: { opacity: 0, y: 26, scale: 0.97, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 90, damping: 16 },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    filter: 'blur(6px)',
    transition: { duration: 0.26, ease: 'easeIn' },
  },
}

export default function Amenities() {
  const sectionRef = useRef(null)
  const [activeCat, setActiveCat] = useState('all')
  const [openCard, setOpenCard] = useState(null)

  useEffect(() => {
    setOpenCard(null)
  }, [activeCat])

  const counts = useMemo(() => {
    const base = { all: AMENITIES.length }
    for (const cat of CATEGORIES) {
      if (cat.id === 'all') continue
      base[cat.id] = AMENITIES.filter((a) => a.category === cat.id).length
    }
    return base
  }, [])

  const visible = useMemo(
    () =>
      activeCat === 'all'
        ? AMENITIES
        : AMENITIES.filter((a) => a.category === activeCat),
    [activeCat],
  )

  const handleMouseMove = (event) => {
    const card = event.currentTarget
    const rect = card.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    card.style.setProperty('--mouse-x', `${x}%`)
    card.style.setProperty('--mouse-y', `${y}%`)
  }

  return (
    <section ref={sectionRef} className="stc-amenities" id="amenities">
      <div className="stc-amenities__grain" aria-hidden="true" />
      <div className="stc-amenities__lines" aria-hidden="true">
        <span className="stc-amenities__line-pattern stc-amenities__line-pattern--left" />
        <span className="stc-amenities__line-pattern stc-amenities__line-pattern--right" />
      </div>

      <div className="stc-amenities__inner">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="stc-amenities__eyebrow"
        >
          <span className="stc-amenities__eyebrow-rule" aria-hidden="true" />
          Amenities
          <span className="stc-amenities__eyebrow-rule" aria-hidden="true" />
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="stc-amenities__headline"
        >
          <span className="stc-amenities__line">World-Class</span>
          <span className="stc-amenities__line">Amenities</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="stc-amenities__lede"
        >
          A curated suite of premium business utilities — filter by experience,
          then hover any card to explore the detail.
        </motion.p>

        {/* Category filter rail */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="stc-amenities__filters"
          role="tablist"
          aria-label="Filter amenities by category"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCat === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`stc-amenities__filter${isActive ? ' is-active' : ''}`}
                onClick={() => setActiveCat(cat.id)}
              >
                {cat.id === 'all' && (
                  <Sparkles size={15} strokeWidth={1.9} aria-hidden="true" />
                )}
                <span>{cat.label}</span>
                <span className="stc-amenities__filter-count">{counts[cat.id]}</span>
              </button>
            )
          })}
        </motion.div>

        <div className="stc-amenities__showcase">
          <motion.div layout className="stc-amenities__deck">
            <AnimatePresence mode="popLayout">
              {visible.map((amenity) => {
                const Icon = amenity.icon
                const isOpen = openCard === amenity.title
                return (
                  <motion.button
                    layout
                    type="button"
                    key={amenity.title}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={`stc-amenities__card${
                      amenity.featured ? ' is-featured' : ''
                    }${isOpen ? ' is-open' : ''}`}
                    onMouseMove={handleMouseMove}
                    onClick={() =>
                      setOpenCard((cur) =>
                        cur === amenity.title ? null : amenity.title,
                      )
                    }
                    aria-expanded={isOpen}
                    aria-label={`${amenity.title}. ${amenity.desc}`}
                  >
                    {amenity.image && (
                      <span className="stc-amenities__media" aria-hidden="true">
                        <img src={amenity.image} alt="" loading="lazy" />
                        <span className="stc-amenities__media-scrim" />
                      </span>
                    )}

                    <span className="stc-amenities__card-glow" aria-hidden="true" />

                    <span className="stc-amenities__card-top">
                      <span className="stc-amenities__icon-box" aria-hidden="true">
                        <Icon size={22} strokeWidth={1.75} />
                      </span>
                      <span className="stc-amenities__chip">
                        {CATEGORY_LABEL[amenity.category]}
                      </span>
                    </span>

                    <span className="stc-amenities__card-body">
                      <h3 className="stc-amenities__card-title">{amenity.title}</h3>

                      <span className="stc-amenities__reveal">
                        <span className="stc-amenities__reveal-inner">
                          <span className="stc-amenities__desc">{amenity.desc}</span>
                          <span className="stc-amenities__features">
                            {amenity.features.map((feature) => (
                              <span key={feature} className="stc-amenities__tag">
                                <span
                                  className="stc-amenities__tag-bullet"
                                  aria-hidden="true"
                                />
                                {feature}
                              </span>
                            ))}
                          </span>
                        </span>
                      </span>
                    </span>
                  </motion.button>
                )
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
