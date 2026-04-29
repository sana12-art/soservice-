import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sophie M.',
    role: 'Directrice des Opérations',
    company: 'OpenClassrooms',
    text: 'KleanZ intervient dans nos bureaux depuis 3 ans. Ponctualité, discrétion et qualité irréprochables. L\'équipe est formidable et comprend nos contraintes de télétravail.',
    rating: 5,
    avatar: 'SM',
  },
  {
    name: 'Laurent B.',
    role: 'Responsable Facility',
    company: 'Dental Monitoring',
    text: 'Nous cherchions une entreprise de nettoyage fiable pour nos espaces médicaux. KleanZ a dépassé nos attentes avec un niveau d\'hygiène parfait et une équipe toujours disponible.',
    rating: 5,
    avatar: 'LB',
  },
  {
    name: 'Amina K.',
    role: 'Office Manager',
    company: 'Lemon Learning',
    text: 'Ce qui nous a séduit chez KleanZ, c\'est leur approche humaine. On sent qu\'ils mettent leur cœur dans leur travail. Nos locaux n\'ont jamais été aussi propres.',
    rating: 5,
    avatar: 'AK',
  },
  {
    name: 'Pierre-Antoine G.',
    role: 'PDG',
    company: 'Innovorder',
    text: 'Réactifs, professionnels et honnêtes dans leur tarification. KleanZ est devenu un partenaire indispensable pour notre siège parisien. Je les recommande sans hésitation.',
    rating: 5,
    avatar: 'PG',
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="py-28 lg:py-36 bg-primary overflow-hidden relative">
      {/* Background decorative text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.04]">
        <span className="font-heading font-extrabold text-[15vw] text-white whitespace-nowrap">CONFIANCE</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-accent" />
            <span className="text-accent font-semibold text-sm tracking-widest uppercase font-body">Témoignages</span>
            <div className="h-px w-8 bg-accent" />
          </div>
          <h2 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
            <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">Ils parlent mieux</span>
            <br />
            <span className="text-accent">que nous</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-10 md:p-14 border border-white/10 relative"
            >
              <Quote className="absolute top-8 right-10 w-12 h-12 text-accent/20" />
              
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                ))}
              </div>

              <p className="text-primary-foreground/90 text-xl md:text-2xl font-heading font-medium leading-relaxed mb-10 italic">
                "{testimonials[current].text}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="font-heading font-bold text-accent text-sm">{testimonials[current].avatar}</span>
                </div>
                <div>
                  <div className="font-heading font-bold text-primary-foreground">{testimonials[current].name}</div>
                  <div className="text-primary-foreground/50 text-sm font-body">
                    {testimonials[current].role} · {testimonials[current].company}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-all duration-300"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current ? 'w-6 h-2 bg-accent' : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-all duration-300"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}