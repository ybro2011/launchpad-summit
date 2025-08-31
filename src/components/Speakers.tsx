import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import speaker1 from "@/assets/speaker-1.jpg";
import speaker2 from "@/assets/speaker-2.jpg";
import speaker3 from "@/assets/speaker-3.jpg";

const speakers = [
  {
    name: "Speaker Name 1",
    title: "Job Title",
    company: "Company Name",
    image: speaker1,
    bio: "Brief description of the speaker's background and expertise."
  },
  {
    name: "Speaker Name 2",
    title: "Job Title",
    company: "Company Name",
    image: speaker2,
    bio: "Brief description of the speaker's background and expertise."
  },
  {
    name: "Speaker Name 3",
    title: "Job Title",
    company: "Company Name",
    image: speaker3,
    bio: "Brief description of the speaker's background and expertise."
  }
];

const Speakers = () => {
  const [titleRef, titleVisible] = useScrollAnimation(0.2);
  const [cardsRef, cardsVisible] = useScrollAnimation(0.1);

  return (
    <section id="speakers" className="py-20 gradient-subtle section-connector">
      <div className="container mx-auto px-6">
        <div 
          ref={titleRef}
          className={`text-center mb-16 scroll-fade-in ${titleVisible ? 'visible' : ''}`}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
            Our Speakers
          </h2>
          <p className="font-body text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Description of your speaker program. Edit this to describe the types of speakers you host and what attendees can expect to learn.
          </p>
        </div>
        
        <div 
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {speakers.map((speaker, index) => (
            <Card key={speaker.name} className={`group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm scroll-fade-in stagger-${index + 1} ${cardsVisible ? 'visible' : ''}`}>
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