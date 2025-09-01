import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthState } from "@/hooks/useAuthState";
import { LogOut, User } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut, isAuthenticated } = useAuthState();

  const scrollToSection = (sectionId: string) => {
    if (location.pathname === '/') {
      // Already on home page, just scroll
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: 'smooth'
      });
    } else {
      // Navigate to home page first, then scroll
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="font-display text-2xl font-bold text-primary-glow">Society Name</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#about" className="font-body font-light text-foreground hover:text-primary transition-colors duration-200 relative group cursor-pointer" onClick={e => {
            e.preventDefault();
            scrollToSection('about');
          }}>
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
            </a>
            <a href="#speakers" className="font-body font-light text-foreground hover:text-primary transition-colors duration-200 relative group cursor-pointer" onClick={e => {
            e.preventDefault();
            scrollToSection('speakers');
          }}>
              Speakers
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
            </a>
            <Link to="/events" className="font-body font-light text-foreground hover:text-primary transition-colors duration-200 relative group">
              All Events
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <a href="#join" className="font-body font-light text-foreground hover:text-primary transition-colors duration-200 relative group cursor-pointer" onClick={e => {
            e.preventDefault();
            scrollToSection('join');
          }}>
              Join
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
            </a>
          </nav>
          
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">{user?.email}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  className="shadow-elegant"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button variant="white-outline" size="sm" className="shadow-elegant">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;