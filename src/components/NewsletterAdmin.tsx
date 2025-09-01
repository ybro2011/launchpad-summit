import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Send, Users } from "lucide-react";

const NewsletterAdmin = () => {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState<number | null>(null);

  const getSubscriberCount = async () => {
    try {
      const { count, error } = await supabase
        .from('newsletter_subscriptions')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true);

      if (error) throw error;
      setSubscriberCount(count || 0);
    } catch (error) {
      console.error('Error getting subscriber count:', error);
      toast({
        title: "Error",
        description: "Failed to get subscriber count",
        variant: "destructive",
      });
    }
  };

  const sendNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject || !content) {
      toast({
        title: "Error",
        description: "Please enter both subject and content",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://prxezdkgejtyglwxiule.supabase.co/functions/v1/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject,
          content,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send newsletter');
      }

      toast({
        title: "Success!",
        description: `Newsletter sent to ${result.sent} subscribers`,
      });

      setSubject("");
      setContent("");
      
    } catch (error: any) {
      console.error('Newsletter send error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to send newsletter",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto m-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="w-5 h-5" />
          Newsletter Admin
        </CardTitle>
        <CardDescription>
          Send newsletters to all subscribers
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4">
          <Button onClick={getSubscriberCount} variant="outline">
            <Users className="w-4 h-4 mr-2" />
            Check Subscribers
          </Button>
          {subscriberCount !== null && (
            <span className="flex items-center text-sm text-muted-foreground">
              {subscriberCount} active subscribers
            </span>
          )}
        </div>

        <form onSubmit={sendNewsletter} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Subject</label>
            <Input
              type="text"
              placeholder="Newsletter subject..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Content</label>
            <Textarea
              placeholder="Write your newsletter content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full gradient-primary text-primary-foreground"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                Sending Newsletter...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Newsletter
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewsletterAdmin;