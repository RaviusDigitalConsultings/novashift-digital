import { motion } from "framer-motion";
import { Target, Zap, Shield } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="sobre" className="py-24 lg:py-32 bg-muted/50 relative overflow-hidden">
      <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-semibold tracking-widest uppercase text-accent">Sobre Nós</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mt-3 mb-6">
              Nossa <span className="text-gradient">Missão</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-12">
              A CLS Digital Consultings existe para ajudar pequenos negócios a desbloquear seu verdadeiro 
              potencial de crescimento através de soluções tecnológicas escaláveis, acessíveis e orientadas 
              a resultados. Acreditamos que toda empresa merece acesso à tecnologia de ponta.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { icon: Target, title: "Foco em Resultado", desc: "Cada decisão técnica é guiada pelo impacto real no seu negócio." },
              { icon: Zap, title: "Agilidade", desc: "Entregas rápidas com ciclos iterativos e feedback constante." },
              { icon: Shield, title: "Confiança", desc: "Transparência total, contratos claros e garantia pós-entrega." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="text-accent" size={22} />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
