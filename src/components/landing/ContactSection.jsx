import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { base44 } from '@/api/base44Client';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } })
};

export default function ContactSection() {
  const [form, setForm] = useState({ nom: '', prenom: '', email: '', telephone: '', adresse: '', codePostal: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    const body = `Bonjour équipe KleanZ,\n\nNouvelle demande de devis :\n\n👤 Nom : ${form.name}\n📧 Email : ${form.email}\n📞 Téléphone : ${form.phone || 'Non renseigné'}\n💬 Message : ${form.message}`;

    await Promise.all([
      base44.integrations.Core.SendEmail({
        to: form.email,
        subject: 'Votre demande de devis KleanZ a bien été reçue',
        body: `Bonjour ${form.name},\n\nNous avons bien reçu votre demande de devis et nous vous recontacterons sous 24h.\n\nVotre message : "${form.message}"\n\nÀ très bientôt,\nL'équipe KleanZ`,
      }),
      base44.integrations.Core.SendEmail({
        to: 'soservice88@gmail.com',
        subject: `Nouvelle demande de devis — ${form.name}`,
        body,
      }),
    ]);

    setSending(false);
    setSent(true);
    toast.success('Votre demande a été envoyée ! Nous vous recontactons sous 24h.');
  };

  return (
    <section id="contact" className="py-28 lg:py-36 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left - Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.span variants={fadeUp} custom={0} className="text-accent font-semibold text-sm tracking-widest uppercase font-body">
              Contact
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
              <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">Demandez votre</span>
              <br />
              <span className="text-accent">devis gratuit</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-lg leading-relaxed mt-6 font-body max-w-md">
              Décrivez-nous votre besoin et nous vous répondrons sous 24h.
            </motion.p>

            {/* Value reminder */}
            <motion.div
              variants={fadeUp}
              custom={3}
              className="mt-10 p-6 rounded-2xl bg-primary/5 border border-primary/10"
            >
              <p className="text-foreground font-heading font-semibold text-sm leading-relaxed italic">
                « Relation de confiance qui commence ici. »
              </p>
            </motion.div>

            <motion.div variants={fadeUp} custom={4} className="mt-10 space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-accent" />
                </div>
              <span className="text-foreground font-body">07 86 12 15 38</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-accent" />
                </div>
                <span className="text-foreground font-body">soservice88@gmail.com</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-accent" />
                </div>
                <span className="text-foreground font-body">9 Avenue Michelet, 93400 SAINT OUEN SUR SEINE</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-card rounded-3xl p-10 shadow-xl border border-border flex flex-col items-center justify-center text-center gap-4 min-h-[400px]"
              >
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="font-heading font-extrabold text-2xl text-foreground">Demande envoyée !</h3>
                <p className="text-muted-foreground font-body max-w-xs">
                  Merci <strong>{form.nomPrenom}</strong> ! Votre demande de devis a bien été reçue. Nous vous recontactons sous 24h.
                </p>
                <p className="text-muted-foreground text-sm font-body">Un email de confirmation a été envoyé à <strong>{form.email}</strong>.</p>
                <button onClick={() => { setSent(false); setForm({ nomPrenom: '', email: '', adresse: '', codePostal: '', message: '' }); }}
                  className="mt-2 text-accent font-semibold underline text-sm font-body">
                  Envoyer une nouvelle demande
                </button>
              </motion.div>
            ) : (
            <motion.form
              key="form"
              variants={fadeUp}
              custom={1}
              onSubmit={handleSubmit}
              className="bg-card rounded-3xl p-8 md:p-10 shadow-xl border border-border space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium text-foreground mb-2 block font-body">Nom</label>
                  <Input
                    value={form.nom}
                    onChange={e => setForm({ ...form, nom: e.target.value })}
                    placeholder="Dupont"
                    required
                    className="h-12 rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block font-body">Prénom</label>
                  <Input
                    value={form.prenom}
                    onChange={e => setForm({ ...form, prenom: e.target.value })}
                    placeholder="Jean"
                    required
                    className="h-12 rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block font-body">Téléphone</label>
                  <Input
                    value={form.telephone}
                    onChange={e => setForm({ ...form, telephone: e.target.value })}
                    placeholder="07 86 12 15 38"
                    className="h-12 rounded-xl"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block font-body">Email</label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="jean@exemple.fr"
                  required
                  className="h-12 rounded-xl"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block font-body">Adresse</label>
                <Input
                  value={form.adresse}
                  onChange={e => setForm({ ...form, adresse: e.target.value })}
                  placeholder="9 Avenue Michelet"
                  required
                  className="h-12 rounded-xl"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block font-body">Décrivez votre besoin</label>
                <Textarea
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Type d'espace, fréquence souhaitée, surface approximative…"
                  required
                  className="min-h-[140px] rounded-xl resize-none"
                />
              </div>
              <Button
                type="submit"
                disabled={sending}
                className="w-full h-12 rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base"
              >
                {sending ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Envoi en cours…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Envoyer ma Demande
                  </span>
                )}
              </Button>
            </motion.form>
            )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}