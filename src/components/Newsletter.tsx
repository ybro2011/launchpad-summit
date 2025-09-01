import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Mail, Send } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [titleRef, titleVisible] = useScrollAnimation();
  const [cardRef, cardVisible] = useScrollAnimation();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert([{ email }]);

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "Already subscribed",
            description: "You're already subscribed to our newsletter!",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Success!",
          description: "You've been subscribed to our newsletter",
        });
        setEmail("");
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto text-center">
        <div ref={titleRef} className={`scroll-fade-in mb-12 ${titleVisible ? 'visible' : ''}`}>
          <Mail className="w-16 h-16 mx-auto mb-6 text-primary" />
          <h2 className="text-4xl font-bold font-display mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Stay Connected
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get the latest updates on events, speakers, and exclusive content delivered to your inbox
          </p>
        </div>

        <Card ref={cardRef} className={`scroll-fade-in stagger-1 max-w-md mx-auto shadow-elegant ${cardVisible ? 'visible' : ''}`}>
          <CardHeader>
            <CardTitle className="text-2xl">Newsletter Signup</CardTitle>
            <CardDescription>
              Join our community and never miss an update
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                required
              />
              <Button 
                type="submit" 
                className="w-full gradient-primary text-primary-foreground"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Subscribe
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Newsletter;