import { motion } from "framer-motion";
import { Search, Hammer, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Analisar",
    desc: "Mapeamos seus processos, identificamos gargalos e definimos oportunidades de melhoria com um diagnóstico completo.",
  },
  {
    icon: Hammer,
    number: "02",
    title: "Construir",
    desc: "Desenvolvemos soluções sob medida com sprints semanais, entregas iterativas e total transparência no progresso.",
  },
  {
    icon: TrendingUp,
    number: "03",
    title: "Escalar",
    desc: "Implementamos, monitoramos e otimizamos continuamente para garantir crescimento sustentável e resultados reais.",
  },
];

const ProcessSection = () => {
  return (
    <section id="processo" className="py-24 lg:py-32 bg-muted/50 relative overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent">Nosso Processo</span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mt-3">
            Do Diagnóstico à <span className="text-gradient">Transformação</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-accent/20 via-accent/40 to-accent/20" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              className="text-center relative"
            >
              <div className="w-14 h-14 rounded-full bg-cta-gradient flex items-center justify-center mx-auto mb-6 shadow-lg relative z-10">
                <step.icon className="text-accent-foreground" size={24} />
              </div>
              <span className="text-xs font-bold text-accent tracking-widest">{step.number}</span>
              <h3 className="font-heading font-bold text-xl text-foreground mt-2 mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
