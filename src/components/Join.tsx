import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Mail, Users, Calendar, Star } from "lucide-react";

const benefits = [
  {
    icon: Users,
    title: "Exclusive Network",
    description: "Connect with like-minded students and industry professionals"
  },
  {
    icon: Calendar,
    title: "Premium Events",
    description: "Priority access to all talks, workshops, and networking events"
  },
  {
    icon: Star,
    title: "Mentorship",
    description: "Get matched with successful entrepreneurs for one-on-one guidance"
  },
  {
    icon: Mail,
    title: "Resources",
    description: "Access to exclusive content, templates, and startup resources"
  }
];

const Join = () => {
  const [titleRef, titleVisible] = useScrollAnimation(0.2);
  const [benefitsRef, benefitsVisible] = useScrollAnimation(0.1);
  const [ctaRef, ctaVisible] = useScrollAnimation(0.3);

  return (
    <section id="join" className="py-20 gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            ref={titleRef}
            className={`mb-16 scroll-fade-in ${titleVisible ? 'visible' : ''}`}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
              Ready to Join?
            </h2>
            <p className="font-body text-xl text-muted-foreground leading-relaxed mb-8">
              Become part of a community that's shaping the next generation of business leaders. 
              Join hundreds of ambitious students already building their entrepreneurial future.
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
              Join Our Society
            </Button>
            <Button variant="outline" size="lg" className="mb-4">
              Learn More
            </Button>
            
            <div className="mt-8 p-6 bg-white/60 backdrop-blur-sm rounded-lg border border-primary/20">
              <p className="font-body text-muted-foreground mb-2">
                <strong className="text-primary">Next Event:</strong> Startup Pitch Night • March 15, 2024
              </p>
              <p className="font-body text-sm text-muted-foreground">
                Join us for an exciting evening of student pitches and networking with investors
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Join;