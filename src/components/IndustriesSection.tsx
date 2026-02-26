import { motion } from "framer-motion";
import { UtensilsCrossed, Store, Rocket, Code2 } from "lucide-react";

const industries = [
  { icon: UtensilsCrossed, title: "Restaurantes & Pizzarias", desc: "Cardápios digitais, pedidos online e gestão inteligente de operações." },
  { icon: Store, title: "Negócios Locais", desc: "Presença digital, agendamentos e automação de atendimento ao cliente." },
  { icon: Rocket, title: "Startups SaaS", desc: "MVPs robustos, arquitetura escalável e lançamento acelerado no mercado." },
  { icon: Code2, title: "Software Houses", desc: "Reforço de equipe, consultoria técnica e otimização de processos de desenvolvimento." },
];

const IndustriesSection = () => {
  return (
    <section id="industrias" className="py-24 lg:py-32 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent">Indústrias</span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mt-3">
            Setores que <span className="text-gradient">Atendemos</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Experiência comprovada em diversos segmentos, sempre com foco em resultados mensuráveis.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="group bg-card rounded-2xl p-6 text-center border border-border hover:border-accent/30 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-accent/20 transition-colors">
                <ind.icon className="text-accent" size={26} />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2">{ind.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{ind.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
