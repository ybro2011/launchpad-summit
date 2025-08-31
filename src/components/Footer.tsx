const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-display text-2xl font-bold mb-4">Launchpad Summit</h3>
            <p className="font-body text-primary-foreground/80 leading-relaxed">
              Connecting ambitious students with industry leaders to build the entrepreneurial mindset for tomorrow's innovators.
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
            <p className="font-body text-primary-foreground/80 mb-2">
              Email: hello@launchpadsummit.org
            </p>
            <p className="font-body text-primary-foreground/80">
              Follow us for updates and event announcements
            </p>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="font-body text-primary-foreground/60 text-sm">
            © 2024 Launchpad Summit Society. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;