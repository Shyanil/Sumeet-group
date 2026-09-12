import App from '../App'
import { CONTACT } from '../data/site'
import 'lenis/dist/lenis.css'
import '../styles/index.css'

const title = 'Sumeet Group — Real estate in Raipur'
const description = 'Sumeet Group builds homes and workspaces across Raipur, Chhattisgarh — Sumeet Urban Nest at Khamardih and Sumeet Trade Centre at Pachpedi Naka. RERA registered.'
const image = '/Assets/Sumeet Urban Nest (SUN)/renders/entrance-arrival.webp'

export const metadata = {
  metadataBase: new URL(process.env.SITE_URL || CONTACT.websiteHref),
  title,
  description,
  icons: { icon: '/Assets/Brand/sumeet-group-mark.webp' },
  openGraph: { url: '/', type: 'website', siteName: 'Sumeet Group', title, description, images: [{ url: image, alt: 'Sumeet Urban Nest arrival court' }] },
  twitter: { card: 'summary_large_image', title, description, images: [image] },
}

export const viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#23242A' }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400..600;1,6..72,400..500&family=Hanken+Grotesk:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body><App initialTime={Date.now()}>{children}</App></body>
    </html>
  )
}
