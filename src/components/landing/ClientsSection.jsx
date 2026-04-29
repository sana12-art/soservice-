import React from 'react';
import { motion } from 'framer-motion';

const featuredClients = [
  {
    name: 'Institut de France',
    logo: 'https://upload.wikimedia.org/wikipedia/fr/thumb/b/b8/Institut_de_France.svg/320px-Institut_de_France.svg.png',
  },
  {
    name: 'OpenClassrooms',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/OpenClassrooms_logo.svg/320px-OpenClassrooms_logo.svg.png',
  },
  {
    name: 'Century 21',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Century_21_seal.svg/320px-Century_21_seal.svg.png',
  },
  {
    name: 'France Langue',
    logo: 'https://www.france-langue.fr/wp-content/themes/france-langue/img/logo-france-langue.png',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }),
};

export default function ClientsSection() {
  return (
    <section id="clients" className="py-28 lg:py-36 bg-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.span variants={fadeUp} custom={0} className="text-accent font-semibold text-sm tracking-widest uppercase font-body">
            Ils nous font confiance
          </motion.span>
          <motion.h2 variants={fadeUp} custom={1} className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
            <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">Plus de 60</span>
            <br />
            <span className="text-accent">partenaires</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-lg mt-4 font-body">
            Des institutions, entreprises et associations de renom nous confient leurs espaces en Île-de-France.
          </motion.p>
        </motion.div>

        {/* 4 Featured Logos */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10"
        >
          {featuredClients.map((client, i) => (
            <motion.div
              key={client.name}
              variants={fadeUp}
              custom={i}
              className="bg-card rounded-2xl border border-border p-8 flex items-center justify-center hover:shadow-md hover:border-accent/30 transition-all duration-300 group"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="max-h-12 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <span className="hidden text-sm font-semibold text-foreground font-body text-center">{client.name}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-muted-foreground text-sm font-body"
        >
          Et bien d'autres entreprises, associations et institutions en Île-de-France…
        </motion.p>
      </div>
    </section>
  );
}