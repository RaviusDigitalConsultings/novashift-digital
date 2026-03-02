import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

const specialists = [
  {
    name: "Nome do Especialista",
    role: "CEO & Estratégia Digital",
    bio: "Especialista em transformação digital com +10 anos de experiência em consultoria para pequenos negócios.",
    photo: "https://via.placeholder.com/200x200?text=Foto+1",
    linkedin: "https://linkedin.com/in/seu-perfil",
  },
  {
    name: "Nome do Especialista",
    role: "CTO & Desenvolvimento",
    bio: "Engenheiro de software full-stack focado em arquitetura escalável e automação de processos.",
    photo: "https://via.placeholder.com/200x200?text=Foto+2",
    linkedin: "https://linkedin.com/in/seu-perfil",
  },
  {
    name: "Nome do Especialista",
    role: "Head de Projetos",
    bio: "Gestão ágil de projetos com foco em entregas iterativas e resultados mensuráveis para clientes.",
    photo: "https://via.placeholder.com/200x200?text=Foto+3",
    linkedin: "https://linkedin.com/in/seu-perfil",
  },
];

const SpecialistsSection = () => {
  return (
    <section id="especialistas" className="py-16 lg:py-20 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent">
            Equipe
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mt-3">
            Nossos <span className="text-gradient">Especialistas</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Conheça os profissionais por trás das soluções que transformam negócios.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {specialists.map((person, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="group bg-card rounded-2xl border border-border hover:border-accent/30 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Photo */}
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={person.photo}
                  alt={person.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="font-heading font-semibold text-foreground text-lg">
                  {person.name}
                </h3>
                <span className="text-accent text-sm font-medium">{person.role}</span>
                <p className="text-muted-foreground text-sm leading-relaxed mt-3">
                  {person.bio}
                </p>

                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                >
                  <Linkedin size={18} />
                  Ver perfil no LinkedIn
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialistsSection;
