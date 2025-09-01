
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Speakers from "@/components/Speakers";
import Events from "@/components/Events";
import Join from "@/components/Join";
import Newsletter from "@/components/Newsletter";
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
        toColor="hsla(260, 10%, 96%, 0.6)"
        direction="down"
        className="h-32"
      />
      <Speakers />
      <CurvedSeparator 
        fromColor="hsla(260, 10%, 96%, 0.6)" 
        toColor="hsl(0 0% 100%)"
        direction="up"
        className="h-32"
      />
      <Events />
      <CurvedSeparator 
        fromColor="hsl(0 0% 100%)" 
        toColor="hsla(260, 10%, 96%, 0.6)"
        direction="down"
        className="h-32"
      />
      <Join />
      <CurvedSeparator 
        fromColor="hsla(260, 10%, 96%, 0.6)" 
        toColor="hsl(260 10% 96% / 0.3)"
        direction="up"
        className="h-32"
      />
      <Newsletter />
      <CurvedSeparator 
        fromColor="hsl(260 10% 96% / 0.3)" 
        toColor="hsl(260 85% 25%)"
        direction="down"
        className="h-32"
      />
      <Footer />
    </div>
  );
};

export default Index;
