import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/hero-background.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroBackground} 
          alt="Entrepreneurship Conference" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-hero opacity-80"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Shape the
            <span className="block text-primary-glow">Future of Business</span>
          </h1>
          
          <p className="font-body text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
            Connect with industry titans, learn from successful entrepreneurs, and build the mindset to become tomorrow's leaders.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <Button variant="hero" size="lg" className="shadow-glow">
              Join Our Society
            </Button>
            <Button variant="outline-hero" size="lg">
              View Events
            </Button>
          </div>
        </div>
        
        {/* Floating Quote */}
        <div className="absolute -left-20 top-1/4 hidden lg:block animate-float">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-sm">
            <p className="font-display text-2xl text-white/80 italic">
              "Be part of inventing the future"
            </p>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;