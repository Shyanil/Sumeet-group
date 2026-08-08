import { useLayoutEffect, useMemo, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/scroll'

/**
 * A line of display type that lights up word by word as it crosses the
 * viewport — the same scrub language as the hero, at a smaller scale.
 *
 * Words wrapped in *asterisks* take the design system's gold italic.
 * Reduced motion leaves the text at full contrast; the CSS resting state
 * is already the finished look.
 */
export default function WordReveal({ text, as: Tag = 'p', className = '', ...rest }) {
  const root = useRef(null)
  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text])

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context((self) => {
      gsap.fromTo(
        self.selector('.wr__w'),
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.6,
          scrollTrigger: { trigger: root.current, start: 'top 82%', end: 'bottom 58%', scrub: 0.6 },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [text])

  return (
    <Tag ref={root} className={`wr ${className}`.trim()} {...rest}>
      {words.map((word, i) => {
        const emphasis = word.startsWith('*')
        const clean = word.replace(/\*/g, '')
        return (
          <span className="wr__w" key={`${clean}-${i}`}>
            {emphasis ? <em>{clean}</em> : clean}{' '}
          </span>
        )
      })}
    </Tag>
  )
}
