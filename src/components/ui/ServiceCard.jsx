import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'

export default function ServiceCard({ service, detailed = false }) {
  return (
    <article
      className={[
        // Stitch spec: 4 px radius, thin slate border, restrained card shadow
        'group flex h-full flex-col rounded border border-line bg-white p-6 shadow-card',
        'transition-shadow duration-200 hover:shadow-lift',
      ].join(' ')}
    >
      {/* Icon badge — square 4 px, ice bg → ocean bg on hover */}
      <div className="icon-badge transition-colors duration-200 group-hover:bg-ocean group-hover:text-white">
        <Icon name={service.icon} className="h-5 w-5" />
      </div>

      <h3 className="mt-5 text-base font-bold text-navy">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{service.summary}</p>

      {detailed && service.points?.length > 0 && (
        <ul className="mt-4 space-y-2 border-t border-line pt-4">
          {service.points.map((p) => (
            <li key={p} className="flex items-start gap-2 text-sm text-ink">
              <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-ocean" strokeWidth={2.2} />
              {p}
            </li>
          ))}
        </ul>
      )}

      <Link
        to={`/contact?service=${service.slug}`}
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ocean transition-colors hover:text-ocean-dark"
        aria-label={`Enquire about ${service.title}`}
      >
        Enquire about this service
        <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </article>
  )
}
