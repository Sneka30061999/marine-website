/**
 * Navbar
 *
 * §10 requirements met:
 *  - All nav links work (NavLink with active state)
 *  - "Request a Quote" CTA navigates to /contact
 *  - Mobile menu: opens, closes, keyboard navigable
 *    - Escape key closes the drawer
 *    - aria-expanded reflects state
 *    - aria-controls links button to drawer
 *    - Focus returns to hamburger on close
 *  - Tap-to-call phone links in mobile drawer
 *  - Transparent on home hero, solid navy on scroll
 */
import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { site } from '../../config/site.js'
import Logo from './Logo.jsx'
import Icon from '../ui/Icon.jsx'
import Button from '../ui/Button.jsx'

export default function Navbar() {
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname }            = useLocation()
  const hamburgerRef            = useRef(null)

  /* Close on route change */
  useEffect(() => setOpen(false), [pathname])

  /* Scroll detection */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
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

  const isHome      = pathname === '/'
  const transparent = isHome && !scrolled && !open

  return (
    <>
      {/* Inner-page offset spacer — hero overlaps bar on home */}
      {!isHome && <div className="h-16 md:h-[100px]" aria-hidden="true" />}

      <header
        role="banner"
        className={[
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          transparent ? 'bg-transparent' : 'bg-navy shadow-heavy',
        ].join(' ')}
      >
        {/* ── Utility strip ── */}
        <div
          className={[
            'hidden border-b border-white/10 text-xs text-slate-400 md:block',
            transparent ? 'bg-navy/50 backdrop-blur-sm' : 'bg-navy-800',
          ].join(' ')}
        >
          <div className="shell flex h-9 items-center justify-between">
            <span>India &nbsp;·&nbsp; Panama &nbsp;·&nbsp; International network</span>
            {/* mailto: link — §10 */}
            <a
              href={`mailto:${site.enquiryEmail}`}
              className="transition-colors hover:text-white"
              aria-label={`Email us: ${site.enquiryEmail}`}
            >
              {site.enquiryEmail}
            </a>
          </div>
        </div>

        {/* ── Main bar ── */}
        <div className="shell flex h-16 items-center justify-between">
          <Logo dark />

          {/* Desktop navigation */}
          <nav aria-label="Primary navigation" className="hidden items-center gap-7 xl:flex">
            {site.nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => [
                  'relative py-1 text-sm font-semibold transition-colors duration-150',
                  isActive ? 'text-sky' : 'text-white/85 hover:text-sky',
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
            <Button to="/contact" className="hidden !py-2 !text-sm md:inline-flex">
              Request a Quote
            </Button>

            {/* Hamburger button — accessible (§10) */}
            <button
              ref={hamburgerRef}
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded border border-white/25 text-white xl:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setOpen((v) => !v)}
            >
              <Icon name={open ? 'close' : 'menu'} />
            </button>
          </div>
        </div>

        {/* ── Mobile drawer ── */}
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="false"
          aria-label="Mobile navigation"
          className={[
            'border-t border-white/10 bg-navy xl:hidden',
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
                  'border-b border-white/10 py-4 text-sm font-semibold transition-colors',
                  isActive ? 'text-sky' : 'text-white/85 hover:text-sky',
                ].join(' ')}
              >
                {item.label}
              </NavLink>
            ))}

            {/* Request a Quote — mobile CTA */}
            <Button to="/contact" className="mt-4">
              Request a Quote
            </Button>

            {/* Tap-to-call phone numbers — §10 tel: links */}
            <div className="mt-4 mb-2 space-y-2 border-t border-white/10 pt-4">
              {site.offices.map((o) => (
                <a
                  key={o.region}
                  href={`tel:${o.phone.replace(/[^+\d]/g, '')}`}
                  className="flex items-center gap-3 rounded border border-white/10 px-3 py-3 text-slate-300 transition-colors hover:border-sky/30 hover:text-sky"
                  aria-label={`Call ${o.region} office: ${o.phone}`}
                >
                  <Icon name="phone" className="h-4 w-4 shrink-0 text-sky" />
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
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
