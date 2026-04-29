import React from 'react';
import { motion } from 'framer-motion';
import { FileText, GraduationCap, Target, CalendarDays, ShieldCheck, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: FileText,
    title: 'Cahier des charges',
    desc: "Règles strictes respectées. Nos équipes suivent précisément vos consignes pour un résultat irréprochable.",
    color: 'bg-primary/10 text-primary'
  },
  {
    number: '02',
    icon: GraduationCap,
    title: 'Formation continue',
    desc: "Agents expérimentés formés techniciens de surface. Polyvalence et maîtrise des produits adaptés à chaque surface.",
    color: 'bg-accent/10 text-accent'
  },
  {
    number: '03',
    icon: Target,
    title: 'Adaptation métier',
    desc: "Bureaux, industries, labs, usines. Solutions sur mesure pour tous corps de métiers et environnements.",
    color: 'bg-primary/10 text-primary'
  },
  {
    number: '04',
    icon: CalendarDays,
    title: 'Flexibilité',
    desc: "Interventions ponctuelles ou contrats annuels. SoService 77 vous offre sérénité et réactivité.",
    color: 'bg-accent/10 text-accent'
  },
  {
    number: '05',
    icon: ShieldCheck,
    title: 'Qualité & Excellence',
    desc: "Nettoyage industriel spécialisé. Formation interne continue pour expertise technique et excellence.",
    color: 'bg-primary/10 text-primary'
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } })
};

export default function HowItWorksSection() {
  return (
    <section id="comment-ca-marche" className="py-28 lg:py-36 bg-gradient-to-b from-background via-secondary to-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center max-w-3xl mx-auto mb-24"
        >
          <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-3 px-6 py-3 bg-primary/10 rounded-full mb-8">
            <FileText className="w-5 h-5 text-primary" />
            <span className="text-primary font-semibold text-sm tracking-widest uppercase font-body">COMMENT ÇA MARCHE ?</span>
          </motion.div>
          <motion.h2 variants={fadeUp} custom={1} className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-6">
            <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">Processus Nettoyage</span>
            <br />
            <span className="text-accent">Professionnel</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-xl font-medium leading-relaxed">
            SoService 77 : précision, formation, adaptation, flexibilité, excellence
          </motion.p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              variants={fadeUp}
              custom={i + 3}
              className="group relative bg-card/90 backdrop-blur-sm rounded-3xl p-8 border border-border/50 hover:border-primary hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 h-full cursor-pointer"
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all" />
              
              <div className="relative z-10">
                {/* Number badge */}
                <div className="mb-6">
                  <span className="bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold text-lg px-4 py-2 rounded-xl shadow-lg">
                    {step.number}
                  </span>
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <step.icon className="w-8 h-8" />
                </div>

                <h3 className="font-heading font-bold text-xl text-foreground mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-primary via-primary/90 to-accent text-primary-foreground px-12 py-6 rounded-3xl font-bold text-lg shadow-2xl hover:shadow-primary/40 transition-all duration-500 font-body tracking-wide hover:scale-[1.02]"
          >
            EN SAVOIR PLUS
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

