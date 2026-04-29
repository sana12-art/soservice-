import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-primary text-primary-foreground overflow-hidden">
      {/* Background values text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none select-none">
        <span className="font-heading font-extrabold text-[12vw] whitespace-nowrap tracking-widest">
          SOSERVICE · QUALITÉ · PROXIMITÉ
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <img
              src="/logo soservice.png"
              alt="SoService"
              className="h-12 w-auto rounded-lg"
            />
            <p className="text-primary-foreground/70 mt-4 leading-relaxed font-body text-sm max-w-xs">
              SoService - Services de qualité à Saint Ouen sur Seine. Nettoyage professionnel Seine-et-Marne 77.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading font-bold text-sm tracking-widest uppercase mb-6 text-primary-foreground/60">
              Navigation
            </h4>
            <div className="space-y-3">
              {['Accueil', 'Notre Histoire', 'Services', 'Rendez-vous', 'Blog', 'Contact'].map(link => (
                <a
                  key={link}
                  href={link === 'Blog' ? '/blog' : link === 'Notre Histoire' ? '/notre-histoire' : link === 'Nos Valeurs' ? '/nos-valeurs' : `#${link === 'Accueil' ? 'hero' : link === 'Nos Clients' ? 'clients' : link.toLowerCase()}`}
                  className="block text-primary-foreground/70 hover:text-accent transition-colors text-sm font-body"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Values */}
          <div>
              <h4 className="font-heading font-bold text-sm tracking-widest uppercase mb-6 text-primary-foreground/60">
              Contact
            </h4>
            <div className="space-y-3">
              <a href="https://wa.me/33786121538" className="group flex items-center gap-2 text-xs hover:text-accent transition-colors">
                <Phone className="w-4 h-4 text-primary-foreground/70 group-hover:text-accent" />
                <span className="text-primary-foreground/70 font-body group-hover:text-accent">07 86 12 15 38</span>
              </a>
              <div className="flex items-center gap-2 text-xs">
                <Mail className="w-4 h-4 text-primary-foreground/70" />
                <span className="text-primary-foreground/70 font-body">soservice88@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <MapPin className="w-4 h-4 text-primary-foreground/70" />
                <span className="text-primary-foreground/70 font-body">9 Avenue Michelet, 93400 Saint Ouen sur Seine</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/50 text-sm font-body">
            © {new Date().getFullYear()} SoService. Tous droits réservés.
          </p>
        
        </div>
      </div>
    </footer>
  );
}