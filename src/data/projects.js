/**
 * The Sumeet Group portfolio.
 *
 * Content is drawn from the two project brochures:
 *   · Sumeet Urban Nest Brochure, 15.05.2026 (40pp)
 *   · Sumeet Trade Centre brochure + the approved STC renders
 *
 * Neither brochure quotes a price, so `price` reads "Price on request"
 * throughout — no figure is invented. Swap in real numbers when sales
 * confirms them.
 */

const SUN = '/Assets/Sumeet Urban Nest (SUN)/renders'
const STC = '/Assets/3D Images'

export const PROJECTS = [
  /* ==========================================================
     Sumeet Urban Nest — Khamardih / Shankar Nagar
     ========================================================== */
  {
    slug: 'sumeet-urban-nest',
    name: 'Sumeet Urban Nest',
    shortName: 'Urban Nest',
    category: 'Residential',
    status: 'upcoming',
    locality: 'Khamardih, Raipur',
    kicker: "Shankar Nagar's first BOHK homes",

    cover: `${SUN}/exterior-day.webp`,
    coverAlt: 'Sumeet Urban Nest, street elevation by day',
    hero: `${SUN}/entrance-arrival.webp`,
    heroAlt: 'The arrival court at Sumeet Urban Nest at dusk',

    blurb: '2 & 3 BHK homes where an outdoor room extends the floor plan, on 1.76 acres off Shankar Nagar.',
    tagline:
      'A home that does not end at the wall. The BOHK plan adds an outdoor room to every residence, so light, air and the open sky become part of the floor plan rather than a view from it.',

    price: 'Price on request',
    priceUnit: '2 & 3 BHK',

    cardSpecs: [
      { label: 'Config', value: '2 & 3 BHK' },
      { label: 'Homes', value: '140' },
    ],

    specs: [
      { label: 'Configuration', value: '2 & 3 BHK' },
      { label: 'Land parcel', value: '1.76 acres' },
      { label: 'Towers', value: '3 blocks' },
      { label: 'Residences', value: '140' },
    ],

    concept: {
      eyebrow: 'The idea',
      title: 'BHK keeps life inside. <em>BOHK</em> lets it flow outside.',
      lede: 'Bedroom + Outdoor Room + Hall + Kitchen. The outdoor room is not a balcony bolted on at the end. It is planned as a room, and it changes what every other room can be.',
      pairs: [
        ['Indoor kids’ play area', 'Podium kids’ play'],
        ['Treadmill walk in the gym', 'Jogging tracks outside'],
        ['Indoor games room', 'Evening swim on the rooftop'],
        ['A balcony view', 'Late-night playtime sessions'],
      ],
    },

    quote: {
      text: 'We didn’t begin by drawing walls, we began by imagining how life should feel inside them. Homes should not end at enclosed rooms. They should extend into light, air and openness.',
      by: 'Stellar Design Studio · Architects',
    },

    highlights: [
      [
        'Low density',
        '140 residences across 1.76 acres and three blocks. Fewer homes per floor, so lobbies stay quiet and lifts stay free.',
      ],
      [
        'Light and cross ventilation',
        'Every home is planned to pull daylight deep into the plan and move air through it, right the way across the day.',
      ],
      [
        'Vaastu compliant',
        'Efficient space planning to Vaastu principles, with a gated, secure boundary and a single controlled entrance.',
      ],
      [
        'Three tiers of open space',
        'A landscaped courtyard at grade, a podium level for everyday play and walks, and a rooftop for the evening sky.',
      ],
    ],

    amenityGroups: [
      {
        title: 'The Air Club',
        items: ['Swimming pool', 'Gymnasium', 'Yoga room', 'Indoor games', 'Community / multipurpose hall'],
      },
      {
        title: 'Courtyard & podium',
        items: [
          'Landscaped garden',
          'Walking / jogging track',
          'Children’s play area',
          'Open recreational zones',
          'Seating areas',
          'Temple',
        ],
      },
      {
        title: 'Rooftop',
        items: ['Jogging / walking track', 'Seating & relaxation areas', 'Open sky recreation zones'],
      },
      {
        title: 'Security',
        items: [
          '24×7 security',
          'CCTV in common areas',
          'CCTV at the entrance gate',
          'Gated community security system',
        ],
      },
      {
        title: 'Infrastructure',
        items: [
          'Sewage treatment plant',
          'Rainwater harvesting',
          'Firefighting system as per norms',
          'Emergency exit staircase',
          'Power backup for common areas',
          'Provision for passenger lift',
        ],
      },
    ],

    connectivity: {
      eyebrow: 'Connectivity',
      title: 'The city settles closer, without <em>closing in</em> on you.',
      lede: 'Step out to the city’s key destinations, yet come home to a life that feels calm and complete.',
      places: [
        { place: 'Expressway', dist: '1.8 km' },
        { place: 'SMC Hospital', dist: '2.1 km' },
        { place: 'Civil Lines', dist: '3.7 km' },
        { place: 'Ambuja Mall', dist: '3.8 km' },
        { place: 'Pandri', dist: '3.9 km' },
        { place: 'Raipur Railway Station', dist: '6.8 km' },
        { place: 'Swami Vivekananda Airport', dist: '13.7 km' },
      ],
    },

    gallery: [
      { src: `${SUN}/entrance-arrival.webp`, caption: 'Arrival court' },
      { src: `${SUN}/exterior-day.webp`, caption: 'Street elevation' },
      { src: `${SUN}/aerial-twilight.webp`, caption: 'Aerial view' },
      { src: `${SUN}/podium-courtyard.webp`, caption: 'Podium courtyard' },
      { src: `${SUN}/kids-play.webp`, caption: 'Children’s play area' },
      { src: `${SUN}/balcony-view.webp`, caption: 'The outdoor room' },
      { src: `${SUN}/rooftop-terrace.webp`, caption: 'Rooftop terrace' },
      { src: `${SUN}/swimming-pool.webp`, caption: 'Swimming pool' },
      { src: `${SUN}/terrace-walk.webp`, caption: 'Terrace walk' },
      { src: `${SUN}/gymnasium.webp`, caption: 'Gymnasium' },
      { src: `${SUN}/yoga-room.webp`, caption: 'Yoga room' },
      { src: `${SUN}/community-hall.webp`, caption: 'Community hall' },
      { src: `${SUN}/indoor-games.webp`, caption: 'Indoor games room' },
      { src: `${SUN}/living-room.webp`, caption: 'Living room' },
      { src: `${SUN}/bedroom.webp`, caption: 'Bedroom' },
    ],

    plans: [
      { src: `${SUN}/top-plan-view.webp`, caption: 'Site plan, top view', note: 'Whole site' },
      { src: `${SUN}/plan-typical-floor.webp`, caption: 'Block A & B typical floor', note: '1st to 8th' },
      { src: `${SUN}/plan-block-a.webp`, caption: 'Block A unit plans', note: 'Typical' },
      { src: `${SUN}/plan-block-b.webp`, caption: 'Block B unit plans', note: 'Typical' },
      { src: `${SUN}/plan-block-c.webp`, caption: 'Block C unit plans', note: 'Typical' },
    ],

    specification: [
      {
        k: 'Flooring',
        v: [
          '800×1600 mm vitrified tiles in living, dining and drawing',
          'Wooden flooring in the master bedroom',
          'Vitrified tiles (600×1200 or 600×600) in other rooms',
          'Anti-skid tiles in balcony and wash area',
        ],
      },
      {
        k: 'Doors',
        v: ['Wood frame with waterproof flush door, veneer finish at the main door and laminate finish elsewhere'],
      },
      { k: 'Windows', v: ['Aluminium sliding windows with mosquito net'] },
      {
        k: 'Kitchen',
        v: [
          'Quartz full-body platform, compatible with a modular kitchen',
          'Electrical provision for refrigerator, chimney, water purifier and microwave',
          'Plumbing provision for sink mixture, water purifier and washing machine',
        ],
      },
      {
        k: 'Toilets',
        v: [
          '600×1200 mm vitrified tiles with dado up to 8 ft, 600×600 mm on the floor',
          'Single-lever diverter in the shower area',
          'Wall-hung WC and counter-top wash basin',
          'Points for geyser, exhaust fan and mirror light',
        ],
      },
      {
        k: 'Electrical',
        v: [
          'Points provided as per the standard furniture layout',
          'TV and AC points in every bedroom and the living room',
          'Fire-retardant cables and modular switches of reputed brands',
        ],
      },
      {
        k: 'Wall finish',
        v: ['Cement-base wall putty finished with primer on interior walls', 'Weatherproof emulsion on exterior walls'],
      },
    ],

    rera: {
      number: 'PCGRERA190326002064',
      portal: 'https://rera.cgstate.gov.in',
    },

    siteAddress: 'Khamardih, Raipur, Chhattisgarh',
    /** The 414 MB source brochure is too heavy to ship — see README. */
    brochure: null,

    partners: [
      ['Architect', 'Stellar Design Studio, a multidisciplinary architecture and interior practice founded in 2014.'],
      ['Brand consultant', 'Be the Bee, brand and communication for the project.'],
    ],
  },

  /* ==========================================================
     Sumeet Trade Centre — Pachpedi Naka
     ========================================================== */
  {
    slug: 'sumeet-trade-centre',
    name: 'Sumeet Trade Centre',
    shortName: 'Trade Centre',
    category: 'Commercial',
    status: 'construction',
    locality: 'Pachpedi Naka, Raipur',
    kicker: "Raipur's first ultra-premium corporate hub",

    cover: `${STC}/VIEW_001_ELEVATION_TWILIGHT_2025.01.15_HIRES_FINAL.webp`,
    coverAlt: 'Sumeet Trade Centre, the three towers at twilight',
    hero: `${STC}/VIEW_002_ELEVATION_DUSK_2025.01.15_HIRES_FINAL.webp`,
    heroAlt: 'Sumeet Trade Centre elevation at dusk',

    blurb: 'Three towers of glass-fronted offices and shopfronts at Raipur’s busiest commercial junction.',
    tagline:
      'An address that introduces you before you do. Three towers at Pachpedi Naka Chowk, planned around a landscaped plaza. Offices above, shopfronts at the street, and a terrace that gives the working day somewhere to go.',

    price: 'Price on request',
    priceUnit: 'Offices & retail',

    cardSpecs: [
      { label: 'Towers', value: '3' },
      { label: 'Floors', value: 'G+7' },
    ],

    specs: [
      { label: 'Type', value: 'Office & retail' },
      { label: 'Towers', value: '3' },
      { label: 'Floors', value: 'G+7' },
      { label: 'Location', value: 'Pachpedi Naka' },
    ],

    quote: {
      text: 'Raipur’s first ultra-premium corporate hub, built on quality construction, modern amenities and a location that gives businesses seamless connectivity and lasting value.',
      by: 'Sumeet Infracon',
    },

    highlights: [
      [
        'The junction',
        'Pachpedi Naka Chowk is where Raipur’s commercial traffic already converges. The footfall arrives before you open.',
      ],
      [
        'Glass and shade',
        'A sleek glazed facade with deep vertical fins: daylight into every floor plate without the heat load that usually comes with it.',
      ],
      [
        'Flexible floor plates',
        'Retail at the street, customisable office floors above, and a plaza that keeps the ground level open rather than walled off.',
      ],
      [
        'Vastu compliant',
        'Planned to Vastu principles and RERA registered, with the paperwork explained plainly before you commit.',
      ],
    ],

    amenityGroups: [
      {
        title: 'The building',
        items: [
          'Glass facade',
          'VRV HVAC',
          'Double-height lobby',
          'High-speed lifts',
          'Power backup',
          '24×7 security',
        ],
      },
      {
        title: 'Shared spaces',
        items: [
          'Landscaped plaza',
          'Water body',
          'Terrace party lawn',
          'Terrace cabana',
          'Conference facilities',
          'Ample parking',
        ],
      },
    ],

    connectivity: {
      eyebrow: 'The address',
      title: 'At the centre of gravity, by <em>design</em>.',
      lede: 'Pachpedi Naka Chowk sits where the city’s arterial roads meet, which is exactly why a commercial address belongs here.',
      places: [
        { place: 'Pachpedi Naka Chowk', dist: 'At the door' },
        { place: 'Civil Lines', dist: '3 km' },
        { place: 'Raipur Railway Station', dist: '5 km' },
        { place: 'Swami Vivekananda Airport', dist: '12 km' },
      ],
      /** Distances are approximate road distances from the junction. */
      approx: true,
    },

    gallery: [
      { src: `${STC}/VIEW_001_ELEVATION_TWILIGHT_2025.01.15_HIRES_FINAL.webp`, caption: 'Elevation at twilight' },
      { src: `${STC}/VIEW_002_ELEVATION_DUSK_2025.01.15_HIRES_FINAL.webp`, caption: 'Elevation at dusk' },
      { src: `${STC}/VIEW_019_AERIAL_VIEW_TWILIGHT_2025.01.15_HIRES_FINAL.webp`, caption: 'Aerial view' },
      { src: `${STC}/VIEW_006_FRONT_PLAZA_DUSK_2025.01.15_HIRES_FINAL.webp`, caption: 'Front plaza' },
      { src: `${STC}/VIEW_010_MIDDLE_PLAZA_AREA_DAY_2025.01.21_HIRES.webp`, caption: 'Middle plaza' },
      { src: `${STC}/Waterbody+Plaza Area.webp`, caption: 'Water body & plaza' },
      { src: `${STC}/VIEW_012_DROP-OFF_TWILIGHT_2025.01.17_HIRES_FINAL.webp`, caption: 'Drop-off' },
      { src: `${STC}/LOBBY_AREA_2025.01.17_HIRES_FINAL.webp`, caption: 'Lobby' },
      { src: `${STC}/RECEPTION_AREA_CAM_2025.01.17_HIRES _FINAL.webp`, caption: 'Reception' },
      { src: `${STC}/WORKSTATION_2025.01.17_HIRES _FINAL.webp`, caption: 'Workstations' },
      { src: `${STC}/CABIN_VIEW_2025.01.17_HIRES _FINAL.webp`, caption: 'Cabin' },
      { src: `${STC}/CONFERENCE_VIEW_2025.01.17_HIRES _FINAL.webp`, caption: 'Conference room' },
      { src: `${STC}/VIEW_013_TERRACE_PARTY_LAWN_DUSK_2025.01.02_HIRES_FINAL.webp`, caption: 'Terrace party lawn' },
      { src: `${STC}/VIEW_016_TERRACE_CABANA_TWILIGHT_2025.01.15_HIRES_FINAL.webp`, caption: 'Terrace cabana' },
      { src: `${STC}/Aeriel View Night Light.webp`, caption: 'Night elevation' },
    ],

    plans: [
      { src: `${STC}/plan_section_1.webp`, caption: 'Master plan', note: 'Site' },
      { src: `${STC}/plan_section_2.webp`, caption: 'Floor plate', note: 'Typical' },
    ],

    specification: null,

    rera: {
      /** TODO — confirm the STC registration number before launch. */
      number: null,
      portal: 'https://rera.cgstate.gov.in',
    },

    siteAddress: 'Pachpedi Naka Chowk, Raipur, Chhattisgarh',
    brochure: {
      href: '/Assets/Brochure/STC BROCHURE.pdf',
      filename: 'Sumeet-Trade-Centre-Brochure.pdf',
    },

    partners: null,
  },
]

/** Past deliveries named in the Sumeet Urban Nest brochure's developer note. */
/**
 * Delivered and handed over. These have no brochure and no detail page, so
 * they carry a photograph and a line rather than specs, and they point at
 * the portfolio page instead of a project route.
 *
 * `coverPosition` matters here in a way it does not for the renders above:
 * both photographs are wide (16:9 and a 2.2:1 panorama) and the home page
 * crops them into portrait cards, so the framing is set per image rather
 * than left at centre — which would hold nothing but sky.
 */
export const PAST_PROJECTS = [
  {
    name: 'Sumeet City of Dreams',
    category: 'Residential',
    note: 'A residential development that set the group’s benchmark for planning and finish.',
    cover: '/Assets/Sumeet City Of Dreams/sumeet_city_of_dreams.webp',
    coverAlt: 'The completed towers at Sumeet City of Dreams',
    coverPosition: '52% 50%',
  },
  {
    name: 'Sumeet Landscape',
    category: 'Plotted',
    note: 'Plotted land with wide roads and underground services, sold on clear title.',
    cover: '/Assets/Sumeet Landscape/SumeetLandscape_img.webp',
    coverAlt: 'The entrance avenue and signage at Sumeet Landscape',
    coverPosition: '26% 50%',
  },
]

export const findProject = (slug) => PROJECTS.find((p) => p.slug === slug)

export const CATEGORIES = ['All', 'Residential', 'Commercial']
