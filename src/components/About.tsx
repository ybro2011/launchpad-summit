const About = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
              Our Mission
            </h2>
            <p className="font-body text-xl text-muted-foreground leading-relaxed">
              We bridge the gap between academic learning and real-world entrepreneurship by connecting 
              ambitious students with industry leaders who've built tomorrow's most innovative companies.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h3 className="font-display text-2xl font-semibold text-primary mb-6">
                What We Do
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="font-body text-muted-foreground">
                    Host exclusive talks with successful entrepreneurs, founders, and C-suite executives
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="font-body text-muted-foreground">
                    Organize hands-on workshops covering startup fundamentals and business strategy
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="font-body text-muted-foreground">
                    Create networking opportunities between students and industry professionals
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="font-body text-muted-foreground">
                    Support student-led ventures through mentorship and resources
                  </p>
                </div>
              </div>
            </div>
            
            <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
              <div className="bg-gradient-subtle rounded-lg p-8 shadow-elegant">
                <blockquote className="font-display text-2xl text-primary italic mb-4 leading-relaxed">
                  "The entrepreneurial mindset isn't just about starting companies—it's about solving problems, 
                  creating value, and having the courage to make bold decisions."
                </blockquote>
                <cite className="font-body text-muted-foreground">
                  — Society Mission Statement
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