import { Resend } from 'npm:resend@4.0.0'

const resendApiKey = Deno.env.get('RESEND_API_KEY')

console.log('Send-email function starting...', {
  hasResendKey: !!resendApiKey,
})

const resend = new Resend(resendApiKey as string)

Deno.serve(async (req) => {
  console.log('=== Webhook received ===')
  
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  // Check if required secrets are available
  if (!resendApiKey) {
    console.error('RESEND_API_KEY is missing')
    return new Response(
      JSON.stringify({ error: { message: 'RESEND_API_KEY is missing' } }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
  
  try {
    const payload = await req.text()
    console.log('Payload received, length:', payload.length)
    
    const webhookData = JSON.parse(payload)
    console.log('Webhook data keys:', Object.keys(webhookData))

    const user = webhookData.user
    const email_data = webhookData.email_data

    if (!user || !email_data) {
      console.error('Missing required webhook data')
      return new Response(
        JSON.stringify({ error: { message: 'Missing required webhook data' } }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const { token, token_hash, redirect_to, email_action_type } = email_data
    console.log('Processing email for action:', email_action_type)

    const supabase_url = Deno.env.get('SUPABASE_URL') ?? ''
    const confirmLink = `${supabase_url}/auth/v1/verify?token=${token_hash}&type=${email_action_type}&redirect_to=${redirect_to}`

    let html: string
    let subject: string

    if (email_action_type === 'signup') {
      subject = 'Welcome! Please confirm your email'
      html = `
        <h1>Welcome!</h1>
        <p>Thank you for signing up. Please confirm your email address by clicking the link below:</p>
        <p><a href="${confirmLink}">Confirm your email address</a></p>
        <p>Or copy and paste this code: ${token}</p>
      `
    } else if (email_action_type === 'recovery') {
      subject = 'Reset your password'
      html = `
        <h1>Reset your password</h1>
        <p><a href="${confirmLink}">Click here to reset your password</a></p>
        <p>Or copy and paste this code: ${token}</p>
      `
    } else {
      subject = 'Your magic link'
      html = `
        <h1>Magic Link</h1>
        <p><a href="${confirmLink}">Click here to continue</a></p>
        <p>Or copy and paste this code: ${token}</p>
      `
    }

    console.log('Sending email to:', user.email)
    const { error } = await resend.emails.send({
      from: 'TechTalks <onboarding@resend.dev>',
      to: [user.email],
      subject,
      html,
    })

    if (error) {
      console.error('Resend error:', error)
      throw error
    }

    console.log(`Email sent successfully to ${user.email} for ${email_action_type}`)
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Email webhook error:', error)
    return new Response(
      JSON.stringify({
        error: {
          message: error.message,
        },
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
})