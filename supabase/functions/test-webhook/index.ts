console.log('Test webhook function starting...')

Deno.serve(async (req) => {
  console.log('Test webhook called')
  console.log('Method:', req.method)
  console.log('Headers:', Object.fromEntries(req.headers.entries()))
  
  try {
    if (req.method === 'POST') {
      const body = await req.text()
      console.log('Body length:', body.length)
      console.log('Body preview:', body.substring(0, 100))
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Test webhook working',
        timestamp: new Date().toISOString()
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
})