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
  
  if (!hookSecret) {
    console.error('SEND_EMAIL_HOOK_SECRET is missing')
    return new Response(
      JSON.stringify({ error: { message: 'SEND_EMAIL_HOOK_SECRET is missing' } }),
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