import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Send, CheckCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';

const SERVICE_TYPES = [
  { id: 'bureaux', label: 'Bureaux / Open-space', base: 0.8, unit: '€/m²' },
  { id: 'residentiel', label: 'Résidentiel', base: 1.1, unit: '€/m²' },
  { id: 'post_chantier', label: 'Post-chantier', base: 1.8, unit: '€/m²' },
  { id: 'specialise', label: 'Nettoyage spécialisé', base: 2.2, unit: '€/m²' },
];

const FREQUENCIES = [
  { id: 'ponctuel', label: 'Intervention ponctuelle', multiplier: 1.3 },
  { id: 'hebdo', label: 'Hebdomadaire', multiplier: 1.0 },
  { id: 'bihebdo', label: '2x par semaine', multiplier: 0.92 },
  { id: 'quotidien', label: 'Quotidien', multiplier: 0.85 },
];

const SURFACE_MIN = 20;
const SURFACE_MAX = 2000;

function computePrice(serviceId, frequencyId, surface, isNewClient) {
  const service = SERVICE_TYPES.find(s => s.id === serviceId);
  const freq = FREQUENCIES.find(f => f.id === frequencyId);
  if (!service || !freq) return null;
  const base = service.base * freq.multiplier;

  // Remise volume
  let discount = 1;
  if (surface > 500) discount = 0.88;
  else if (surface > 200) discount = 0.93;
  else if (surface > 100) discount = 0.97;

  // Promo nouveaux clients: -5% (option activée par l'utilisateur)
  if (isNewClient) discount *= 0.95;

  const total = Math.round(surface * base * discount);
  const min = Math.round(total * 0.9);
  const max = Math.round(total * 1.1);
  return { min, max, total };
}

export default function PriceCalculator() {
  const [serviceId, setServiceId] = useState('bureaux');
  const [frequencyId, setFrequencyId] = useState('hebdo');
  const [surface, setSurface] = useState(100);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isNewClient, setIsNewClient] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const price = computePrice(serviceId, frequencyId, surface, isNewClient);
  const selectedService = SERVICE_TYPES.find(s => s.id === serviceId);
  const selectedFreq = FREQUENCIES.find(f => f.id === frequencyId);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSending(true);
    const body = `
Bonjour ${name || 'équipe KleanZ'},

Voici l'estimation générée depuis votre site :

🏠 Type de service : ${selectedService?.label}
📐 Surface : ${surface} m²
🔄 Fréquence : ${selectedFreq?.label}
💶 Estimation : entre ${price?.min}€ et ${price?.max}€ HT par intervention

Je souhaite recevoir un devis officiel.

Cordialement,
${name || 'Un visiteur de votre site'}
    `.trim();

    await base44.integrations.Core.SendEmail({
      to: email,
      subject: `Votre estimation KleanZ — ${selectedService?.label} · ${surface}m²`,
      body,
    });

    await base44.integrations.Core.SendEmail({
      to: 'contact@kleanz.fr',
      subject: `Nouvelle estimation demandée — ${name || email}`,
      body: `${body}\n\nEmail du prospect : ${email}`,
    });

    setSending(false);
    setSent(true);
    toast.success('Estimation envoyée ! Nous vous recontactons rapidement.');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="mt-16 bg-gradient-to-br from-primary/5 via-background to-accent/5 rounded-3xl border border-border overflow-hidden shadow-2xl"
    >
      {/* Header */}
      <div className="bg-primary px-10 py-8 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
          <Calculator className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h3 className="font-heading font-extrabold text-xl text-primary-foreground">Calculateur de prix</h3>
          <p className="text-primary-foreground/60 text-sm font-body">Estimation gratuite & instantanée</p>
        </div>
      </div>

      <div className="p-8 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: Controls */}
        <div className="space-y-7">
          {/* Service type */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3 font-body">Type de service</label>
            <div className="grid grid-cols-2 gap-2">
              {SERVICE_TYPES.map(s => (
                <button
                  key={s.id}
                  onClick={() => setServiceId(s.id)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left border ${
                    serviceId === s.id
                      ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20'
                      : 'bg-card text-muted-foreground border-border hover:border-primary/30 hover:text-foreground'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Frequency */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3 font-body">Fréquence</label>
            <div className="grid grid-cols-2 gap-2">
              {FREQUENCIES.map(f => (
                <button
                  key={f.id}
                  onClick={() => setFrequencyId(f.id)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border ${
                    frequencyId === f.id
                      ? 'bg-accent text-accent-foreground border-accent shadow-lg shadow-accent/20'
                      : 'bg-card text-muted-foreground border-border hover:border-accent/30 hover:text-foreground'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Surface */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-foreground font-body">Surface</label>
              <span className="font-heading font-extrabold text-2xl text-primary">{surface} m²</span>
            </div>
            <input
              type="range"
              min={SURFACE_MIN}
              max={SURFACE_MAX}
              step={10}
              value={surface}
              onChange={e => setSurface(Number(e.target.value))}
              className="w-full accent-primary h-2 rounded-full cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2 font-body">
              <span>{SURFACE_MIN} m²</span>
              <span>{SURFACE_MAX} m²</span>
            </div>
          </div>
        </div>

        {/* Right: Result + form */}
        <div className="flex flex-col gap-6">
          {/* Price display */}
          <div className="bg-primary rounded-2xl p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none select-none flex items-center justify-center">
              <span className="font-heading font-extrabold text-9xl text-white">€</span>
            </div>
            <p className="text-primary-foreground/60 text-sm font-body mb-2">Estimation par intervention</p>
            {price && (
              <motion.div
                key={`${price.min}-${price.max}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="font-heading font-extrabold text-5xl text-primary-foreground">
                  {price.min}€ – {price.max}€
                </div>
                <p className="text-primary-foreground/50 text-xs font-body mt-2">HT · Estimation indicative</p>
              </motion.div>
            )}
            <div className="mt-5 grid grid-cols-3 gap-2 text-center">
              <div className="bg-white/10 rounded-xl py-2 px-3">
                <div className="text-accent font-heading font-bold text-sm">{surface}m²</div>
                <div className="text-primary-foreground/50 text-xs font-body">Surface</div>
              </div>
              <div className="bg-white/10 rounded-xl py-2 px-3">
                <div className="text-accent font-heading font-bold text-xs leading-tight">{selectedService?.label.split('/')[0]}</div>
                <div className="text-primary-foreground/50 text-xs font-body">Service</div>
              </div>
              <div className="bg-white/10 rounded-xl py-2 px-3">
                <div className="text-accent font-heading font-bold text-xs leading-tight">{selectedFreq?.label.split(' ')[0]}</div>
                <div className="text-primary-foreground/50 text-xs font-body">Fréquence</div>
              </div>
            </div>
          </div>

          {/* Email form */}
          <AnimatePresence mode="wait">
            {!sent ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSend}
                className="space-y-3"
              >
                <p className="text-sm text-muted-foreground font-body">Recevez cette estimation par email et nous vous recontactons sous 24h :</p>
                <input
                  type="text"
                  placeholder="Votre prénom (optionnel)"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-border bg-card text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
                <input
                  type="email"
                  placeholder="Votre adresse email *"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full h-11 px-4 rounded-xl border border-border bg-card text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
                <label className="flex items-start gap-3 text-sm text-muted-foreground font-body">
                  <input
                    type="checkbox"
                    checked={isNewClient}
                    onChange={(e) => setIsNewClient(e.target.checked)}
                    className="mt-1 h-4 w-4 accent-primary"
                  />
                  <span>
                    Nouveau client ? Activez la promo <span className="font-semibold text-foreground">-5%</span>
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={sending || !email}
                  className="w-full h-11 rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {sending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Envoi en cours…
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Envoyer mon estimation
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center gap-3 py-6 bg-green-50 rounded-2xl border border-green-100"
              >
                <CheckCircle className="w-10 h-10 text-green-500" />
                <p className="font-heading font-bold text-foreground">Estimation envoyée !</p>
                <p className="text-muted-foreground text-sm font-body text-center">Vérifiez votre boîte mail. Nous vous recontactons sous 24h.</p>
                <button onClick={() => setSent(false)} className="text-accent text-sm font-medium underline font-body mt-1">
                  Faire une nouvelle estimation
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}