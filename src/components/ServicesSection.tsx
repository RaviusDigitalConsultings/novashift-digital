import { motion } from "framer-motion";
import { Lightbulb, Code, Cog, HeadphonesIcon } from "lucide-react";

const services = [
  {
    icon: Lightbulb,
    title: "Estratégia de Transformação Digital",
    desc: "Diagnóstico completo do seu negócio e criação de um roadmap tecnológico personalizado para crescimento sustentável.",
  },
  {
    icon: Code,
    title: "Desenvolvimento de Software Sob Medida",
    desc: "Aplicativos e sistemas construídos com tecnologia de ponta, focados em performance, segurança e escalabilidade.",
  },
  {
    icon: Cog,
    title: "Automação de Processos",
    desc: "Elimine tarefas manuais e repetitivas. Otimize fluxos de trabalho com integrações inteligentes e automações.",
  },
  {
    icon: HeadphonesIcon,
    title: "Consultoria em TI",
    desc: "Suporte estratégico contínuo para decisões tecnológicas, arquitetura de sistemas e evolução digital do seu negócio.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5 },
  }),
};

const ServicesSection = () => {
  return (
    <section id="servicos" className="py-24 lg:py-32 bg-background relative">
      {/* Subtle top curve */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-primary" style={{ clipPath: "ellipse(70% 100% at 50% 0%)" }} />

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent">Nossos Serviços</span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mt-3">
            Soluções que <span className="text-gradient">Impulsionam</span> Resultados
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Combinamos estratégia, tecnologia e design para entregar soluções que realmente transformam negócios.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              className="group bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-border hover:border-accent/30 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                <s.icon className="text-accent" size={24} />
              </div>
              <h3 className="font-heading font-semibold text-foreground text-lg mb-3">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
