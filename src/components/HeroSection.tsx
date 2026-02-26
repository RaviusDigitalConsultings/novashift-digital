import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import { ArrowRight, ChevronDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/60" />
      </div>

      {/* Floating blobs */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-accent/10 blur-3xl animate-float" />
      <div className="absolute bottom-32 left-10 w-56 h-56 rounded-full bg-accent/5 blur-2xl animate-float" style={{ animationDelay: "2s" }} />

      <div className="container relative z-10 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/15 text-accent text-xs font-semibold tracking-widest uppercase mb-6 border border-accent/20">
            Digital Consultings
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-primary-foreground leading-tight mb-6">
            Transforme Seu Negócio{" "}
            <span className="text-gradient">Através da Tecnologia</span>
          </h1>

          <p className="text-lg sm:text-xl text-primary-foreground/70 max-w-xl mb-10 leading-relaxed">
            Consultoria estratégica e desenvolvimento sob medida para pequenos negócios 
            que pensam grande. Automatize, escale e cresça com confiança.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="lg" className="text-base px-8 py-6" asChild>
              <a href="#contato">
                Agendar uma Chamada Estratégica
                <ArrowRight className="ml-2" size={18} />
              </a>
            </Button>
            <Button variant="heroOutline" size="lg" className="text-base px-8 py-6" asChild>
              <a href="#servicos">Conheça Nossos Serviços</a>
            </Button>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <a href="#servicos" className="text-primary-foreground/40 hover:text-accent transition-colors">
            <ChevronDown size={28} className="animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
