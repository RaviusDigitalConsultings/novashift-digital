import { Linkedin, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary py-12 border-t border-accent/10">
      <div className="container">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-heading text-lg font-bold text-primary-foreground mb-3">
              CLS <span className="text-gradient">Digital</span>
            </h3>
            <p className="text-primary-foreground/50 text-sm leading-relaxed">
              Consultoria digital e desenvolvimento de software para negócios que querem crescer.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-primary-foreground text-sm mb-3">Links</h4>
            <ul className="space-y-2 text-sm">
              {["Serviços", "Processo", "Indústrias", "Sobre"].map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase()}`} className="text-primary-foreground/50 hover:text-accent transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-primary-foreground text-sm mb-3">Contato</h4>
            <a href="mailto:clearlinestrategy@gmail.com" className="text-primary-foreground/50 hover:text-accent transition-colors text-sm">
              clearlinestrategy@gmail.com
            </a>
            <div className="flex gap-3 mt-4">
              {[Linkedin, Instagram, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center text-primary-foreground/50 hover:text-accent hover:bg-accent/20 transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-accent/10 pt-6 text-center">
          <p className="text-primary-foreground/30 text-xs">
            © {new Date().getFullYear()} CLS Digital Consultings. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
