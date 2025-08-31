import { Card, CardContent } from "@/components/ui/card";
import speaker1 from "@/assets/speaker-1.jpg";
import speaker2 from "@/assets/speaker-2.jpg";
import speaker3 from "@/assets/speaker-3.jpg";

const speakers = [
  {
    name: "Sarah Chen",
    title: "CEO & Founder",
    company: "TechVenture Labs",
    image: speaker1,
    bio: "Serial entrepreneur with 3 successful exits. Expert in scaling tech startups from idea to IPO."
  },
  {
    name: "Marcus Rodriguez",
    title: "Managing Partner",
    company: "Innovation Capital",
    image: speaker2,
    bio: "Leading VC investor with $2B+ in portfolio companies. Champion of student entrepreneurship."
  },
  {
    name: "Dr. Elizabeth Harper",
    title: "Chief Innovation Officer",
    company: "Global Dynamics Corp",
    image: speaker3,
    bio: "Former startup founder turned corporate innovator. Expert in digital transformation."
  }
];

const Speakers = () => {
  return (
    <section id="speakers" className="py-20 gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
            Learn From Industry Leaders
          </h2>
          <p className="font-body text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our speakers are the entrepreneurs, founders, and executives who are shaping the future of business. 
            Get inspired by their journeys and learn the mindset that drives success.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {speakers.map((speaker, index) => (
            <Card key={speaker.name} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 animate-slide-up border-0 bg-white/80 backdrop-blur-sm" style={{animationDelay: `${index * 0.2}s`}}>
              <CardContent className="p-6">
                <div className="relative mb-6">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover shadow-elegant"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
                
                <div className="text-center">
                  <h3 className="font-display text-xl font-semibold text-primary mb-1">
                    {speaker.name}
                  </h3>
                  <p className="font-body text-primary/80 font-medium mb-1">
                    {speaker.title}
                  </p>
                  <p className="font-body text-primary/60 text-sm mb-4">
                    {speaker.company}
                  </p>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed">
                    {speaker.bio}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Speakers;