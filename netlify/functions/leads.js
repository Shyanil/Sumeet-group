import { POST } from '../../src/app/api/leads/route.js'

export default async function handler(request, context) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }
  return POST(request)
}

export const config = {
  path: '/api/leads',
}
