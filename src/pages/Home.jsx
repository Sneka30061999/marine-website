import { useState } from 'react'
import { Link } from 'react-router-dom'
import { site } from '../config/site.js'
import useMeta from '../hooks/useMeta.js'
import { services } from '../data/services.js'
import {
  homeFeaturedIndia,
  homeFeaturedPanama,
  indianPorts,
  panamaPorts,
  internationalNetwork,
} from '../data/ports.js'
import Button from '../components/ui/Button.jsx'
import Icon from '../components/ui/Icon.jsx'
import SceneArt from '../components/ui/SceneArt.jsx'

/* ─────────────────────────────────────────────────────────────
   Four Stitch service groups (spec §6)
───────────────────────────────────────────────────────────── */
const serviceGroups = [
  {
    slug: 'provisions',
    icon: 'container',
    title: 'Provisions & Bonded Stores',
    text: 'Fresh, frozen and dry provisions; bonded tobacco, spirits and crew welfare stores delivered to any berth or anchorage.',
    link: '/contact?service=ship-agency',
  },
  {
    slug: 'deck-engine',
    icon: 'crane',
    title: 'Deck & Engine Stores',
    text: 'IMPA and ISSA catalogued mooring lines, valves, deck hardware, electrical fittings and mechanical spares.',
    link: '/contact?service=cargo-handling',
  },
  {
    slug: 'repairs',
    icon: 'anchor',
    title: 'Repairs & Underwater Operations',
    text: 'Certified riding squads for mechanical repairs, hull grooming, propeller polishing and class-approved UWILD inspections.',
    link: '/contact?service=crew-husbandry',
  },
  {
    slug: 'safety',
    icon: 'shield',
    title: 'Safety & Compliance',
    text: 'Life-raft servicing, immersion suits, gas-detector calibration, pyrotechnic replenishment and SOLAS safety compliance.',
    link: '/contact?service=customs-documentation',
  },
]

/* ─────────────────────────────────────────────────────────────
   Mini port-call enquiry panel (hero right column)
   Sends to same enquiryEmail as the full Contact form.
   ⚠ Not tested end-to-end — validate before launch.
───────────────────────────────────────────────────────────── */
function PortCallPanel() {
  const [vals, setVals] = useState({ port: '', service: '', eta: '', email: '' })
  const [err, setErr]   = useState('')
  const [sent, setSent] = useState(false)

  const set = (k) => (e) => setVals((v) => ({ ...v, [k]: e.target.value }))

  function submit(ev) {
    ev.preventDefault()
    if (!vals.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vals.email)) {
      setErr('Please enter a valid email address.')
      return
    }
    setErr('')
    const body = [
      `Port of call: ${vals.port || 'Not specified'}`,
      `Service required: ${vals.service || 'Not specified'}`,
      `ETA: ${vals.eta || 'Not specified'}`,
      `Contact email: ${vals.email}`,
    ].join('\n')
    window.location.href =
      `mailto:${site.enquiryEmail}` +
      `?subject=${encodeURIComponent('Port call enquiry – ' + (vals.port || 'General'))}` +
      `&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-3 py-2 text-center" role="status" aria-live="polite">
        <span className="flex h-10 w-10 items-center justify-center rounded bg-ocean/15 text-ocean">
          <Icon name="check" className="h-5 w-5" strokeWidth={2.5} />
        </span>
        <p className="text-sm font-bold text-navy">Enquiry sent!</p>
        <p className="text-xs text-muted">
          Your email client should have opened. If not, write to{' '}
          <a href={`mailto:${site.enquiryEmail}`} className="font-semibold text-ocean">{site.enquiryEmail}</a>.
        </p>
        <p className="text-xs italic text-muted">
          ⚠ Delivery not yet confirmed end-to-end.
        </p>
        <button onClick={() => setSent(false)} className="text-xs font-semibold text-ocean hover:underline">
          New enquiry
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-3">
      {/* Port of call — full client-approved list */}
      <div>
        <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-muted">
          Port of call
        </label>
        <select value={vals.port} onChange={set('port')} className="field text-sm">
          <option value="">Select a port or corridor…</option>
          <optgroup label="Indian Ports">
            {indianPorts.map((p) => <option key={p.name}>{p.name}</option>)}
            <option value="Other Indian port">Other Indian port</option>
          </optgroup>
          <optgroup label="Panama Corridor">
            {panamaPorts.map((p) => <option key={p.name}>{p.name}</option>)}
            <option value="Other Panama port">Other Panama port</option>
          </optgroup>
          <option value="Other / International">Other / International</option>
        </select>
      </div>

      {/* Service required */}
      <div>
        <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-muted">
          Service required
        </label>
        <select value={vals.service} onChange={set('service')} className="field text-sm">
          <option value="">Select a service…</option>
          {services.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
          <option value="Other">Other</option>
        </select>
      </div>

      {/* ETA — optional */}
      <div>
        <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-muted">
          ETA <span className="font-normal normal-case">(optional)</span>
        </label>
        <input
          type="text" value={vals.eta} onChange={set('eta')}
          placeholder="e.g. MV Atlantic Horizon / 24 Oct"
          className="field text-sm"
        />
      </div>

      {/* Contact email — required */}
      <div>
        <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-muted">
          Contact email <span className="text-red-500">*</span>
        </label>
        <input
          type="email" value={vals.email} onChange={set('email')}
          placeholder="you@company.com"
          className="field text-sm"
          aria-invalid={err ? 'true' : undefined}
        />
        {err && <p role="alert" className="mt-1 text-xs font-semibold text-red-600">{err}</p>}
      </div>

      <button
        type="submit"
        className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded bg-ocean px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ocean-dark"
      >
        Start my quotation
        <Icon name="arrow" className="h-4 w-4" />
      </button>
      <p className="text-center text-[10px] text-muted">
        Or call us:{' '}
        <a
          href={`tel:${site.offices[0]?.phone?.replace(/[^+\d]/g, '')}`}
          className="font-semibold text-ocean"
        >
          {site.offices[0]?.phone}
        </a>
      </p>
    </form>
  )
}

/* ─────────────────────────────────────────────────────────────
   Home page
───────────────────────────────────────────────────────────── */
export default function Home() {
  useMeta({
    title: 'Globus International Marine Services | Ship Supplies & Agency – India & Panama',
    description:
      'Full-service ship chandler and maritime agency covering 29 Indian ports and the Panama Canal corridor. Provisions, stores, repairs, safety equipment and port-call support.',
    canonical: 'https://www.globus-ims.com/',
  })
  return (
    <>
      {/* ══════════════════════════════════════════════════════
          1. HERO — port photo + headline + port-call panel
          Spec §6: headline, supporting copy, CTAs, mini enquiry
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden text-white">

        {/* Background port photo */}
        <div aria-hidden="true" className="absolute inset-0">
          <img
            src="/images/hero-bg.jpg"
            alt=""
            fetchPriority="high"
            decoding="sync"
            className="h-full w-full object-cover"
            style={{ objectPosition: 'center center' }}
          />
        </div>

        {/* Dark overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: 'rgba(7,27,51,0.72)' }}
        />

        {/* Content grid: headline left, enquiry panel right */}
        <div className="shell relative z-10 grid min-h-[78vh] items-center gap-10 py-24 md:min-h-[82vh] md:py-28 xl:grid-cols-[1fr_420px]">

          {/* Left — headline + CTAs */}
          <div className="max-w-2xl">
            <p className="fade-up mb-4 text-xs font-bold uppercase tracking-[0.2em]"
               style={{ color: '#F5C518' }}>
              {site.name}
            </p>
            <h1 className="fade-up-2 text-4xl font-extrabold leading-[1.08] !text-white sm:text-5xl md:text-[3.25rem]">
              Your Vessel Has A Schedule.{' '}
              <span className="block text-sky">Your Supplier Should Respect It.</span>
            </h1>
            <p className="fade-up-3 mt-5 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
              Provisions, certified technical stores and agency services delivered with
              absolute timing across Indian ports, the Panama Canal corridor and our
              international network — with one unified point of contact.
            </p>
            <div className="fade-up-4 mt-9 flex flex-wrap items-center gap-3">
              <Button to="/services" arrow>Explore Services</Button>
              <Button to="/about" variant="ghost">Company Overview</Button>
            </div>
          </div>

          {/* Right — port-call enquiry panel */}
          <div className="fade-up-3 w-full rounded border border-white/15 bg-white p-6 text-navy shadow-heavy">
            <h2 className="text-base font-bold text-navy">Plan your port call</h2>
            <p className="mt-1 text-xs text-muted">
              Tell us where you are calling and what you need. We'll start the quotation.
            </p>
            <div className="mt-4">
              <PortCallPanel />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          2. COVERAGE STRIP — spec §8
          Featured ports on home; full list on Ports & Locations.
          Scrollable on mobile with visible scroll affordance.
      ══════════════════════════════════════════════════════ */}
      <div className="border-y border-line bg-white">
        <div className="shell">
          <div
            className="flex items-center gap-1 overflow-x-auto py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="list"
            aria-label="Selected ports covered"
          >
            <span className="mr-3 shrink-0 text-[10px] font-bold uppercase tracking-widest text-ocean">
              Ports covered:
            </span>
            {[...homeFeaturedIndia, ...homeFeaturedPanama].map((name, i, arr) => (
              <span key={name} role="listitem" className="flex shrink-0 items-center">
                <span className="text-xs font-semibold text-navy">{name}</span>
                {i < arr.length - 1 && (
                  <span className="mx-2 text-line" aria-hidden="true">·</span>
                )}
              </span>
            ))}
            <Link
              to="/ports-locations"
              className="ml-3 shrink-0 text-xs font-bold text-ocean hover:underline"
            >
              + {indianPorts.length + panamaPorts.length - homeFeaturedIndia.length - homeFeaturedPanama.length} more →
            </Link>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          3. FOUR SERVICE GROUPS — spec §6
          Provisions & Bonded Stores · Deck & Engine Stores ·
          Repairs & Underwater Ops · Safety & Compliance
      ══════════════════════════════════════════════════════ */}
      <section className="bg-ice py-16 md:py-24">
        <div className="shell">
          <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">What we provide</p>
              <h2 className="sec-title mt-3 text-3xl font-extrabold text-navy md:text-4xl">
                Complete marine support
              </h2>
              <p className="mt-4 max-w-xl text-sm text-muted md:text-base">
                One reliable partner across four core disciplines.
              </p>
            </div>
            <Button to="/services" variant="outline" arrow className="shrink-0 self-start sm:self-auto">
              All services
            </Button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {serviceGroups.map((g) => (
              <Link
                key={g.slug}
                to={g.link}
                className="group flex flex-col rounded border border-line bg-white p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-ocean/40 hover:shadow-lift"
              >
                <span className="icon-badge transition-colors group-hover:bg-ocean group-hover:text-white">
                  <Icon name={g.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-sm font-bold text-navy">{g.title}</h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-muted">{g.text}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-ocean">
                  Enquire
                  <Icon name="arrow" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          4. COMPANY OVERVIEW — spec §6
      ══════════════════════════════════════════════════════ */}
      <section className="bg-white py-16 md:py-24">
        <div className="shell grid items-center gap-12 xl:grid-cols-2 xl:gap-16">

          <div className="relative">
            <div className="overflow-hidden rounded border border-line shadow-heavy">
              <div className="aspect-[4/3]">
                <SceneArt variant="intro" alt="Vessel at berth alongside quay" />
              </div>
            </div>
            <span className="absolute -right-1 -top-3 hidden rounded bg-ocean px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white md:block">
              India · Panama
            </span>
            <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded border border-line bg-white px-4 py-3 shadow-lift">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-ocean" />
              </span>
              <div>
                <p className="text-xs font-bold text-navy">Operations desk</p>
                <p className="text-xs text-muted">Available around vessel schedules</p>
              </div>
            </div>
          </div>

          <div className="pt-8 xl:pt-0">
            <p className="eyebrow">Who we are</p>
            <h2 className="sec-title mt-3 text-3xl font-extrabold text-navy md:text-4xl">
              Supporting vessels. Connecting global corridors.
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted md:text-base">
              {site.name} operates as a single-source partner for ship owners, technical
              managers and charterers requiring agency coordination, compliant stores and
              logistics support across two strategically important maritime regions.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
              We remove supply-chain bottlenecks by uniting deep local knowledge at Indian
              commercial ports with positioned support at the Panama Canal corridor.
            </p>
            <Button to="/about" variant="outline" arrow className="mt-8">About us</Button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          5. PORTS / NETWORK — spec §8
          Three groups. International clearly via correspondents.
          Full list links to Ports & Locations page.
      ══════════════════════════════════════════════════════ */}
      <section className="bg-navy py-16 md:py-24">
        <div className="shell">
          <div className="mb-12 text-center">
            <p className="eyebrow justify-center !text-sky">Geographic coverage</p>
            <h2 className="sec-title sec-title-center mx-auto mt-3 text-3xl font-extrabold !text-white md:text-4xl">
              Ports &amp; corridors we serve
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm text-slate-400">
              Direct coverage in India and the Panama Canal corridor, plus a partner network
              that extends reach internationally.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

            {/* India — featured ports on home */}
            <div className="rounded border border-white/10 bg-navy-800 p-6">
              <div className="mb-4 flex items-center gap-2">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-ocean text-white">
                  <Icon name="anchor" className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="text-sm font-bold !text-white">India ports</h3>
                  <p className="text-[10px] text-slate-400">{indianPorts.length} ports covered</p>
                </div>
              </div>
              <ul className="flex flex-wrap gap-2">
                {homeFeaturedIndia.map((name) => (
                  <li key={name}
                    className="rounded border border-white/15 px-2.5 py-1 text-xs font-medium text-slate-300">
                    {name}
                  </li>
                ))}
                <li>
                  <Link to="/ports-locations"
                    className="rounded border border-sky/30 px-2.5 py-1 text-xs font-medium text-sky hover:border-sky">
                    + {indianPorts.length - homeFeaturedIndia.length} more
                  </Link>
                </li>
              </ul>
            </div>

            {/* Panama */}
            <div className="rounded border border-white/10 bg-navy-800 p-6">
              <div className="mb-4 flex items-center gap-2">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-ocean text-white">
                  <Icon name="pin" className="h-4 w-4" />
                </span>
                <h3 className="text-sm font-bold !text-white">Panama corridor</h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {homeFeaturedPanama.map((name) => (
                  <li key={name}
                    className="rounded border border-white/15 px-2.5 py-1 text-xs font-medium text-slate-300">
                    {name}
                  </li>
                ))}
              </ul>
            </div>

            {/* International — clearly via correspondents */}
            <div className="rounded border border-white/10 bg-navy-800 p-6 md:col-span-2 xl:col-span-1">
              <div className="mb-4 flex items-center gap-2">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-ocean text-white">
                  <Icon name="globe" className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="text-sm font-bold !text-white">International network</h3>
                  <p className="text-[10px] text-slate-400">Via trusted correspondents &amp; agents</p>
                </div>
              </div>
              <ul className="flex flex-wrap gap-2">
                {internationalNetwork.map((n) => (
                  <li key={n}
                    className="rounded border border-white/15 px-2.5 py-1 text-xs font-medium text-slate-300">
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link to="/ports-locations"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky transition-colors hover:text-white">
              Full ports &amp; locations list
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          6. WHY US — spec §6: general capability statements only
          No unverified claims (no response times, certifications)
      ══════════════════════════════════════════════════════ */}
      <section className="bg-white py-16 md:py-24">
        <div className="shell">
          <div className="mb-10 text-center">
            <p className="eyebrow justify-center">Why work with us</p>
            <h2 className="sec-title sec-title-center mx-auto mt-3 text-3xl font-extrabold text-navy md:text-4xl">
              One partner. Every port call.
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {site.trustPoints.map((t) => (
              <div key={t.title} className="rounded border border-line bg-white p-6 shadow-card">
                <span className="icon-badge">
                  <Icon name={t.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-sm font-bold text-navy">{t.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          7. CONTACT / ENQUIRY — spec §6
          Verified contact details; tap-to-call on mobile.
      ══════════════════════════════════════════════════════ */}
      <section className="bg-ice py-16 md:py-24">
        <div className="shell">
          <div className="mb-10 text-center">
            <p className="eyebrow justify-center">Get in touch</p>
            <h2 className="sec-title sec-title-center mx-auto mt-3 text-3xl font-extrabold text-navy md:text-4xl">
              Planning a port call or shipment?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-muted md:text-base">
              Tell us your vessel, port and timing. We will respond with a clear, itemised quote.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {site.offices.map((o) => (
              <div key={o.region} className="rounded border border-line bg-white p-6 shadow-card">
                <p className="eyebrow">{o.region} office</p>
                <h3 className="mt-2 text-base font-bold text-navy">{o.city}</h3>
                <div className="mt-4 space-y-3 text-sm">
                  {/* Phone — tap-to-call on mobile */}
                  <a
                    href={`tel:${o.phone.replace(/[^+\d]/g, '')}`}
                    className="flex items-center gap-3 text-muted transition-colors hover:text-ocean"
                    aria-label={`Call ${o.region} office: ${o.phone}`}
                  >
                    <Icon name="phone" className="h-4 w-4 shrink-0 text-ocean" />
                    <span className="font-medium">{o.phone}</span>
                  </a>
                  {/* WhatsApp tap-to-open */}
                  {o.whatsapp && (
                    <a
                      href={`https://wa.me/${o.whatsapp.replace(/[^+\d]/g, '').replace(/^\+/, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-muted transition-colors hover:text-ocean"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-ocean" fill="currentColor" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.402A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                      </svg>
                      <span className="font-medium">WhatsApp: {o.whatsapp}</span>
                    </a>
                  )}
                  {/* Primary email */}
                  <a
                    href={`mailto:${o.email}`}
                    className="flex items-center gap-3 break-all text-muted transition-colors hover:text-ocean"
                  >
                    <Icon name="mail" className="h-4 w-4 shrink-0 text-ocean" />
                    {o.email}
                  </a>
                  {/* Alternate email */}
                  {o.emailAlt && (
                    <a
                      href={`mailto:${o.emailAlt}`}
                      className="flex items-center gap-3 break-all text-muted transition-colors hover:text-ocean"
                    >
                      <Icon name="mail" className="h-4 w-4 shrink-0 text-ocean/50" />
                      {o.emailAlt}
                    </a>
                  )}
                </div>
              </div>
            ))}

            {/* Full form CTA card */}
            <div className="flex flex-col justify-between rounded bg-navy p-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-sky">Send an enquiry</p>
                <h3 className="mt-2 text-base font-bold !text-white">Request a quote</h3>
                <p className="mt-3 text-xs leading-relaxed text-slate-300">
                  Use the full form to describe your requirement, vessel details and
                  preferred port. We respond with a clear, itemised quotation.
                </p>
              </div>
              <Button to="/contact" variant="light" arrow className="mt-6 self-start">
                Open enquiry form
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          8. FINAL CTA BANNER
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-ocean py-14">
        <span aria-hidden="true" className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/5" />
        <span aria-hidden="true" className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/5" />
        <div className="shell relative z-10 flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <h2 className="text-2xl font-extrabold !text-white md:text-3xl">
              Ready to plan your next port call?
            </h2>
            <p className="mt-2 max-w-xl text-sm text-white/80 md:text-base">
              Contact our India or Panama office, or send the enquiry form — we'll come back
              with a clear, itemised quote.
            </p>
          </div>
          <Button to="/contact" variant="light" arrow className="shrink-0">
            Request a Quote
          </Button>
        </div>
      </section>
    </>
  )
}
