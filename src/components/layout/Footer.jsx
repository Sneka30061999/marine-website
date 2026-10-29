/**
 * Footer
 * Spec: Navigation, approved services, verified contact info,
 *       copyright, and privacy link if a privacy policy exists.
 *
 * Phone numbers use href="tel:" so they are tap-to-call on mobile.
 */
import { Link } from 'react-router-dom'
import { site } from '../../config/site.js'
import { services } from '../../data/services.js'
import Logo from './Logo.jsx'
import Icon from '../ui/Icon.jsx'

export default function Footer() {
  return (
    <footer className="bg-navy-800">

      {/* ── Main grid ── */}
      <div className="shell grid gap-10 py-14 md:grid-cols-2 xl:grid-cols-[1.6fr_1fr_1.2fr_1.5fr]">

        {/* Brand */}
        <div>
          <Logo dark />
          <p className="mt-4 max-w-xs text-xs leading-relaxed text-slate-400">
            {site.tagline}
          </p>
          <p className="mt-4 text-xs text-slate-500">
            Maritime agency and logistics services across India and Panama.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest !text-white">Navigation</h3>
          <div className="mb-4 mt-2 h-[2px] w-8 rounded-full bg-ocean" />
          <ul className="space-y-2.5 text-xs">
            {site.nav.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  className="flex items-center gap-2 text-slate-400 transition-colors hover:text-sky"
                >
                  <Icon name="arrow" className="h-3 w-3 text-ocean" />
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Approved services */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest !text-white">Services</h3>
          <div className="mb-4 mt-2 h-[2px] w-8 rounded-full bg-ocean" />
          <ul className="space-y-2.5 text-xs">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  to={`/contact?service=${s.slug}`}
                  className="flex items-center gap-2 text-slate-400 transition-colors hover:text-sky"
                >
                  <Icon name="arrow" className="h-3 w-3 text-ocean" />
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Verified contact — tap-to-call on mobile */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest !text-white">Contact</h3>
          <div className="mb-4 mt-2 h-[2px] w-8 rounded-full bg-ocean" />
          <div className="space-y-5 text-xs">
            {site.offices.map((o) => (
              <div key={o.region}>
                <p className="mb-1.5 text-xs font-semibold text-white">{o.region}</p>
                {/* href="tel:" — tap-to-call on every mobile device */}
                <a
                  href={`tel:${o.phone.replace(/[^+\d]/g, '')}`}
                  className="flex items-center gap-2 text-slate-400 transition-colors hover:text-sky"
                  aria-label={`Call ${o.region} office: ${o.phone}`}
                >
                  <Icon name="phone" className="h-3.5 w-3.5 shrink-0 text-sky" />
                  {o.phone}
                </a>
                <a
                  href={`mailto:${o.email}`}
                  className="mt-1.5 flex items-center gap-2 break-all text-slate-400 transition-colors hover:text-sky"
                >
                  <Icon name="mail" className="h-3.5 w-3.5 shrink-0 text-sky" />
                  {o.email}
                </a>
              </div>
            ))}

            {/* General enquiries */}
            <div>
              <p className="mb-1.5 text-xs font-semibold text-white">General enquiries</p>
              <a
                href={`mailto:${site.enquiryEmail}`}
                className="flex items-center gap-2 break-all text-slate-400 transition-colors hover:text-sky"
              >
                <Icon name="mail" className="h-3.5 w-3.5 shrink-0 text-sky" />
                {site.enquiryEmail}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar — copyright + privacy ── */}
      <div className="border-t border-white/10 bg-navy">
        <div className="shell flex flex-col gap-2 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>India · Panama · International</span>
            {/* Privacy link — only rendered when a policy URL is configured */}
            {site.privacyPolicyUrl && (
              <a
                href={site.privacyPolicyUrl}
                className="transition-colors hover:text-slate-300"
              >
                Privacy policy
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
