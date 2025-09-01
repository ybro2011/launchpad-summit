
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
        fromColor="hsl(280 85% 50%)" 
        toColor="hsl(0 0% 100%)" 
        direction="up" 
      />
      <About />
      <Speakers />
      <Events />
      <Join />
      <Footer />
    </div>
  );
};

export default Index;
