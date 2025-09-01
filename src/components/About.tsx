import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const About = () => {
  const [titleRef, titleVisible] = useScrollAnimation(0.2);
  const [contentRef, contentVisible] = useScrollAnimation(0.2);
  const [quoteRef, quoteVisible] = useScrollAnimation(0.3);

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div 
            ref={titleRef}
            className={`text-center mb-16 scroll-fade-in ${titleVisible ? 'visible' : ''}`}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
              About Us
            </h2>
            <p className="font-body text-xl text-muted-foreground leading-relaxed">
              We are a student-led society at The Perse that brings in entrepreneurs, academics, and innovators to share their journeys. Our mission is to inspire students to think bigger, explore new ideas, and take action. Talks are hosted at school and livestreamed to reach a wider audience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div 
              ref={contentRef}
              className={`scroll-slide-left ${contentVisible ? 'visible' : ''}`}
            >
              <h3 className="font-display text-2xl font-semibold text-primary mb-6">
                What We Do
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="font-body text-muted-foreground">
                    <span className="font-semibold text-primary">Inspiring Talks</span> – Guest speakers from business, academia, and entrepreneurship
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="font-body text-muted-foreground">
                    <span className="font-semibold text-primary">Student Opportunities</span> – Learn directly from leaders shaping the future
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="font-body text-muted-foreground">
                    <span className="font-semibold text-primary">Livestream Access</span> – Bringing every talk to a wider online audience
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="font-body text-muted-foreground">
                    <span className="font-semibold text-primary">Building Connections</span> – Linking students with universities and companies
                  </p>
                </div>
              </div>
            </div>
            
            <div 
              ref={quoteRef}
              className={`scroll-slide-right ${quoteVisible ? 'visible' : ''}`}
            >
              <div className="bg-gradient-subtle rounded-lg p-8 shadow-elegant">
                <blockquote className="font-display text-2xl text-primary italic mb-4 leading-relaxed">
                  "The people who are crazy enough to think they can change the world are the ones who do."
                </blockquote>
                <cite className="font-body text-muted-foreground">
                  — Steve Jobs
                </cite>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;