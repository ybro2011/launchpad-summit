import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Mail, Users, Calendar, Star } from "lucide-react";

const benefits = [
  {
    icon: Users,
    title: "Benefit 1",
    description: "Description of the first benefit members receive"
  },
  {
    icon: Calendar,
    title: "Benefit 2",
    description: "Description of the second benefit members receive"
  },
  {
    icon: Star,
    title: "Benefit 3",
    description: "Description of the third benefit members receive"
  },
  {
    icon: Mail,
    title: "Benefit 4",
    description: "Description of the fourth benefit members receive"
  }
];

const Join = () => {
  const [titleRef, titleVisible] = useScrollAnimation(0.2);
  const [benefitsRef, benefitsVisible] = useScrollAnimation(0.1);
  const [ctaRef, ctaVisible] = useScrollAnimation(0.3);

  return (
    <section id="join" className="py-20 bg-muted/60">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            ref={titleRef}
            className={`mb-16 scroll-fade-in ${titleVisible ? 'visible' : ''}`}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
              Join Section Title
            </h2>
            <p className="font-body text-xl text-muted-foreground leading-relaxed mb-8">
              Your call-to-action description goes here. Edit this to encourage visitors to join your society and explain the benefits.
            </p>
          </div>
          
          <div 
            ref={benefitsRef}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {benefits.map((benefit, index) => (
              <Card key={benefit.title} className={`border-0 bg-white/80 backdrop-blur-sm hover:shadow-elegant transition-all duration-300 scroll-fade-in stagger-${index + 1} ${benefitsVisible ? 'visible' : ''}`}>
                <CardContent className="p-6 text-center">
                  <benefit.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="font-display text-lg font-semibold text-primary mb-2">
                    {benefit.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div 
            ref={ctaRef}
            className={`scroll-fade-in ${ctaVisible ? 'visible' : ''}`}
          >
            <Button variant="primary" size="lg" className="shadow-glow mr-4 mb-4">
              Primary Action
            </Button>
            <Button variant="outline" size="lg" className="mb-4">
              Secondary Action
            </Button>
            
            <div className="mt-8 p-6 bg-white/60 backdrop-blur-sm rounded-lg border border-primary/20">
              <p className="font-body text-muted-foreground mb-2">
                <strong className="text-primary">Next Event:</strong> Event Name • Event Date
              </p>
              <p className="font-body text-sm text-muted-foreground">
                Brief description of your next upcoming event
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Join;