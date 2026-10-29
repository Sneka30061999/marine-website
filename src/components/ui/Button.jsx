/**
 * Button — polymorphic button/link component
 *
 * §10: correct semantics — <Link> for internal navigation,
 * <a> for external/mailto/tel, <button type="button"> for actions.
 * All variants have visible focus ring via global :focus-visible.
 */
import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'

const base =
  'inline-flex items-center justify-center gap-2 rounded px-5 py-2.5 text-sm font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky'

const variants = {
  primary: 'bg-ocean text-white hover:bg-ocean-dark',
  light:   'bg-white text-navy hover:bg-ice',
  outline: 'border border-line bg-white text-navy hover:border-ocean hover:text-ocean',
  ghost:   'border border-white/30 text-white hover:bg-white/10',
}

export default function Button({
  to,
  href,
  variant = 'primary',
  arrow = false,
  type = 'button',
  className = '',
  children,
  ...rest
}) {
  const cls = `${base} ${variants[variant]} ${className}`
  const content = (
    <>
      {children}
      {arrow && <Icon name="arrow" className="h-4 w-4" aria-hidden="true" />}
    </>
  )

  if (to)   return <Link to={to}   className={cls} {...rest}>{content}</Link>
  if (href) return <a    href={href} className={cls} {...rest}>{content}</a>
  return <button type={type} className={cls} {...rest}>{content}</button>
}
