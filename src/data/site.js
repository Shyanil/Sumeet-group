/**
 * Brand-level strings and shared assets.
 *
 * Sources: the Sumeet Urban Nest brochure (15.05.2026) for contact details and
 * the group profile, the STC brochure and site for Trade Centre facts.
 * Anything not confirmed by those documents is marked TODO rather than invented.
 */

export const BRAND = {
  name: 'Sumeet Group',
  legal: 'Sumeet Infracon Pvt. Ltd.',
  city: 'Raipur',
  state: 'Chhattisgarh',
  tagline: 'Raipur · Chhattisgarh',
  promise: 'Building spaces that inspire better living.',
}

export const LOGO = {
  lockup: '/Assets/Brand/sumeet-group-lockup.png',
  reversed: '/Assets/Brand/sumeet-group-lockup-reversed.png',
  mark: '/Assets/Brand/sumeet-group-mark.png',
}

export const CONTACT = {
  phone: '+91 7247 724 758',
  phoneHref: 'tel:+917247724758',
  email: 'sales@sumeetinfraventurs.com',
  emailHref: 'mailto:sales@sumeetinfraventurs.com',
  website: 'sumeetinfraventures.com',
  websiteHref: 'https://sumeetinfraventures.com',
  hours: 'Mon–Sun, 10am–7pm',
  office: {
    label: 'Corporate office',
    lines: ['Sumeet Business Park, Pachpedi Naka', 'Raipur (Chhattisgarh) — 492001'],
    mapHref:
      'https://www.google.com/maps/search/?api=1&query=Sumeet%20Business%20Park%2C%20Pachpedi%20Naka%2C%20Raipur',
  },
}

/**
 * Group-level track record.
 *
 * Every figure here is countable from the portfolio or stated in the
 * brochures. The design system's sample data carried a founding year and a
 * sq-ft-delivered number that its own caveats flag as placeholders, so those
 * are deliberately absent — add them once the client confirms.
 */
export const GROUP_STATS = [
  { value: '4', label: 'Landmark projects' },
  { value: '3', label: 'Categories', sub: 'Homes · Commercial · Plotted' },
  { value: '2', label: 'Now selling' },
  { value: '100%', label: 'RERA registered' },
]

export const NAV = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export const RERA_PORTAL = 'https://rera.cgstate.gov.in'
