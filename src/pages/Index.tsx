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
        fromColor="hsl(260 85% 25%)" 
        toColor="hsl(var(--background))" 
        direction="down" 
      />
      <About />
      <CurvedSeparator 
        fromColor="hsl(var(--background))" 
        toColor="hsl(260 20% 98%)" 
        direction="up" 
      />
      <Speakers />
      <CurvedSeparator 
        fromColor="hsl(260 20% 98%)" 
        toColor="hsl(var(--background))" 
        direction="down" 
      />
      <Events />
      <CurvedSeparator 
        fromColor="hsl(var(--background))" 
        toColor="hsl(260 20% 98%)" 
        direction="up" 
      />
      <Join />
      <CurvedSeparator 
        fromColor="hsl(260 20% 98%)" 
        toColor="hsl(260 85% 25%)" 
        direction="down" 
      />
      <Footer />
    </div>
  );
};

export default Index;
