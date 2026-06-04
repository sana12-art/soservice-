import React from 'react';
import { motion } from 'framer-motion';

const partners = [
  // KFC
  { name: 'KFC (Conflans)', logo: '/partners/kfc-conflans.png' },

  // Burger King (sites)
  { name: 'Burger King - Trappes (78)', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Burger_King_logo.svg/512px-Burger_King_logo.svg.png' },
  { name: 'Burger King - Monrepas (78)', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Burger_King_logo.svg/512px-Burger_King_logo.svg.png' },
  { name: 'Burger King - Plaisir (78)', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Burger_King_logo.svg/512px-Burger_King_logo.svg.png' },
  { name: 'Burger King - Versailles (78)', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Burger_King_logo.svg/512px-Burger_King_logo.svg.png' },
  { name: 'Burger King - Le Pecq / Le Pec (78)', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Burger_King_logo.svg/512px-Burger_King_logo.svg.png' },
  { name: 'Burger King - Montlajolie', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Burger_King_logo.svg/512px-Burger_King_logo.svg.png' },
  { name: 'Burger King - Flansur Seines (78)', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Burger_King_logo.svg/512px-Burger_King_logo.svg.png' },
  { name: 'Burger King - Dereux (28)', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Burger_King_logo.svg/512px-Burger_King_logo.svg.png' },
  { name: 'Burger King - Evreux', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Burger_King_logo.svg/512px-Burger_King_logo.svg.png' },
  { name: 'Burger King - Saint Marcel (27)', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Burger_King_logo.svg/512px-Burger_King_logo.svg.png' },
  { name: 'Burger King - Montebreaux (77)', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Burger_King_logo.svg/512px-Burger_King_logo.svg.png' },
  { name: 'Burger King - Paris Nord 2', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Burger_King_logo.svg/512px-Burger_King_logo.svg.png' },
  { name: 'Burger King - Ville Parisie', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Burger_King_logo.svg/512px-Burger_King_logo.svg.png' },
  { name: 'Burger King - Créteil Bonneuille', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Burger_King_logo.svg/512px-Burger_King_logo.svg.png' },
  { name: 'Burger King - Paris Ville Poste', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Burger_King_logo.svg/512px-Burger_King_logo.svg.png' },

  // Institutions / autres
  { name: "Fondation des Amis de l’Atelier", logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Logo_placeholder.svg/512px-Logo_placeholder.svg.png' },
  { name: 'Salon de Varennes (Noisy-le-Grand)', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Logo_placeholder.svg/512px-Logo_placeholder.svg.png' },
  { name: 'Planet Oc', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Logo_placeholder.svg/512px-Logo_placeholder.svg.png' },
  { name: 'Hôtel F1 Saint-Denis', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Logo_placeholder.svg/512px-Logo_placeholder.svg.png' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
};

export default function PartnersSection() {
  return (
    <section id="partenaires" className="py-28 lg:py-36 bg-background overflow-hidden">
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
          >
            Nos partenaires
          </motion.span>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mt-3"
          >
            <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
              Ils nous font confiance
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-lg mt-4 font-body">
            Des marques et institutions qui partagent notre exigence de qualité.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
{partners.map((p, i) => (
            <motion.div
              key={p.name}
              variants={fadeUp}
              custom={i}
              className="bg-card rounded-2xl border border-border p-6 flex flex-col items-center justify-center text-center hover:shadow-md hover:border-accent/30 transition-all duration-300"
            >
              <div className="h-16 w-full flex items-center justify-center">
                <img
                  src={p.logo}
                  alt={p.name}
                  className="max-h-12 max-w-full object-contain filter grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback visuel: on évite de masquer totalement le bloc.
                    const imgEl = e.currentTarget;
                    imgEl.style.display = 'none';
                  }}
                />
              </div>
              <span className="mt-4 text-sm font-semibold text-foreground/80 font-body hidden md:block">
                {p.name}
              </span>
              <span className="mt-4 text-xs font-semibold text-foreground/80 font-body md:hidden">
                {p.name.split(' ').slice(0, 3).join(' ')}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

