/**
 * Services page — full client-supplied catalogue
 *
 * All 17 services retained; grouped into four sections:
 *   1. Ship Supplies (8 services)
 *   2. Technical & Engineering (4 services)
 *   3. Safety & Compliance (3 services)
 *   4. Agency & Other Support (2 services)
 *
 * Pre-launch notes visible in the data file (services.js):
 *   • Paints brand names need authorisation confirmation
 *   • Gas Refilling brand spelling needs confirmation
 *   • CTM abbreviation needs confirmation from client
 */
import { Link } from 'react-router-dom'
import useMeta from '../hooks/useMeta.js'
import {
  supplyServices,
  technicalServices,
  safetyServices,
  agencyServices,
} from '../data/services.js'
import Button from '../components/ui/Button.jsx'
import Icon from '../components/ui/Icon.jsx'
import PageHero from '../components/ui/PageHero.jsx'

/* ─────────────────────────────────────────────────────────────
   Inline service card — slightly wider than the home version,
   includes bullet points and a direct enquiry link.
───────────────────────────────────────────────────────────── */
function ServiceItem({ service }) {
  return (
    <article className="group flex h-full flex-col rounded border border-line bg-white p-6 shadow-card transition-shadow hover:shadow-lift">
      {/* Icon */}
      <div className="icon-badge shrink-0 transition-colors group-hover:bg-ocean group-hover:text-white">
        <Icon name={service.icon} className="h-5 w-5" />
      </div>

      <h3 className="mt-4 text-base font-bold text-navy">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{service.summary}</p>

      {/* Bullet points */}
      {service.points?.length > 0 && (
        <ul className="mt-4 space-y-1.5 border-t border-line pt-4">
          {service.points.map((pt) => (
            <li key={pt} className="flex items-start gap-2 text-xs text-ink">
              <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ocean" strokeWidth={2.3} />
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Direct enquiry link */}
      <Link
        to={`/contact?service=${service.slug}`}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ocean transition-colors hover:text-ocean-dark"
        aria-label={`Enquire about ${service.title}`}
      >
        Enquire about this service
        <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </article>
  )
}

/* ─────────────────────────────────────────────────────────────
   Section block — heading + grid of service cards
───────────────────────────────────────────────────────────── */
function ServiceGroup({ id, eyebrow, title, description, services, tone = 'white' }) {
  const bg = tone === 'ice' ? 'bg-ice' : 'bg-white'
  return (
    <section id={id} className={`${bg} py-16 md:py-20`}>
      <div className="shell">
        {/* Group header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="sec-title mt-3 text-2xl font-extrabold text-navy md:text-3xl">
              {title}
            </h2>
            {description && (
              <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">{description}</p>
            )}
          </div>
          <Link
            to="/contact"
            className="shrink-0 self-start inline-flex items-center gap-1.5 text-sm font-semibold text-ocean hover:text-ocean-dark sm:self-auto"
          >
            Enquire
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>

        {/* Responsive grid: 1 col → 2 col → 3 col */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((s) => (
            <ServiceItem key={s.slug} service={s} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────────── */
export default function Services() {
  useMeta({
    title: 'Services | Globus International Marine Services',
    description:
      'Full ship chandler service catalogue: provisions, engine & deck stores, bonded stores, lubricants, repairs, underwater diving, life-raft servicing and more — India & Panama.',
    canonical: 'https://www.globus-ims.com/services',
  })
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Full service catalogue"
        text="Every service we provide is listed below — grouped by category, each with a direct enquiry link. Tell us your vessel, port and requirement."
      />

      {/* ── Quick-jump navigation — mobile-friendly ─────────── */}
      <nav
        aria-label="Jump to service group"
        className="sticky top-[64px] z-40 border-b border-line bg-white/95 backdrop-blur-sm md:top-[100px]"
      >
        <div className="shell">
          <ul className="flex gap-1 overflow-x-auto py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {[
              { href: '#ship-supplies',   label: 'Ship Supplies' },
              { href: '#technical',       label: 'Technical & Engineering' },
              { href: '#safety',          label: 'Safety & Compliance' },
              { href: '#agency',          label: 'Agency & Support' },
            ].map((link) => (
              <li key={link.href} className="shrink-0">
                <a
                  href={link.href}
                  className="inline-block rounded px-3 py-1.5 text-xs font-semibold text-navy transition-colors hover:bg-ice hover:text-ocean"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════════
          GROUP 1 — Ship Supplies (8 services)
      ══════════════════════════════════════════════════════ */}
      <ServiceGroup
        id="ship-supplies"
        eyebrow="Group 1 of 4"
        title="Ship Supplies"
        description="Provisions, stores, consumables and materials supplied to vessels at berth, anchorage or via barge."
        services={supplyServices}
        tone="ice"
      />

      {/* ══════════════════════════════════════════════════════
          GROUP 2 — Technical & Engineering (4 services)
      ══════════════════════════════════════════════════════ */}
      <ServiceGroup
        id="technical"
        eyebrow="Group 2 of 4"
        title="Technical & Engineering Services"
        description="Repair, inspection and maintenance services carried out by skilled technicians while the vessel is in port or at anchor."
        services={technicalServices}
        tone="white"
      />

      {/* ══════════════════════════════════════════════════════
          GROUP 3 — Safety & Compliance (3 services)
      ══════════════════════════════════════════════════════ */}
      <ServiceGroup
        id="safety"
        eyebrow="Group 3 of 4"
        title="Safety & Compliance"
        description="Life-saving appliance servicing, safety equipment and security measures to keep your vessel compliant."
        services={safetyServices}
        tone="ice"
      />

      {/* ══════════════════════════════════════════════════════
          GROUP 4 — Agency & Other Support (2 services)
      ══════════════════════════════════════════════════════ */}
      <ServiceGroup
        id="agency"
        eyebrow="Group 4 of 4"
        title="Agency & Other Support Services"
        description="Port-call coordination, cash-to-master services and any other requirements not covered above."
        services={agencyServices}
        tone="white"
      />

      {/* ══════════════════════════════════════════════════════
          PRE-LAUNCH NOTICES — visible until confirmed
      ══════════════════════════════════════════════════════ */}
      <section className="bg-amber-50 py-10 border-y border-amber-200">
        <div className="shell">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-700">
            ⚠ Pre-launch — items pending client confirmation
          </p>
          <ul className="mt-4 space-y-2 text-xs text-amber-700">
            <li className="flex items-start gap-2">
              <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" strokeWidth={2} />
              <span>
                <strong>Paints (International & Hempel):</strong> Brand names retained as supplied.
                Confirm the client is an authorised stockist or agent before publishing.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" strokeWidth={2} />
              <span>
                <strong>Gas Refilling (Drew/Unitor):</strong> "Drew" likely refers to Drew Marine;
                "Unitor" is a Wilhelmsen brand. Confirm exact brand relationships and spelling before publishing.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" strokeWidth={2} />
              <span>
                <strong>CTM:</strong> Most likely "Cash to Master" in a ship-supply context, but could also
                mean "Crew &amp; Technical Management". Confirm exact meaning with the client before expanding
                the abbreviation in published copy.
              </span>
            </li>
          </ul>
          <p className="mt-4 text-xs text-amber-600 italic">
            This notice is for internal review. Remove before going live.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          HOW IT WORKS — 4-step process
      ══════════════════════════════════════════════════════ */}
      <section className="bg-white py-16 md:py-20">
        <div className="shell">
          <p className="eyebrow">How it works</p>
          <h2 className="sec-title mt-3 text-3xl font-extrabold text-navy md:text-4xl">
            From enquiry to delivery
          </h2>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                n: '01',
                title: 'Send an enquiry',
                text: 'Use any service link or the contact form. Tell us your vessel, port and timing.',
              },
              {
                n: '02',
                title: 'We confirm scope',
                text: 'Our team responds with a clear, itemised proposal.',
              },
              {
                n: '03',
                title: 'We coordinate',
                text: 'Sourcing, delivery, boarding and paperwork managed end to end.',
              },
              {
                n: '04',
                title: 'You receive reporting',
                text: 'Transparent cost statements and updates at every stage.',
              },
            ].map((step) => (
              <div key={step.n} className="rounded border border-line bg-white p-6 shadow-card">
                <span className="text-3xl font-extrabold text-ocean/25">{step.n}</span>
                <h3 className="mt-3 text-sm font-bold text-navy">{step.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="relative overflow-hidden bg-ocean py-14">
        <span aria-hidden="true" className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/5" />
        <span aria-hidden="true" className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/5" />
        <div className="shell relative z-10 flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <h2 className="text-2xl font-bold !text-white md:text-3xl">
              Don't see exactly what you need?
            </h2>
            <p className="mt-2 text-sm text-white/80 md:text-base">
              Describe your requirement and we will advise the right solution.
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
