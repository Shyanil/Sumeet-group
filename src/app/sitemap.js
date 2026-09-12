export const dynamic = 'force-static'

import { CONTACT } from '../data/site'

export default function sitemap() {
  return [{ url: new URL('/', process.env.SITE_URL || CONTACT.websiteHref).href }]
}
