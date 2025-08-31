import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Calendar, MapPin, Users } from "lucide-react";

const events = [
  {
    title: "Startup Pitch Night",
    date: "March 15, 2024",
    time: "6:00 PM - 9:00 PM",
    location: "University Auditorium",
    attendees: "200+",
    description: "Watch student entrepreneurs pitch their ideas to a panel of industry experts and VCs.",
    type: "Competition"
  },
  {
    title: "Founder's Fireside Chat",
    date: "March 28, 2024", 
    time: "7:00 PM - 8:30 PM",
    location: "Business School Amphitheater",
    attendees: "150+",
    description: "Intimate conversation with Sarah Chen about her journey from student to successful CEO.",
    type: "Talk"
  },
  {
    title: "Innovation Workshop",
    date: "April 10, 2024",
    time: "2:00 PM - 5:00 PM", 
    location: "Innovation Lab",
    attendees: "50",
    description: "Hands-on workshop on design thinking and rapid prototyping for entrepreneurs.",
    type: "Workshop"
  }
];

const Events = () => {
  const [titleRef, titleVisible] = useScrollAnimation(0.2);
  const [eventsRef, eventsVisible] = useScrollAnimation(0.1);

  return (
    <section id="events" className="py-20 bg-background section-connector">
      <div className="container mx-auto px-6">
        <div 
          ref={titleRef}
          className={`text-center mb-16 scroll-fade-in ${titleVisible ? 'visible' : ''}`}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
            Upcoming Events
          </h2>
          <p className="font-body text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join us for inspiring talks, hands-on workshops, and networking opportunities 
            that will accelerate your entrepreneurial journey.
          </p>
        </div>
        
        <div 
          ref={eventsRef}
          className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {events.map((event, index) => (
            <Card key={event.title} className={`group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border border-border/50 scroll-fade-in stagger-${index + 1} ${eventsVisible ? 'visible' : ''}`}>
              <CardContent className="p-6">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 text-xs font-body font-medium bg-primary/10 text-primary rounded-full mb-3">
                    {event.type}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-primary mb-2">
                    {event.title}
                  </h3>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed mb-4">
                    {event.description}
                  </p>
                </div>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2 text-primary" />
                    <span className="font-body">{event.date} • {event.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2 text-primary" />
                    <span className="font-body">{event.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="w-4 h-4 mr-2 text-primary" />
                    <span className="font-body">{event.attendees} Expected</span>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full group-hover:shadow-md transition-all duration-200">
                  Register Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;