import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";
import { Resend } from "npm:resend@4.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

interface NewsletterRequest {
  subject: string;
  content: string;
  htmlContent?: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Newsletter function called with method:", req.method);

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { 
        status: 405, 
        headers: { "Content-Type": "application/json", ...corsHeaders } 
      }
    );
  }

  try {
    const { subject, content, htmlContent }: NewsletterRequest = await req.json();
    console.log("Sending newsletter with subject:", subject);

    if (!subject || !content) {
      return new Response(
        JSON.stringify({ error: "Subject and content are required" }),
        { 
          status: 400, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }

    // Get all active newsletter subscribers
    const { data: subscribers, error: dbError } = await supabase
      .from('newsletter_subscriptions')
      .select('email')
      .eq('is_active', true);

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Failed to fetch subscribers");
    }

    if (!subscribers || subscribers.length === 0) {
      return new Response(
        JSON.stringify({ 
          message: "No active subscribers found",
          sent: 0 
        }),
        { 
          status: 200, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }

    console.log(`Found ${subscribers.length} subscribers`);

    // Send newsletter to all subscribers
    const emailPromises = subscribers.map(async (subscriber, index) => {
      // Add delay to avoid rate limits
      if (index > 0) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      return resend.emails.send({
        from: "Newsletter <onboarding@resend.dev>",
        to: [subscriber.email],
        subject: subject,
        html: htmlContent || `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #4c1d95; margin-bottom: 20px;">${subject}</h1>
            <div style="line-height: 1.6; color: #374151;">
              ${content.replace(/\n/g, '<br>')}
            </div>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
            <p style="font-size: 14px; color: #6b7280;">
              You're receiving this because you subscribed to our newsletter.
            </p>
          </div>
        `,
        text: content,
      });
    });

    const results = await Promise.allSettled(emailPromises);
    
    const successful = results.filter(result => result.status === 'fulfilled').length;
    const failed = results.filter(result => result.status === 'rejected').length;

    console.log(`Newsletter sent: ${successful} successful, ${failed} failed`);

    if (failed > 0) {
      console.error("Some emails failed to send:", 
        results
          .filter(result => result.status === 'rejected')
          .map(result => (result as PromiseRejectedResult).reason)
      );
    }

    return new Response(
      JSON.stringify({ 
        message: "Newsletter sent successfully",
        sent: successful,
        failed: failed,
        total: subscribers.length
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Error in newsletter function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "Internal server error" 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);