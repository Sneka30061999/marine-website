/**
 * Ports & Locations page
 * Spec: Indian ports, Panama ports, and international network
 *       as provided by the client.
 */
import { indianPorts, panamaPorts, internationalNetwork } from '../data/ports.js'
import useMeta from '../hooks/useMeta.js'
import Button from '../components/ui/Button.jsx'
import Icon from '../components/ui/Icon.jsx'
import PageHero from '../components/ui/PageHero.jsx'

/* ── Port list card ──────────────────────────────────────── */
function PortGroup({ title, label, ports }) {
  return (
    <div className="overflow-hidden rounded border border-line bg-white shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 bg-navy px-6 py-4">
        <h3 className="text-sm font-bold !text-white">{title}</h3>
        <span className="rounded border border-sky/30 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-sky">
          {label}
        </span>
      </div>
      {/* Port rows */}
      <ul className="divide-y divide-line">
        {ports.map((p) => (
          <li key={p.name} className="flex items-start gap-3 px-6 py-4">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-ice text-ocean">
              <Icon name="anchor" className="h-3.5 w-3.5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-navy">{p.name}</p>
              {p.note && (
                <p className="mt-0.5 text-xs text-muted">{p.note}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Ports() {
  useMeta({
    title: 'Ports & Locations | Globus International Marine Services',
    description:
      'Ship chandler and maritime agency coverage across 29 Indian ports, Panama Canal corridor (Balboa, Cristóbal, Manzanillo, Colón) and international network including UAE, China, Brazil.',
    canonical: 'https://www.globus-ims.com/ports-locations',
  })
  return (
    <>
      <PageHero
        eyebrow="Ports & locations"
        title="Ports and locations we serve"
        text="Coverage across Indian ports, Panama and our wider international network."
      />

      {/* ══════════════════════════════════════════════════
          INDIA & PANAMA — primary regions
          Spec: Indian ports, Panama ports
      ══════════════════════════════════════════════════ */}
      <section className="bg-ice py-16 md:py-24">
        <div className="shell">
          <p className="eyebrow">Primary regions</p>
          <h2 className="sec-title mt-3 text-3xl font-extrabold text-navy md:text-4xl">
            India and Panama
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-muted md:text-base">
            Direct operational coverage with local teams at each of these locations.
          </p>

          <div className="mt-10 grid gap-5 xl:grid-cols-2">
            <PortGroup title="Indian ports" label="India" ports={indianPorts} />
            <PortGroup title="Panama ports" label="Panama" ports={panamaPorts} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          INTERNATIONAL NETWORK
          Spec: international network as provided by client
      ══════════════════════════════════════════════════ */}
      <section className="bg-white py-16 md:py-24">
        <div className="shell">
          <p className="eyebrow">International network</p>
          <h2 className="sec-title mt-3 text-3xl font-extrabold text-navy md:text-4xl">
            Beyond our own offices
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-muted md:text-base">
            Trusted correspondents and agents extend our reach to these regions. Ask us if
            your port is not listed — our network may still cover it.
          </p>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {internationalNetwork.map((n) => (
              <li
                key={n}
                className="flex items-center gap-3 rounded border border-line bg-white p-4 shadow-card transition-shadow hover:shadow-lift"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-ice text-ocean">
                  <Icon name="globe" className="h-4 w-4" />
                </span>
                <span className="text-sm font-semibold text-navy">{n}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-ocean py-14">
        <span aria-hidden="true" className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/5" />
        <span aria-hidden="true" className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/5" />
        <div className="shell relative z-10 flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <h2 className="text-2xl font-bold !text-white md:text-3xl">
              Don't see your port?
            </h2>
            <p className="mt-2 text-sm text-white/80 md:text-base">
              Ask us — our network may still cover it.
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
