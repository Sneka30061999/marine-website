import { useState, useEffect, useCallback, useRef } from 'react'
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
import heroImg1 from '../assets/hero-bg.jpg'
import heroImg2 from '../assets/hero-2.jpg'
import heroImg3 from '../assets/hero-3.jpg'
import heroImg4 from '../assets/hero-1.jpg'

/* ── Hero carousel slides ──────────────────────────────── */
const heroSlides = [
  {
    src: heroImg1,
    alt: 'Container vessel loaded with colourful cargo containers sailing at sea under blue sky',
  },
  {
    src: heroImg2,
    alt: 'Cargo ship departing port at sunset with cranes silhouetted against orange sky',
  },
  {
    src: heroImg3,
    alt: 'Aerial view of a loaded container ship crossing deep blue open ocean',
  },
]

/* ── Auto-advancing carousel used as the hero background ─ */
function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev]       = useState(null)
  const [animating, setAnimating] = useState(false)
  const timerRef = useRef(null)

  const goTo = useCallback((idx) => {
    if (animating) return
    setPrev(current)
    setCurrent(idx)
    setAnimating(true)
    setTimeout(() => { setPrev(null); setAnimating(false) }, 700)
  }, [animating, current])

  const next = useCallback(() => {
    goTo((current + 1) % heroSlides.length)
  }, [current, goTo])

  const prev_ = useCallback(() => {
    goTo((current - 1 + heroSlides.length) % heroSlides.length)
  }, [current, goTo])

  /* Auto-advance every 5 s */
  useEffect(() => {
    timerRef.current = setInterval(next, 5000)
    return () => clearInterval(timerRef.current)
  }, [next])

  /* Pause on hover */
  const pause  = () => clearInterval(timerRef.current)
  const resume = () => { timerRef.current = setInterval(next, 5000) }

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      aria-hidden="true"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      {/* Outgoing slide (fades out) */}
      {prev !== null && (
        <img
          key={`prev-${prev}`}
          src={heroSlides[prev].src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: 0, transition: 'opacity 0.7s ease' }}
        />
      )}
      {/* Current slide (fades in) */}
      <img
        key={`curr-${current}`}
        src={heroSlides[current].src}
        alt={heroSlides[current].alt}
        fetchPriority={current === 0 ? 'high' : 'auto'}
        decoding={current === 0 ? 'sync' : 'async'}
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          opacity: 1,
          transition: 'opacity 0.7s ease',
          objectPosition: 'center center',
        }}
      />
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(105deg,rgba(7,27,51,0.88) 0%,rgba(7,27,51,0.75) 50%,rgba(7,27,51,0.50) 100%)',
        }}
      />

      {/* Prev / Next arrows */}
      <button
        type="button"
        onClick={prev_}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-20 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/25 md:left-6 md:h-10 md:w-10"
      >
        <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10 3 5 8l5 5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-20 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/25 md:right-6 md:h-10 md:w-10"
      >
        <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={[
              'h-1.5 rounded-full transition-all duration-300',
              i === current
                ? 'w-6 bg-sky'
                : 'w-1.5 bg-white/40 hover:bg-white/70',
            ].join(' ')}
          />
        ))}
      </div>
    </div>
  )
}

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/* ── Inline vessel enquiry form (home contact section) ───── */
function HomeContactForm() {
  const [vals, setVals] = useState({
    fullName: '', vessel: '', port: '', service: '',
    eta: '', email: '', phone: '', message: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const set = (k) => (e) => setVals((v) => ({ ...v, [k]: e.target.value }))

  function validate() {
    const e = {}
    if (!vals.fullName.trim()) e.fullName = 'Required.'
    if (!vals.email.trim())    e.email    = 'Required.'
    else if (!emailRe.test(vals.email)) e.email = 'Invalid email.'
    if (!vals.message.trim())  e.message  = 'Required.'
    return e
  }

  function submit(ev) {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) { document.getElementById(Object.keys(e)[0])?.focus(); return }
    const body = [
      `Full Name / Master: ${vals.fullName}`,
      `Vessel Name & IMO: ${vals.vessel}`,
      `Port of Call: ${vals.port}`,
      `Service Required: ${vals.service}`,
      `ETA: ${vals.eta}`,
      `Contact Email: ${vals.email}`,
      `Phone / WhatsApp: ${vals.phone}`,
      '', 'Message / Requisition Notes:', vals.message,
    ].join('\n')
    try {
      window.location.href =
        `mailto:${site.enquiryEmail}` +
        `?subject=${encodeURIComponent('Vessel Enquiry – ' + (vals.vessel || vals.port || 'General'))}` +
        `&body=${encodeURIComponent(body)}`
      setStatus('sent')
    } catch { setStatus('error') }
  }

  const aria = (id) => ({
    'aria-invalid': errors[id] ? 'true' : undefined,
    'aria-describedby': errors[id] ? `hcf-${id}-err` : undefined,
  })

  if (status === 'sent') return (
    <div className="flex flex-col items-center gap-3 py-8 text-center" role="status" aria-live="polite">
      <span className="flex h-12 w-12 items-center justify-center rounded bg-ocean/10 text-ocean">
        <Icon name="check" className="h-6 w-6" strokeWidth={2.5} />
      </span>
      <p className="font-bold text-navy">Request sent, {vals.fullName.split(' ')[0]}.</p>
      <p className="max-w-xs text-xs text-muted">
        Your email client should have opened. Write to{' '}
        <a href={`mailto:${site.enquiryEmail}`} className="font-semibold text-ocean">{site.enquiryEmail}</a> if not.
      </p>
      <button type="button" onClick={() => { setStatus('idle'); setVals({ fullName:'',vessel:'',port:'',service:'',eta:'',email:'',phone:'',message:'' }); setErrors({}) }}
        className="text-xs font-semibold text-ocean hover:underline">Submit another</button>
    </div>
  )

  if (status === 'error') return (
    <div className="rounded border border-red-200 bg-red-50 p-5 text-center" role="alert">
      <p className="text-sm font-semibold text-red-700">Could not open your email client.</p>
      <p className="mt-1 text-xs text-red-600">Email <a href={`mailto:${site.enquiryEmail}`} className="underline">{site.enquiryEmail}</a> directly.</p>
      <button type="button" onClick={() => setStatus('idle')} className="mt-3 text-xs font-semibold text-red-700 underline">Try again</button>
    </div>
  )

  const LabelField = ({ id, label, required, children }) => (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-[10px] font-bold uppercase tracking-wider text-muted">
        {label}{required && <span className="ml-0.5 text-red-500" aria-hidden="true"> *</span>}
      </label>
      {children}
      {errors[id] && <p id={`hcf-${id}-err`} role="alert" className="text-xs font-semibold text-red-600">{errors[id]}</p>}
    </div>
  )

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-4">
      {/* Row 1 */}
      <div className="grid gap-4 sm:grid-cols-2">
        <LabelField id="fullName" label="Full Name / Master / Superintendent" required>
          <input id="fullName" type="text" className="field" placeholder="Capt. Alexander Vance"
            value={vals.fullName} onChange={set('fullName')} {...aria('fullName')} />
        </LabelField>
        <LabelField id="vessel" label="Vessel Name & IMO Number">
          <input id="vessel" type="text" className="field" placeholder="MV Horizon Trader / IMO 9821430"
            value={vals.vessel} onChange={set('vessel')} />
        </LabelField>
      </div>
      {/* Row 2 */}
      <div className="grid gap-4 sm:grid-cols-2">
        <LabelField id="port" label="Port of Call">
          <select id="port" className="field" value={vals.port} onChange={set('port')}>
            <option value="">Select target port or corridor…</option>
            <optgroup label="Indian Ports">
              {indianPorts.map((p) => <option key={p.name} value={p.name}>{p.name}</option>)}
              <option value="Other Indian port">Other Indian port</option>
            </optgroup>
            <optgroup label="Panama Canal Corridor">
              {panamaPorts.map((p) => <option key={p.name} value={p.name}>{p.name}</option>)}
            </optgroup>
            <option value="Other / International">Other / International</option>
          </select>
        </LabelField>
        <LabelField id="service" label="Service Department Required">
          <select id="service" className="field" value={vals.service} onChange={set('service')}>
            <option value="">Select department…</option>
            {services.map((s) => <option key={s.slug} value={s.title}>{s.title}</option>)}
            <option value="Other">Other</option>
          </select>
        </LabelField>
      </div>
      {/* Row 3 */}
      <div className="grid gap-4 sm:grid-cols-3">
        <LabelField id="eta" label="Estimated Arrival (ETA)">
          <input id="eta" type="text" className="field" placeholder="DD/MM/YYYY HH:MM"
            value={vals.eta} onChange={set('eta')} />
        </LabelField>
        <LabelField id="email" label="Contact Email" required>
          <input id="email" type="email" className="field" placeholder="ops@vesselimgr.com"
            value={vals.email} onChange={set('email')} {...aria('email')} />
        </LabelField>
        <LabelField id="phone" label="Phone / WhatsApp">
          <input id="phone" type="tel" className="field" placeholder="+1 (555) 019-2834"
            value={vals.phone} onChange={set('phone')} />
        </LabelField>
      </div>
      {/* Message */}
      <LabelField id="message" label="Message / Requisition Notes" required>
        <textarea id="message" rows={4} className="field resize-y"
          placeholder="Include IMPA codes, bunker requisition, gangway clearance instructions, or special delivery requirements…"
          value={vals.message} onChange={set('message')} {...aria('message')} />
      </LabelField>
      {/* Submit */}
      <button type="submit"
        className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded bg-navy px-5 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-navy-700">
        Send Operational Request
        <Icon name="arrow" className="h-4 w-4" />
      </button>
      <p className="text-center text-[10px] text-muted">
        Encrypted transmission. Your RFQ is routed immediately to the active port superintendent on watch.
      </p>
    </form>
  )
}

/* ── Stitch trust/coverage strip data ───────────────────── */
const trustStrip = [
  {
    n: '01', label: 'Chandlery',
    title: 'Ship Supply',
    text: 'HACCP & IMO compliant provisions, dry stores and bonded goods with unbroken cold-chain assurance.',
  },
  {
    n: '02', label: 'Engineering',
    title: 'Technical Support',
    text: 'Standard IMPA & ISSA catalogued mechanical valves, deck hardware, mooring lines and electrical spares.',
  },
  {
    n: '03', label: 'Subcontinent',
    title: 'Indian Ports',
    text: 'Direct operational coverage spanning Kandla, Mumbai, JNPT, Cochin, Chennai and Visakhapatnam roadsteads.',
  },
  {
    n: '04', label: 'Interoceanic',
    title: 'Panama Canal',
    text: 'Rapid turnaround and tender servicing at Balboa Pacific anchorage and Cristóbal Atlantic terminal gateways.',
  },
]

/* ── Four Stitch service cards ───────────────────────────── */
const serviceCards = [
  {
    slug: 'provisions',
    icon: 'container',
    title: 'Provisions & Bonded Stores',
    text: 'Prime grade fresh, frozen and dry provisions complying with HACCP standards. Bonded tobacco, spirits and crew welfare stores.',
    href: '/services#ship-supplies',
  },
  {
    slug: 'deck-engine',
    icon: 'crane',
    title: 'Deck & Engine Stores',
    text: 'Full ISSA & IMPA catalogue coverage including mooring lines, valves, pneumatic deck tools, electrical fittings and replacement hardware.',
    href: '/services#technical',
  },
  {
    slug: 'repairs',
    icon: 'anchor',
    title: 'Repairs & Underwater Ops',
    text: 'Certified riding squads for voyage repairs, hull grooming, propeller polishing and class-approved UWILD inspections.',
    href: '/services#technical',
  },
  {
    slug: 'safety',
    icon: 'shield',
    title: 'Safety & Compliance',
    text: 'Annual life-raft servicing, immersion suits, multi-gas detector recalibration and full SOLAS safety survey certification.',
    href: '/services#safety',
  },
]

/* ── Why Shipowners Trust — numbered list ────────────────── */
const whyItems = [
  {
    n: '01',
    title: 'Certified Standards',
    text: 'Full cold-chain verification from warehouse storage to vessel gangway, documented at every handoff.',
  },
  {
    n: '02',
    title: 'Unified Sourcing',
    text: 'Single point of contact and consolidated billing for deck supplies, technical spares, fresh stores and bonded goods.',
  },
  {
    n: '03',
    title: 'Harbor Experience',
    text: 'Established boarding at Kandla, Mumbai, JNPT, Cochin, Chennai, port authority, customs clearance and zero port-call delays.',
  },
  {
    n: '04',
    title: 'Rapid Turnaround',
    text: 'Sub-1 hour guaranteed response for RFQs with immediate stock verification across Indian ports and the Panama corridor.',
  },
]

/* ── Mini hero enquiry panel ─────────────────────────────── */
function HeroPanel() {
  const [vals, setVals] = useState({ port: '', service: '', eta: '' })
  const [sent, setSent] = useState(false)

  const set = (k) => (e) => setVals((v) => ({ ...v, [k]: e.target.value }))

  function submit(ev) {
    ev.preventDefault()
    const body = [
      `Port of call: ${vals.port || 'Not specified'}`,
      `Service: ${vals.service || 'Not specified'}`,
      `ETA / Vessel: ${vals.eta || 'Not specified'}`,
    ].join('\n')
    window.location.href =
      `mailto:${site.enquiryEmail}` +
      `?subject=${encodeURIComponent('Port call enquiry – ' + (vals.port || 'General'))}` +
      `&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-center" role="status" aria-live="polite">
        <span className="flex h-10 w-10 items-center justify-center rounded bg-ocean/15 text-ocean">
          <Icon name="check" className="h-5 w-5" strokeWidth={2.5} />
        </span>
        <p className="text-sm font-bold text-navy">Enquiry sent!</p>
        <p className="text-xs text-muted">
          Your email client should have opened. Write to{' '}
          <a href={`mailto:${site.enquiryEmail}`} className="font-semibold text-ocean">{site.enquiryEmail}</a>{' '}
          if it did not.
        </p>
        <button onClick={() => setSent(false)} className="text-xs font-semibold text-ocean hover:underline">
          New enquiry
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-3">
      <div>
        <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-on-surface-variant" style={{ color: '#404850' }}>
          Port of Call
        </label>
        <select value={vals.port} onChange={set('port')} className="field text-sm">
          <option value="">Select a port or corridor…</option>
          <optgroup label="Major Indian Ports">
            {indianPorts.map((p) => <option key={p.name}>{p.name}</option>)}
            <option value="Other Indian port">Other Indian port</option>
          </optgroup>
          <optgroup label="Panama Canal Corridor">
            {panamaPorts.map((p) => <option key={p.name}>{p.name}</option>)}
          </optgroup>
          <option value="Other / International">Other / International</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider" style={{ color: '#404850' }}>
          What do you need?
        </label>
        <select value={vals.service} onChange={set('service')} className="field text-sm">
          <option value="">Select a department or service…</option>
          {services.map((s) => <option key={s.slug} value={s.title}>{s.title}</option>)}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider" style={{ color: '#404850' }}>
          Vessel Name / ETA{' '}
          <span className="font-normal normal-case text-muted">(Optional)</span>
        </label>
        <input
          type="text" value={vals.eta} onChange={set('eta')}
          placeholder="e.g. MV Atlantic Horizon / 24 Oct"
          className="field text-sm"
        />
      </div>

      <button
        type="submit"
        className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded bg-ocean px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-ocean-dark"
      >
        Start my quotation
        <Icon name="arrow" className="h-4 w-4" />
      </button>

      <p className="text-center text-[10px] text-muted">
        Replies within one business hour. Urgent? Call{' '}
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

/* ── Page ──────────────────────────────────────────────────── */
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
          1. HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden text-white">
        {/* Hero carousel */}
        <HeroCarousel />

        {/* Grid */}
        <div className="shell relative z-10 grid min-h-[82vh] items-center gap-8 py-12 md:py-16 xl:grid-cols-[1fr_400px]">

          {/* Left */}
          <div>
            {/* Eyebrow */}
            <div className="fade-up mb-6 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sky" aria-hidden="true" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-sky">
                India Ports &amp; Panama Canal Maritime Support
              </span>
            </div>

            <h1 className="fade-up-2 text-4xl font-extrabold uppercase leading-[1.08] !text-white sm:text-5xl md:text-[3.4rem]">
              Your Vessel Has A Schedule.{' '}
              <span className="block text-sky">Your Supplier Should Respect It.</span>
            </h1>

            <p className="fade-up-3 mt-5 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
              Provisions, certified technical stores and agency services delivered with
              absolute timing across Indian ports, the Panama Canal corridor and our
              international network — with one unified point of contact.
            </p>

            <div className="fade-up-4 mt-8 flex flex-wrap gap-3">
              <Button to="/services" className="!bg-ocean uppercase tracking-wide" arrow>
                Browse the catalog
              </Button>
              <Button to="/about" variant="ghost" className="uppercase tracking-wide">
                Explore capabilities
              </Button>
            </div>

            {/* Trust badges */}
            <div className="fade-up-4 mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              <span className="flex items-center gap-1.5">
                <Icon name="clock" className="h-3.5 w-3.5 text-sky" />
                &lt; 90m RFQ Response
              </span>
              <span className="flex items-center gap-1.5">
                <Icon name="anchor" className="h-3.5 w-3.5 text-sky" />
                Emergency Gangway Dispatch
              </span>
              <span className="flex items-center gap-1.5">
                <Icon name="shield" className="h-3.5 w-3.5 text-sky" />
                ISO 9001 / ISSA
              </span>
            </div>
          </div>

          {/* Right — enquiry panel */}
          <div className="fade-up-3 rounded border border-white/10 bg-white p-6 text-navy shadow-heavy">
            <h2 className="text-sm font-bold text-navy">Plan your port call</h2>
            <p className="mt-1 text-xs text-muted">
              Tell us where you are calling and what you need. We'll start the quotation for you.
            </p>
            <div className="mt-4">
              <HeroPanel />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          2. PORT SCROLLING STRIP
      ══════════════════════════════════════════════════════ */}
      <div className="border-y border-line bg-white">
        <div className="shell flex items-center justify-between gap-4 py-0">
          <div
            className="flex flex-1 items-center gap-1 overflow-x-auto py-3
                        [-ms-overflow-style:none] [scrollbar-width:none]
                        [&::-webkit-scrollbar]:hidden"
            role="list"
            aria-label="Ports covered"
          >
            {[...homeFeaturedIndia, ...homeFeaturedPanama].map((name, i, arr) => (
              <span key={name} role="listitem" className="flex shrink-0 items-center">
                <span className="text-[11px] font-bold uppercase tracking-wider text-navy">{name}</span>
                {i < arr.length - 1 && (
                  <span className="mx-2 text-[10px] text-line" aria-hidden="true">·</span>
                )}
              </span>
            ))}
          </div>
          <Link
            to="/ports-locations"
            className="hidden shrink-0 items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-ocean hover:underline lg:flex"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-sky" aria-hidden="true" />
            {indianPorts.length + panamaPorts.length}+ Ports Under Single Dispatch
          </Link>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          3. TRUST STRIP — 01 Ship Supply / 02 Technical…
      ══════════════════════════════════════════════════════ */}
      <div className="border-b border-line bg-white">
        <div className="shell grid gap-px bg-line sm:grid-cols-2 xl:grid-cols-4">
          {trustStrip.map((t) => (
            <div key={t.n} className="bg-white p-6">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-ocean">
                {t.n}. {t.label}
              </p>
              <h3 className="text-sm font-bold text-navy">{t.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">{t.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          4. COMPLETE MARINE SUPPORT
      ══════════════════════════════════════════════════════ */}
      <section className="bg-white py-16 md:py-20">
        <div className="shell">
          {/* Header row */}
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-lg">
              <p className="eyebrow">Core Competencies</p>
              <h2 className="sec-title mt-3 text-3xl font-extrabold text-navy md:text-4xl">
                Complete Marine Support.<br className="hidden sm:block" /> One Reliable Partner.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted md:text-right">
              Disciplined chandlery, precision repair squads and round-the-clock port
              coordination calibrated to international maritime standards.
            </p>
          </div>

          {/* 4 service cards */}
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {serviceCards.map((s) => (
              <Link
                key={s.slug}
                to={s.href}
                className="group flex flex-col rounded border border-line bg-white p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-ocean/30 hover:shadow-lift"
              >
                <div className="icon-badge transition-colors group-hover:bg-ocean group-hover:text-white">
                  <Icon name={s.icon} className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-sm font-bold text-navy">{s.title}</h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-muted">{s.text}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-ocean">
                  View Division
                  <Icon name="arrow" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          5. SUPPORTING VESSELS (asymmetric split)
      ══════════════════════════════════════════════════════ */}
      <section className="bg-ice py-16 md:py-20">
        <div className="shell grid items-center gap-10 xl:grid-cols-12 xl:gap-12">
          {/* Image — 5 cols */}
          <div className="relative xl:col-span-5">
            <div className="overflow-hidden rounded border border-line shadow-heavy">
              <div className="aspect-[4/3] w-full sm:aspect-[16/9] xl:aspect-[4/3]">
                <img
                  src={heroImg4}
                  alt="Fully loaded container ship sailing on calm turquoise ocean under blue sky"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                  style={{ objectPosition: 'center 55%' }}
                />
              </div>
            </div>
            {/* Overlay label */}
            <div className="absolute bottom-0 left-0 right-0 rounded-b bg-gradient-to-t from-navy/80 to-transparent p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-sky">Strategic Readiness</p>
              <p className="text-sm font-bold text-white">Berth &amp; Roadstead Operations</p>
            </div>
          </div>

          {/* Text — 7 cols */}
          <div className="xl:col-span-7">
            <p className="eyebrow">Who We Are</p>
            <h2 className="sec-title mt-3 text-3xl font-extrabold text-navy md:text-4xl">
              Supporting Vessels.<br /> Connecting Global Corridors.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted md:text-base">
              {site.name} operates as a vital link along premier transoceanic shipping routes.
              We stand as a single-source partner for ship owners, technical managers and
              charterers requiring rapid provisioning, compliant stores and urgent technical
              assistance.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
              By uniting deep local harbour knowledge across all Indian commercial hubs with
              strategically positioned support teams at the Panama Canal, we remove supply-chain
              bottlenecks and guarantee seamless turnaround.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Button to="/about" className="!bg-ocean uppercase tracking-wide" arrow>
                Company Overview
              </Button>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-muted">
                <Icon name="shield" className="h-4 w-4 text-ocean" />
                ISO 9001:2015 Registered
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          6. STRATEGIC PORTS & CORRIDORS
      ══════════════════════════════════════════════════════ */}
      <section className="bg-white py-16 md:py-20">
        <div className="shell">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Geographic Footprint</p>
              <h2 className="sec-title mt-3 text-3xl font-extrabold text-navy md:text-4xl">
                Strategic Ports &amp; Corridors
              </h2>
            </div>
            <p className="max-w-sm text-sm text-muted md:text-right">
              Dedicated boarding officers, bonded warehousing and rapid roadstead launch
              facilities across key maritime choke points.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {/* India */}
            <div className="rounded border border-line bg-white p-6 shadow-card">
              <div className="mb-4 flex items-center gap-2 text-ocean">
                <Icon name="anchor" className="h-5 w-5" />
                <span className="text-[11px] font-bold uppercase tracking-wider">India Ports Network</span>
              </div>
              <p className="mb-4 text-xs text-muted">
                Full western and eastern seaboard coverage with direct berth access and
                off-port limits launch services.
              </p>
              <ul className="divide-y divide-line text-xs">
                {[
                  ['Kandla & Mundra', 'Crude & Dry Bulk'],
                  ['Mumbai & JNPT', 'Central Engineering Hub'],
                  ['Cochin & Mangalore', 'Fast OPL Bunker & Water'],
                  ['Chennai & Vizag', 'East Coast Terminals'],
                ].map(([port, note]) => (
                  <li key={port} className="flex items-center justify-between py-2">
                    <span className="font-semibold text-navy">{port}</span>
                    <span className="text-muted">{note}</span>
                  </li>
                ))}
              </ul>
              <Link to="/ports-locations" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-ocean hover:underline">
                {indianPorts.length} ports covered <Icon name="arrow" className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Panama */}
            <div className="rounded border border-line bg-white p-6 shadow-card">
              <div className="mb-4 flex items-center gap-2 text-ocean">
                <Icon name="compass" className="h-5 w-5" />
                <span className="text-[11px] font-bold uppercase tracking-wider">Panama Canal Corridor</span>
              </div>
              <p className="mb-4 text-xs text-muted">
                Transit assistance, bonded customs access and priority provisions delivery
                across both oceanic approaches.
              </p>
              <ul className="divide-y divide-line text-xs">
                {[
                  ['Balboa Anchorage', 'Pacific Entrance'],
                  ['Cristóbal / Colón', 'Atlantic Gateway'],
                  ['Colón Free Zone', 'Entry Free Stores Dispatch'],
                  ['ACP Canal Agency', 'Transit Coordination'],
                ].map(([port, note]) => (
                  <li key={port} className="flex items-center justify-between py-2">
                    <span className="font-semibold text-navy">{port}</span>
                    <span className="text-muted">{note}</span>
                  </li>
                ))}
              </ul>
              <Link to="/ports-locations" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-ocean hover:underline">
                {panamaPorts.length} ports covered <Icon name="arrow" className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Global */}
            <div className="rounded border border-line bg-white p-6 shadow-card">
              <div className="mb-4 flex items-center gap-2 text-ocean">
                <Icon name="globe" className="h-5 w-5" />
                <span className="text-[11px] font-bold uppercase tracking-wider">Global Transit Desks</span>
              </div>
              <p className="mb-4 text-xs text-muted">
                International correspondent network for long-haul vessels transiting major
                international routes.
              </p>
              <ul className="divide-y divide-line text-xs">
                {[
                  ['UAE (Fujairah / Dubai)', 'Middle East Hub'],
                  ['Singapore', 'Southeast Asia Hub'],
                  ['Suez Canal Liaison', 'Net Sea / Mail Routing'],
                  ['South America (Santos)', 'Iranian Terminals'],
                ].map(([port, note]) => (
                  <li key={port} className="flex items-center justify-between py-2">
                    <span className="font-semibold text-navy">{port}</span>
                    <span className="text-right text-muted">{note}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[10px] italic text-muted">
                Via trusted correspondents &amp; agents — no permanent office implied.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          7. WHY SHIPOWNERS TRUST GLOBUS
      ══════════════════════════════════════════════════════ */}
      <section className="bg-ice py-16 md:py-20">
        <div className="shell">
          <div className="mb-12 text-center">
            <p className="eyebrow justify-center">Operational Precision</p>
            <h2 className="sec-title sec-title-center mx-auto mt-3 text-3xl font-extrabold text-navy md:text-4xl">
              Why Shipowners Trust Globus
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-muted">
              Built upon disciplined superintendence standards, rigorous compliance and rapid execution.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {whyItems.map((w) => (
              <div key={w.n} className="rounded border border-line bg-white p-6 shadow-card">
                <span className="text-4xl font-extrabold text-ocean/20">{w.n}</span>
                <h3 className="mt-3 text-sm font-bold text-navy">{w.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          8. CONTACT GLOBUS MARINE OPERATIONS
          Matches the reference screenshot exactly:
          Left: India + Panama office cards (dl table style) + Operational Guarantee
          Right: Vessel Enquiry & Quotation Request form
      ══════════════════════════════════════════════════════ */}
      <section className="bg-surface py-16 md:py-20">
        <div className="shell">

          {/* Section header — eyebrow left, description right */}
          <div className="mb-10 grid gap-4 md:grid-cols-2 md:items-end">
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-ocean">
                Get in Touch &amp; 24/7 Coordination
              </p>
              <h2 className="sec-title text-3xl font-extrabold text-navy md:text-4xl">
                Contact Globus Marine Operations
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-muted md:text-base">
              Superintendents, port agents, and boarding teams are on standby 24/7 across
              Indian commercial ports and the Panama Canal transit corridor.
            </p>
          </div>

          {/* Two-column layout */}
          <div className="grid gap-6 xl:grid-cols-[420px_1fr]">

            {/* ── Left: office cards ── */}
            <div className="flex flex-col gap-4">

              {/* India Head Office */}
              {(() => {
                const o = site.offices[0]
                return (
                  <article className="rounded border border-line bg-white p-5 shadow-card"
                    aria-labelledby="home-india-office">
                    <div className="mb-3 flex items-center gap-2">
                      <Icon name="anchor" className="h-4 w-4 text-ocean" />
                      <p id="home-india-office"
                        className="text-[11px] font-bold uppercase tracking-wider text-ocean">
                        India Head Office / Operations Hub
                      </p>
                    </div>
                    <p className="mb-3 text-sm text-navy">
                      {o.address.filter(l => !l.startsWith('⚠')).join(', ')}
                    </p>
                    <dl className="space-y-2 text-sm">
                      <div className="flex items-baseline justify-between gap-4">
                        <dt className="shrink-0 text-[11px] font-bold uppercase tracking-wider text-muted">24/7 Ops Phone:</dt>
                        <dd>
                          <a href={`tel:${o.phone.replace(/[^+\d]/g,'')}`}
                            className="font-semibold text-ocean hover:underline"
                            aria-label={`Call India: ${o.phone}`}>{o.phone}</a>
                        </dd>
                      </div>
                      <div className="flex items-baseline justify-between gap-4">
                        <dt className="shrink-0 text-[11px] font-bold uppercase tracking-wider text-muted">Direct Email:</dt>
                        <dd>
                          <a href={`mailto:${o.email}`}
                            className="break-all font-semibold text-ocean hover:underline">{o.email}</a>
                        </dd>
                      </div>
                      {o.emailAlt && (
                        <div className="flex items-baseline justify-between gap-4">
                          <dt className="shrink-0 text-[11px] font-bold uppercase tracking-wider text-muted">Alt Email:</dt>
                          <dd>
                            <a href={`mailto:${o.emailAlt}`}
                              className="break-all font-medium text-muted hover:text-ocean">{o.emailAlt}</a>
                          </dd>
                        </div>
                      )}
                      <div className="flex items-baseline justify-between gap-4">
                        <dt className="shrink-0 text-[11px] font-bold uppercase tracking-wider text-muted">VHF Marine Guard:</dt>
                        <dd className="text-navy">Channel 16 / 74</dd>
                      </div>
                    </dl>
                  </article>
                )
              })()}

              {/* Panama Regional Liaison */}
              {(() => {
                const o = site.offices[1]
                return (
                  <article className="rounded border border-line bg-white p-5 shadow-card"
                    aria-labelledby="home-panama-office">
                    <div className="mb-3 flex items-center gap-2">
                      <Icon name="compass" className="h-4 w-4 text-ocean" />
                      <p id="home-panama-office"
                        className="text-[11px] font-bold uppercase tracking-wider text-ocean">
                        Panama Canal Regional Liaison
                      </p>
                    </div>
                    <p className="mb-3 text-sm text-navy">
                      {o.address.filter(l => !l.startsWith('⚠')).join(', ')}
                    </p>
                    <dl className="space-y-2 text-sm">
                      <div className="flex items-baseline justify-between gap-4">
                        <dt className="shrink-0 text-[11px] font-bold uppercase tracking-wider text-muted">Ops Phone:</dt>
                        <dd>
                          <a href={`tel:${o.phone.replace(/[^+\d]/g,'')}`}
                            className="font-semibold text-ocean hover:underline"
                            aria-label={`Call Panama: ${o.phone}`}>{o.phone}</a>
                        </dd>
                      </div>
                      <div className="flex items-baseline justify-between gap-4">
                        <dt className="shrink-0 text-[11px] font-bold uppercase tracking-wider text-muted">Direct Email:</dt>
                        <dd>
                          <a href={`mailto:${o.email}`}
                            className="break-all font-semibold text-ocean hover:underline">{o.email}</a>
                        </dd>
                      </div>
                      {o.emailAlt && (
                        <div className="flex items-baseline justify-between gap-4">
                          <dt className="shrink-0 text-[11px] font-bold uppercase tracking-wider text-muted">Alt Email:</dt>
                          <dd>
                            <a href={`mailto:${o.emailAlt}`}
                              className="break-all font-medium text-muted hover:text-ocean">{o.emailAlt}</a>
                          </dd>
                        </div>
                      )}
                      <div className="flex items-baseline justify-between gap-4">
                        <dt className="shrink-0 text-[11px] font-bold uppercase tracking-wider text-muted">Canal Transit:</dt>
                        <dd className="text-navy">ACP Liaison Desk</dd>
                      </div>
                    </dl>
                  </article>
                )
              })()}

              {/* Operational Guarantee — blue tinted card */}
              <div className="rounded border border-ocean/20 p-5"
                style={{ background: '#EBF5FB' }}>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-ocean">
                  Operational Guarantee
                </p>
                <p className="text-xs leading-relaxed text-navy">
                  <span className="font-semibold">Sub-2hr RFQ Response</span>
                  {' '}•{' '}
                  <span className="font-semibold">Unbroken Cold Chain</span>
                  {' '}•{' '}
                  <span className="font-semibold">Licensed Launch Boats</span>
                  {' '}•{' '}
                  <span className="font-semibold">Verified Class Surveyors</span>
                </p>
              </div>
            </div>

            {/* ── Right: Vessel Enquiry form ── */}
            <div className="rounded border border-line bg-white p-6 shadow-card md:p-8">
              <h3 className="text-xl font-extrabold text-navy">
                Vessel Enquiry &amp; Quotation Request
              </h3>
              <p className="mt-1 text-sm text-muted">
                Submit requisition specifications for prompt clearance and boarding scheduling.
              </p>
              <div className="mt-5">
                <HomeContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
