import React from 'npm:react@18.3.1'
import { Resend } from 'npm:resend@4.0.0'
import { renderAsync } from 'npm:@react-email/components@0.0.22'
import { MagicLinkEmail } from './_templates/magic-link.tsx'
import { SignupConfirmationEmail } from './_templates/signup-confirmation.tsx'

const resendApiKey = Deno.env.get('RESEND_API_KEY')
const hookSecret = Deno.env.get('SEND_EMAIL_HOOK_SECRET')

console.log('Environment check:', {
  hasResendKey: !!resendApiKey,
  hasHookSecret: !!hookSecret,
  resendKeyPrefix: resendApiKey?.substring(0, 10) + '...'
})

const resend = new Resend(resendApiKey as string)

// Supabase webhook signature verification
async function verifySignature(payload: string, signature: string, secret: string): Promise<boolean> {
  try {
    const [version, hash] = signature.split(',')
    if (version !== 'v1') return false
    
    const encoder = new TextEncoder()
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret.replace('v1,whsec_', '')),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    )
    
    const signatureBytes = new Uint8Array(
      hash.replace('whsec_', '').match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || []
    )
    
    return await crypto.subtle.verify(
      'HMAC',
      key,
      signatureBytes,
      encoder.encode(payload)
    )
  } catch (error) {
    console.error('Signature verification error:', error)
    return false
  }
}

Deno.serve(async (req) => {
  console.log('=== Edge Function Started ===')
  
  if (req.method !== 'POST') {
    console.log('Method not allowed:', req.method)
    return new Response('Method not allowed', { status: 405 })
  }

  console.log('Received webhook request')
  
  // Check if required secrets are available
  if (!resendApiKey) {
    console.error('RESEND_API_KEY is missing')
    return new Response(
      JSON.stringify({ error: { message: 'RESEND_API_KEY is missing' } }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
  
  if (!hookSecret) {
    console.error('SEND_EMAIL_HOOK_SECRET is missing')
    return new Response(
      JSON.stringify({ error: { message: 'SEND_EMAIL_HOOK_SECRET is missing' } }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
  
  try {
    console.log('Reading request payload...')
    const payload = await req.text()
    console.log('Payload length:', payload.length)
    console.log('Raw payload:', payload.substring(0, 200) + '...')
    
    const signature = req.headers.get('webhook-signature') || req.headers.get('x-webhook-signature') || ''
    console.log('Webhook signature received:', signature ? 'Yes' : 'No')
    console.log('All headers:', Object.fromEntries(req.headers.entries()))
    
    let webhookData
    try {
      webhookData = JSON.parse(payload)
      console.log('Successfully parsed JSON')
      console.log('Webhook data keys:', Object.keys(webhookData))
    } catch (parseError) {
      console.error('JSON parse error:', parseError)
      return new Response(
        JSON.stringify({ error: { message: 'Invalid JSON payload' } }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }
    
    console.log('Extracting webhook data...')
    const user = webhookData.user
    const email_data = webhookData.email_data
    
    if (!user || !email_data) {
      console.error('Missing required data. User:', !!user, 'Email data:', !!email_data)
      console.error('Full webhook data:', JSON.stringify(webhookData, null, 2))
      return new Response(
        JSON.stringify({ error: { message: 'Missing required webhook data' } }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }
    
    const { token, token_hash, redirect_to, email_action_type } = email_data

    console.log('Processing email for action:', email_action_type)

    let html: string
    let subject: string

    if (email_action_type === 'signup') {
      html = await renderAsync(
        React.createElement(SignupConfirmationEmail, {
          supabase_url: Deno.env.get('SUPABASE_URL') ?? '',
          token,
          token_hash,
          redirect_to,
          email_action_type,
        })
      )
      subject = 'Welcome! Please confirm your email'
    } else if (email_action_type === 'recovery') {
      html = await renderAsync(
        React.createElement(MagicLinkEmail, {
          supabase_url: Deno.env.get('SUPABASE_URL') ?? '',
          token,
          token_hash,
          redirect_to,
          email_action_type,
        })
      )
      subject = 'Reset your password'
    } else {
      // Default magic link
      html = await renderAsync(
        React.createElement(MagicLinkEmail, {
          supabase_url: Deno.env.get('SUPABASE_URL') ?? '',
          token,
          token_hash,
          redirect_to,
          email_action_type,
        })
      )
      subject = 'Your magic link'
    }

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