import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Calendar, MapPin, Users } from "lucide-react";

const events = [
  {
    title: "Event Title 1",
    date: "Event Date",
    time: "Event Time",
    location: "Event Location",
    attendees: "Expected Attendees",
    description: "Brief description of what this event is about and what participants can expect.",
    type: "Event Type"
  },
  {
    title: "Event Title 2",
    date: "Event Date", 
    time: "Event Time",
    location: "Event Location",
    attendees: "Expected Attendees",
    description: "Brief description of what this event is about and what participants can expect.",
    type: "Event Type"
  },
  {
    title: "Event Title 3",
    date: "Event Date",
    time: "Event Time", 
    location: "Event Location",
    attendees: "Expected Attendees",
    description: "Brief description of what this event is about and what participants can expect.",
    type: "Event Type"
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
            Our events bring students together to learn from inspiring leaders and innovators. They can be attended online by anyone or in person exclusively by Perse students, providing opportunities to gain insights, ask questions, and connect with like-minded peers.
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