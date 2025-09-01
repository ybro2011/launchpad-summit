import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, Users, ArrowLeft } from "lucide-react";

const AllEvents = () => {
  const events = [
    {
      id: 1,
      title: "Event Title 1",
      date: "Event Date",
      time: "Event Time",
      location: "Event Location",
      attendees: "Expected Attendees",
      description: "Brief description of what this event is about and what participants can expect.",
      category: "Event Type"
    },
    {
      id: 2,
      title: "Event Title 2",
      date: "Event Date",
      time: "Event Time",
      location: "Event Location",
      attendees: "Expected Attendees",
      description: "Brief description of what this event is about and what participants can expect.",
      category: "Event Type"
    },
    {
      id: 3,
      title: "Event Title 3",
      date: "Event Date",
      time: "Event Time",
      location: "Event Location",
      attendees: "Expected Attendees",
      description: "Brief description of what this event is about and what participants can expect.",
      category: "Event Type"
    },
    {
      id: 4,
      title: "Event Title 4",
      date: "Event Date",
      time: "Event Time",
      location: "Event Location",
      attendees: "Expected Attendees",
      description: "Brief description of what this event is about and what participants can expect.",
      category: "Event Type"
    },
    {
      id: 5,
      title: "Event Title 5",
      date: "Event Date",
      time: "Event Time",
      location: "Event Location",
      attendees: "Expected Attendees",
      description: "Brief description of what this event is about and what participants can expect.",
      category: "Event Type"
    },
    {
      id: 6,
      title: "Event Title 6",
      date: "Event Date",
      time: "Event Time",
      location: "Event Location",
      attendees: "Expected Attendees",
      description: "Brief description of what this event is about and what participants can expect.",
      category: "Event Type"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Pitch Event": return "bg-primary/10 text-primary border-primary/20";
      case "Workshop": return "bg-green-50 text-green-700 border-green-200";
      case "Panel": return "bg-blue-50 text-blue-700 border-blue-200";
      case "Networking": return "bg-orange-50 text-orange-700 border-orange-200";
      case "Masterclass": return "bg-purple-50 text-purple-700 border-purple-200";
      case "Talk": return "bg-indigo-50 text-indigo-700 border-indigo-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-6">
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-display text-5xl md:text-6xl font-bold text-primary mb-6">
              All Events
            </h1>
            <p className="font-body text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
              Discover upcoming talks, workshops, and networking opportunities designed to inspire and educate the next generation of innovators.
            </p>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div key={event.id} className="bg-card rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getCategoryColor(event.category)}`}>
                      {event.category}
                    </span>
                  </div>
                  
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {event.title}
                  </h3>
                  
                  <p className="font-body text-muted-foreground text-sm mb-4 line-clamp-3">
                    {event.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="w-4 h-4 mr-2" />
                      {event.attendees}
                    </div>
                  </div>
                  
                  <Button className="w-full" variant="outline">
                    Register Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AllEvents;