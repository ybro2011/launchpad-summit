import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Speakers from "@/components/Speakers";
import Events from "@/components/Events";
import Join from "@/components/Join";
import Footer from "@/components/Footer";
import CurvedSeparator from "@/components/CurvedSeparator";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <CurvedSeparator 
        fromColor="hsl(var(--background))" 
        toColor="hsl(var(--muted))" 
        direction="down" 
      />
      <About />
      <CurvedSeparator 
        fromColor="hsl(var(--muted))" 
        toColor="hsl(var(--card))" 
        direction="up" 
      />
      <Speakers />
      <CurvedSeparator 
        fromColor="hsl(var(--card))" 
        toColor="hsl(var(--secondary))" 
        direction="down" 
      />
      <Events />
      <CurvedSeparator 
        fromColor="hsl(var(--secondary))" 
        toColor="hsl(var(--accent)/0.1)" 
        direction="up" 
      />
      <Join />
      <CurvedSeparator 
        fromColor="hsl(var(--accent)/0.1)" 
        toColor="hsl(var(--background))" 
        direction="down" 
      />
      <Footer />
    </div>
  );
};

export default Index;
