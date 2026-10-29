// ─────────────────────────────────────────────────────────────
// PORT NETWORK — client-supplied list (§8 of brief)
// Confirm spelling, duplicates and current service availability
// before publishing. Do not add ports not approved by the client.
// ─────────────────────────────────────────────────────────────

export const indianPorts = [
  { name: 'Chennai',        note: 'East coast – Tamil Nadu' },
  { name: 'Ennore',         note: 'East coast – Tamil Nadu' },
  { name: 'Kattupalli',     note: 'East coast – Tamil Nadu' },
  { name: 'Karaikal',       note: 'East coast – Tamil Nadu' },
  { name: 'Nagapattinam',   note: 'East coast – Tamil Nadu' },
  { name: 'Tuticorin',      note: 'East coast – Tamil Nadu' },
  { name: 'Cochin',         note: 'West coast – Kerala' },
  { name: 'Visakhapatnam',  note: 'East coast – Andhra Pradesh' },
  { name: 'Gangavaram',     note: 'East coast – Andhra Pradesh' },
  { name: 'Kakinada',       note: 'East coast – Andhra Pradesh' },
  { name: 'Krishnapatnam',  note: 'East coast – Andhra Pradesh' },
  { name: 'Haldia',         note: 'East coast – West Bengal' },
  { name: 'Kolkata',        note: 'East coast – West Bengal' },
  { name: 'Paradip',        note: 'East coast – Odisha' },
  { name: 'Goa',            note: 'West coast – Goa' },
  { name: 'Mangalore',      note: 'West coast – Karnataka' },
  { name: 'New Mangalore',  note: 'West coast – Karnataka' },
  { name: 'Belekeri',       note: 'West coast – Karnataka' },
  { name: 'Mumbai',         note: 'West coast – Maharashtra' },
  { name: 'Nhava Sheva',    note: 'West coast – Maharashtra' },
  { name: 'Revdanda',       note: 'West coast – Maharashtra' },
  { name: 'Kandla',         note: 'West coast – Gujarat' },
  { name: 'Mundra',         note: 'West coast – Gujarat' },
  { name: 'Sikka',          note: 'West coast – Gujarat' },
  { name: 'Vadinar',        note: 'West coast – Gujarat' },
  { name: 'Dahej',          note: 'West coast – Gujarat' },
  { name: 'Navlakhi',       note: 'West coast – Gujarat' },
  { name: 'Pipavav',        note: 'West coast – Gujarat' },
  { name: 'Port Blair',     note: 'Andaman & Nicobar Islands' },
]

export const panamaPorts = [
  { name: 'Balboa',       note: 'Pacific approach' },
  { name: 'Cristóbal',    note: 'Atlantic approach' },
  { name: 'Manzanillo',   note: 'Atlantic – Colón' },
  { name: 'Colón',        note: 'Atlantic approach' },
]

// Regions covered via trusted correspondents and agents.
// No permanent office or guaranteed service in every country implied.
export const internationalNetwork = [
  'China',
  'Brazil',
  'UAE',
  'Egypt',
  'Indonesia',
  'Peru',
]

// Featured ports shown on the Home page (keep short — full list on Ports page)
export const homeFeaturedIndia = [
  'Chennai', 'Mumbai', 'Nhava Sheva', 'Cochin', 'Visakhapatnam',
  'Kandla', 'Mundra', 'Haldia', 'Kolkata', 'Tuticorin',
]

export const homeFeaturedPanama = [
  'Balboa', 'Cristóbal', 'Manzanillo', 'Colón',
]
