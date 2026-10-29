/**
 * About Us page
 * Spec: Company overview, capabilities, mission/vision/values (only if approved),
 *       operating regions, verified certifications (only if supplied).
 */
import { site } from '../config/site.js'
import useMeta from '../hooks/useMeta.js'
import Button from '../components/ui/Button.jsx'
import Icon from '../components/ui/Icon.jsx'
import PageHero from '../components/ui/PageHero.jsx'
import SceneArt from '../components/ui/SceneArt.jsx'

const capabilities = [
  {
    icon: 'anchor',
    title: 'Port call management',
    text: 'Pre-arrival planning, berth liaison, pilotage coordination and port clearance support for every call.',
  },
  {
    icon: 'container',
    title: 'Cargo & freight',
    text: 'Sea freight forwarding, cargo handling and shipment tracking aligned to your vessel schedule.',
  },
  {
    icon: 'file',
    title: 'Documentation',
    text: 'Accurate customs filings, bills of lading, statutory paperwork and regulatory submissions on time.',
  },
  {
    icon: 'truck',
    title: 'Inland movement',
    text: 'Road transport, warehousing and last-mile delivery connected directly to port operations.',
  },
]

export default function About() {
  const { statement, certifications, offices } = site
  useMeta({
    title: 'About Us | Globus International Marine Services',
    description:
      'Learn about Globus International Marine Services — a maritime agency and ship chandler operating across India and the Panama Canal corridor.',
    canonical: 'https://www.globus-ims.com/about',
  })

  return (
    <>
      <PageHero
        eyebrow="About us"
        title={`About ${site.name}`}
        text="A maritime agency and logistics partner operating across India and Panama."
      />

      {/* ══════════════════════════════════════════════════
          COMPANY OVERVIEW
          Spec: Company overview
      ══════════════════════════════════════════════════ */}
      <section className="bg-white py-16 md:py-24">
        <div className="shell grid items-center gap-12 xl:grid-cols-2 xl:gap-16">

          <div>
            <p className="eyebrow">Company overview</p>
            <h2 className="sec-title mt-3 text-3xl font-extrabold text-navy md:text-4xl">
              Dependable support, port after port
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted md:text-base">
              {site.name} supports vessel owners, operators and shippers with coordinated
              agency and logistics services across two strategically important maritime regions.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
              Our teams in India and Panama work to the vessel's schedule, keeping communication
              clear and costs transparent from the first enquiry to final reporting.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
              {site.tagline}
            </p>
            <Button to="/contact" arrow className="mt-8">
              Get in touch
            </Button>
          </div>

          <div className="overflow-hidden rounded border border-line shadow-heavy">
            <div className="aspect-[4/3]">
              <SceneArt variant="intro" alt="Vessel at berth" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CAPABILITIES
          Spec: capabilities
      ══════════════════════════════════════════════════ */}
      <section className="bg-ice py-16 md:py-24">
        <div className="shell">
          <p className="eyebrow">Capabilities</p>
          <h2 className="sec-title mt-3 text-3xl font-extrabold text-navy md:text-4xl">
            What we bring to every job
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-muted md:text-base">
            Four core disciplines, delivered by specialists who understand what a vessel needs
            to turn around on time.
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {capabilities.map((c) => (
              <div
                key={c.title}
                className="group rounded border border-line bg-white p-6 shadow-card transition-shadow hover:shadow-lift"
              >
                <span className="icon-badge-navy transition-colors group-hover:bg-ocean">
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
          OPERATING REGIONS
          Spec: operating regions
      ══════════════════════════════════════════════════ */}
      <section className="bg-white py-16 md:py-24">
        <div className="shell">
          <p className="eyebrow">Operating regions</p>
          <h2 className="sec-title mt-3 text-3xl font-extrabold text-navy md:text-4xl">
            Where we operate
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-muted md:text-base">
            Offices in two maritime regions and a trusted partner network that extends global reach.
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {offices.map((o) => (
              <div key={o.region} className="rounded border border-line bg-white p-6 shadow-card">
                <p className="eyebrow">{o.region}</p>
                <h3 className="mt-3 text-base font-bold text-navy">{o.city}</h3>
                <address className="mt-3 space-y-2 not-italic text-xs text-muted">
                  {o.address.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                  <p className="flex items-center gap-2 pt-1">
                    <Icon name="phone" className="h-3.5 w-3.5 shrink-0 text-ocean" />
                    <a href={`tel:${o.phone.replace(/[^+\d]/g, '')}`} className="hover:text-ocean">
                      {o.phone}
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <Icon name="mail" className="h-3.5 w-3.5 shrink-0 text-ocean" />
                    <a href={`mailto:${o.email}`} className="hover:text-ocean break-all">
                      {o.email}
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <Icon name="clock" className="h-3.5 w-3.5 shrink-0 text-ocean" />
                    {o.hours}
                  </p>
                </address>
              </div>
            ))}

            {/* International partner card */}
            <div className="rounded border border-navy-600 bg-navy p-6">
              <p className="eyebrow !text-sky">International</p>
              <h3 className="mt-3 text-base font-bold !text-white">Partner network</h3>
              <p className="mt-2 text-xs text-slate-300">
                Trusted correspondents and agents extend our reach beyond our own offices
                to key maritime hubs worldwide.
              </p>
              <Button to="/ports-locations" variant="ghost" arrow className="mt-5 !text-xs">
                View network
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          MISSION / VISION / VALUES
          Spec: only if approved
      ══════════════════════════════════════════════════ */}
      {statement.approved && (
        <section className="bg-ice py-16 md:py-24">
          <div className="shell">
            <p className="eyebrow">Our purpose</p>
            <h2 className="sec-title mt-3 text-3xl font-extrabold text-navy md:text-4xl">
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
          VERIFIED CERTIFICATIONS
          Spec: only if supplied and verified
      ══════════════════════════════════════════════════ */}
      {certifications.length > 0 && (
        <section className="bg-white py-16 md:py-24">
          <div className="shell">
            <p className="eyebrow">Certifications</p>
            <h2 className="sec-title mt-3 text-3xl font-extrabold text-navy md:text-4xl">
              Verified certifications
            </h2>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {certifications.map((c) => (
                <li
                  key={c.name}
                  className="flex items-start gap-3 rounded border border-line bg-white p-5 shadow-card"
                >
                  <Icon name="shield" className="mt-0.5 h-5 w-5 shrink-0 text-ocean" />
                  <div>
                    <p className="text-sm font-bold text-navy">{c.name}</p>
                    <p className="text-xs text-muted">
                      {c.issuer}{c.year ? ` · ${c.year}` : ''}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative overflow-hidden bg-ocean py-14">
        <span aria-hidden="true" className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/5" />
        <span aria-hidden="true" className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/5" />
        <div className="shell relative z-10 flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <h2 className="text-2xl font-bold !text-white md:text-3xl">
            Let's talk about your next port call.
          </h2>
          <Button to="/contact" variant="light" arrow className="shrink-0">
            Request a Quote
          </Button>
        </div>
      </section>
    </>
  )
}
