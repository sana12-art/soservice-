import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Leaf, PhoneCall, Repeat, Star } from 'lucide-react';

const reasons = [
  { icon: Clock, title: 'Réponse sous 24h', desc: 'Chaque demande de devis est traitée le jour même ou au plus tard le lendemain.' },
  { icon: MapPin, title: 'Basé en Île-de-France', desc: 'Intervention rapide sur toute la région parisienne. Nous connaissons votre secteur.' },
  { icon: Leaf, title: 'Produits éco-certifiés', desc: 'Nous utilisons exclusivement des produits respectueux de l\'environnement et de la santé.' },
  { icon: PhoneCall, title: 'Interlocuteur unique', desc: 'Un seul contact pour toutes vos demandes. Une relation directe, humaine et efficace.' },
  { icon: Repeat, title: 'Régularité garantie', desc: 'Les mêmes équipes interviennent chez vous. La continuité crée la confiance.' },
  { icon: Star, title: '100% satisfaction', desc: 'Nous ne quittons pas un chantier tant que vous n\'êtes pas entièrement satisfait.' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } })
};

export default function WhyUsSection() {
  return (
    <section className="py-28 lg:py-36 bg-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <motion.div
            variants={fadeUp}
            custom={0}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="h-px w-8 bg-accent" />
            <span className="text-accent font-semibold text-sm tracking-widest uppercase font-body">
              Pourquoi nous ?
            </span>
            <div className="h-px w-8 bg-accent" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            custom={1}
            className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight"
          >
            <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">La différence</span>
            <br />
            <span className="text-accent">SoService</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-muted-foreground text-lg mt-6 font-body"
          >
            Pas une société anonyme. Une famille qui a construit sa réputation contrat après contrat.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              variants={fadeUp}
              custom={i}
              className="group relative bg-card rounded-2xl p-8 border border-border hover:border-primary/20 hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <r.icon className="w-5 h-5 text-primary" />
                </div>

                <h3 className="font-heading font-bold text-lg text-foreground mb-3">
                  {r.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed font-body">
                  {r.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 bg-primary rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div>
            <h3 className="font-heading font-extrabold text-2xl text-primary-foreground">
              prêt à travailler avec nous ?
            </h3>
            <p className="text-primary-foreground/60 font-body mt-2">
              Devis gratuit · Réponse sous 24h · Aucun engagement
            </p>
          </div>

          <a
            href="#contact"
            className="flex-shrink-0 bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-full font-bold text-sm transition-all duration-300 hover:shadow-xl hover:shadow-accent/30"
          >
            Obtenir mon devis gratuit →
          </a>
        </motion.div>

      </div>
    </section>
  );
}