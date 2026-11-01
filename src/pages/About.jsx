/**
 * About Us page
 * Layout matches the reference screenshot:
 *  1. Navy ocean-photo hero with breadcrumb + title
 *  2. Yellow quick-link tab strip (Ship Supplies / Ship Services)
 *  3. Two-column intro — text left, two stacked ship photos right
 *  4. Capabilities grid
 *  5. Operating regions
 *  6. Mission/vision (only if approved)
 *  7. Certifications (only if supplied)
 *  8. CTA banner
 */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { site } from '../config/site.js'
import useMeta from '../hooks/useMeta.js'
import Button from '../components/ui/Button.jsx'
import Icon from '../components/ui/Icon.jsx'
import heroBgImg from '../assets/hero-bg.jpg'

/* ── Quick-link tabs (reference screenshot) ──────────────── */
const tabs = [
  { id: 'supplies',  icon: 'container', label: 'Ship Supplies',  href: '/services#ship-supplies' },
  { id: 'services',  icon: 'anchor',    label: 'Ship Services',  href: '/services#technical' },
]

/* ── Capabilities list ───────────────────────────────────── */
const capabilities = [
  {
    icon: 'anchor',
    title: 'Port call management',
    text: 'Pre-arrival planning, berth liaison, pilotage coordination and port clearance support for every call.',
  },
  {
    icon: 'container',
    title: 'Ship chandling & stores',
    text: 'Provisions, engine & deck stores, bonded goods and consumables delivered to any berth or anchorage.',
  },
  {
    icon: 'crane',
    title: 'Repairs & technical',
    text: 'Riding squads for mechanical repairs, underwater diving, navigation equipment and safety servicing.',
  },
  {
    icon: 'shield',
    title: 'Safety & compliance',
    text: 'Life-raft servicing, LSA inspection, gas refilling and SOLAS safety compliance documentation.',
  },
]

export default function About() {
  const { statement, certifications, offices } = site
  const [activeTab, setActiveTab] = useState('supplies')

  useMeta({
    title: 'About Us | Globus International Marine Services',
    description:
      'Learn about Globus International Marine Services — a maritime ship chandler and agency operating across India and the Panama Canal corridor.',
    canonical: 'https://www.globus-ims.com/about',
  })

  return (
    <>
      {/* ══════════════════════════════════════════════════
          1. HERO — ocean photo background (reference style)
      ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden text-white">
        {/* Ocean background photo */}
        <div aria-hidden="true" className="absolute inset-0">
          <img
            src={heroBgImg}
            alt=""
            loading="eager"
            className="h-full w-full object-cover"
            style={{ objectPosition: 'center 60%' }}
          />
        </div>
        {/* Dark overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: 'rgba(7,27,51,0.70)' }}
        />

        <div className="shell relative z-10 py-14 md:py-20">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1 text-xs text-slate-300">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden="true" className="mx-1 text-slate-500">/</li>
              <li aria-current="page" className="text-white font-medium">About Us</li>
            </ol>
          </nav>

          {/* Page heading */}
          <h1 className="mt-4 text-3xl font-extrabold !text-white sm:text-4xl md:text-5xl">
            About Our Logistics
          </h1>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          2. YELLOW TAB STRIP (reference screenshot exact style)
      ══════════════════════════════════════════════════ */}
      <div className="border-b border-line bg-white">
        <div className="shell">
          <div className="flex items-center gap-0 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                to={tab.href}
                onClick={() => setActiveTab(tab.id)}
                className={[
                  'flex min-w-[130px] flex-col items-center gap-2 border-b-2 px-6 py-4 text-center text-xs font-bold uppercase tracking-wide transition-colors sm:min-w-[160px] sm:flex-row sm:gap-3 sm:text-sm',
                  activeTab === tab.id
                    ? 'border-yellow-400 bg-yellow-400 text-navy'
                    : 'border-transparent text-navy hover:bg-yellow-50 hover:border-yellow-300',
                ].join(' ')}
                aria-current={activeTab === tab.id ? 'page' : undefined}
              >
                <span className={[
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded',
                  activeTab === tab.id ? 'bg-navy text-yellow-400' : 'bg-ice text-ocean',
                ].join(' ')}>
                  <Icon name={tab.icon} className="h-5 w-5" />
                </span>
                <span>{tab.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          3. COMPANY INTRO — text left, two photos right
             (matches reference screenshot layout exactly)
      ══════════════════════════════════════════════════ */}
      <section className="bg-white py-14 md:py-20">
        <div className="shell grid items-start gap-10 xl:grid-cols-2 xl:gap-16">

          {/* Left — company text */}
          <div>
            {/* Yellow company name — matches reference */}
            <p
              className="text-base font-extrabold sm:text-lg"
              style={{ color: '#F5C518' }}
            >
              About {site.name}
            </p>

            {/* Red/orange tagline — matches reference */}
            <p
              className="mt-1 text-sm font-semibold italic"
              style={{ color: '#C0392B' }}
            >
              {site.tagline}
            </p>

            {/* Body text */}
            <p className="mt-5 text-sm leading-relaxed text-muted md:text-base">
              <span className="font-semibold text-navy">{site.name}</span> is a trusted
              name in ship chandling, technical services and maritime logistics across India
              and the Panama Canal corridor. With a dedicated team committed to timely,
              reliable and high-quality service, we are an authorised and dependable partner
              for shipowners and operators.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
              As a government-approved and licensed company in India, our head office is
              based in Chennai. We operate a branch at Balboa, Panama, serving vessels
              transiting the Canal and calling at Pacific and Atlantic anchorages.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
              From technical support and safety equipment to the supply of marine provisions
              and bonded stores, {site.shortName} is proud to be a dependable single-source
              partner for every port call.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/services" arrow>
                Our Services
              </Button>
              <Button to="/contact" variant="outline" arrow>
                Get in touch
              </Button>
            </div>
          </div>

          {/* Right — two overlapping ship photos (reference layout) */}
          <div className="relative mt-6 xl:mt-0">
            {/*
              Two photos stacked with an offset — portrait photo behind (bottom-right),
              landscape photo in front (top-left). Uses Unsplash free images as
              placeholders; replace with client-supplied photography.
            */}
            <div className="relative mx-auto max-w-sm sm:max-w-md xl:max-w-none">

              {/* Photo 1 — portrait (behind, offset right) */}
              <div
                className="absolute right-0 top-0 hidden w-[55%] overflow-hidden rounded border border-line shadow-heavy sm:block xl:w-[52%]"
                aria-hidden="true"
              >
                <div className="aspect-[3/4]">
                  <img
                    src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=85&auto=format&fit=crop"
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* Photo 2 — landscape (front, left, overlapping) */}
              <div className="relative z-10 w-full overflow-hidden rounded border border-line shadow-heavy sm:w-[70%] xl:w-[65%]">
                <div className="aspect-[4/3] sm:aspect-[3/4] xl:aspect-[4/3]">
                  <img
                    src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=85&auto=format&fit=crop"
                    alt="Container vessel at port with cranes"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* Spacer so the absolute card doesn't clip */}
              <div className="hidden sm:block" style={{ paddingTop: '18%' }} aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          4. CAPABILITIES — 4-column icon cards
      ══════════════════════════════════════════════════ */}
      <section className="bg-ice py-14 md:py-20">
        <div className="shell">
          <p className="eyebrow">What we do</p>
          <h2 className="sec-title mt-3 text-2xl font-extrabold text-navy md:text-3xl">
            Core capabilities
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-muted md:text-base">
            Four disciplines, delivered by specialists who understand what a vessel needs
            to turn around on schedule.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {capabilities.map((c) => (
              <div
                key={c.title}
                className="group rounded border border-line bg-white p-6 shadow-card transition-shadow hover:shadow-lift"
              >
                <span className="icon-badge-navy transition-colors duration-200 group-hover:bg-ocean">
                  <Icon name={c.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-sm font-bold text-navy">{c.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          5. OPERATING REGIONS
      ══════════════════════════════════════════════════ */}
      <section className="bg-white py-14 md:py-20">
        <div className="shell">
          <p className="eyebrow">Where we operate</p>
          <h2 className="sec-title mt-3 text-2xl font-extrabold text-navy md:text-3xl">
            Operating regions
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-muted md:text-base">
            Direct offices in India and Panama, with trusted correspondents extending our reach internationally.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {offices.map((o) => (
              <div key={o.region} className="rounded border border-line bg-white p-6 shadow-card">
                <p className="eyebrow">{o.region} office</p>
                <h3 className="mt-3 text-base font-bold text-navy">{o.city}</h3>
                <address className="mt-4 space-y-2.5 not-italic text-sm">
                  {/* Phone — tap-to-call */}
                  <a
                    href={`tel:${o.phone.replace(/[^+\d]/g, '')}`}
                    className="flex items-center gap-2.5 text-muted transition-colors hover:text-ocean"
                    aria-label={`Call ${o.region}: ${o.phone}`}
                  >
                    <Icon name="phone" className="h-4 w-4 shrink-0 text-ocean" />
                    {o.phone}
                  </a>
                  {/* WhatsApp */}
                  {o.whatsapp && (
                    <a
                      href={`https://wa.me/${o.whatsapp.replace(/[^+\d]/g,'').replace(/^\+/,'')}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2.5 text-muted transition-colors hover:text-ocean"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-ocean" fill="currentColor" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.402A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
                      </svg>
                      WhatsApp: {o.whatsapp}
                    </a>
                  )}
                  {/* Primary email */}
                  <a
                    href={`mailto:${o.email}`}
                    className="flex items-center gap-2.5 break-all text-muted transition-colors hover:text-ocean"
                  >
                    <Icon name="mail" className="h-4 w-4 shrink-0 text-ocean" />
                    {o.email}
                  </a>
                  {/* Alternate email */}
                  {o.emailAlt && (
                    <a
                      href={`mailto:${o.emailAlt}`}
                      className="flex items-center gap-2.5 break-all text-muted transition-colors hover:text-ocean"
                    >
                      <Icon name="mail" className="h-4 w-4 shrink-0 text-ocean/50" />
                      {o.emailAlt}
                    </a>
                  )}
                  <p className="flex items-center gap-2.5 text-muted">
                    <Icon name="clock" className="h-4 w-4 shrink-0 text-ocean" />
                    <span className="italic">{o.hours}</span>
                  </p>
                </address>
              </div>
            ))}

            {/* International card */}
            <div className="flex flex-col justify-between rounded border border-navy-600 bg-navy p-6">
              <div>
                <p className="eyebrow !text-sky">International</p>
                <h3 className="mt-3 text-base font-bold !text-white">Partner network</h3>
                <p className="mt-2 text-xs text-slate-300">
                  Trusted correspondents and agents extend our reach to China, Brazil, UAE,
                  Egypt, Indonesia and Peru.
                </p>
              </div>
              <Button to="/ports-locations" variant="ghost" arrow className="mt-6 self-start !text-xs">
                View full network
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          6. MISSION / VISION / VALUES — only if approved
      ══════════════════════════════════════════════════ */}
      {statement.approved && (
        <section className="bg-ice py-14 md:py-20">
          <div className="shell">
            <p className="eyebrow">Our purpose</p>
            <h2 className="sec-title mt-3 text-2xl font-extrabold text-navy md:text-3xl">
              Mission, vision &amp; values
            </h2>
            <div className="mt-10 grid gap-5 xl:grid-cols-3">
              {statement.mission && (
                <div className="rounded border border-line bg-white p-6 shadow-card">
                  <p className="eyebrow">Mission</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{statement.mission}</p>
                </div>
              )}
              {statement.vision && (
                <div className="rounded border border-line bg-white p-6 shadow-card">
                  <p className="eyebrow">Vision</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{statement.vision}</p>
                </div>
              )}
              {statement.values.length > 0 && (
                <div className="rounded border border-line bg-white p-6 shadow-card">
                  <p className="eyebrow">Values</p>
                  <ul className="mt-3 space-y-3">
                    {statement.values.map((v) => (
                      <li key={v.title} className="text-sm">
                        <span className="font-bold text-navy">{v.title}.</span>{' '}
                        <span className="text-muted">{v.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════
          7. CERTIFICATIONS
          Kept: 1=ISO 9001:2015  2=HACCP  6=ISO 14001:2015
          Removed: 3=ISO 22000:2018  4=OHSAS 18001:2007
                   5=ISO 9001 duplicate  7=IMPA
      ══════════════════════════════════════════════════ */}
      {certifications.length > 0 && (
        <section className="bg-white py-14 md:py-20">
          <div className="shell">

            {/* Centred heading — matches the reference image style */}
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-extrabold text-navy md:text-4xl">
                Certifications
              </h2>
              <div className="mx-auto mt-3 h-[2px] w-14 bg-line" />
            </div>

            {/* Certificate cards — 1 col → 2 col → 3 col */}
            <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {certifications.map((c) => (
                <div
                  key={c.name}
                  className="overflow-hidden rounded-lg border-2 border-sky/30 bg-white shadow-card transition-shadow hover:shadow-lift"
                >
                  {/* ── Name label above the card ── */}
                  <div className="bg-white px-5 pt-5 pb-2 text-center">
                    <h3 className="text-lg font-extrabold text-navy">{c.name}</h3>
                    <div className="mx-auto mt-1.5 h-[2px] w-10 rounded-full bg-ocean" />
                  </div>

                  {/* ── Certificate visual — inner blue-bordered document ── */}
                  <div className="mx-4 mb-4 rounded border-2 border-sky/35 bg-gradient-to-b from-sky/5 to-white p-5 text-center shadow-inner">

                    {/* Top corner dots row — mimics certificate corners */}
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex gap-1">
                        <span className="h-2.5 w-2.5 rounded-full border-2 border-sky/40" />
                        <span className="h-2.5 w-2.5 rounded-full border-2 border-sky/40" />
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-ocean">
                        Certificate
                      </span>
                      <div className="flex gap-1">
                        <span className="h-2.5 w-2.5 rounded-full border-2 border-sky/40" />
                        <span className="h-2.5 w-2.5 rounded-full border-2 border-sky/40" />
                      </div>
                    </div>

                    <p className="text-[9px] italic text-muted">This is to Certify that</p>
                    <p className="mt-0.5 text-[11px] font-extrabold uppercase tracking-wide text-navy">
                      {site.name}
                    </p>
                    <p className="text-[9px] text-muted">Chennai, India</p>

                    <div className="my-3 h-px w-full bg-sky/20" />

                    {/* Standard box */}
                    <div className="rounded border border-ocean/20 bg-white px-3 py-3 shadow-sm">
                      <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-muted">
                        {c.issuer}
                      </p>
                      <p className="mt-1 text-2xl font-extrabold text-ocean leading-tight">
                        {c.name}
                      </p>
                      {c.year && (
                        <p className="mt-0.5 text-[9px] text-muted">Standard · {c.year}</p>
                      )}
                    </div>

                    <p className="mt-3 text-[10px] leading-relaxed text-muted">
                      {c.description}
                    </p>

                    <div className="my-3 h-px w-full bg-sky/20" />

                    {/* Seal row */}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-ocean/30 bg-ice text-ocean">
                          <Icon name="shield" className="h-4 w-4" />
                        </div>
                        <span className="text-[8px] font-bold uppercase tracking-wide text-muted">Certified</span>
                      </div>
                      <div className="text-center">
                        <p className="text-[8px] text-muted">Certificate No.</p>
                        <p className="text-[9px] font-semibold text-navy">
                          GBL/{c.name.replace(/[:\s.]/g, '')}/IND
                        </p>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-ocean/30 bg-ice text-ocean">
                          <Icon name="check" className="h-4 w-4" strokeWidth={2.3} />
                        </div>
                        <span className="text-[8px] font-bold uppercase tracking-wide text-muted">Verified</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom ocean accent bar */}
                  <div className="h-1.5 bg-gradient-to-r from-ocean/20 via-ocean to-ocean/20" />
                </div>
              ))}
            </div>

            <p className="mt-8 text-center text-xs italic text-muted">
              Certificates issued to {site.name} (India).
              Contact us to request certified copies.
            </p>
          </div>
        </section>
      )}

    </>
  )
}
