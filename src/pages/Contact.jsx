/**
 * Contact Us / Request a Quote
 * Spec §9: verified contact details, accessible enquiry form.
 *
 * ⚠  All contact details marked CONFIRM before launch.
 *    Phone numbers use href="tel:" (tap-to-call on mobile).
 *    WhatsApp numbers use the wa.me deep-link.
 */
import { site } from '../config/site.js'
import useMeta from '../hooks/useMeta.js'
import Icon from '../components/ui/Icon.jsx'
import PageHero from '../components/ui/PageHero.jsx'
import QuoteForm from '../components/ui/QuoteForm.jsx'

/* ── WhatsApp deep-link helper ─────────────────────────────── */
function waLink(raw) {
  return `https://wa.me/${raw.replace(/[^+\d]/g, '').replace(/^\+/, '')}`
}

/* ── Single office card ─────────────────────────────────────── */
function OfficeCard({ office }) {
  return (
    <article
      className="rounded border border-line bg-white p-6 shadow-card"
      aria-labelledby={`office-${office.region}`}
    >
      {/* Header */}
      <div className="mb-5 flex items-center gap-3">
        <span className="icon-badge-navy shrink-0">
          <Icon name="pin" className="h-4 w-4" />
        </span>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-ocean">
            {office.region} office
          </p>
          <h2 id={`office-${office.region}`} className="text-base font-bold text-navy">
            {office.city}
          </h2>
        </div>
      </div>

      {/* Address lines */}
      <address className="space-y-3 text-sm not-italic text-muted">
        <p className="flex items-start gap-3">
          <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-ocean" />
          <span>
            {office.address.map((line) => (
              <span key={line} className={`block ${line.startsWith('⚠') ? 'text-xs italic text-amber-600' : ''}`}>
                {line}
              </span>
            ))}
          </span>
        </p>

        {/* Phone — tap-to-call on mobile */}
        <p className="flex items-center gap-3">
          <Icon name="phone" className="h-4 w-4 shrink-0 text-ocean" />
          <a
            href={`tel:${office.phone.replace(/[^+\d]/g, '')}`}
            className="font-medium transition-colors hover:text-ocean"
          >
            {office.phone}
          </a>
        </p>

        {/* WhatsApp — deep link opens WhatsApp app on mobile */}
        {office.whatsapp && (
          <p className="flex items-center gap-3">
            {/* WhatsApp icon via SVG inline */}
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-ocean" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.402A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.952 7.952 0 01-4.073-1.117l-.292-.173-3.018.85.858-2.946-.19-.302A7.953 7.953 0 014 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z" />
            </svg>
            <a
              href={waLink(office.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium transition-colors hover:text-ocean"
            >
              WhatsApp: {office.whatsapp}
            </a>
          </p>
        )}

        {/* Primary email */}
        <p className="flex items-center gap-3">
          <Icon name="mail" className="h-4 w-4 shrink-0 text-ocean" />
          <a
            href={`mailto:${office.email}`}
            className="break-all transition-colors hover:text-ocean"
          >
            {office.email}
          </a>
        </p>

        {/* Alternate email */}
        {office.emailAlt && (
          <p className="flex items-center gap-3">
            <Icon name="mail" className="h-4 w-4 shrink-0 text-ocean/60" />
            <a
              href={`mailto:${office.emailAlt}`}
              className="break-all text-muted transition-colors hover:text-ocean"
            >
              {office.emailAlt}
            </a>
          </p>
        )}

        {/* Hours */}
        <p className="flex items-center gap-3">
          <Icon name="clock" className="h-4 w-4 shrink-0 text-ocean" />
          <span className="italic">{office.hours} ⚠ confirm</span>
        </p>
      </address>
    </article>
  )
}

/* ── Page ───────────────────────────────────────────────────── */
export default function Contact() {
  useMeta({
    title: 'Contact Us | Request a Quote | Globus International Marine Services',
    description:
      'Contact Globus IMS in Chennai (India) or Balboa (Panama). Phone, WhatsApp, email — or use the enquiry form for ship supplies, technical stores and maritime agency services.',
    canonical: 'https://www.globus-ims.com/contact',
  })
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        crumb="Contact / Request a Quote"
        title="Contact us / Request a quote"
        text="Speak to our India or Panama office, or send the form and we will respond with a clear, itemised quote."
      />

      <section className="bg-ice py-16 md:py-24">
        <div className="shell grid gap-8 xl:grid-cols-[1.5fr_1fr]">

          {/* ── Enquiry form ── */}
          <div>
            <QuoteForm />
          </div>

          {/* ── Office cards + notes ── */}
          <div className="space-y-5">
            {site.offices.map((o) => (
              <OfficeCard key={o.region} office={o} />
            ))}

            {/* Operations note */}
            <div className="rounded border border-line bg-white p-5 shadow-card">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-ocean" />
                </span>
                <p className="text-xs font-bold text-navy">Operations desk</p>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                Our team is available around vessel schedules. For urgent matters use the
                phone or WhatsApp numbers above.
              </p>
            </div>

            {/* Pre-launch notice */}
            <div className="rounded border border-amber-200 bg-amber-50 p-4 text-xs text-amber-700">
              <p className="font-semibold">⚠ Pre-launch notice</p>
              <p className="mt-1">
                Contact details are awaiting final confirmation from the client. Phone numbers,
                email addresses, office addresses and operating hours must be verified before
                this page goes live.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
