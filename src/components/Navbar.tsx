import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Serviços", href: "#servicos" },
    { label: "Processo", href: "#processo" },
    { label: "Indústrias", href: "#industrias" },
    { label: "Sobre", href: "#sobre" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/30 backdrop-blur-lg border-b border-accent/10">
      <div className="container flex items-center justify-between h-16">
        <a href="#" className="neutral-sans-black text-xl text-primary-foreground tracking-tight">
          Ravius <span className="text-gradient">Consultorias Digitais</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-primary-foreground/70 hover:text-accent transition-colors font-medium"
            >
              {l.label}
            </a>
          ))}
          <Button variant="hero" size="sm" asChild>
            <a href="mailto:clearlinestrategy@gmail.com">Fale Conosco</a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-primary-foreground"
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-primary/95 backdrop-blur-lg border-t border-accent/10 overflow-hidden"
          >
            <div className="container py-4 flex flex-col gap-3">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-primary-foreground/80 hover:text-accent py-2 text-sm font-medium transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <Button variant="hero" size="sm" className="w-full mt-2" asChild>
                <a href="mailto:clearlinestrategy@gmail.com">Fale Conosco</a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
