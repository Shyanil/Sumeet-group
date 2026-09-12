'use client'

import { useId, useState } from 'react'
import { CONTACT } from '../data/site'
import './LeadForm.css'

export default function LeadForm({ source = 'homepage', intent = 'callback', label = 'Request a callback' }) {
  const id = useId()
  const [state, setState] = useState('idle')
  const [error, setError] = useState('')

  async function submit(event) {
    event.preventDefault()
    if (state === 'sending') return
    const data = Object.fromEntries(new FormData(event.currentTarget))
    setState('sending')
    setError('')
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, consent: data.consent === 'on', source, intent }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'We could not send your request. Please try again.')
      setState('sent')
    } catch (err) {
      setError(err.message || 'Please check your connection and try again.')
      setState('idle')
    }
  }

  if (state === 'sent') return (
    <div className="lead-success" role="status">
      <span aria-hidden="true">✓</span>
      <h3>{intent === 'launch' ? 'You’re on the list.' : 'Your request is with us.'}</h3>
      <p>{intent === 'launch' ? 'We’ll contact you when the launch is announced.' : 'Our team will be in touch using the details you shared.'}</p>
    </div>
  )

  return (
    <form className="lead-form" onSubmit={submit} aria-label={label}>
      <div className="lead-field"><label htmlFor={`${id}-name`}>Your name</label><input id={`${id}-name`} name="name" autoComplete="name" placeholder="Full name" minLength={2} maxLength={100} required /></div>
      <div className="lead-field"><label htmlFor={`${id}-phone`}>Mobile number</label><input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" placeholder="10-digit mobile number" pattern="[0-9 +()-]{10,18}" maxLength={18} required /></div>
      <div className="lead-field"><label htmlFor={`${id}-email`}>Email <span>(optional)</span></label><input id={`${id}-email`} name="email" type="email" autoComplete="email" placeholder="you@example.com" maxLength={254} /></div>
      <div className="lead-trap" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <label className="lead-consent"><input name="consent" type="checkbox" required /><span>I agree to be contacted by Sumeet Group about {intent === 'launch' ? 'this upcoming launch' : 'my enquiry'}. I can opt out at any time.</span></label>
      {error && <p className="lead-error" role="alert">{error} You can also <a href={CONTACT.phoneHref}>call our team</a>.</p>}
      <button className="lead-submit" disabled={state === 'sending'} type="submit">{state === 'sending' ? 'Sending…' : label}<span aria-hidden="true">↗</span></button>
      <p className="lead-fine">Your details are used to respond to this request.</p>
    </form>
  )
}
