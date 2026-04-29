import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Hammer, Users, Shield, Award, Eye, Handshake } from 'lucide-react';

const values = [
  { icon: Heart, title: 'Courage', desc: 'Transformer une épreuve de vie en une opportunité professionnelle durable.', accent: 'bg-rose-50 text-rose-600' },
  { icon: Hammer, title: 'Travail', desc: 'Commencer avec un simple seau et un balai. L\'effort quotidien comme moteur.', accent: 'bg-amber-50 text-amber-600' },
  { icon: Users, title: 'Solidarité', desc: 'Une entreprise construite ensemble, en famille, main dans la main.', accent: 'bg-blue-50 text-blue-600' },
  { icon: Handshake, title: 'Proximité', desc: 'Une relation simple et humaine avec chaque client, sans intermédiaire.', accent: 'bg-violet-50 text-violet-600' },
  { icon: Shield, title: 'Confiance', desc: 'Intervenir dans les espaces privés avec le plus grand respect.', accent: 'bg-green-50 text-green-600' },
  { icon: Award, title: 'Excellence', desc: 'Le professionnalisme rime avec détermination et rigueur absolue.', accent: 'bg-orange-50 text-orange-600' },
  { icon: Eye, title: 'Honnêteté', desc: 'Des prestations transparentes, des tarifs justes, des engagements tenus.', accent: 'bg-teal-50 text-teal-600' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.07 } })
};

export default function ValuesSection() {
  return (
    <section id="valeurs" className="py-28 lg:py-36 bg-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20"
        >
          <div>
            <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-accent" />
              <span className="text-accent font-semibold text-sm tracking-widest uppercase font-body">Nos Valeurs</span>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
              <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">Les piliers</span>
              <br />
              <span className="text-accent">qui nous guident</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-lg leading-relaxed mt-6 font-body max-w-md">
              Chaque valeur est vécue au quotidien, pas seulement affichée. Elles sont le fondement de notre réputation et de la confiance que nos clients nous accordent.
            </motion.p>
          </div>
          <motion.div variants={fadeUp} custom={3} className="grid grid-cols-3 gap-3">
            {['Courage', 'Travail', 'Famille', 'Confiance', 'Qualité', 'Proximité'].map((w, i) => (
              <div key={w} className="bg-card rounded-xl py-3 px-4 text-center border border-border">
                <span className="font-heading font-bold text-sm text-foreground">{w}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              variants={fadeUp}
              custom={i}
              className="group bg-card rounded-2xl p-7 hover:shadow-2xl transition-all duration-500 border border-border hover:border-transparent hover:-translate-y-1"
            >
              <div className={`w-11 h-11 rounded-xl ${v.accent} bg-opacity-20 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}>
                <v.icon className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-foreground mb-2">{v.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-body">{v.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}