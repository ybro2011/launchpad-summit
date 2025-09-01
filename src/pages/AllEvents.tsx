import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, Users, ArrowLeft } from "lucide-react";

const AllEvents = () => {
  const events = [
    {
      id: 1,
      title: "Startup Pitch Night",
      date: "March 15, 2024",
      time: "6:00 PM - 9:00 PM",
      location: "Main Auditorium",
      attendees: 150,
      description: "Watch promising startups pitch their ideas to a panel of investors and industry experts.",
      category: "Pitch Event"
    },
    {
      id: 2,
      title: "AI in Business Workshop",
      date: "March 22, 2024", 
      time: "2:00 PM - 5:00 PM",
      location: "Tech Lab",
      attendees: 80,
      description: "Hands-on workshop exploring practical applications of AI in modern business operations.",
      category: "Workshop"
    },
    {
      id: 3,
      title: "Founder Panel Discussion",
      date: "March 29, 2024",
      time: "7:00 PM - 8:30 PM", 
      location: "Conference Room A",
      attendees: 120,
      description: "Hear from successful founders about their journey, challenges, and lessons learned.",
      category: "Panel"
    },
    {
      id: 4,
      title: "Networking Mixer",
      date: "April 5, 2024",
      time: "5:30 PM - 8:00 PM",
      location: "Student Lounge",
      attendees: 200,
      description: "Connect with fellow students, entrepreneurs, and industry professionals in a casual setting.",
      category: "Networking"
    },
    {
      id: 5,
      title: "Digital Marketing Masterclass",
      date: "April 12, 2024",
      time: "1:00 PM - 4:00 PM",
      location: "Media Center",
      attendees: 90,
      description: "Learn cutting-edge digital marketing strategies from industry leaders and practitioners.",
      category: "Masterclass"
    },
    {
      id: 6,
      title: "Investment & Finance Talk",
      date: "April 19, 2024",
      time: "6:30 PM - 8:00 PM",
      location: "Business School Auditorium",
      attendees: 160,
      description: "Understanding venture capital, angel investment, and funding strategies for startups.",
      category: "Talk"
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
                      {event.attendees} attendees expected
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