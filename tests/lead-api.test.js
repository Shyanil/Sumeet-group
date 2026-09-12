import test from 'node:test'
import assert from 'node:assert/strict'
import { POST } from '../src/app/api/leads/route.js'

const valid = { name: 'Test Visitor', phone: '9876543210', email: 'test@example.com', consent: true, source: 'coming-soon', intent: 'launch' }
const request = (body = valid, headers = {}) => new Request('https://example.com/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://example.com', ...headers }, body: JSON.stringify(body) })

test('rejects invalid data and missing consent before attempting delivery', async () => {
  for (const data of [null, [], {}, { ...valid, consent: false }, { ...valid, phone: '123' }, { ...valid, email: 'invalid' }, { ...valid, website: 'spam' }, { ...valid, source: 'unknown' }]) {
    assert.equal((await POST(request(data))).status, 400)
  }
})

test('rejects cross-origin requests and non-JSON submissions', async () => {
  assert.equal((await POST(request(valid, { Origin: 'https://other.example' }))).status, 403)
  assert.equal((await POST(request(valid, { 'Content-Type': 'text/plain' }))).status, 415)
})

test('rejects oversized and malformed payloads', async () => {
  assert.equal((await POST(request({ ...valid, name: 'x'.repeat(5000) }))).status, 413)
  const malformed = new Request('https://example.com/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{' })
  assert.equal((await POST(malformed)).status, 400)
})

test('missing delivery configuration never reports success', async () => {
  const previous = process.env.LEAD_WEBHOOK_URL
  delete process.env.LEAD_WEBHOOK_URL
  try { assert.equal((await POST(request())).status, 503) }
  finally { if (previous !== undefined) process.env.LEAD_WEBHOOK_URL = previous }
})

test('confirms only accepted leads and forwards only validated fields', async (t) => {
  const previous = process.env.LEAD_WEBHOOK_URL
  process.env.LEAD_WEBHOOK_URL = 'https://crm.example/leads'
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    assert.equal(url, 'https://crm.example/leads')
    const body = JSON.parse(options.body)
    assert.equal(body.phone, '919876543210')
    assert.equal(body.intent, 'launch')
    assert.equal(body.consent, true)
    assert.equal(body.untrusted, undefined)
    assert.ok(body.receivedAt)
    return new Response(null, { status: 202 })
  })
  try {
    const result = await POST(request({ ...valid, phone: '+91 98765 43210', untrusted: 'ignore' }))
    assert.equal(result.status, 200)
    assert.deepEqual(await result.json(), { ok: true })
  } finally { if (previous === undefined) delete process.env.LEAD_WEBHOOK_URL; else process.env.LEAD_WEBHOOK_URL = previous }
})

test('delivery rejection and network failure remain retryable errors', async (t) => {
  const previous = process.env.LEAD_WEBHOOK_URL
  process.env.LEAD_WEBHOOK_URL = 'https://crm.example/leads'
  const mock = t.mock.method(globalThis, 'fetch', async () => new Response(null, { status: 500 }))
  try {
    assert.equal((await POST(request())).status, 502)
    mock.mock.mockImplementation(async () => { throw new Error('connection failed') })
    assert.equal((await POST(request())).status, 502)
  } finally { if (previous === undefined) delete process.env.LEAD_WEBHOOK_URL; else process.env.LEAD_WEBHOOK_URL = previous }
})

 test('accepts the public host when Next.js uses an internal request URL', async () => {
  const previous = process.env.LEAD_WEBHOOK_URL
  delete process.env.LEAD_WEBHOOK_URL
  try {
    const req = new Request('http://localhost:4175/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json', host: '127.0.0.1:4175', origin: 'http://127.0.0.1:4175' }, body: JSON.stringify(valid) })
    assert.equal((await POST(req)).status, 503)
  } finally { if (previous !== undefined) process.env.LEAD_WEBHOOK_URL = previous }
})
