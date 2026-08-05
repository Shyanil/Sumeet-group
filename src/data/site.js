/**
 * Single source of truth for brand-level strings and shared assets.
 * Header, Hero and Footer all read from here so a rename stays a one-line change.
 */

export const BRAND = 'Sumeet Group'
export const TAGLINE = 'Raipur · Chhattisgarh'

export const LOGO = './Assets/LOGO (with source file)/logo.png'
export const BROCHURE = './Assets/Brochure/STC BROCHURE.pdf'
export const BROCHURE_FILENAME = 'Sumeet-Group-Brochure.pdf'

export const ADDRESS = 'Pachpedi Naka Chowk, Raipur, Chhattisgarh'
export const ADDRESS_LINES = ['Pachpedi Naka Chowk', 'Raipur, Chhattisgarh']
export const MAP_DIRECTIONS =
  'https://www.google.com/maps/dir/?api=1&destination=Pachpedi%20Naka%20Chowk%2C%20Raipur%2C%20Chhattisgarh'

/* TODO — placeholder enquiry details. Swap for the real phone / email before launch. */
export const PHONE = '+91 00000 00000'
export const PHONE_HREF = 'tel:+910000000000'
export const EMAIL = 'info@sumeetgroup.in'

export const PROJECT_FACTS = '3 Towers · G+7 Floors · Vastu Compliant · RERA Registered'

export const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Why Choose Us', href: '#why-stc' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Master Plan', href: '#master-plan' },
  { label: 'Location', href: '#location' },
]

/** Force a download rather than letting the browser open the PDF inline. */
export function downloadBrochure(event) {
  if (event) event.preventDefault()
  const link = document.createElement('a')
  link.href = BROCHURE
  link.download = BROCHURE_FILENAME
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/** Smooth-scroll to an in-page anchor, falling back to the top of the page. */
export function scrollToSection(href) {
  const target = href && href !== '#home' ? document.querySelector(href) : null
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
