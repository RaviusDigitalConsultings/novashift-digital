import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

const specialists = [
  {
    name: "Lucas Tesche",
    role: "CEO & Estratégia Digital",
    bio: "Engenheiro de Software FullStack, especialista em criação de produtos e soluções de TI.",
    photo: "https://media.licdn.com/dms/image/v2/D4D03AQFhkXp9bJ6lGA/profile-displayphoto-scale_400_400/B4DZl8.lyVIgAg-/0/1758738408170?e=1775692800&v=beta&t=7QmMlVIsjJuBhFQ8qP47wwA82WeSWhFUKqFW4GpHveM",
    linkedin: "https://linkedin.com/in/lucastesche1",
  },
  {
    name: "Samuel Soares Silva",
    role: "Head de Projetos & Desenvolvimento",
    bio: "Engenheiro de software full-stack focado em arquitetura escalável e automação de processos.",
    photo: "https://media.licdn.com/dms/image/v2/D4D03AQHtvPCUnk7GgQ/profile-displayphoto-scale_400_400/B4DZxYKx68G0Ag-/0/1771005749537?e=1775692800&v=beta&t=Ko5F8Dqt2FA9gDg2Ye8c6RPrhArNydDTn3l_5lRrq9w",
    linkedin: "https://linkedin.com/in/samuellsoaressilva",
  },
  {
    name: "Cauã Luca",
    role: "CTO & Desenvolvimento",
    bio: "Gestão ágil de projetos com foco em entregas iterativas e resultados mensuráveis para clientes.",
    photo: "https://media.licdn.com/dms/image/v2/D4D03AQFErv7_ANQEJg/profile-displayphoto-shrink_400_400/B4DZb4h0KgGYAk-/0/1747926337236?e=1775692800&v=beta&t=f8mvu67TOF3hxOYfUqpmlxjrQzZBpBOEuLsjqr7AFnI",
    linkedin: "https://linkedin.com/in/caualucaprates",
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
              className="group relative bg-card rounded-2xl border border-border hover:border-accent/30 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 p-6"
            >
              <h3 className="font-heading font-semibold text-foreground text-lg">
                {person.name}
              </h3>
              <span className="text-accent text-sm font-medium">{person.role}</span>
              <p className="text-muted-foreground text-sm leading-relaxed mt-3 pr-14">
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

              {/* Photo circle */}
              <img
                src={person.photo}
                alt={person.name}
                className="absolute bottom-5 right-5 w-12 h-12 rounded-full object-cover border-2 border-border shadow-sm"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialistsSection;
