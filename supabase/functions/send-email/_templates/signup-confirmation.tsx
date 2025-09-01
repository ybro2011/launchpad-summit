import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Section,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'

interface SignupConfirmationEmailProps {
  supabase_url: string
  email_action_type: string
  redirect_to: string
  token_hash: string
  token: string
}

export const SignupConfirmationEmail = ({
  token,
  supabase_url,
  email_action_type,
  redirect_to,
  token_hash,
}: SignupConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to TechTalks! Please confirm your email</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>🎉 Welcome to TechTalks!</Heading>
        </Section>
        
        <Section style={content}>
          <Text style={text}>
            Thank you for joining TechTalks! We're excited to have you as part of our community 
            of technology enthusiasts.
          </Text>
          
          <Text style={text}>
            To get started and access all our exclusive content, speakers, and events, 
            please confirm your email address by clicking the button below:
          </Text>
          
          <Section style={buttonContainer}>
            <Link
              href={`${supabase_url}/auth/v1/verify?token=${token_hash}&type=${email_action_type}&redirect_to=${redirect_to}`}
              style={button}
            >
              Confirm Email Address
            </Link>
          </Section>
          
          <Text style={smallText}>
            Or copy and paste this link into your browser:
          </Text>
          <Text style={linkText}>
            {`${supabase_url}/auth/v1/verify?token=${token_hash}&type=${email_action_type}&redirect_to=${redirect_to}`}
          </Text>
          
          <Section style={features}>
            <Text style={featuresTitle}>What you'll get access to:</Text>
            <Text style={featureItem}>🎤 Exclusive speaker sessions and Q&A</Text>
            <Text style={featureItem}>📅 Early access to event registrations</Text>
            <Text style={featureItem}>🤝 Connect with fellow tech enthusiasts</Text>
            <Text style={featureItem}>📚 Access to presentation materials and resources</Text>
          </Section>
          
          <Text style={warningText}>
            If you didn't create this account, you can safely ignore this email.
          </Text>
          
          <Text style={expiryText}>
            This confirmation link will expire in 24 hours.
          </Text>
        </Section>
        
        <Section style={footer}>
          <Text style={footerText}>
            Welcome aboard!<br />
            The TechTalks Team
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default SignupConfirmationEmail

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  borderRadius: '8px',
  border: '1px solid #e6ebf1',
}

const header = {
  padding: '0 48px',
  borderBottom: '1px solid #e6ebf1',
  paddingBottom: '32px',
  marginBottom: '32px',
}

const content = {
  padding: '0 48px',
}

const h1 = {
  color: '#1f2937',
  fontSize: '28px',
  fontWeight: '600',
  lineHeight: '36px',
  margin: '0',
  textAlign: 'center' as const,
}

const text = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
}

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
}

const button = {
  backgroundColor: '#10b981',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '16px 32px',
  lineHeight: '24px',
}

const smallText = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '24px 0 8px 0',
}

const linkText = {
  color: '#3b82f6',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0 0 24px 0',
  wordBreak: 'break-all' as const,
}

const features = {
  backgroundColor: '#f0f9ff',
  border: '1px solid #e0f2fe',
  borderRadius: '8px',
  padding: '24px',
  margin: '32px 0',
}

const featuresTitle = {
  color: '#1f2937',
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '24px',
  margin: '0 0 16px 0',
}

const featureItem = {
  color: '#374151',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '8px 0',
}

const warningText = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '24px 0',
  padding: '16px',
  backgroundColor: '#f9fafb',
  borderRadius: '6px',
  border: '1px solid #e5e7eb',
}

const expiryText = {
  color: '#6b7280',
  fontSize: '12px',
  lineHeight: '16px',
  margin: '16px 0',
  fontStyle: 'italic',
}

const footer = {
  borderTop: '1px solid #e6ebf1',
  paddingTop: '32px',
  margin: '32px 48px 0 48px',
}

const footerText = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0',
}