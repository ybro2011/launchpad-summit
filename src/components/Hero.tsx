import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroBackground from "@/assets/hero-background.jpg";

const Hero = () => {
  return (
    <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: 'calc(100vh + 6rem)' }}>
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroBackground} 
          alt="Entrepreneurship Conference" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-hero opacity-80"></div>
      </div>
      
      {/* Curved bottom edge */}
      <div className="absolute left-0 w-full overflow-hidden" style={{ bottom: '-1px' }}>
        <svg
          className="relative block w-full h-24"
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
        >
          <path
            d="M0,200 C200,50 400,150 600,100 C800,50 1000,150 1200,100 L1200,200 L0,200 Z"
            fill="white"
          />
        </svg>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto -mt-16">
        <div className="animate-fade-in">
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight text-primary-glow">
            Learn from <span className="text-white">Leaders</span>.
            <span className="block">Think <span className="text-white">Bigger</span>. Do <span className="text-white">More</span>.</span>
          </h1>
          
          <p className="font-body text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
            A student-led society hosting talks with leaders from business, science, and beyond, streamed live from The Perse.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <Button variant="hero" size="lg" className="shadow-glow">
              Join Us
            </Button>
            <Link to="/events">
              <Button variant="outline-hero" size="lg">
                See All Events
              </Button>
            </Link>
          </div>
        </div>
        
      </div>
      
      {/* Scroll Indicator */}
      <div 
        className="absolute left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer group"
        style={{ bottom: '6rem' }}
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <div className="flex flex-col items-center">
          <div className="w-6 h-10 border-2 border-white/50 group-hover:border-white/80 rounded-full flex justify-center transition-colors duration-200">
            <div className="w-1 h-3 bg-white/50 group-hover:bg-white/80 rounded-full mt-2 transition-colors duration-200"></div>
          </div>
          <p className="text-white/60 text-xs mt-2 group-hover:text-white/80 transition-colors duration-200">Scroll</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;