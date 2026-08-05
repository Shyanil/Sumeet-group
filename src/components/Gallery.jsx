import { useState } from 'react'
import Lightbox from './Lightbox'

/**
 * Render gallery.
 *
 * Every third tile spans two columns so a strip of wide architectural renders
 * doesn't read as a uniform grid of postage stamps.
 */
export default function Gallery({ images, wideEvery = 3 }) {
  const [openAt, setOpenAt] = useState(null)

  return (
    <>
      <div className="gallery">
        {images.map((img, i) => (
          <button
            type="button"
            key={img.src}
            className={`gallery__item${wideEvery && (i + 1) % wideEvery === 0 ? ' gallery__item--wide' : ''}`}
            onClick={() => setOpenAt(i)}
            aria-label={`View ${img.caption}`}
          >
            <img src={img.src} alt={img.caption} loading="lazy" />
            <span className="gallery__cap">{img.caption}</span>
          </button>
        ))}
      </div>

      {openAt !== null ? (
        <Lightbox images={images} index={openAt} onIndexChange={setOpenAt} onClose={() => setOpenAt(null)} />
      ) : null}
    </>
  )
}
