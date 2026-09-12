import { CONTACT } from '../data/site'

export default function robots() {
  const origin = process.env.SITE_URL || CONTACT.websiteHref
  return { rules: { userAgent: '*', allow: '/' }, sitemap: new URL('/sitemap.xml', origin).href }
}
