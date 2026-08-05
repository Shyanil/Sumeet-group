import { useEffect, useRef, useState } from 'react'

/**
 * Fade-and-rise on first scroll into view. The design system asks for quiet
 * motion — a short translate, 360ms, no bounce, and nothing that loops — so
 * the observer disconnects once an element has appeared.
 *
 * `prefers-reduced-motion` is handled in CSS (.reveal collapses to no-op).
 */
export default function Reveal({ children, as: Tag = 'div', delay = 0, className = '', style, ...rest }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Anything already on screen at mount should not animate in late.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      // Merge rather than let a caller's `style` silently drop the delay.
      style={delay ? { transitionDelay: `${delay}ms`, ...style } : style}
      {...rest}
    >
      {children}
    </Tag>
  )
}
