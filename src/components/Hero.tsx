import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/hero-background.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" 
      style={{
        clipPath: 'polygon(0% 0%, 0% 83.3%, 16.7% 91.7%, 33.3% 83.3%, 50% 91.7%, 66.7% 83.3%, 83.3% 91.7%, 100% 83.3%, 100% 0%)'
      }}
    >
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
            Your Main
            <span className="block text-primary-glow">Headline Here</span>
          </h1>
          
          <p className="font-body text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
            Your compelling description goes here. Edit this text to describe your society's mission and value proposition.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <Button variant="hero" size="lg" className="shadow-glow">
              Primary Action
            </Button>
            <Button variant="outline-hero" size="lg">
              Secondary Action
            </Button>
          </div>
        </div>
        
        {/* Floating Quote */}
        <div className="absolute -left-20 top-1/4 hidden lg:block animate-float">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-sm">
            <p className="font-display text-2xl text-white/80 italic">
              "Your inspirational quote here"
            </p>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer group"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <div className="w-6 h-10 border-2 border-white/50 group-hover:border-white/80 rounded-full flex justify-center transition-colors duration-200">
          <div className="w-1 h-3 bg-white/50 group-hover:bg-white/80 rounded-full mt-2 transition-colors duration-200"></div>
        </div>
        <p className="text-white/60 text-xs mt-2 group-hover:text-white/80 transition-colors duration-200">Scroll</p>
      </div>
    </section>
  );
};

export default Hero;