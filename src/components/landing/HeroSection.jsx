import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Star, CheckCircle } from 'lucide-react';
const stats = [
  { value: '60+', label: 'Clients B2B' },
  { value: '6 ans', label: 'D\'expérience' },
  { value: '100%', label: 'Satisfaction client' },
  { value: 'Île-de-France', label: 'Zone d\'intervention' },
];

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/assets/hero.png"
          alt="Espace professionnel impeccable"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent/40 rounded-full"
            style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 20}%` }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-32 md:pb-32 lg:pb-32 w-full">
        <div className="max-w-3xl">
          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-accent fill-accent" />
                ))}
              </div>
              <span className="text-white/90 text-sm font-medium font-body ml-1">Entreprise familiale · Depuis 2018</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] mb-6 [text-shadow:0_4px_8px_rgba(0,0,0,0.8)] drop-shadow-2xl"
          >
<span className="text-white [text-shadow:0_4px_8px_rgba(0,0,0,0.8)] drop-shadow-2xl">Nettoyage Professionnel</span>
            <br />
            <span className="text-accent">Seine et Marne 77</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
className="text-lg md:text-xl text-white leading-relaxed mb-4 max-w-xl font-body [text-shadow:0_2px_4px_rgba(0,0,0,0.6)]"
          >
            Nettoyer un espace, c'est prendre soin des personnes qui y vivent et travaillent. 
            Professionnalisme, confiance et humanité depuis plus de 6 ans.
          </motion.p>

          {/* Trust points */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="flex flex-wrap gap-4 mb-10"
          >
            {['Devis gratuit sous 24h', 'Équipe formée & assurée', 'Produits certifiés éco'].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-white/80 text-sm font-body">{item}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#contact"
              className="group relative bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-full text-base font-bold transition-all duration-300 hover:shadow-2xl hover:shadow-accent/30 text-center overflow-hidden"
            >
              <span className="relative z-10">Demander un Devis Gratuit →</span>
            </a>
            
          </motion.div>
        </div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="absolute bottom-0 left-0 right-0 z-10"
      >
        <div className="bg-white/10 backdrop-blur-xl border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-4 divide-x divide-white/10">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col items-center py-2.5 px-2">
                  <span className="font-heading font-extrabold text-sm md:text-lg text-accent leading-tight">{s.value}</span>
                  <span className="text-white/60 text-[10px] md:text-xs font-body text-center leading-tight mt-0.5">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-32 right-8 z-10 hidden lg:flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs font-body tracking-widest uppercase rotate-90 origin-center mb-4">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ArrowDown className="w-4 h-4 text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}