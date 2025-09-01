
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Speakers from "@/components/Speakers";
import Events from "@/components/Events";
import Join from "@/components/Join";
import Footer from "@/components/Footer";
import CurvedSeparator from "@/components/CurvedSeparator";
import heroBackground from "@/assets/hero-background.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <CurvedSeparator 
        backgroundImage={heroBackground}
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
