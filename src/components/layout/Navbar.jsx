/**
 * Navbar — two-row fixed header (Stitch design)
 *
 * §10 requirements met:
 *  - All nav links work (NavLink with active state)
 *  - "Request a Quote" CTA navigates to /contact
 *  - Mobile menu: opens, closes, keyboard navigable
 *    - Escape key closes the drawer + returns focus to hamburger
 *    - aria-expanded reflects state, aria-controls links button→drawer
 *  - Tap-to-call phone links (tel:) in the top strip and mobile drawer
 *  - Header is always opaque (no transparent-on-home logic)
 */
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { site } from '../../config/site.js'
import Icon from '../ui/Icon.jsx'
import Button from '../ui/Button.jsx'

export default function Navbar() {
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname }            = useLocation()
  const hamburgerRef            = useRef(null)

  /* Close on route change */
  useEffect(() => setOpen(false), [pathname])

  /* Scroll detection — shadow appears once the user scrolls past the hero top */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  /* Keyboard: Escape closes drawer + returns focus to hamburger */
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        hamburgerRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      {/* Offset spacer — fixed header overlays content on ALL pages */}
      <div className="h-20 md:h-[116px]" aria-hidden="true" />

      <header
        role="banner"
        className={[
          'fixed inset-x-0 top-0 z-50 transition-shadow duration-300',
          scrolled ? 'shadow-heavy' : '',
        ].join(' ')}
      >
        {/* ── Top utility row (hidden on mobile) ── */}
        <div className="hidden bg-navy text-xs text-slate-300 md:block">
          <div className="shell flex h-9 items-center justify-between">
            <span className="truncate">
              <span className="font-semibold text-white">India Hubs:</span>{' '}
              Mumbai, Kandla, Cochin, Chennai
              <span className="mx-2 text-white/25" aria-hidden="true">·</span>
              <span className="font-semibold text-white">Panama Canal:</span>{' '}
              Balboa, Cristóbal
            </span>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-sky/30 bg-navy-800 px-2.5 py-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-sky" aria-hidden="true" />
                24/7 Port Ops Active
              </span>
              <span className="hidden text-slate-400 lg:inline">VHF Ch. 16/74</span>
              <a
                href={`tel:${site.offices[1].phone.replace(/[^+\d]/g, '')}`}
                className="font-semibold text-sky transition-colors hover:text-white"
                aria-label={`Call Panama office: ${site.offices[1].phone}`}
              >
                {site.offices[1].phone}
              </a>
            </div>
          </div>
        </div>

        {/* ── Main bar ── */}
        <div className="bg-surface text-navy">
          <div className="shell flex h-20 items-center justify-between">
            {/* Inline two-line logo */}
            <Link to="/" className="flex items-center gap-3" aria-label={`${site.name} — home`}>
              <span className="flex h-9 w-9 items-center justify-center rounded bg-ocean text-white">
                <Icon name="anchor" className="h-5 w-5" />
              </span>
              <span className="leading-none">
                <span className="block text-base font-extrabold uppercase tracking-tight text-navy">
                  Globus International
                </span>
                <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                  Marine Services • India &amp; Panama
                </span>
              </span>
            </Link>

            {/* Desktop navigation */}
            <nav aria-label="Primary navigation" className="hidden items-center gap-7 xl:flex">
              {site.nav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) => [
                    'relative py-1 text-sm font-semibold transition-colors duration-150',
                    isActive ? 'text-ocean' : 'text-navy/80 hover:text-ocean',
                  ].join(' ')}
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive && (
                        <span
                          className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-sky"
                          aria-hidden="true"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              {/* Request a Quote CTA — navigates to /contact (§10) */}
              <Button to="/contact" className="hidden !bg-ocean !py-2 !text-xs uppercase tracking-wide md:inline-flex">
                Request a Quote
              </Button>

              {/* Contact avatar — links to /contact */}
              <Link
                to="/contact"
                className="hidden h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-navy transition-colors hover:border-ocean hover:text-ocean xl:flex"
                aria-label="Contact us"
              >
                <Icon name="users" className="h-5 w-5" />
              </Link>

              {/* Hamburger button — accessible (§10) */}
              <button
                ref={hamburgerRef}
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded border border-line bg-white text-navy transition-colors hover:border-ocean hover:text-ocean xl:hidden"
                aria-expanded={open}
                aria-controls="mobile-nav"
                aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
                onClick={() => setOpen((v) => !v)}
              >
                <Icon name={open ? 'close' : 'menu'} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile drawer ── */}
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="false"
          aria-label="Mobile navigation"
          className={[
            'border-t border-line bg-surface xl:hidden',
            open ? 'block' : 'hidden',
          ].join(' ')}
        >
          <nav aria-label="Mobile navigation links" className="shell flex flex-col py-2">
            {site.nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => [
                  'border-b border-line py-4 text-sm font-semibold transition-colors',
                  isActive ? 'text-ocean' : 'text-navy/80 hover:text-ocean',
                ].join(' ')}
              >
                {item.label}
              </NavLink>
            ))}

            {/* Request a Quote — mobile CTA */}
            <Button to="/contact" className="mt-4 !bg-ocean uppercase tracking-wide">
              Request a Quote
            </Button>

            {/* Tap-to-call phone numbers — §10 tel: links */}
            <div className="mt-4 mb-2 space-y-2 border-t border-line pt-4">
              {site.offices.map((o) => (
                <a
                  key={o.region}
                  href={`tel:${o.phone.replace(/[^+\d]/g, '')}`}
                  className="flex items-center gap-3 rounded border border-line bg-white px-3 py-3 text-navy transition-colors hover:border-ocean/40 hover:text-ocean"
                  aria-label={`Call ${o.region} office: ${o.phone}`}
                >
                  <Icon name="phone" className="h-4 w-4 shrink-0 text-ocean" />
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
                      {o.region}
                    </p>
                    <p className="text-sm font-semibold">{o.phone}</p>
                  </div>
                </a>
              ))}
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}
