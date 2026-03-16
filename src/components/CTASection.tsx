import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section id="contato" className="relative py-16 lg:py-20 bg-hero overflow-hidden">
      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/8 blur-3xl animate-pulse-glow" />

      <div className="container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-primary-foreground mb-6">
            Pronto para Modernizar{" "}
            <span className="text-gradient">Seu Negócio?</span>
          </h2>
          <p className="text-lg text-primary-foreground/70 max-w-xl mx-auto mb-10">
            Agende uma chamada estratégica gratuita e descubra como a tecnologia pode 
            transformar seus resultados.
          </p>
          <Button variant="cta" size="lg" className="px-10 py-6 text-lg" asChild>
            <a href="mailto:clearlinestrategy@gmail.com">
              Agendar Chamada Estratégica
              <ArrowRight className="ml-2" size={20} />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
