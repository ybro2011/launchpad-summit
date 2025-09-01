
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
      <About />
      <CurvedSeparator 
        fromColor="hsl(0 0% 100%)" 
        toColor="hsl(220 13% 91%)"
        direction="down" 
      />
      <Speakers />
      <Events />
      <Join />
      <Footer />
    </div>
  );
};

export default Index;
