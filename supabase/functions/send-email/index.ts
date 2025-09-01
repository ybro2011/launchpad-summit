Deno.serve((req) => {
  console.log('Basic test function called')
  
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }
  
  return new Response(
    JSON.stringify({ message: 'Test successful' }),
    { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    }
  )
})