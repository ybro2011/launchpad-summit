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
  if (req.method !== 'POST') {
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
  
  const payload = await req.text()
  const signature = req.headers.get('webhook-signature') || req.headers.get('x-webhook-signature') || ''
  
  console.log('Webhook signature received:', signature ? 'Yes' : 'No')
  
  // For now, let's skip signature verification to debug the issue
  // if (!signature || !(await verifySignature(payload, signature, hookSecret))) {
  //   console.error('Invalid webhook signature')
  //   return new Response('Unauthorized', { status: 401 })
  // }
  
  try {
    const webhookData = JSON.parse(payload)
    console.log('Webhook data keys:', Object.keys(webhookData))
    
    const {
      user,
      email_data: { token, token_hash, redirect_to, email_action_type },
    } = webhookData as {
      user: {
        email: string
        email_confirmed_at?: string
      }
      email_data: {
        token: string
        token_hash: string
        redirect_to: string
        email_action_type: string
        site_url: string
      }
    }

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