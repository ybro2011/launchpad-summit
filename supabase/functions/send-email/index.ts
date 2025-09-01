console.log('Edge function loading...')

const resendApiKey = Deno.env.get('RESEND_API_KEY')
const hookSecret = Deno.env.get('SEND_EMAIL_HOOK_SECRET')

console.log('Environment check:', {
  hasResendKey: !!resendApiKey,
  hasHookSecret: !!hookSecret,
})

Deno.serve(async (req) => {
  console.log('=== Request received ===')
  console.log('Method:', req.method)
  console.log('URL:', req.url)
  
  try {
    if (req.method !== 'POST') {
      console.log('Method not allowed')
      return new Response('Method not allowed', { status: 405 })
    }

    // Check secrets
    if (!resendApiKey) {
      console.error('RESEND_API_KEY is missing')
      return new Response(
        JSON.stringify({ error: 'RESEND_API_KEY is missing' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }
    
    if (!hookSecret) {
      console.error('SEND_EMAIL_HOOK_SECRET is missing')
      return new Response(
        JSON.stringify({ error: 'SEND_EMAIL_HOOK_SECRET is missing' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    console.log('Reading payload...')
    const payload = await req.text()
    console.log('Payload received, length:', payload.length)
    
    let data
    try {
      data = JSON.parse(payload)
      console.log('JSON parsed successfully')
      console.log('Data keys:', Object.keys(data))
    } catch (e) {
      console.error('JSON parse error:', e.message)
      return new Response(
        JSON.stringify({ error: 'Invalid JSON' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // For now, just return success to test basic functionality
    console.log('Returning success response')
    return new Response(
      JSON.stringify({ success: true, received: Object.keys(data) }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Unhandled error:', error.message)
    console.error('Stack:', error.stack)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})

console.log('Edge function setup complete')