import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';

export default function Blog() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/50">
      <Navbar />
      <section className="pt-36 pb-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/2 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl bg-gradient-to-r from-primary via-teal-600 to-accent bg-clip-text text-transparent mb-6 drop-shadow-lg"
          >
            Blog SoService
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Conseils pratiques, actualités du nettoyage et tendances éco-responsables
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 p-8 bg-white/70 backdrop-blur-xl rounded-3xl border border-border/50 shadow-2xl max-w-2xl mx-auto"
          >
            <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Prochainement</h2>
            <p className="text-muted-foreground">
              Nos articles arrivent bientôt! Abonnez-vous pour être notifié des nouveaux contenus.
            </p>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
