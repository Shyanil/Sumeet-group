import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/scroll'

/**
 * An image that drifts inside its own frame as the page scrolls past it.
 *
 * The image is deliberately oversized (`scale` below) so there is spare
 * pixel on both ends of the travel and no edge is ever exposed.
 */
export default function ParallaxMedia({ src, alt, amount = 12, scale = 1.16, className = '', children }) {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context((self) => {
      gsap.fromTo(
        self.selector('img'),
        { yPercent: -amount, scale },
        {
          yPercent: amount,
          scale,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [amount, scale])

  return (
    <div ref={root} className={`px-media ${className}`.trim()}>
      <img src={src} alt={alt} style={{ '--px-scale': scale }} loading="lazy" />
      {children}
    </div>
  )
}
