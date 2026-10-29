/**
 * PageHero — shared inner-page hero section
 *
 * §10: one clear H1 per page, breadcrumb nav, semantic structure
 * §12: readable contrast (white on navy), no autoplay/animation
 */
import { Link } from 'react-router-dom'

export default function PageHero({ eyebrow, title, text, crumb }) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      {/* Decorative grid — aria-hidden, decorative */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            'linear-gradient(#38BDF8 1px,transparent 1px),' +
            'linear-gradient(90deg,#38BDF8 1px,transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      {/* Atmospheric glow — decorative */}
      <span aria-hidden="true"
        className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-ocean/20 blur-3xl" />

      <div className="shell relative py-14 md:py-20">
        {/* Breadcrumb navigation — §10 semantic nav */}
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

        {/* H1 — one per page (§11) */}
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
