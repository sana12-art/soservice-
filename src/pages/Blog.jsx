import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Tag, ArrowRight, BookOpen } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';

const CATEGORIES = ['Tous', 'Conseils', 'Actualités', 'Bien-être', 'Entreprise', 'Écologie'];

const CATEGORY_COLORS = {
  Conseils: 'bg-primary/10 text-primary',
  Actualités: 'bg-blue-50 text-blue-600',
  'Bien-être': 'bg-rose-50 text-rose-600',
  Entreprise: 'bg-amber-50 text-amber-600',
  Écologie: 'bg-green-50 text-green-600',
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
};

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    base44.entities.BlogPost.filter({ published: true }, '-created_date', 50)
      .then(data => { setPosts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = activeCategory === 'Tous' ? posts : posts.filter(p => p.category === activeCategory);

  if (selected) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-28 pb-20 max-w-3xl mx-auto px-6">
          <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm font-body mb-8 transition-colors">
            ← Retour au blog
          </button>
          {selected.cover_image && (
            <img src={selected.cover_image} alt={selected.title} className="w-full h-72 object-cover rounded-3xl mb-8" />
          )}
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold font-body ${CATEGORY_COLORS[selected.category] || 'bg-secondary text-muted-foreground'}`}>
              {selected.category}
            </span>
            {selected.read_time && (
              <span className="flex items-center gap-1 text-muted-foreground text-xs font-body">
                <Clock className="w-3 h-3" /> {selected.read_time} min de lecture
              </span>
            )}
          </div>
          <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-foreground mb-6">{selected.title}</h1>
          <div className="prose prose-slate max-w-none font-body text-foreground/80 leading-relaxed whitespace-pre-wrap">
            {selected.content}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-36 pb-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none flex items-center justify-center">
          <span className="font-heading font-extrabold text-[18vw] text-white whitespace-nowrap">BLOG</span>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-accent font-semibold text-sm tracking-widest uppercase font-body">Blog SoService</span>
            <h1 className="font-heading font-extrabold text-5xl md:text-6xl text-white mt-4 mb-4 leading-tight">
              Conseils & Actualités
            </h1>
            <p className="text-white/70 text-lg font-body max-w-xl mx-auto">
              Astuces nettoyage, tendances éco-responsables et actualités de SoService.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <div className="bg-background border-b border-border sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex gap-2 overflow-x-auto no-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all font-body ${
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                  : 'bg-secondary text-muted-foreground hover:bg-accent/10 hover:text-accent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Posts grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-4 border-border border-t-primary rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-heading font-bold text-xl text-foreground mb-2">Aucun article pour l'instant</h3>
              <p className="text-muted-foreground font-body text-sm">Les articles arrivent bientôt. Revenez nous voir !</p>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7"
            >
              {filtered.map((post, i) => (
                <motion.article
                  key={post.id}
                  variants={fadeUp}
                  custom={i}
                  onClick={() => setSelected(post)}
                  className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-400 cursor-pointer"
                >
                  {post.cover_image ? (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      <BookOpen className="w-10 h-10 text-primary/40" />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      {post.category && (
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold font-body ${CATEGORY_COLORS[post.category] || 'bg-secondary text-muted-foreground'}`}>
                          {post.category}
                        </span>
                      )}
                      {post.read_time && (
                        <span className="flex items-center gap-1 text-muted-foreground text-xs font-body">
                          <Clock className="w-3 h-3" /> {post.read_time} min
                        </span>
                      )}
                    </div>
                    <h2 className="font-heading font-bold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground text-sm font-body leading-relaxed line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 text-accent text-sm font-semibold font-body group-hover:gap-2 transition-all">
                      Lire l'article <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}