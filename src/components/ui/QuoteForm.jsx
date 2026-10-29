/**
 * QuoteForm — full enquiry form
 *
 * Fields (per §9 of brief):
 *   Full Name (required)
 *   Company Name (required)
 *   Business Email (required, format-validated)
 *   Phone / WhatsApp (required)
 *   Port of Call (required, dropdown)
 *   Service Required (required, dropdown + "Other")
 *   ETA (optional)
 *   Message / Vessel Requirements (required)
 *   Privacy consent (shown when privacyPolicyUrl is configured)
 *
 * Submission: opens the user's email client via mailto: — the only
 * delivery mechanism available without a server-side endpoint.
 * Replace the onSubmit handler with a fetch() to a real API/Formspree
 * endpoint before launch. Do not expose credentials in front-end code.
 *
 * ⚠  NOTE: This form has NOT been tested end-to-end against a live
 * email endpoint. Validate delivery before launch.
 */
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { site } from '../../config/site.js'
import { services } from '../../data/services.js'
import { indianPorts, panamaPorts } from '../../data/ports.js'
import Icon from './Icon.jsx'

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/* ── Accessible field wrapper ──────────────────────────────── */
function Field({ id, label, required, error, hint, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-navy">
        {label}
        {required && <span className="ml-0.5 text-red-500" aria-hidden="true"> *</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1 text-xs text-muted">{hint}</p>
      )}
      {error && (
        <p id={`${id}-err`} role="alert" className="mt-1 text-xs font-semibold text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

/* ── Main form component ────────────────────────────────────── */
export default function QuoteForm() {
  const [params] = useSearchParams()
  const presetSlug = params.get('service') ?? ''

  const [vals, setVals] = useState({
    fullName:    '',
    company:     '',
    email:       '',
    phone:       '',
    port:        '',
    service:     services.some((s) => s.slug === presetSlug) ? presetSlug : '',
    serviceOther:'',
    eta:         '',
    message:     '',
    consent:     false,
  })
  const [errors, setErrors]   = useState({})
  const [status, setStatus]   = useState('idle') // 'idle' | 'sent' | 'error'

  const serviceLabel = useMemo(
    () =>
      vals.service === 'other'
        ? vals.serviceOther || 'Other'
        : services.find((s) => s.slug === vals.service)?.title ?? 'General enquiry',
    [vals.service, vals.serviceOther],
  )

  const set  = (k) => (e) => setVals((v) => ({ ...v, [k]: e.target.value }))
  const tick = ()  => setVals((v) => ({ ...v, consent: !v.consent }))

  /* ── Validation ─────────────────────────────────────────── */
  function validate() {
    const e = {}
    if (!vals.fullName.trim())  e.fullName  = 'Full name is required.'
    if (!vals.company.trim())   e.company   = 'Company name is required.'
    if (!vals.email.trim())     e.email     = 'Business email is required.'
    else if (!emailRe.test(vals.email)) e.email = 'Enter a valid email address.'
    if (!vals.phone.trim())     e.phone     = 'Phone / WhatsApp number is required.'
    if (!vals.port.trim())      e.port      = 'Please select a port of call.'
    if (!vals.service.trim())   e.service   = 'Please select a service.'
    if (vals.service === 'other' && !vals.serviceOther.trim())
                                e.serviceOther = 'Please describe the service required.'
    if (!vals.message.trim())   e.message   = 'Vessel requirements / message is required.'
    if (site.privacyPolicyUrl && !vals.consent)
                                e.consent   = 'Please accept the privacy notice to continue.'
    return e
  }

  /* ── Submit ─────────────────────────────────────────────── */
  function onSubmit(ev) {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) {
      // Focus first error field
      const first = Object.keys(e)[0]
      document.getElementById(first)?.focus()
      return
    }

    /*
     * mailto: fallback — opens the user's email client.
     * Replace this block with a fetch() to a real endpoint before launch:
     *
     *   const res = await fetch('/api/enquiry', {
     *     method: 'POST',
     *     headers: { 'Content-Type': 'application/json' },
     *     body: JSON.stringify(vals),
     *   })
     *   if (!res.ok) throw new Error('Submission failed')
     *
     * Never put API keys, passwords or SMTP credentials in front-end code.
     */
    const body = [
      `Full Name: ${vals.fullName}`,
      `Company: ${vals.company}`,
      `Business Email: ${vals.email}`,
      `Phone / WhatsApp: ${vals.phone}`,
      `Port of Call: ${vals.port}`,
      `Service Required: ${serviceLabel}`,
      `ETA: ${vals.eta || 'Not specified'}`,
      '',
      'Message / Vessel Requirements:',
      vals.message,
    ].join('\n')

    try {
      window.location.href = [
        `mailto:${site.enquiryEmail}`,
        `?subject=${encodeURIComponent('Vessel enquiry – ' + vals.port + ' – ' + serviceLabel)}`,
        `&body=${encodeURIComponent(body)}`,
      ].join('')
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  /* ── Success state ──────────────────────────────────────── */
  if (status === 'sent') {
    return (
      <div className="flex flex-col items-center gap-4 rounded border border-line bg-white p-8 text-center shadow-card" role="status" aria-live="polite">
        <span className="flex h-14 w-14 items-center justify-center rounded bg-ocean/10 text-ocean">
          <Icon name="check" className="h-7 w-7" strokeWidth={2.5} />
        </span>
        <div>
          <h3 className="text-lg font-bold text-navy">
            Thank you, {vals.fullName.split(' ')[0]}.
          </h3>
          <p className="mt-2 text-sm text-muted">
            Your email client should have opened with your request pre-filled. If it did not,
            write directly to{' '}
            <a href={`mailto:${site.enquiryEmail}`} className="font-semibold text-ocean hover:underline">
              {site.enquiryEmail}
            </a>.
          </p>
          <p className="mt-3 text-xs text-muted">
            ⚠ Delivery has not been confirmed end-to-end. If you need urgent assistance,
            call or WhatsApp the numbers on this page.
          </p>
        </div>
        <button
          type="button"
          onClick={() => { setStatus('idle'); setVals({ fullName:'',company:'',email:'',phone:'',port:'',service:'',serviceOther:'',eta:'',message:'',consent:false }); setErrors({}) }}
          className="text-sm font-semibold text-ocean hover:underline"
        >
          Submit another request
        </button>
      </div>
    )
  }

  /* ── Error state ────────────────────────────────────────── */
  if (status === 'error') {
    return (
      <div className="rounded border border-red-200 bg-red-50 p-6 text-center" role="alert">
        <p className="font-semibold text-red-700">Something went wrong opening your email client.</p>
        <p className="mt-2 text-sm text-red-600">
          Please write directly to{' '}
          <a href={`mailto:${site.enquiryEmail}`} className="font-semibold underline">{site.enquiryEmail}</a>
          {' '}with your port, service and vessel details.
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

  /* ── Form ───────────────────────────────────────────────── */
  const aria = (id, hasHint) => ({
    'aria-invalid':      errors[id] ? 'true' : undefined,
    'aria-describedby': errors[id] ? `${id}-err` : hasHint ? `${id}-hint` : undefined,
  })

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded border border-line bg-white p-6 shadow-card md:p-8"
      aria-labelledby="qf-title"
    >
      <h2 id="qf-title" className="text-xl font-extrabold text-navy md:text-2xl">
        Request a quote
      </h2>
      <p className="mt-1 text-xs text-muted">Fields marked <span className="text-red-500">*</span> are required.</p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">

        {/* Full Name */}
        <Field id="fullName" label="Full name" required error={errors.fullName}>
          <input
            id="fullName" className="field" type="text"
            autoComplete="name" value={vals.fullName}
            onChange={set('fullName')} {...aria('fullName')}
          />
        </Field>

        {/* Company Name */}
        <Field id="company" label="Company name" required error={errors.company}>
          <input
            id="company" className="field" type="text"
            autoComplete="organization" value={vals.company}
            onChange={set('company')} {...aria('company')}
          />
        </Field>

        {/* Business Email */}
        <Field id="email" label="Business email" required error={errors.email}>
          <input
            id="email" className="field" type="email"
            autoComplete="email" value={vals.email}
            onChange={set('email')} {...aria('email')}
          />
        </Field>

        {/* Phone / WhatsApp */}
        <Field
          id="phone" label="Phone / WhatsApp" required error={errors.phone}
          hint="Include country code, e.g. +91 98419 63059"
        >
          <input
            id="phone" className="field" type="tel"
            autoComplete="tel" value={vals.phone}
            onChange={set('phone')} {...aria('phone', true)}
          />
        </Field>

        {/* Port of Call */}
        <Field id="port" label="Port of call" required error={errors.port}>
          <select
            id="port" className="field" value={vals.port}
            onChange={set('port')} {...aria('port')}
          >
            <option value="">Select a port…</option>
            <optgroup label="Indian Ports">
              {indianPorts.map((p) => (
                <option key={p.name} value={p.name}>{p.name}</option>
              ))}
              <option value="Other Indian port">Other Indian port</option>
            </optgroup>
            <optgroup label="Panama Corridor">
              {panamaPorts.map((p) => (
                <option key={p.name} value={p.name}>{p.name}</option>
              ))}
              <option value="Other Panama port">Other Panama port</option>
            </optgroup>
            <option value="Other">Other / International</option>
          </select>
        </Field>

        {/* Service Required */}
        <Field id="service" label="Service required" required error={errors.service}>
          <select
            id="service" className="field" value={vals.service}
            onChange={set('service')} {...aria('service')}
          >
            <option value="">Select a service…</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>{s.title}</option>
            ))}
            <option value="other">Other</option>
          </select>
        </Field>

        {/* "Other" service free-text — shown only when Other selected */}
        {vals.service === 'other' && (
          <Field
            id="serviceOther" label="Please describe the service" required
            error={errors.serviceOther}
          >
            <input
              id="serviceOther" className="field" type="text"
              value={vals.serviceOther} onChange={set('serviceOther')}
              placeholder="Describe what you need" {...aria('serviceOther')}
            />
          </Field>
        )}

        {/* ETA — optional */}
        <Field
          id="eta" label="Estimated arrival time (ETA)"
          hint="Optional — e.g. MV Atlantic Horizon / 24 Oct"
        >
          <input
            id="eta" className="field" type="text"
            value={vals.eta} onChange={set('eta')} {...aria('eta', true)}
          />
        </Field>
      </div>

      {/* Message / Vessel Requirements */}
      <div className="mt-5">
        <Field
          id="message" label="Message / Vessel requirements" required
          error={errors.message}
          hint="Include vessel name, IMO number, cargo details or any specific requirements."
        >
          <textarea
            id="message" rows={5} className="field resize-y"
            value={vals.message} onChange={set('message')}
            {...aria('message', true)}
          />
        </Field>
      </div>

      {/* Privacy consent — only shown when a privacy policy URL is configured */}
      {site.privacyPolicyUrl && (
        <div className="mt-4">
          <label className="flex items-start gap-3 text-sm text-muted">
            <input
              id="consent" type="checkbox"
              checked={vals.consent} onChange={tick}
              className="mt-0.5 h-4 w-4 shrink-0 accent-ocean"
              aria-describedby={errors.consent ? 'consent-err' : undefined}
            />
            <span>
              I have read and accept the{' '}
              <a
                href={site.privacyPolicyUrl}
                target="_blank" rel="noopener noreferrer"
                className="font-semibold text-ocean hover:underline"
              >
                privacy policy
              </a>.
            </span>
          </label>
          {errors.consent && (
            <p id="consent-err" role="alert" className="mt-1 text-xs font-semibold text-red-600">
              {errors.consent}
            </p>
          )}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded bg-ocean px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-ocean-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky md:w-auto"
      >
        Send request
        <Icon name="arrow" className="h-4 w-4" />
      </button>

      {/* Delivery disclaimer */}
      <p className="mt-3 text-xs text-muted">
        ⚠ This form uses your email client to send the request. For a guaranteed delivery
        channel, email{' '}
        <a href={`mailto:${site.enquiryEmail}`} className="font-semibold text-ocean">
          {site.enquiryEmail}
        </a>{' '}
        or call the numbers below.
      </p>
    </form>
  )
}
