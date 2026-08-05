import React, { useEffect, useRef, useState } from 'react'
import { ImageTrail } from '@/components/ui/image-trail'

const GALLERY_IMAGES = [
  {
    src: './Assets/3D Images/VIEW_001_ELEVATION_TWILIGHT_2025.01.15_HIRES_FINAL.webp',
    title: 'Front Elevation',
    category: 'Architecture',
    alt: 'Front elevation of Sumeet Group at twilight',
    description:
      'A composed commercial frontage designed to create a strong first impression from the main approach.',
  },
  {
    src: './Assets/3D Images/VIEW_002_ELEVATION_DUSK_2025.01.15_HIRES_FINAL.webp',
    title: 'Twilight View',
    category: 'Facade',
    alt: 'Dusk facade view of Sumeet Group',
    description:
      'The evening facade highlights the rhythm of the towers, glazing, and warm interior illumination.',
  },
  {
    src: './Assets/3D Images/VIEW_006_FRONT_PLAZA_DUSK_2025.01.15_HIRES_FINAL.webp',
    title: 'Entrance Plaza',
    category: 'Arrival',
    alt: 'Front plaza entrance at dusk',
    description:
      'A welcoming plaza experience that supports retail visibility, visitor movement, and everyday interaction.',
  },
  {
    src: './Assets/3D Images/VIEW_012_DROP-OFF_TWILIGHT_2025.01.17_HIRES_FINAL.webp',
    title: 'Drop-off Area',
    category: 'Access',
    alt: 'Drop-off area at twilight',
    description:
      'A planned arrival zone shaped for convenient drop-offs, clear circulation, and premium access.',
  },
  {
    src: './Assets/3D Images/VIEW_016_TERRACE_CABANA_TWILIGHT_2025.01.15_HIRES_FINAL.webp',
    title: 'Terrace Garden',
    category: 'Amenity',
    alt: 'Terrace garden and cabana at twilight',
    description:
      'An elevated outdoor amenity that adds pause, greenery, and social energy to the business environment.',
  },
  {
    src: './Assets/3D Images/VIEW_019_AERIAL_VIEW_TWILIGHT_2025.01.15_HIRES_FINAL.webp',
    title: 'Aerial View',
    category: 'Masterplan',
    alt: 'Aerial twilight view of Sumeet Group',
    description:
      'A broader view of the project context, tower arrangement, and its urban presence in Raipur.',
  },
  {
    src: './Assets/3D Images/VIEW_010_MIDDLE_PLAZA_AREA_DAY_2025.01.21_HIRES.webp',
    title: 'Central Plaza',
    category: 'Public Realm',
    alt: 'Middle plaza area in daylight',
    description:
      'The central plaza brings daylight, movement, and active edges into the heart of the project.',
  },
  {
    src: './Assets/3D Images/VIEW_022_SEMI_AERIAL_TERRACE_DAY_2025.01.16_HIRES_FINAL.webp',
    title: 'Terrace Outlook',
    category: 'Lifestyle',
    alt: 'Semi aerial terrace view in daylight',
    description:
      'A semi-aerial look at the terrace spaces and their relationship with the built form.',
  },
  {
    src: './Assets/3D Images/LOBBY_AREA_2025.01.17_HIRES_FINAL.webp',
    title: 'Lobby Area',
    category: 'Interior',
    alt: 'Premium lobby area at Sumeet Group',
    description:
      'A refined lobby experience designed for clarity, comfort, and a professional first impression.',
  },
  {
    src: './Assets/3D Images/CONFERENCE_VIEW_2025.01.17_HIRES _FINAL.webp',
    title: 'Conference Suite',
    category: 'Workspace',
    alt: 'Conference room interior',
    description:
      'Contemporary meeting spaces support presentations, collaboration, and daily business operations.',
  },
  {
    src: './Assets/3D Images/RECEPTION_AREA_CAM_2025.01.17_HIRES _FINAL.webp',
    title: 'Reception Lounge',
    category: 'Welcome',
    alt: 'Reception lounge interior',
    description:
      'A polished reception setting that supports visitor comfort, orientation, and brand presence.',
  },
  {
    src: './Assets/3D Images/WORKSTATION_2025.01.17_HIRES _FINAL.webp',
    title: 'Workstation Zone',
    category: 'Office',
    alt: 'Modern workstation interior',
    description:
      'Flexible workstation planning supports focused teams, scalable offices, and daily productivity.',
  },
]

const GROUP_SIZE = 3

const chunk = (items, size) => {
  const groups = []
  for (let index = 0; index < items.length; index += size) {
    groups.push(items.slice(index, index + size))
  }
  return groups
}

const GALLERY_GROUPS = chunk(GALLERY_IMAGES, GROUP_SIZE)

export default function Gallery() {
  const galleryRef = useRef(null)
  const [activeGroup, setActiveGroup] = useState(0)
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    if (!selectedImage) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedImage(null)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [selectedImage])

  const goToPrevious = () => {
    setActiveGroup((group) =>
      group === 0 ? GALLERY_GROUPS.length - 1 : group - 1,
    )
  }

  const goToNext = () => {
    setActiveGroup((group) => (group + 1) % GALLERY_GROUPS.length)
  }

  return (
    <section
      className="stc-gallery"
      id="gallery"
      aria-labelledby="stc-gallery-heading"
      ref={galleryRef}
    >
      <div className="stc-gallery__trail" aria-hidden="true">
        <ImageTrail containerRef={galleryRef} interval={90} rotationRange={8}>
          {GALLERY_IMAGES.map((image) => (
            <div className="stc-gallery__trail-card" key={image.src}>
              <img src={image.src} alt="" loading="lazy" />
            </div>
          ))}
        </ImageTrail>
      </div>

      <div className="stc-gallery__content">
        <p className="stc-gallery__eyebrow">
          <span className="stc-gallery__eyebrow-rule" aria-hidden="true" />
          Project Gallery
          <span className="stc-gallery__eyebrow-rule" aria-hidden="true" />
        </p>
        <h2 className="stc-gallery__heading" id="stc-gallery-heading">
          <span>Explore the</span>
          <span>Project Renders</span>
        </h2>
        <p className="stc-gallery__subheading">
          Large brochure renders presented as a focused visual journey through
          the facade, arrival, plaza, terraces, aerial views, and workspaces.
        </p>
      </div>

      <div className="stc-gallery__slider" aria-label="Project gallery image groups">
        <div className="stc-gallery__viewport">
          <div
            className="stc-gallery__track"
            style={{ transform: `translateX(-${activeGroup * 100}%)` }}
          >
            {GALLERY_GROUPS.map((group, groupIndex) => (
              <div
                className="stc-gallery__grid"
                aria-hidden={groupIndex === activeGroup ? 'false' : 'true'}
                key={group.map((image) => image.src).join('|')}
              >
                {group.map((image, index) => (
                  <figure className="stc-gallery__card" key={image.src}>
                    <button
                      className="stc-gallery__image-button"
                      type="button"
                      aria-label={`Open ${image.title}`}
                      tabIndex={groupIndex === activeGroup ? 0 : -1}
                      onClick={() => setSelectedImage(image)}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        loading={groupIndex === 0 && index < 3 ? 'eager' : 'lazy'}
                      />
                    </button>
                    <figcaption className="stc-gallery__card-caption">
                      <span>{image.category}</span>
                      <strong>{image.title}</strong>
                    </figcaption>
                  </figure>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="stc-gallery__controls" aria-label="Gallery controls">
          <button type="button" onClick={goToPrevious} aria-label="Previous gallery group">
            ‹
          </button>
          <button type="button" onClick={goToNext} aria-label="Next gallery group">
            ›
          </button>
        </div>

        <span className="stc-gallery__counter" aria-hidden="true">
          {String(activeGroup + 1).padStart(2, '0')} / {String(GALLERY_GROUPS.length).padStart(2, '0')}
        </span>

        <div className="stc-gallery__dots" role="tablist" aria-label="Gallery groups">
          {GALLERY_GROUPS.map((_, index) => (
            <button
              className={index === activeGroup ? 'is-active' : ''}
              type="button"
              role="tab"
              aria-selected={index === activeGroup}
              aria-label={`Show gallery group ${index + 1}`}
              onClick={() => setActiveGroup(index)}
              key={index}
            />
          ))}
        </div>
      </div>

      {selectedImage && (
        <div
          className="stc-gallery__modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedImage.title} details`}
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="stc-gallery__modal-close"
            type="button"
            aria-label="Close gallery image"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
          <figure
            className="stc-gallery__modal-frame"
            onClick={(event) => event.stopPropagation()}
          >
            <img src={selectedImage.src} alt={selectedImage.alt} />
            <figcaption>
              <span>{selectedImage.category}</span>
              <strong>{selectedImage.title}</strong>
              <p>{selectedImage.description}</p>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  )
}
