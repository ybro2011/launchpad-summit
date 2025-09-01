import React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'

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
    <Preview>Welcome! Please confirm your email</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Welcome!</Heading>
        <Text style={text}>
          Thank you for signing up. Please confirm your email address by clicking the link below:
        </Text>
        <Link
          href={`${supabase_url}/auth/v1/verify?token=${token_hash}&type=${email_action_type}&redirect_to=${redirect_to}`}
          target="_blank"
          style={link}
        >
          Confirm your email address
        </Link>
        <Text style={text}>
          Or copy and paste this code: {token}
        </Text>
      </Container>
    </Body>
  </Html>
)

const main = {
  backgroundColor: '#ffffff',
}

const container = {
  paddingLeft: '12px',
  paddingRight: '12px',
  margin: '0 auto',
}

const h1 = {
  color: '#333',
  fontFamily: 'sans-serif',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
}

const link = {
  color: '#2754C5',
  fontFamily: 'sans-serif',
  fontSize: '14px',
  textDecoration: 'underline',
}

const text = {
  color: '#333',
  fontFamily: 'sans-serif',
  fontSize: '14px',
  margin: '24px 0',
}

export default SignupConfirmationEmail