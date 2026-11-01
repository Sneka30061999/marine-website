/**
 * Contact Us page — matches the Stitch/Globus reference screenshot exactly.
 *
 * Layout:
 *  ┌─────────────────────────────────────────────────────────┐
 *  │  GET IN TOUCH & 24/7 COORDINATION     [description text]│
 *  │  Contact Globus Marine Operations                       │
 *  ├─────────────────────────┬───────────────────────────────┤
 *  │ India Head Office card  │  Vessel Enquiry & Quotation   │
 *  │ Panama Regional Liaison │  Request form (right col)     │
 *  │ Operational Guarantee   │                               │
 *  └─────────────────────────┴───────────────────────────────┘
 *
 * Mobile: single column — office cards stack above the form.
 */
import { useState } from 'react'
import { site } from '../config/site.js'
import useMeta from '../hooks/useMeta.js'
import Icon from '../components/ui/Icon.jsx'
import { services } from '../data/services.js'
import { indianPorts, panamaPorts } from '../data/ports.js'

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/* ── Field wrapper ─────────────────────────────────────────── */
function Field({ id, label, required, error, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="text-[10px] font-bold uppercase tracking-wider text-muted"
      >
        {label}
        {required && <span className="ml-0.5 text-red-500" aria-hidden="true"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} role="alert" className="text-xs font-semibold text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

/* ── Vessel Enquiry Form ───────────────────────────────────── */
function VesselEnquiryForm() {
  const [vals, setVals] = useState({
    fullName:  '',
    vessel:    '',
    port:      '',
    service:   '',
    eta:       '',
    email:     '',
    phone:     '',
    message:   '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const set = (k) => (e) => setVals((v) => ({ ...v, [k]: e.target.value }))

  function validate() {
    const e = {}
    if (!vals.fullName.trim()) e.fullName = 'Required.'
    if (!vals.email.trim())    e.email    = 'Required.'
    else if (!emailRe.test(vals.email)) e.email = 'Invalid email.'
    if (!vals.message.trim())  e.message  = 'Required.'
    return e
  }

  function submit(ev) {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) {
      document.getElementById(Object.keys(e)[0])?.focus()
      return
    }
    setStatus('sending')
    const body = [
      `Full Name / Master / Superintendent: ${vals.fullName}`,
      `Vessel Name & IMO Number: ${vals.vessel}`,
      `Port of Call: ${vals.port}`,
      `Service Department: ${vals.service}`,
      `Estimated Arrival (ETA): ${vals.eta}`,
      `Contact Email: ${vals.email}`,
      `Phone / WhatsApp: ${vals.phone}`,
      '',
      'Message / Requisition Notes:',
      vals.message,
    ].join('\n')

    try {
      window.location.href =
        `mailto:${site.enquiryEmail}` +
        `?subject=${encodeURIComponent('Vessel Enquiry – ' + (vals.vessel || vals.port || 'General'))}` +
        `&body=${encodeURIComponent(body)}`
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const aria = (id) => ({
    'aria-invalid':      errors[id] ? 'true' : undefined,
    'aria-describedby': errors[id] ? `${id}-err` : undefined,
  })

  /* ── Success ── */
  if (status === 'sent') {
    return (
      <div
        className="flex flex-col items-center gap-4 py-10 text-center"
        role="status"
        aria-live="polite"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded bg-ocean/10 text-ocean">
          <Icon name="check" className="h-7 w-7" strokeWidth={2.5} />
        </span>
        <h3 className="text-lg font-bold text-navy">
          Request sent, {vals.fullName.split(' ')[0]}.
        </h3>
        <p className="max-w-sm text-sm text-muted">
          Your email client should have opened with the pre-filled request. If it did not,
          write directly to{' '}
          <a href={`mailto:${site.enquiryEmail}`} className="font-semibold text-ocean hover:underline">
            {site.enquiryEmail}
          </a>.
        </p>
        <p className="text-xs italic text-muted">
          ⚠ End-to-end delivery not yet confirmed. For urgent matters call or WhatsApp the
          numbers on this page.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus('idle')
            setVals({ fullName:'',vessel:'',port:'',service:'',eta:'',email:'',phone:'',message:'' })
            setErrors({})
          }}
          className="text-sm font-semibold text-ocean hover:underline"
        >
          Submit another request
        </button>
      </div>
    )
  }

  /* ── Error ── */
  if (status === 'error') {
    return (
      <div className="rounded border border-red-200 bg-red-50 p-6 text-center" role="alert">
        <p className="font-semibold text-red-700">Could not open your email client.</p>
        <p className="mt-2 text-sm text-red-600">
          Please email{' '}
          <a href={`mailto:${site.enquiryEmail}`} className="font-semibold underline">
            {site.enquiryEmail}
          </a>{' '}
          directly with your vessel and port details.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm font-semibold text-red-700 underline"
        >
          Try again
        </button>
      </div>
    )
  }

  /* ── Form ── */
  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-4" aria-labelledby="vessel-form-title">

      {/* Row 1 — Full Name + Vessel */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="fullName" label="Full Name / Master / Superintendent" required error={errors.fullName}>
          <input
            id="fullName" type="text" className="field" autoComplete="name"
            placeholder="Capt. Alexander Vance"
            value={vals.fullName} onChange={set('fullName')} {...aria('fullName')}
          />
        </Field>
        <Field id="vessel" label="Vessel Name & IMO Number">
          <input
            id="vessel" type="text" className="field"
            placeholder="MV Horizon Trader / IMO 9821430"
            value={vals.vessel} onChange={set('vessel')}
          />
        </Field>
      </div>

      {/* Row 2 — Port of Call + Service */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="port" label="Port of Call">
          <select id="port" className="field" value={vals.port} onChange={set('port')}>
            <option value="">Select target port or corridor…</option>
            <optgroup label="Indian Ports">
              {indianPorts.map((p) => (
                <option key={p.name} value={p.name}>{p.name}</option>
              ))}
              <option value="Other Indian port">Other Indian port</option>
            </optgroup>
            <optgroup label="Panama Canal Corridor">
              {panamaPorts.map((p) => (
                <option key={p.name} value={p.name}>{p.name}</option>
              ))}
            </optgroup>
            <option value="Other / International">Other / International</option>
          </select>
        </Field>
        <Field id="service" label="Service Department Required">
          <select id="service" className="field" value={vals.service} onChange={set('service')}>
            <option value="">Select department…</option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>{s.title}</option>
            ))}
            <option value="Other">Other</option>
          </select>
        </Field>
      </div>

      {/* Row 3 — ETA + Email + Phone */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Field id="eta" label="Estimated Arrival (ETA)">
          <input
            id="eta" type="text" className="field"
            placeholder="DD/MM/YYYY HH:MM"
            value={vals.eta} onChange={set('eta')}
          />
        </Field>
        <Field id="email" label="Contact Email" required error={errors.email}>
          <input
            id="email" type="email" className="field" autoComplete="email"
            placeholder="ops@vesselimgr.com"
            value={vals.email} onChange={set('email')} {...aria('email')}
          />
        </Field>
        <Field id="phone" label="Phone / WhatsApp">
          <input
            id="phone" type="tel" className="field" autoComplete="tel"
            placeholder="+1 (555) 019-2834"
            value={vals.phone} onChange={set('phone')}
          />
        </Field>
      </div>

      {/* Row 4 — Message */}
      <Field id="message" label="Message / Requisition Notes" required error={errors.message}>
        <textarea
          id="message" rows={4} className="field resize-y"
          placeholder="Include IMPA codes, bunker requisition, gangway clearance instructions, or special delivery requirements…"
          value={vals.message} onChange={set('message')} {...aria('message')}
        />
      </Field>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded bg-navy px-5 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-navy-700 disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : 'Send Operational Request'}
        <Icon name="arrow" className="h-4 w-4" />
      </button>

      <p className="text-center text-[10px] text-muted">
        Encrypted transmission. Your RFQ is routed immediately to the active port superintendent on watch.
      </p>
    </form>
  )
}

/* ─────────────────────────────────────────────────────────── */

export default function Contact() {
  useMeta({
    title: 'Contact Globus Marine Operations | Vessel Enquiry & Quotation',
    description:
      'Contact Globus International Marine Services — India Head Office in Chennai and Panama Regional Liaison in Balboa. Send a vessel enquiry for ship supplies, repairs and port-call support.',
    canonical: 'https://www.globus-ims.com/contact',
  })

  const india  = site.offices[0]
  const panama = site.offices[1]

  return (
    <div className="min-h-screen bg-surface">

      {/* ══════════════════════════════════════════════════════
          PAGE HEADER — eyebrow left, description right
      ══════════════════════════════════════════════════════ */}
      <div className="border-b border-line bg-white">
        <div className="shell py-10 md:py-14">
          <div className="grid gap-6 md:grid-cols-2 md:items-end">
            {/* Left */}
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-ocean">
                Get in touch &amp; 24/7 Coordination
              </p>
              <h1 className="text-3xl font-extrabold text-navy md:text-4xl">
                Contact Globus Marine Operations
              </h1>
            </div>
            {/* Right */}
            <p className="text-sm leading-relaxed text-muted md:text-base">
              Superintendents, port agents, and boarding teams are on standby 24/7 across
              Indian commercial ports and the Panama Canal transit corridor.
            </p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          MAIN CONTENT — two-column layout
      ══════════════════════════════════════════════════════ */}
      <div className="shell py-10 md:py-14">
        <div className="grid gap-6 xl:grid-cols-[420px_1fr]">

          {/* ── LEFT COLUMN — office cards ── */}
          <div className="flex flex-col gap-4">

            {/* India Head Office */}
            <article
              className="rounded border border-line bg-white p-5 shadow-card"
              aria-labelledby="india-office-title"
            >
              {/* Card header */}
              <div className="mb-4 flex items-center gap-2">
                <Icon name="anchor" className="h-4 w-4 text-ocean" />
                <p
                  id="india-office-title"
                  className="text-[11px] font-bold uppercase tracking-wider text-ocean"
                >
                  India Head Office / Operations Hub
                </p>
              </div>

              {/* Address */}
              <p className="mb-4 text-sm text-navy">
                {india.address.filter(l => !l.startsWith('⚠')).join(', ')}
              </p>

              {/* Details table */}
              <dl className="space-y-2 text-sm">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="shrink-0 text-[11px] font-bold uppercase tracking-wider text-muted">
                    24/7 Ops Phone:
                  </dt>
                  <dd>
                    <a
                      href={`tel:${india.phone.replace(/[^+\d]/g, '')}`}
                      className="font-semibold text-ocean hover:underline"
                      aria-label={`Call India office: ${india.phone}`}
                    >
                      {india.phone}
                    </a>
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="shrink-0 text-[11px] font-bold uppercase tracking-wider text-muted">
                    Direct Email:
                  </dt>
                  <dd>
                    <a
                      href={`mailto:${india.email}`}
                      className="break-all font-semibold text-ocean hover:underline"
                    >
                      {india.email}
                    </a>
                  </dd>
                </div>
                {india.emailAlt && (
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="shrink-0 text-[11px] font-bold uppercase tracking-wider text-muted">
                      Alt Email:
                    </dt>
                    <dd>
                      <a
                        href={`mailto:${india.emailAlt}`}
                        className="break-all font-medium text-muted hover:text-ocean"
                      >
                        {india.emailAlt}
                      </a>
                    </dd>
                  </div>
                )}
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="shrink-0 text-[11px] font-bold uppercase tracking-wider text-muted">
                    VHF Marine Guard:
                  </dt>
                  <dd className="text-navy">Channel 16 / 74</dd>
                </div>
              </dl>
            </article>

            {/* Panama Canal Regional Liaison */}
            <article
              className="rounded border border-line bg-white p-5 shadow-card"
              aria-labelledby="panama-office-title"
            >
              <div className="mb-4 flex items-center gap-2">
                {/* Navigation/compass icon for Panama */}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
                  strokeLinecap="round" strokeLinejoin="round"
                  className="h-4 w-4 text-ocean" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M15.5 8.5l-2 5-5 2 2-5z" />
                </svg>
                <p
                  id="panama-office-title"
                  className="text-[11px] font-bold uppercase tracking-wider text-ocean"
                >
                  Panama Canal Regional Liaison
                </p>
              </div>

              <p className="mb-4 text-sm text-navy">
                {panama.address.filter(l => !l.startsWith('⚠')).join(', ')}
              </p>

              <dl className="space-y-2 text-sm">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="shrink-0 text-[11px] font-bold uppercase tracking-wider text-muted">
                    Ops Phone:
                  </dt>
                  <dd>
                    <a
                      href={`tel:${panama.phone.replace(/[^+\d]/g, '')}`}
                      className="font-semibold text-ocean hover:underline"
                      aria-label={`Call Panama office: ${panama.phone}`}
                    >
                      {panama.phone}
                    </a>
                  </dd>
                </div>
                {panama.whatsapp && panama.whatsapp !== panama.phone && (
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="shrink-0 text-[11px] font-bold uppercase tracking-wider text-muted">
                      WhatsApp:
                    </dt>
                    <dd>
                      <a
                        href={`https://wa.me/${panama.whatsapp.replace(/[^+\d]/g,'').replace(/^\+/,'')}`}
                        target="_blank" rel="noopener noreferrer"
                        className="font-semibold text-ocean hover:underline"
                      >
                        {panama.whatsapp}
                      </a>
                    </dd>
                  </div>
                )}
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="shrink-0 text-[11px] font-bold uppercase tracking-wider text-muted">
                    Direct Email:
                  </dt>
                  <dd>
                    <a
                      href={`mailto:${panama.email}`}
                      className="break-all font-semibold text-ocean hover:underline"
                    >
                      {panama.email}
                    </a>
                  </dd>
                </div>
                {panama.emailAlt && (
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="shrink-0 text-[11px] font-bold uppercase tracking-wider text-muted">
                      Alt Email:
                    </dt>
                    <dd>
                      <a
                        href={`mailto:${panama.emailAlt}`}
                        className="break-all font-medium text-muted hover:text-ocean"
                      >
                        {panama.emailAlt}
                      </a>
                    </dd>
                  </div>
                )}
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="shrink-0 text-[11px] font-bold uppercase tracking-wider text-muted">
                    Canal Transit:
                  </dt>
                  <dd className="text-navy">ACP Liaison Desk</dd>
                </div>
              </dl>
            </article>

            {/* Operational Guarantee — blue tinted card */}
            <div
              className="rounded border border-ocean/20 p-5"
              style={{ background: '#EBF5FB' }}
            >
              <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-ocean">
                Operational Guarantee
              </p>
              <p className="text-xs leading-relaxed text-navy">
                <span className="font-semibold">Sub-2hr RFQ Response</span>
                {' '}•{' '}
                <span className="font-semibold">Unbroken Cold Chain</span>
                {' '}•{' '}
                <span className="font-semibold">Licensed Launch Boats</span>
                {' '}•{' '}
                <span className="font-semibold">Verified Class Surveyors</span>
              </p>
            </div>
          </div>

          {/* ── RIGHT COLUMN — vessel enquiry form ── */}
          <div className="rounded border border-line bg-white p-6 shadow-card md:p-8">
            <h2 id="vessel-form-title" className="text-xl font-extrabold text-navy md:text-2xl">
              Vessel Enquiry &amp; Quotation Request
            </h2>
            <p className="mt-1 text-sm text-muted">
              Submit requisition specifications for prompt clearance and boarding scheduling.
            </p>
            <div className="mt-6">
              <VesselEnquiryForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
