// ─────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH — client-supplied content
//
// Items marked ⚠ CONFIRM BEFORE LAUNCH need written sign-off
// from the client before going live.
// ─────────────────────────────────────────────────────────────

export const site = {
  // ⚠ CONFIRM: legal / trading name to appear in browser tab + footer
  name: 'Globus International Marine Services',
  shortName: 'Globus IMS',
  tagline: 'Dependable maritime agency and logistics across India and Panama.',

  nav: [
    { label: 'Home',             to: '/' },
    { label: 'About Us',         to: '/about' },
    { label: 'Services',         to: '/services' },
    { label: 'Ports & Locations',to: '/ports-locations' },
    { label: 'Contact Us',       to: '/contact' },
  ],

  // Primary enquiry destination — all forms submit here.
  // ⚠ CONFIRM before launch; currently set to India supply email.
  enquiryEmail: 'quotes@globusmarine.com',

  // Set to a URL string once a privacy policy page exists, e.g. '/privacy'.
  // Leave as null to hide the footer privacy link.
  privacyPolicyUrl: null,

  offices: [
    {
      region: 'India',
      // ⚠ CONFIRM: exact registered address before publishing
      city: 'Chennai, India',
      address: [
        'Narima Point/Fort District,Mumbai,India',
        '⚠ Full address to be confirmed',
      ],
      // Client-supplied — ⚠ confirm before launch
      phone: '+91 22 2284-SHIP',
      whatsapp: '+91 ',  // same number — add WA link in UI
      // Two emails supplied; both shown. ⚠ Confirm sgp.supply address consistency.
      email: 'ops@globusmarine.com',
      emailAlt: 'quotes@globusmarine.com',
      // ⚠ CONFIRM operating hours
      hours: 'Mon – Sat, 09:00 – 18:00 IST',
    },
    {
      region: 'Panama',
      // ⚠ CONFIRM: exact branch address before publishing
      city: 'Balboa, Panama',
      address: [
        'Balboa Port Road,Building 39,Panama City,Rep of Panama',
        '⚠ Full address to be confirmed',
      ],
      phone: '+507 833-PORT/+507 314-CANAL',
      whatsapp: '+507 6539 5306', // WhatsApp confirmed in brief
      // ⚠ CONFIRM: brief notes sgp.supply@ may be inconsistent — verify
      email: 'sgp.supply@globus-ims.com',
      emailAlt: 'globus-ims@hotmail.com',
      // ⚠ CONFIRM operating hours
      hours: 'Mon – Fri, 08:00 – 17:00 EST',
    },
  ],

  // Certifications — client-supplied (ISO 9001:2015, HACCP, ISO 14001:2015)
  // Pics 3,4,5,7 removed as instructed; only 1, 2, 6 retained.
  certifications: [
    {
      name: 'ISO 9001:2015',
      issuer: 'Quality Management System',
      year: '2015',
      description: 'Certified Quality Management System for the supply of ship provisions, deck/engine stores and related marine services.',
      color: 'ocean',
    },
    {
      name: 'HACCP',
      issuer: 'Hazard Analysis & Critical Control Point',
      year: '',
      description: 'HACCP certification for the supply of food/dry provisions and ship stores as per IAS/FIFS specifications at Indian ports.',
      color: 'ocean',
    },
    {
      name: 'ISO 14001:2015',
      issuer: 'Environmental Management System',
      year: '2015',
      description: 'Certified Environmental Management System for the supply of fresh, dry and general marine provisions and ship stores.',
      color: 'ocean',
    },
  ],

  // Mission / vision / values rendered ONLY when approved === true.
  statement: {
    approved: false,
    mission: '',
    vision: '',
    values: [],
  },

  // Capability statements — general only; no unverified claims.
  trustPoints: [
    {
      icon: 'clock',
      title: 'Responsive operations desk',
      text: 'Operations contacts available around vessel schedules.',
    },
    {
      icon: 'shield',
      title: 'Compliance first',
      text: 'Port, customs and statutory documentation handled with care.',
    },
    {
      icon: 'globe',
      title: 'Two-region presence',
      text: 'Positioned in India and the Panama Canal corridor.',
    },
    {
      icon: 'file',
      title: 'Clear reporting',
      text: 'Transparent updates and itemised costs at every stage.',
    },
  ],
}
