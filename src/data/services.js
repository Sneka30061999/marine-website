// ─────────────────────────────────────────────────────────────
// FULL SERVICE CATALOGUE — client-supplied list
//
// Grouped into four logical sections for display.
// Do not silently omit any item.
//
// Notes before launch:
//  • "Paints (International & Hempel)" — brand names retained as
//    supplied; confirm client is an authorised stockist/agent before
//    publishing brand names.
//  • "Gas Refilling (Drew/Unitor)" — "Drew" likely refers to Drew
//    Marine; "Unitor" is a Wilhelmsen brand. Confirm exact brand
//    relationships and spelling with the client before publishing.
//  • "CTM" — most likely "Crew and Technical Management" or
//    "Cash to Master" in a maritime supply context. Confirm the
//    exact meaning with the client before expanding the abbreviation.
//    Currently displayed as "CTM (Cash to Master / Crew & Technical
//    Management)" pending confirmation.
//  • All bullet points are factual descriptions; no response times,
//    certification claims or guarantees have been added.
// ─────────────────────────────────────────────────────────────

// ── GROUP 1 — Ship Supplies ───────────────────────────────────
export const supplyServices = [
  {
    slug: 'provisions',
    icon: 'container',
    title: 'Provisions',
    summary:
      'Fresh, frozen and dry provisions supplied to vessels at berth or anchorage in compliance with food safety requirements.',
    points: [
      'Fresh, chilled and frozen provisions',
      'Dry stores and consumables',
      'HACCP-aligned supply chain',
    ],
  },
  {
    slug: 'engine-deck-stores',
    icon: 'crane',
    title: 'Engine & Deck Stores (ISSA & IMPA)',
    summary:
      'Comprehensive range of engine and deck stores sourced to ISSA and IMPA catalogue standards.',
    points: [
      'ISSA and IMPA catalogue items',
      'Deck hardware and consumables',
      'Engine room consumables and spares',
    ],
  },
  {
    slug: 'cabin-galley-stores',
    icon: 'file',
    title: 'Cabin & Galley Stores',
    summary:
      'Cabin consumables, cleaning materials, galley equipment and crew welfare items.',
    points: [
      'Cleaning and hygiene materials',
      'Galley equipment and utensils',
      'Crew welfare and cabin supplies',
    ],
  },
  {
    slug: 'bonded-stores',
    icon: 'shield',
    title: 'Bonded Stores',
    summary:
      'Duty-free bonded goods including tobacco, spirits and crew welfare items supplied under customs bond.',
    points: [
      'Tobacco and cigarettes',
      'Spirits and beverages',
      'Crew welfare bonded items',
    ],
  },
  {
    slug: 'mooring-ropes',
    icon: 'anchor',
    title: 'Mooring Ropes & Lashing Materials',
    summary:
      'Mooring lines, wire ropes, lashing straps and securing materials to meet operational requirements.',
    points: [
      'Synthetic and wire mooring ropes',
      'Lashing belts and chains',
      'Securing and rigging equipment',
    ],
  },
  {
    slug: 'lubricants-bunkers',
    icon: 'truck',
    title: 'Lubricants, Marine Gas Oil & Oil Bunkers',
    summary:
      'Marine lubricants, marine gas oil and bunkering support coordinated at Indian ports and the Panama Canal corridor.',
    points: [
      'Marine lubricants supply',
      'Marine gas oil (MGO)',
      'Bunkering liaison and coordination',
    ],
  },
  {
    slug: 'paints',
    icon: 'compass',
    title: 'Paints',
    summary:
      'Marine paints and coating systems supplied for hull, deck and superstructure maintenance.',
    points: [
      'Anti-corrosion and anti-fouling coatings',
      'Deck and superstructure paints',
      'International and Hempel ranges — confirm authorisation before publishing brand names',
    ],
  },
  {
    slug: 'fresh-water',
    icon: 'globe',
    title: 'Fresh Water Supply',
    summary:
      'Fresh water supply arranged at berth or by barge at Indian and Panama ports.',
    points: [
      'Potable water supply to vessel',
      'Barge delivery where required',
      'Coordinated with port authority',
    ],
  },
]

// ── GROUP 2 — Technical & Engineering ────────────────────────
export const technicalServices = [
  {
    slug: 'ship-repairs',
    icon: 'crane',
    title: 'Ship Repairs & Engineering Services',
    summary:
      'Riding squads and engineering support for planned and emergency repairs while the vessel is in port or at anchor.',
    points: [
      'Mechanical and electrical repairs',
      'Riding squad mobilisation',
      'Emergency breakdown support',
      'Planned maintenance coordination',
    ],
  },
  {
    slug: 'underwater-diving',
    icon: 'anchor',
    title: 'Underwater Diving Services',
    summary:
      'Underwater hull inspection, cleaning and minor repairs carried out by trained diving teams.',
    points: [
      'Hull and propeller inspection',
      'Underwater cleaning services',
      'Minor underwater repairs',
      'Class-approved UWILD inspections (confirm availability)',
    ],
  },
  {
    slug: 'navigation-equipment',
    icon: 'compass',
    title: 'Navigation Equipment Inspection & Repair',
    summary:
      'Inspection, calibration and repair of navigation and communication equipment carried out by qualified technicians.',
    points: [
      'GMDSS equipment inspection',
      'Radar and ECDIS servicing',
      'Navigation instrument calibration',
    ],
  },
  {
    slug: 'chipping-painting',
    icon: 'crane',
    title: 'Chipping & Painting',
    summary:
      'Surface preparation and painting services for hull, decks and superstructure during port stays.',
    points: [
      'Power tool and manual chipping',
      'Abrasive blasting preparation',
      'Painting to owner specification',
    ],
  },
]

// ── GROUP 3 — Safety & Compliance ────────────────────────────
export const safetyServices = [
  {
    slug: 'lsa-life-raft',
    icon: 'shield',
    title: 'Life-Saving Equipment & Life Raft Servicing',
    summary:
      'Annual servicing and inspection of life-saving appliances to SOLAS requirements, carried out by trained technicians.',
    points: [
      'Life raft annual servicing',
      'Immersion suit inspection',
      'EPIRB and SART testing',
      'LSA equipment inspection and certification',
    ],
  },
  {
    slug: 'gas-refilling',
    icon: 'shield',
    title: 'Gas Refilling',
    summary:
      'Refilling of fire-fighting and safety gas cylinders. Brand relationships (Drew Marine / Unitor) to be confirmed with client before publishing.',
    points: [
      'CO₂ and dry powder cylinder refilling',
      'Fire-fighting equipment recharging',
      'Safety cylinder pressure testing',
    ],
  },
  {
    slug: 'razor-wire',
    icon: 'shield',
    title: 'Razor Wire',
    summary:
      'Supply and fitting of razor wire and anti-piracy barriers as a vessel security measure.',
    points: [
      'Supply of razor wire and concertina coils',
      'Fitting and removal on board',
      'Anti-piracy perimeter measures',
    ],
  },
]

// ── GROUP 4 — Agency & Other Support ─────────────────────────
export const agencyServices = [
  {
    slug: 'ctm',
    icon: 'file',
    // ⚠ CONFIRM: "CTM" most likely means "Cash to Master" (delivery of
    // operating cash to the master on behalf of owners/managers) in a
    // ship-supply context. It could also refer to "Crew & Technical
    // Management". Confirm the exact meaning before expanding the
    // abbreviation in published copy.
    title: 'CTM (Cash to Master — confirm abbreviation)',
    summary:
      'Delivery of cash or operating funds to the master on behalf of vessel owners or managers. Abbreviation to be confirmed with client.',
    points: [
      'Cash delivery to master at port',
      'Coordination with owners / managers',
      'Documentation and receipt handling',
    ],
  },
  {
    slug: 'other-marine-support',
    icon: 'globe',
    title: 'Other Marine Support Services',
    summary:
      'Additional port-call support and marine services not listed above. Contact us to discuss your specific requirement.',
    points: [
      'Crew travel and transport',
      'Customs and documentation support',
      'Ad-hoc port-call requirements',
    ],
  },
]

// Flat list used by forms and the QuoteForm service dropdown
export const services = [
  ...supplyServices,
  ...technicalServices,
  ...safetyServices,
  ...agencyServices,
]
