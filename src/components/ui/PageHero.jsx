/**
 * PageHero — inner-page hero (About, Services, Ports, Contact)
 * Matches the Stitch design: dark navy bg, breadcrumb, H1, ocean rule.
 * §10: semantic breadcrumb nav, single H1, descriptive alt on any bg image.
 */
import { Link } from 'react-router-dom'

export default function PageHero({ eyebrow, title, text, crumb }) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      {/* Subtle chart grid — decorative */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(#38BDF8 1px,transparent 1px),' +
            'linear-gradient(90deg,#38BDF8 1px,transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      {/* Glow — decorative */}
      <span aria-hidden="true"
        className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-ocean/20 blur-3xl" />

      <div className="shell relative py-14 md:py-20">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1 text-xs text-slate-400">
            <li>
              <Link to="/" className="transition-colors hover:text-white">Home</Link>
            </li>
            <li aria-hidden="true" className="mx-1">/</li>
            <li aria-current="page" className="text-slate-200">
              {crumb ?? eyebrow}
            </li>
          </ol>
        </nav>

        <p className="eyebrow mt-6 !text-sky">{eyebrow}</p>

        <h1 className="mt-3 max-w-3xl text-4xl font-extrabold leading-tight !text-white md:text-5xl">
          {title}
        </h1>

        {text && (
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
            {text}
          </p>
        )}

        {/* Ocean accent rule */}
        <div className="mt-8 h-[3px] w-12 rounded-full bg-ocean" aria-hidden="true" />
      </div>
    </section>
  )
}
