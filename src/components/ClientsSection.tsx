import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const clientLogos = [
  "Estudio Visage",
  "Agência Nix",
  "Estudio Visage",
  "Agência Nix",
  "Estudio Visage",
  "Agência Nix",
];

const ClientsSection = () => {
  return (
    <section className="py-16 lg:py-20 bg-muted/50 overflow-hidden">
      <div className="container">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent">
            Parceiros
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mt-3">
            Conheça Nossos <span className="text-gradient">Clientes</span>
          </h2>
        </div>
      </div>

      {/* Infinite scroll slider */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-muted/50 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-muted/50 to-transparent pointer-events-none" />

        <motion.div
          className="flex gap-8 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          {/* Duplicate logos for seamless loop */}
          {[...clientLogos, ...clientLogos].map((name, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-40 h-20 rounded-xl bg-card border border-border flex items-center justify-center shadow-sm hover:border-accent/30 transition-colors"
            >
              <span className="font-heading font-semibold text-muted-foreground text-sm">
                {name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="text-center mt-10">
        <Button variant="heroOutline" size="lg" asChild>
          <a href="#contato" className="text-primary">Ver mais</a>
        </Button>
      </div>
    </section>
  );
};

export default ClientsSection;
