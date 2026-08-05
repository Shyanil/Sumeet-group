import { useState } from 'react'
import { PROJECTS } from '../data/projects'
import { Button, Input, Select, Check } from './ui'

const PROJECT_OPTIONS = [...PROJECTS.map((p) => p.name), 'Not sure yet']

/**
 * Enquiry / callback request.
 *
 * There is no backend yet, so submission is captured client-side and the
 * confirmation tells the visitor what actually happens next. Wire `onSubmit`
 * to a form endpoint (Netlify Forms, or the CRM) before launch.
 */
export default function EnquiryForm({ project, compact = false }) {
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <div className="form-done">
        <div className="form-done__icon">
          <Check />
        </div>
        <h3 className="sg-display" style={{ fontSize: '1.375rem', marginBottom: 6 }}>
          Thank you.
        </h3>
        <p style={{ fontSize: 14.5, color: 'var(--text-soft)' }}>
          Our team will call you within one working day
          {project ? ` to arrange a visit to ${project.name}.` : '.'}
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setSent(true)
      }}
      className="stack stack-4"
    >
      {compact ? null : (
        <h3 className="sg-display" style={{ fontSize: '1.5rem' }}>
          Request a callback
        </h3>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: compact ? '1fr' : 'repeat(auto-fit, minmax(190px, 1fr))', gap: 14 }}>
        <Input label="Full name" name="name" placeholder="Your name" autoComplete="name" required />
        <Input
          label="Phone"
          name="phone"
          type="tel"
          inputMode="numeric"
          pattern="[0-9]{10}"
          placeholder="10-digit mobile"
          autoComplete="tel"
          prefix={<span style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>+91</span>}
          hint="We call once, then it's up to you."
          required
        />
      </div>

      <Select
        label="Interested in"
        name="project"
        defaultValue={project ? project.name : ''}
        placeholder={project ? undefined : 'Select a project'}
        options={PROJECT_OPTIONS}
      />

      {compact ? null : (
        <Input label="Message" name="message" multiline placeholder="Anything you'd like us to know (optional)" />
      )}

      <Button variant="primary" size="lg" fullWidth type="submit">
        {project ? 'Request a callback' : 'Send'}
      </Button>

      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: 'var(--text-muted)',
          textAlign: 'center',
          letterSpacing: '0.03em',
        }}
      >
        No spam. Your details stay with our sales team.
      </p>
    </form>
  )
}
