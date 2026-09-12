export const runtime = 'nodejs'

const failure = (error, status) => Response.json({ error }, { status, headers: { 'Cache-Control': 'no-store' } })

export async function POST(request) {
  if (!request.headers.get('content-type')?.includes('application/json')) return failure('Unsupported request format.', 415)
  const origin = request.headers.get('origin')
  if (origin) {
    try {
      // Next.js may use an internal hostname in request.url behind the server.
      const publicHost = request.headers.get('host') || new URL(request.url).host
      if (new URL(origin).host !== publicHost) return failure('Please submit from our website.', 403)
    } catch { return failure('Please submit from our website.', 403) }
  }
  let data
  try {
    const text = await request.text()
    if (text.length > 4096) return failure('Your request is too long.', 413)
    data = JSON.parse(text)
  } catch {
    return failure('Please check your details.', 400)
  }
  if (!data || typeof data !== 'object' || Array.isArray(data)) return failure('Please check your details.', 400)
  if (data.website) return failure('Unable to accept this request.', 400)
  const name = typeof data.name === 'string' ? data.name.trim() : ''
  const phone = typeof data.phone === 'string' ? data.phone.replace(/[\s()+-]/g, '') : ''
  const email = typeof data.email === 'string' ? data.email.trim() : ''
  if (name.length < 2 || name.length > 100 || !/^(?:91)?[6-9]\d{9}$/.test(phone)) return failure('Enter your name and a valid Indian mobile number.', 400)
  if (email.length > 254 || (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) return failure('Enter a valid email address.', 400)
  if (data.consent !== true) return failure('Please agree to be contacted about your request.', 400)
  if (!['homepage', 'coming-soon'].includes(data.source) || !['callback', 'launch', 'plans'].includes(data.intent)) return failure('Invalid request.', 400)

  // Set this server-only destination to the team's approved CRM/form webhook.
  // A missing or failed integration must never display a false success.
  if (!process.env.LEAD_WEBHOOK_URL) return failure('Online registration is temporarily unavailable.', 503)
  try {
    const response = await fetch(process.env.LEAD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(process.env.LEAD_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.LEAD_WEBHOOK_TOKEN}` } : {}) },
      body: JSON.stringify({ name, phone, email, source: data.source, intent: data.intent, consent: true, receivedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(10000),
      cache: 'no-store',
      redirect: 'error',
    })
    if (!response.ok) return failure('We could not send your request. Please try again.', 502)
    return Response.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } })
  } catch {
    return failure('We could not send your request. Please try again.', 502)
  }
}
