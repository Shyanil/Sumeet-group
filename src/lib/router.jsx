import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

/**
 * A ~60-line history router.
 *
 * The site has six routes and no data loading, so React Router would be a
 * dependency for nothing. Netlify already rewrites every path to index.html
 * (see netlify.toml), so real paths work in production; Vite's dev server
 * does the same.
 */

const RouterContext = createContext(null)

/** Vite's `base: './'` means the app can be served from a sub-path. */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')

const stripBase = (pathname) =>
  BASE && pathname.startsWith(BASE) ? pathname.slice(BASE.length) || '/' : pathname

export const withBase = (path) => `${BASE}${path}`

export function RouterProvider({ children }) {
  const [path, setPath] = useState(() => stripBase(window.location.pathname))

  useEffect(() => {
    const onPop = () => setPath(stripBase(window.location.pathname))
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = useCallback((to, { replace = false, scroll = true } = {}) => {
    const url = withBase(to)
    if (window.location.pathname === url) {
      if (scroll) window.scrollTo({ top: 0 })
      return
    }
    window.history[replace ? 'replaceState' : 'pushState']({}, '', url)
    setPath(to)
    if (scroll) window.scrollTo({ top: 0 })
  }, [])

  const value = useMemo(() => ({ path, navigate }), [path, navigate])
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

export function useRouter() {
  const ctx = useContext(RouterContext)
  if (!ctx) throw new Error('useRouter must be used inside <RouterProvider>')
  return ctx
}

/**
 * An anchor that navigates client-side but stays a real <a> — so it opens in
 * a new tab on cmd/ctrl-click, shows the URL on hover, and is crawlable.
 */
export function Link({ to, children, onNavigate, ...rest }) {
  const { navigate } = useRouter()
  const handleClick = (event) => {
    if (event.defaultPrevented) return
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
    event.preventDefault()
    navigate(to)
    onNavigate?.()
  }
  return (
    <a href={withBase(to)} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}
