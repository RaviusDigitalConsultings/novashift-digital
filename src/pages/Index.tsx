import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ClientsSection from "@/components/ClientsSection";
import ProcessSection from "@/components/ProcessSection";
import IndustriesSection from "@/components/IndustriesSection";
import AboutSection from "@/components/AboutSection";
import SpecialistsSection from "@/components/SpecialistsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import FloatingCalendar from "@/components/FloatingCalendar";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <ClientsSection />
      <ProcessSection />
      <IndustriesSection />
      <AboutSection />
      <SpecialistsSection />
      <CTASection />
      <Footer />
      <FloatingCalendar />
    </div>
  );
};

export default Index;
