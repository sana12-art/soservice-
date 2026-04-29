import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Phone, MapPin, CheckCircle, ChevronLeft, ChevronRight, User, Mail, MessageSquare } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';
import { format, addDays, startOfDay, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';

const MEETING_TYPES = [
{ id: 'visite', label: 'Visite technique', desc: 'Le client se déplace chez l\'expert à Saint Ouen sur Seine pour évaluer vos besoins', duration: '45 min', icon: MapPin },
  { id: 'appel', label: 'Appel de découverte', desc: 'Échangez avec notre équipe pour définir votre projet', duration: '20 min', icon: Phone },
];

const TIME_SLOTS = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'];

function generateAvailableDays(count = 21) {
  const days = [];
  let d = addDays(startOfDay(new Date()), 1);
  while (days.length < count) {
    const dow = d.getDay();
    if (dow !== 0 && dow !== 6) days.push(new Date(d));
    d = addDays(d, 1);
  }
  return days;
}

// Pseudo-random unavailable slots per day for realism
function getAvailableSlots(date) {
  const seed = date.getDate() + date.getMonth() * 31;
  return TIME_SLOTS.filter((_, i) => (seed + i * 3) % 5 !== 0);
}

const STEPS = ['type', 'date', 'confirm'];

export default function BookingSection() {
  const [step, setStep] = useState(0);
  const [meetingType, setMeetingType] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [weekOffset, setWeekOffset] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const availableDays = generateAvailableDays(21);
  const today = startOfDay(new Date());

  // Show 5 days per "page"
  const visibleDays = availableDays.slice(weekOffset * 5, weekOffset * 5 + 5);
  const maxWeekOffset = Math.floor((availableDays.length - 1) / 5);

  const availableSlots = selectedDate ? getAvailableSlots(selectedDate) : [];

  const canGoNext0 = meetingType !== null;
  const canGoNext1 = selectedDate !== null && selectedSlot !== null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSending(true);

    const type = MEETING_TYPES.find(m => m.id === meetingType);
    const dateStr = format(selectedDate, 'EEEE d MMMM yyyy', { locale: fr });
    const dateISO = format(selectedDate, 'yyyy-MM-dd');

    // Save to database
    await base44.entities.Reservation.create({
      name: form.name,
      email: form.email,
      phone: form.phone || '',
      meeting_type: meetingType,
      date: dateISO,
      time_slot: selectedSlot,
      message: form.message || '',
      status: 'pending',
    });

    const body = `Bonjour,\n\nNouvelle réservation sur KleanZ :\n\n📅 Type : ${type?.label} (${type?.duration})\n🗓 Date : ${dateStr} à ${selectedSlot}\n👤 Nom : ${form.name}\n📧 Email : ${form.email}\n📞 Téléphone : ${form.phone || 'Non renseigné'}\n💬 Message : ${form.message || 'Aucun'}\n\nMerci de confirmer ce rendez-vous.`;

    await Promise.all([
      base44.integrations.Core.SendEmail({
        to: form.email,
        subject: `Confirmation de votre rendez-vous KleanZ — ${dateStr} à ${selectedSlot}`,
        body: `Bonjour ${form.name},\n\nVotre ${type?.label} est bien enregistré pour le ${dateStr} à ${selectedSlot}.\n\nL'équipe KleanZ vous confirmera ce créneau dans les plus brefs délais.\n\nÀ bientôt !`,
      }),
      base44.integrations.Core.SendEmail({
        to: 'contact@kleanz.fr',
        subject: `Nouvelle réservation — ${type?.label} · ${dateStr}`,
        body,
      }),
    ]);

    setSending(false);
    setDone(true);
    toast.success('Rendez-vous enregistré ! Confirmation envoyée par email.');
  };

  if (done) {
    return (
      <section id="booking" className="py-28 lg:py-36 bg-secondary overflow-hidden">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="font-heading font-extrabold text-3xl text-foreground mb-3">Rendez-vous confirmé !</h3>
            <p className="text-muted-foreground font-body mb-2">
              Votre {MEETING_TYPES.find(m => m.id === meetingType)?.label} est enregistré pour le{' '}
              <strong>{format(selectedDate, 'EEEE d MMMM', { locale: fr })} à {selectedSlot}</strong>.
            </p>
            <p className="text-muted-foreground font-body text-sm mb-8">Un email de confirmation vous a été envoyé. L'équipe vous recontacte sous 24h pour valider le créneau.</p>
            <button onClick={() => { setDone(false); setStep(0); setMeetingType(null); setSelectedDate(null); setSelectedSlot(null); setForm({ name: '', email: '', phone: '', message: '' }); }}
              className="text-accent font-semibold underline font-body text-sm">
              Prendre un autre rendez-vous
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-28 lg:py-36 bg-secondary overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-accent" />
            <span className="text-accent font-semibold text-sm tracking-widest uppercase font-body">Prise de Rendez-vous</span>
          </div>
          <h2 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
            <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">Réservez votre</span>
            <br />
            <span className="text-accent">créneau en ligne</span>
          </h2>
          <p className="text-muted-foreground text-lg font-body mt-4 max-w-xl">
            Visiter technique sur site ou appel de découverte — choisissez le format qui vous convient et réservez directement en quelques clics.
          </p>
        </motion.div>

        {/* Stepper */}
        <div className="flex items-center gap-2 mb-10">
          {['Type de RDV', 'Date & Heure', 'Confirmation'].map((label, i) => (
            <React.Fragment key={i}>
              <div className={`flex items-center gap-2 ${i <= step ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                  i < step ? 'bg-primary border-primary text-primary-foreground' :
                  i === step ? 'border-primary text-primary bg-background' :
                  'border-border text-muted-foreground bg-background'
                }`}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span className="hidden sm:block text-sm font-medium font-body">{label}</span>
              </div>
              {i < 2 && <div className={`flex-1 h-px transition-all ${i < step ? 'bg-primary' : 'bg-border'}`} />}
            </React.Fragment>
          ))}
        </div>

        <div className="bg-card rounded-3xl border border-border shadow-xl overflow-hidden">
          <AnimatePresence mode="wait">
            {/* STEP 0: Type */}
            {step === 0 && (
              <motion.div key="step0" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }} className="p-8 md:p-12">
                <h3 className="font-heading font-bold text-xl text-foreground mb-2">Quel type de rendez-vous souhaitez-vous ?</h3>
                <p className="text-muted-foreground text-sm font-body mb-8">Choisissez le format le plus adapté à votre besoin.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
                  {MEETING_TYPES.map(m => (
                    <button key={m.id} onClick={() => setMeetingType(m.id)}
                      className={`group text-left p-7 rounded-2xl border-2 transition-all duration-300 ${
                        meetingType === m.id ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10' : 'border-border hover:border-primary/40'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all ${meetingType === m.id ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'}`}>
                        <m.icon className="w-5 h-5" />
                      </div>
                      <h4 className="font-heading font-bold text-lg text-foreground mb-1">{m.label}</h4>
                      <p className="text-muted-foreground text-sm font-body mb-3">{m.desc}</p>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${meetingType === m.id ? 'bg-accent/20 text-accent' : 'bg-secondary text-muted-foreground'}`}>
                        <Clock className="w-3 h-3" /> {m.duration}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="flex justify-end">
                  <button onClick={() => setStep(1)} disabled={!canGoNext0}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full font-semibold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed font-body">
                    Suivant →
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 1: Date & Time */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }} className="p-8 md:p-12">
                <h3 className="font-heading font-bold text-xl text-foreground mb-2">Choisissez une date et un créneau</h3>
                <p className="text-muted-foreground text-sm font-body mb-8">Disponibilités du lundi au vendredi.</p>

                {/* Calendar nav */}
                <div className="flex items-center justify-between mb-4">
                  <button onClick={() => setWeekOffset(w => Math.max(0, w - 1))} disabled={weekOffset === 0}
                    className="p-2 rounded-full hover:bg-secondary disabled:opacity-30 transition-all">
                    <ChevronLeft className="w-5 h-5 text-foreground" />
                  </button>
                  <span className="font-body text-sm text-muted-foreground">
                    {format(visibleDays[0], 'dd MMM', { locale: fr })} – {format(visibleDays[visibleDays.length - 1], 'dd MMM yyyy', { locale: fr })}
                  </span>
                  <button onClick={() => setWeekOffset(w => Math.min(maxWeekOffset, w + 1))} disabled={weekOffset >= maxWeekOffset}
                    className="p-2 rounded-full hover:bg-secondary disabled:opacity-30 transition-all">
                    <ChevronRight className="w-5 h-5 text-foreground" />
                  </button>
                </div>

                {/* Day buttons */}
                <div className="grid grid-cols-5 gap-2 mb-8">
                  {visibleDays.map(day => (
                    <button key={day.toISOString()} onClick={() => { setSelectedDate(day); setSelectedSlot(null); }}
                      className={`flex flex-col items-center py-3 px-2 rounded-xl border-2 transition-all duration-200 ${
                        selectedDate && isSameDay(day, selectedDate)
                          ? 'border-primary bg-primary text-primary-foreground shadow-lg'
                          : 'border-border hover:border-primary/40 text-foreground'
                      }`}
                    >
                      <span className="text-xs font-medium font-body capitalize">{format(day, 'EEE', { locale: fr })}</span>
                      <span className="font-heading font-extrabold text-xl mt-0.5">{format(day, 'd')}</span>
                      <span className="text-xs font-body opacity-70 capitalize">{format(day, 'MMM', { locale: fr })}</span>
                    </button>
                  ))}
                </div>

                {/* Time slots */}
                <AnimatePresence>
                  {selectedDate && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                      <p className="text-sm font-semibold text-foreground font-body mb-3">
                        Créneaux disponibles — {format(selectedDate, 'EEEE d MMMM', { locale: fr })}
                      </p>
                      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                        {availableSlots.map(slot => (
                          <button key={slot} onClick={() => setSelectedSlot(slot)}
                            className={`py-2.5 rounded-xl text-sm font-medium transition-all border ${
                              selectedSlot === slot
                                ? 'bg-accent text-accent-foreground border-accent shadow-lg shadow-accent/20'
                                : 'border-border hover:border-accent/40 text-foreground'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-between mt-10">
                  <button onClick={() => setStep(0)} className="flex items-center gap-1 text-muted-foreground hover:text-foreground text-sm font-body transition-colors">
                    <ChevronLeft className="w-4 h-4" /> Retour
                  </button>
                  <button onClick={() => setStep(2)} disabled={!canGoNext1}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full font-semibold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed font-body">
                    Suivant →
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Confirm */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }} className="p-8 md:p-12">
                <h3 className="font-heading font-bold text-xl text-foreground mb-2">Vos coordonnées</h3>
                <p className="text-muted-foreground text-sm font-body mb-6">Nous vous enverrons une confirmation par email.</p>

                {/* Summary */}
                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 mb-8 flex flex-wrap gap-5">
                  {[
                    { icon: Calendar, label: MEETING_TYPES.find(m => m.id === meetingType)?.label },
                    { icon: Clock, label: selectedDate ? format(selectedDate, 'EEEE d MMMM', { locale: fr }) : '' },
                    { icon: Clock, label: selectedSlot },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <item.icon className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-foreground font-body capitalize">{item.label}</span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground font-body uppercase tracking-wide mb-1.5 block">Nom & Prénom *</label>
                      <input type="text" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Jean Dupont"
                        className="w-full h-11 px-4 rounded-xl border border-border bg-background text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground font-body uppercase tracking-wide mb-1.5 block">Email *</label>
                      <input type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="jean@exemple.fr"
                        className="w-full h-11 px-4 rounded-xl border border-border bg-background text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground font-body uppercase tracking-wide mb-1.5 block">Téléphone</label>
                    <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      placeholder="+33 6 00 00 00 00"
                      className="w-full h-11 px-4 rounded-xl border border-border bg-background text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground font-body uppercase tracking-wide mb-1.5 block">Message (optionnel)</label>
                    <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="Décrivez brièvement votre besoin…"
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none" />
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <button type="button" onClick={() => setStep(1)} className="flex items-center gap-1 text-muted-foreground hover:text-foreground text-sm font-body transition-colors">
                      <ChevronLeft className="w-4 h-4" /> Retour
                    </button>
                    <button type="submit" disabled={sending || !form.name || !form.email}
                      className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 rounded-full font-bold text-sm transition-all disabled:opacity-40 flex items-center gap-2 font-body">
                      {sending ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Envoi…</> : <><CheckCircle className="w-4 h-4" /> Confirmer le rendez-vous</>}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}