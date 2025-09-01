import { Instagram, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-display text-2xl font-bold mb-4">Society Name</h3>
            <p className="font-body text-primary-foreground/80 leading-relaxed">
              We are a student society that connects members with inspiring innovators, experts, and industry leaders. We host events and workshops to help students gain insights, develop skills, and grow their confidence while learning from real-world experiences.
            </p>
          </div>
          
          <div>
            <h4 className="font-body font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="font-body text-primary-foreground/80 hover:text-primary-foreground transition-colors">About</a></li>
              <li><a href="#speakers" className="font-body text-primary-foreground/80 hover:text-primary-foreground transition-colors">Speakers</a></li>
              <li><a href="#events" className="font-body text-primary-foreground/80 hover:text-primary-foreground transition-colors">Events</a></li>
              <li><a href="#join" className="font-body text-primary-foreground/80 hover:text-primary-foreground transition-colors">Join Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-body font-semibold text-lg mb-4">Contact</h4>
            <p className="font-body text-primary-foreground/80 mb-4">
              Email: zzhang1@perse.co.uk
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                aria-label="X (Twitter)"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="font-body text-primary-foreground/60 text-sm">
            © 2024 Society Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;