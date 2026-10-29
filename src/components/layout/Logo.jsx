import { Link } from 'react-router-dom'
import { site } from '../../config/site.js'
import Icon from '../ui/Icon.jsx'

export default function Logo({ dark = false }) {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label={`${site.name} home`}>
      {/* Square 4 px badge — Stitch spec */}
      <span className="flex h-9 w-9 items-center justify-center rounded bg-ocean ring-1 ring-sky/30">
        <Icon name="anchor" className="h-5 w-5 text-white" strokeWidth={2} />
      </span>
      <span className={`text-base font-extrabold tracking-tight ${dark ? 'text-white' : 'text-navy'}`}>
        {site.name}
      </span>
    </Link>
  )
}
