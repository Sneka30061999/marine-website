/**
 * Ports & Locations page
 *
 * Layout:
 *  ┌────────────────────────────┬─────────────────────┐
 *  │  India ports  (pills)      │                     │
 *  │  Panama ports (pills)      │   ONE Google Map    │
 *  │  International (pills)     │   (both regions)    │
 *  └────────────────────────────┴─────────────────────┘
 *
 * Mobile: content stacks above map (single column).
 */
import { indianPorts, panamaPorts, internationalNetwork } from '../data/ports.js'
import useMeta from '../hooks/useMeta.js'
import portsHeroImg from '../assets/ports-location-hero.jpg'
import Icon from '../components/ui/Icon.jsx'
import PageHero from '../components/ui/PageHero.jsx'

export default function Ports() {
  useMeta({
    title: 'Ports & Locations | Globus International Marine Services',
    description:
      'Ship chandler and maritime agency coverage across Indian ports, Panama Canal corridor (Balboa, Cristóbal, Manzanillo, Colón) and international network including UAE, China, Brazil.',
    canonical: 'https://www.globus-ims.com/ports-locations',
  })

  return (
    <>
      <PageHero
        eyebrow="Ports & locations"
        title="Ports and locations we serve"
        text="Direct coverage across Indian ports, the Panama Canal corridor and an international partner network."
        bgImage={portsHeroImg}
      />

      {/* ══════════════════════════════════════════════════════
          PRIMARY REGIONS — Left: content, Right: one map
      ══════════════════════════════════════════════════════ */}
      <section className="bg-ice py-16 md:py-20">
        <div className="shell">
          <p className="eyebrow">Primary regions</p>
          <h2 className="sec-title mt-3 text-3xl font-extrabold text-navy md:text-4xl">
            India and Panama
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-muted md:text-base">
            Direct operational coverage with local teams at each of these locations.
          </p>

          {/* Two-column: content left, single map right */}
          <div className="mt-10 grid gap-6 xl:grid-cols-[1fr_480px]">

            {/* ── LEFT: all port content ── */}
            <div className="flex flex-col gap-6">

              {/* India section */}
              <div className="overflow-hidden rounded border border-line bg-white shadow-card">
                {/* Header */}
                <div className="flex items-center justify-between bg-navy px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <Icon name="anchor" className="h-4 w-4 text-sky" />
                    <h3 className="text-sm font-bold text-white">Indian Ports</h3>
                  </div>
                  <span className="rounded border border-sky/30 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-sky">
                    {indianPorts.length} ports
                  </span>
                </div>

                {/* Horizontal inline pills */}
                <div className="p-5">
                  <div
                    className="flex flex-wrap gap-2"
                    role="list"
                    aria-label="Indian ports"
                  >
                    {indianPorts.map((p) => (
                      <span
                        key={p.name}
                        role="listitem"
                        title={p.note}
                        className="inline-flex items-center gap-1.5 rounded border border-ocean/25 bg-ice px-3 py-1.5 text-xs font-semibold text-navy transition-colors hover:border-ocean hover:bg-ocean/5 hover:text-ocean"
                      >
                        <Icon name="anchor" className="h-3 w-3 shrink-0 text-ocean" />
                        {p.name}
                      </span>
                    ))}
                  </div>
                  {/* Subregion legend */}
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[11px] text-muted">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-ocean" aria-hidden="true" />
                      East coast
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-sky" aria-hidden="true" />
                      West coast
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-navy/30" aria-hidden="true" />
                      Islands
                    </span>
                  </div>
                </div>
              </div>

              {/* Panama section */}
              <div className="overflow-hidden rounded border border-line bg-white shadow-card">
                {/* Header */}
                <div className="flex items-center justify-between bg-navy px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <Icon name="compass" className="h-4 w-4 text-sky" />
                    <h3 className="text-sm font-bold text-white">Panama Canal Corridor</h3>
                  </div>
                  <span className="rounded border border-sky/30 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-sky">
                    {panamaPorts.length} ports
                  </span>
                </div>

                <div className="p-5">
                  {/* Horizontal inline pills */}
                  <div
                    className="flex flex-wrap gap-2"
                    role="list"
                    aria-label="Panama ports"
                  >
                    {panamaPorts.map((p) => (
                      <span
                        key={p.name}
                        role="listitem"
                        title={p.note}
                        className="inline-flex items-center gap-1.5 rounded border border-ocean/25 bg-ice px-3 py-1.5 text-xs font-semibold text-navy transition-colors hover:border-ocean hover:bg-ocean/5 hover:text-ocean"
                      >
                        <Icon name="pin" className="h-3 w-3 shrink-0 text-ocean" />
                        {p.name}
                      </span>
                    ))}
                  </div>

                  {/* Port + approach table */}
                  <div className="mt-4 divide-y divide-line rounded border border-line">
                    {panamaPorts.map((p) => (
                      <div
                        key={p.name}
                        className="flex items-center justify-between px-4 py-2.5 text-xs"
                      >
                        <span className="font-semibold text-navy">{p.name}</span>
                        <span className="text-muted">{p.note}</span>
                      </div>
                    ))}
                  </div>

                  {/* Approach legend */}
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[11px] text-muted">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-ocean" aria-hidden="true" />
                      Pacific approach
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-sky" aria-hidden="true" />
                      Atlantic approach
                    </span>
                  </div>
                </div>
              </div>

              {/* International network — pills inline */}
              <div className="overflow-hidden rounded border border-line bg-white shadow-card">
                <div className="flex items-center justify-between bg-navy px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <Icon name="globe" className="h-4 w-4 text-sky" />
                    <h3 className="text-sm font-bold text-white">International Network</h3>
                  </div>
                  <span className="rounded border border-sky/30 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-sky">
                    Via correspondents
                  </span>
                </div>
                <div className="p-5">
                  <div
                    className="flex flex-wrap gap-2"
                    role="list"
                    aria-label="International network regions"
                  >
                    {internationalNetwork.map((n) => (
                      <span
                        key={n}
                        role="listitem"
                        className="inline-flex items-center gap-1.5 rounded border border-line bg-ice px-3 py-1.5 text-xs font-semibold text-navy transition-colors hover:border-ocean/50 hover:bg-ocean/5 hover:text-ocean"
                      >
                        <Icon name="globe" className="h-3 w-3 shrink-0 text-ocean" />
                        {n}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-[11px] italic text-muted">
                    No permanent office implied — served via trusted correspondents &amp; agents.
                  </p>
                </div>
              </div>
            </div>

            {/* ── RIGHT: single map covering both India & Panama ── */}
            <div className="overflow-hidden rounded border border-line shadow-heavy xl:sticky xl:top-28 xl:self-start">
              {/* Map header */}
              <div className="flex items-center gap-2 bg-navy px-5 py-3.5">
                <Icon name="pin" className="h-4 w-4 text-sky" />
                <span className="text-sm font-bold text-white">Coverage Map</span>
              </div>

              {/* Google Maps — centered on India, zoom level shows both regions */}
              <div className="relative h-[320px] md:h-[420px] xl:h-[560px]">
                <iframe
                  title="Globus IMS port coverage map — India and Panama"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d18676000!2d60!3d18!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1698765432100!5m2!1sen!2sin"
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  aria-label="Map showing Globus IMS port coverage across India and Panama"
                />
              </div>

              {/* Map footer note */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 border-t border-line bg-white px-5 py-3">
                <span className="flex items-center gap-1.5 text-[11px] font-semibold text-muted">
                  <span className="h-2 w-2 rounded-full bg-ocean" aria-hidden="true" />
                  India ({indianPorts.length} ports)
                </span>
                <span className="flex items-center gap-1.5 text-[11px] font-semibold text-muted">
                  <span className="h-2 w-2 rounded-full bg-sky" aria-hidden="true" />
                  Panama corridor (4 ports)
                </span>
                <span className="flex items-center gap-1.5 text-[11px] font-semibold text-muted">
                  <span className="h-2 w-2 rounded-full bg-navy/40" aria-hidden="true" />
                  International network
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>


    </>
  )
}
