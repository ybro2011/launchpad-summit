import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="font-display text-2xl font-bold text-primary-glow">Your Society Name</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#about" 
              className="font-body text-primary-glow hover:text-primary transition-colors duration-200 relative group"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
            </a>
            <a 
              href="#speakers" 
              className="font-body text-primary-glow hover:text-primary transition-colors duration-200 relative group"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('speakers')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Speakers
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
            </a>
            <a 
              href="#events" 
              className="font-body text-primary-glow hover:text-primary transition-colors duration-200 relative group"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Events
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
            </a>
            <a 
              href="#join" 
              className="font-body text-primary-glow hover:text-primary transition-colors duration-200 relative group"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Join
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
            </a>
          </nav>
          
          <Button variant="outline" size="sm" className="bg-background text-primary border-primary hover:bg-primary hover:text-primary-foreground shadow-elegant">
            Join Now
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;