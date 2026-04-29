import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.15 } })
};

export default function StorySection() {
  return (
    <section id="histoire" className="py-28 lg:py-36 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <motion.div variants={fadeUp} custom={0} className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-12 bg-accent" />
            <span className="text-accent font-semibold text-sm tracking-widest uppercase font-body">Qu'est-ce qu'une entreprise de nettoyage professionnel ?</span>
            <div className="h-px w-12 bg-accent" />
          </motion.div>
          <motion.h2 variants={fadeUp} custom={1} className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
            <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">Spécialiste Hygiène Propreté</span>
            <br />
            <span className="text-accent">et Désinfection</span>
          </motion.h2>
        </motion.div>

        {/* Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={fadeUp} custom={2} className="space-y-8 text-lg text-muted-foreground font-body leading-relaxed">
            <p>
              Véritable spécialiste de l'hygiène, de la propreté et de la désinfection de locaux, une société de nettoyage professionnel est une entreprise qui intervient aussi bien pour l'entretien de locaux professionnels que chez des particuliers. Afin d'être en mesure de répondre à tous types de demandes, notre agence de nettoyage met à la disposition de ses clients des agents d'entretien Seine et Marne expérimentés et formés aux différentes techniques de nettoyage.
            </p>
            <p>
              Le champ des compétences de notre entreprise de nettoyage en entreprise est large. En effet, le nettoyage professionnel concerne toutes les entreprises qui possèdent chacune des spécificités et des attentes particulières en matière de prestations de nettoyage. Nettoyage de bureaux ou dépoussiérage de salles de réunion, mise en propreté de locaux industriels, désinfection de laboratoires ou de cabinets médicaux, remise en état après chantier, nettoyage des vitres ou entretien des sanitaires, autant de prestations qui demandent un savoir-faire et une expérience que notre société nettoyage 77, SoService, met au service de ses clients.
            </p>
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24 text-center"
        >
          <a
            href="#contact"
            className="inline-flex bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30"
          >
            Demander un devis gratuit
          </a>
        </motion.div>
      </div>
    </section>
  );
}

