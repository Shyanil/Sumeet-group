import HomeTwo from '../views/HomeTwo'

export const dynamic = 'force-static'
export const metadata = { alternates: { canonical: '/' } }

export default function HomePage() {
  return <HomeTwo />
}
