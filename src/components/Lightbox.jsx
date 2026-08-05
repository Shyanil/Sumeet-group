import { useCallback, useEffect } from 'react'
import { ArrowLeft, ArrowRight, Close } from './ui'

/**
 * Full-screen image viewer shared by the render gallery and the plan viewer.
 * Arrow keys step, Escape closes, and the page behind it stays put.
 */
export default function Lightbox({ images, index, onIndexChange, onClose }) {
  const step = useCallback(
    (delta) => onIndexChange((index + delta + images.length) % images.length),
    [index, images.length, onIndexChange],
  )

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'ArrowLeft') step(-1)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [step, onClose])

  const current = images[index]
  const many = images.length > 1

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={current.caption}>
      <div className="lightbox__bar wrap">
        <span>
          {many ? `${String(index + 1).padStart(2, '0')} / ${String(images.length).padStart(2, '0')} · ` : ''}
          {current.caption}
        </span>
        <div className="lightbox__nav">
          {many ? (
            <>
              <button className="icon-btn" onClick={() => step(-1)} aria-label="Previous image">
                <ArrowLeft />
              </button>
              <button className="icon-btn" onClick={() => step(1)} aria-label="Next image">
                <span style={{ width: 20, height: 20, display: 'inline-flex' }}>
                  <ArrowRight />
                </span>
              </button>
            </>
          ) : null}
          <button className="icon-btn" onClick={onClose} aria-label="Close viewer">
            <Close />
          </button>
        </div>
      </div>

      <div className="lightbox__stage" onClick={onClose}>
        <img src={current.src} alt={current.caption} onClick={(e) => e.stopPropagation()} />
      </div>
    </div>
  )
}
