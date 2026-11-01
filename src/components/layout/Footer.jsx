/**
 * Footer — matches the reference screenshot exactly.
 *
 * Structure:
 *  1. Pre-footer CTA strip (navy-800):
 *     Left: "ALWAYS ON DUTY" eyebrow + H2 + body + badges
 *     Right: "REQUEST A QUOTE" button + Direct Ops Desk panel
 *
 *  2. Main footer grid (navy):
 *     Col 1 — Brand: logo, description, certifications
 *     Col 2 — Marine Services: flat service list
 *     Col 3 — Strategic Port Hubs: India / Panama / Global groups
 *     Col 4 — Port Operations & Contacts: two office cards
 *
 *  3. Bottom bar: copyright · SOLAS & ISM Certified · Privacy Policy · Terms of Service
 *
 * All phone numbers use href="tel:" (tap-to-call on mobile).
 * All emails use href="mailto:".
 * Mobile: single column, all sections stack vertically.
 */
import { Link } from 'react-router-dom'
import { site } from '../../config/site.js'
import { services } from '../../data/services.js'
import { indianPorts, panamaPorts, internationalNetwork } from '../../data/ports.js'
import Icon from '../ui/Icon.jsx'

/* ── Flat service list for footer ───────────────────────── */
const footerServices = [
  'Ship Provisions & Bonded Stores',
  'Engine, Deck & Cabin Stores',
  'Lubricants & Bunker Supply',
  'Safety Equipment & Life Raft Inspection',
  'Underwater Diving & Hull Cleaning',
  'Technical Marine Repairs & Calibration',
]

export default function Footer() {
  const india  = site.offices[0]
  const panama = site.offices[1]

  return (
    <footer role="contentinfo">

      {/* ══════════════════════════════════════════════════════
          PRE-FOOTER CTA STRIP
          "Planning Your Next Port Call?"
      ══════════════════════════════════════════════════════ */}
      <div className="bg-navy-800">
        <div className="shell grid gap-8 py-12 xl:grid-cols-[1fr_380px]">

          {/* Left — heading + body + badges */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sky animate-pulse" aria-hidden="true" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky">
                Always On Duty • 24/7/365
              </span>
            </div>
            <h2 className="text-2xl font-extrabold !text-white md:text-3xl">
              Planning Your Next Port Call?
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-300">
              Contact our team for marine supply requirements and service enquiries. We operate 24
              hours a day, 365 days a year across all Indian ports and the Panama Canal transit
              corridor.
            </p>
            {/* Badges row */}
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-semibold text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-slate-400" aria-hidden="true" />
                Average ETA response: 30 mins
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-slate-400" aria-hidden="true" />
                Emergency Chandlery Dispatch
              </span>
            </div>
          </div>

          {/* Right — CTA button + Direct Operations Desk panel */}
          <div className="flex flex-col gap-4">
            {/* REQUEST A QUOTE button */}
            <Link
              to="/contact"
              className="flex items-center justify-center gap-2 rounded bg-ocean px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-ocean-dark"
            >
              <Icon name="file" className="h-4 w-4" />
              Request a Quote
            </Link>

            {/* Direct Operations Desk panel */}
            <div className="rounded border border-white/15 bg-navy p-4 text-xs">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-white">
                Direct Operations Desk
              </p>
              <dl className="space-y-2">
                {/* VHF + Panama */}
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="shrink-0 text-slate-400">VHF Ch. 16/74</dt>
                  <dd>
                    <a
                      href={`tel:${panama.phone.replace(/[^+\d]/g,'')}`}
                      className="font-semibold text-sky hover:text-white transition-colors"
                      aria-label={`Panama ops: ${panama.phone}`}
                    >
                      {panama.phone}
                    </a>
                  </dd>
                </div>
                {/* India desk */}
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="shrink-0 text-slate-400">India Desk:</dt>
                  <dd>
                    <a
                      href={`tel:${india.phone.replace(/[^+\d]/g,'')}`}
                      className="font-semibold text-sky hover:text-white transition-colors"
                      aria-label={`India ops: ${india.phone}`}
                    >
                      {india.phone}
                    </a>
                  </dd>
                </div>
                {/* Email */}
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="shrink-0 text-slate-400 uppercase tracking-wider text-[10px] font-bold">
                    Email:
                  </dt>
                  <dd>
                    <a
                      href={`mailto:${site.enquiryEmail}`}
                      className="break-all font-semibold text-sky hover:text-white transition-colors"
                    >
                      {site.enquiryEmail}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          MAIN FOOTER — 4 columns
      ══════════════════════════════════════════════════════ */}
      <div className="bg-navy text-slate-400">
        <div className="shell grid gap-8 py-12
                        grid-cols-1
                        sm:grid-cols-2
                        xl:grid-cols-[1.6fr_1.1fr_1.3fr_1.5fr]">

          {/* ── Col 1: Brand ── */}
          <div className="sm:col-span-2 xl:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3" aria-label={`${site.name} — home`}>
              <span className="flex h-9 w-9 items-center justify-center rounded bg-ocean text-white">
                <Icon name="anchor" className="h-5 w-5" />
              </span>
              <span className="leading-none">
                <span className="block text-sm font-extrabold uppercase tracking-tight text-white">
                  Globus Marine
                </span>
                <span className="mt-0.5 block text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                  Global Chandlery &amp; Logistics
                </span>
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-xs leading-relaxed">
              Premier full-spectrum ship chandlery, high-precision technical marine
              superintendence, and comprehensive port call turnaround solutions across
              major maritime corridors in India and the Panama Canal transit authority.
            </p>

            <div className="mt-4 space-y-1.5 text-xs">
              <p className="flex items-center gap-1.5 text-slate-300">
                <Icon name="shield" className="h-3.5 w-3.5 text-sky" />
                ISO 9001:2015 &amp; ISSA / IMPA Registered
              </p>
              <p className="flex items-center gap-1.5 text-slate-300">
                <Icon name="check" className="h-3.5 w-3.5 text-sky" strokeWidth={2.2} />
                Full SOLAS &amp; MARPOL Compliance
              </p>
            </div>
          </div>

          {/* ── Col 2: Marine Services ── */}
          <div>
            <h3 className="mb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white">
              Marine Services
            </h3>
            <div className="mb-4 h-px w-full bg-white/10" />
            <ul className="space-y-2 text-xs">
              {footerServices.map((s) => (
                <li key={s}>
                  <Link
                    to="/services"
                    className="transition-colors hover:text-sky"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Strategic Port Hubs ── */}
          <div>
            <h3 className="mb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white">
              Strategic Port Hubs
            </h3>
            <div className="mb-4 h-px w-full bg-white/10" />

            <div className="space-y-4 text-xs">
              {/* India Regional Network */}
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-sky">
                  India Regional Network
                </p>
                <p className="leading-relaxed text-slate-400">
                  {indianPorts.slice(0, 6).map(p => p.name).join(', ')}
                  {indianPorts.length > 6 && (
                    <Link to="/ports-locations" className="ml-1 font-semibold text-ocean hover:text-sky">
                      + {indianPorts.length - 6} more
                    </Link>
                  )}
                </p>
              </div>

              {/* Panama Canal Authority */}
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-sky">
                  Panama Canal Authority
                </p>
                <p className="leading-relaxed text-slate-400">
                  {panamaPorts.map(p => p.name).join(', ')}
                </p>
              </div>

              {/* Global Liaison Offices */}
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-sky">
                  Global Liaison Offices
                </p>
                <p className="leading-relaxed text-slate-400">
                  {internationalNetwork.join(', ')}
                </p>
              </div>
            </div>
          </div>

          {/* ── Col 4: Port Operations & Contacts ── */}
          <div>
            <h3 className="mb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white">
              Port Operations &amp; Contacts
            </h3>
            <div className="mb-4 h-px w-full bg-white/10" />

            <div className="space-y-4 text-xs">
              {/* 24/7 Master Ops Desk */}
              <div className="rounded border border-white/10 bg-navy-800 p-3">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-white">
                  24/7 Master Ops Desk
                </p>
                <a href={`mailto:${india.email}`}
                  className="block break-all text-slate-400 hover:text-sky transition-colors">
                  {india.email}
                </a>
                <a href={`mailto:${site.enquiryEmail}`}
                  className="mt-0.5 block break-all text-slate-400 hover:text-sky transition-colors">
                  {site.enquiryEmail}
                </a>
              </div>

              {/* India Head Office */}
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  India Head Office
                </p>
                <p className="text-slate-400 leading-relaxed">
                  {india.address.filter(l => !l.startsWith('⚠')).join(', ')}
                </p>
                <a
                  href={`tel:${india.phone.replace(/[^+\d]/g,'')}`}
                  className="mt-1 block text-slate-400 hover:text-sky transition-colors"
                  aria-label={`India: ${india.phone}`}
                >
                  Tel: {india.phone} / VHF Ch 16
                </a>
              </div>

              {/* Panama Canal Agency */}
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  Panama Canal Agency
                </p>
                <p className="text-slate-400 leading-relaxed">
                  {panama.address.filter(l => !l.startsWith('⚠')).join(', ')}
                </p>
                <a
                  href={`tel:${panama.phone.replace(/[^+\d]/g,'')}`}
                  className="mt-1 block text-slate-400 hover:text-sky transition-colors"
                  aria-label={`Panama: ${panama.phone}`}
                >
                  Tel: {panama.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          BOTTOM BAR
      ══════════════════════════════════════════════════════ */}
      <div className="border-t border-white/10 bg-navy">
        <div className="shell flex flex-col gap-3 py-4 text-xs text-slate-500
                        sm:flex-row sm:items-center sm:justify-between">
          {/* Copyright */}
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>

          {/* Right links */}
          <div className="flex flex-wrap items-center gap-1 text-slate-500">
            <span className="flex items-center gap-1 font-semibold text-slate-300">
              <Icon name="shield" className="h-3 w-3 text-sky" />
              SOLAS &amp; ISM Certified
            </span>
            <span className="mx-2 text-white/20" aria-hidden="true">|</span>
            {site.privacyPolicyUrl ? (
              <a
                href={site.privacyPolicyUrl}
                className="transition-colors hover:text-slate-300"
              >
                Privacy Policy
              </a>
            ) : (
              <span>Privacy Policy</span>
            )}
            <span className="mx-2 text-white/20" aria-hidden="true">|</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
