import React from 'react';
import { motion } from 'framer-motion';

const featuredClients = [
  { name: 'KFC (Conflans)', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/KFC_logo.svg/512px-KFC_logo.svg.png' },
  { name: 'Burger King', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Burger_King_Logo.svg/512px-Burger_King_Logo.svg.png' },
  { name: "Fondation des amis de l’atelier", logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Logo_placeholder.svg/512px-Logo_placeholder.svg.png' },
  { name: 'Salon de Varennes Noisy-le-Grand', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Logo_placeholder.svg/512px-Logo_placeholder.svg.png' },
  { name: 'Planet Oc', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Logo_placeholder.svg/512px-Logo_placeholder.svg.png' },
  { name: "Hôtel F1 Saint-Denis", logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Logo_placeholder.svg/512px-Logo_placeholder.svg.png' },
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
          <motion.span
            variants={fadeUp}
            custom={0}
            className="text-accent font-semibold text-sm tracking-widest uppercase font-body"
          />
        </motion.div>

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
                loading="lazy"
                onError={(e) => {
                  const imgEl = e.currentTarget;
                  imgEl.style.display = 'none';
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

