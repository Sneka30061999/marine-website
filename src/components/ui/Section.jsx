export default function Section({ tone = 'white', className = '', children, id }) {
  const tones = {
    white: 'bg-white',
    ice: 'bg-ice',
    navy: 'bg-navy text-white',
  }
  return (
    <section id={id} className={`${tones[tone]} py-16 md:py-20 xl:py-24 ${className}`}>
      <div className="shell">{children}</div>
    </section>
  )
}

export function SectionHeading({ eyebrow, title, text, tone = 'light', align = 'left' }) {
  const dark = tone === 'dark'
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <p className={`eyebrow ${dark ? '!text-sky' : ''} ${align === 'center' ? 'justify-center' : ''}`}>
          {eyebrow}
        </p>
      )}
      <h2
        className={`mt-3 text-3xl font-bold leading-tight md:text-4xl ${dark ? '!text-white' : ''}`}
      >
        {title}
      </h2>
      {text && (
        <p className={`mt-4 text-base leading-relaxed md:text-lg ${dark ? 'text-slate-300' : 'text-muted'}`}>
          {text}
        </p>
      )}
    </div>
  )
}
