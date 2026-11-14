import { useState } from 'react'
import { company, serviceOptions } from '../data/content'

const mapsQuery = 'Yellow Equipment Services LLC, Building 160, Way 4902, Rusayl Industrial Area, Muscat, Oman'
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`
const mapsEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(mapsQuery)}&z=14&output=embed`
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

const empty = {
  name: '',
  company: '',
  email: '',
  phone: '',
  service: '',
  equipment: '',
  message: '',
  website: '',
}

export default function Contact() {
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const [mapOpen, setMapOpen] = useState(false)

  function update(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
  }

  async function submit(event) {
    event.preventDefault()
    if (values.website) return

    const next = {}
    if (!values.name.trim()) next.name = 'Enter your full name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'Enter a valid email address.'
    if (!values.message.trim()) next.message = 'Tell us how we can help.'
    setErrors(next)
    if (Object.keys(next).length) return

    if (!WEB3FORMS_KEY) {
      setStatus('error')
      setStatusMessage(`Form email is not configured yet. Please email us directly at ${company.email}.`)
      return
    }

    setStatus('sending')
    setStatusMessage('')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Service inquiry from ${values.name.trim()}`,
          from_name: 'Yellow Equipment website',
          name: values.name.trim(),
          company: values.company.trim() || '—',
          email: values.email.trim(),
          phone: values.phone.trim() || '—',
          service: values.service || '—',
          equipment: values.equipment.trim() || '—',
          message: values.message.trim(),
        }),
      })

      const result = await response.json()
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Unable to send inquiry.')
      }

      setStatus('sent')
      setStatusMessage(`Thank you. Your inquiry was sent to ${company.email}. Our team will reply shortly.`)
      setValues(empty)
    } catch (error) {
      setStatus('error')
      setStatusMessage(error.message || `Something went wrong. Please email us at ${company.email}.`)
    }
  }

  const sending = status === 'sending'

  return (
    <section id="contact" className="bg-ink px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-2">
        <div>
          <p className="text-xs tracking-[0.28em] text-yellow uppercase">07 — Contact</p>
          <h2 className="mt-4 font-display text-[clamp(3rem,6vw,5.4rem)] leading-[0.88] font-bold uppercase">
            Let&apos;s keep your equipment moving.
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3 lg:grid-cols-1">
            <div>
              <h3 className="text-xs tracking-[0.2em] text-yellow uppercase">Visit</h3>
              <address className="mt-3 text-sm leading-relaxed not-italic">
                {company.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>
            <div>
              <h3 className="text-xs tracking-[0.2em] text-yellow uppercase">Call</h3>
              <ul className="mt-3 space-y-1">
                {company.phones.map((phone) => (
                  <li key={phone}>
                    <a className="hover:text-yellow" href={`tel:${phone.replace(/\s/g, '')}`}>
                      {phone}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs tracking-[0.2em] text-yellow uppercase">Email</h3>
              <a className="mt-3 inline-block break-all hover:text-yellow" href={`mailto:${company.email}`}>
                {company.email}
              </a>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`tel:${company.phones[0].replace(/\s/g, '')}`} className="bg-yellow px-4 py-3 font-display tracking-[0.14em] text-ink uppercase">
              Call now
            </a>
            <a href={`mailto:${company.email}`} className="border border-line px-4 py-3 font-display tracking-[0.14em] uppercase">
              Email us
            </a>
            <a href={mapsLink} target="_blank" rel="noreferrer" className="border border-line px-4 py-3 font-display tracking-[0.14em] uppercase">
              Directions
            </a>
          </div>
          <p className="mt-6 max-w-md text-sm text-mist">
            Rusayl Industrial Area, Muscat. The map loads from Google Maps when you open it.
          </p>
          <div className="mt-4 flex gap-3">
            <button type="button" className="text-sm tracking-wide text-yellow uppercase" onClick={() => setMapOpen((value) => !value)}>
              {mapOpen ? 'Hide map' : 'Show map'}
            </button>
            <a href={mapsLink} target="_blank" rel="noreferrer" className="text-sm tracking-wide uppercase">
              Open in Google Maps
            </a>
          </div>
          {mapOpen && (
            <iframe
              title="Map of Yellow Equipment Services LLC in Rusayl Industrial Area, Muscat"
              src={mapsEmbed}
              className="mt-4 h-72 w-full border border-line"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          )}
        </div>

        <form className="border border-line bg-ink-2 p-6 sm:p-8" onSubmit={submit} noValidate>
          <h3 className="font-display text-3xl uppercase">Send an inquiry</h3>
          <p className="mt-2 text-sm text-mist">* Required fields</p>
          {statusMessage ? (
            <p
              className={`mt-4 border px-4 py-3 text-sm ${
                status === 'sent' ? 'border-yellow/40 bg-yellow/10' : 'border-line bg-ink text-paper/90'
              }`}
              role="status"
            >
              {statusMessage}
            </p>
          ) : null}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field label="Full name" name="name" value={values.name} onChange={update} error={errors.name} required />
            <Field label="Company" name="company" value={values.company} onChange={update} />
            <Field label="Email" name="email" type="email" value={values.email} onChange={update} error={errors.email} required />
            <Field label="Phone" name="phone" type="tel" value={values.phone} onChange={update} />
            <label className="block sm:col-span-2">
              <span className="text-xs tracking-[0.16em] uppercase">Service of interest</span>
              <select
                name="service"
                value={values.service}
                onChange={update}
                className="mt-2 w-full border border-line bg-ink px-3 py-3 text-paper"
              >
                <option value="">Select a service</option>
                {serviceOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <Field className="sm:col-span-2" label="Equipment, make & model" name="equipment" value={values.equipment} onChange={update} />
            <label className="block sm:col-span-2">
              <span className="text-xs tracking-[0.16em] uppercase">How can we help? *</span>
              <textarea
                name="message"
                required
                rows={5}
                value={values.message}
                onChange={update}
                aria-invalid={Boolean(errors.message)}
                className="mt-2 w-full border border-line bg-ink px-3 py-3"
              />
              {errors.message && <span className="mt-1 block text-sm text-yellow">{errors.message}</span>}
            </label>
            <label className="hidden" aria-hidden="true">
              Website
              <input name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={update} />
            </label>
          </div>
          <p className="mt-4 text-xs text-mist">Your details are only used to answer your inquiry.</p>
          <button
            type="submit"
            disabled={sending}
            className="mt-6 bg-yellow px-5 py-3 font-display tracking-[0.14em] text-ink uppercase disabled:cursor-wait disabled:opacity-70"
          >
            {sending ? 'Sending…' : 'Send inquiry'}
          </button>
        </form>
      </div>
    </section>
  )
}

function Field({ label, name, type = 'text', value, onChange, error, required, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs tracking-[0.16em] uppercase">
        {label}
        {required ? ' *' : ''}
      </span>
      <input
        name={name}
        type={type}
        value={value}
        required={required}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        className="mt-2 w-full border border-line bg-ink px-3 py-3"
      />
      {error && <span className="mt-1 block text-sm text-yellow">{error}</span>}
    </label>
  )
}
