'use client'

import NextLink from 'next/link'
import { usePathname, useRouter as useNextRouter } from 'next/navigation'

// Preserve the components' existing API while Next.js owns routing and SSR.
export const withBase = (path) => path

export function useRouter() {
  const router = useNextRouter()
  const path = usePathname() || '/'
  const navigate = (to, { replace = false, scroll = true } = {}) => {
    router[replace ? 'replace' : 'push'](to, { scroll })
  }
  return { path, navigate }
}

export function Link({ to, children, onNavigate, ...rest }) {
  return <NextLink href={to} onNavigate={onNavigate} {...rest}>{children}</NextLink>
}
