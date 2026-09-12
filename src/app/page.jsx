import HomeTwo from '../views/HomeTwo'

// Render HTML on every request, including requests from search crawlers.
export const dynamic = 'force-dynamic'
export const metadata = { alternates: { canonical: '/' } }

export default function HomePage() {
  return <HomeTwo />
}
