import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// logo import removed - use public URL
const logo = '/logo%20soservice.png';

const navLinks = [
  { label: 'Accueil', href: '#hero' },
  {
    label: 'À propos de nous',
    dropdown: [
      { label: 'Notre histoire', href: '#histoire' },
      { label: 'Nos Clients', href: '#clients' },
    ],
  },
  { label: 'Services', href: '#services' },
  { label: 'Rendez-vous', href: '#booking' },
  { label: 'Blog', href: '/blog', isLink: true },
  { label: 'Contact', href: '#contact' },
];


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
scrolled ? 'bg-slate-800/90 backdrop-blur-xl shadow-2xl border-b border-slate-700' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-20">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <SoserviceLogo dark={scrolled} />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <div key={index} className="relative group">

                <a
                  href={link.href || "#"}
className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:text-accent text-white`}

                >
                  {link.label}
                </a>

                {/* Dropdown */}
                {link.dropdown && (
                  <div className="absolute top-full left-0 mt-3 w-52 bg-white rounded-xl shadow-lg opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300">
                    {link.dropdown.map((item, i) => (
                      <a
                        key={i}
                        href={item.href}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}

              </div>
            ))}

            <a
              href="#contact"
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-lg"
            >
              Devis Gratuit
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(true)}
className={`lg:hidden p-2 text-white`}

          >
            <Menu className="w-6 h-6" />
          </button>

        </div>
      </nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-primary/95 backdrop-blur-2xl flex flex-col items-center justify-center"
          >

            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-6 right-6 text-white p-2"
            >
              <X className="w-7 h-7" />
            </button>

            <div className="flex flex-col items-center gap-6">

              {navLinks.map((link, i) => (
                <div key={i} className="flex flex-col items-center">

                  {/* Lien principal */}
                  <motion.a
                    href={link.href || "#"}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: i * 0.07 } }}
                    className="text-white text-2xl font-bold"
                  >
                    {link.label}
                  </motion.a>

                  {/* Dropdown mobile */}
                  {link.dropdown && (
                    <div className="mt-2 flex flex-col gap-2">
                      {link.dropdown.map((item, j) => (
                        <a
                          key={j}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="text-gray-300 text-lg"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  )}

                </div>
              ))}

              <motion.a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-4 bg-accent text-accent-foreground px-8 py-3 rounded-full text-lg font-bold"
              >
                Devis Gratuit
              </motion.a>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function SoserviceLogo({ dark }) {
  return (
    <img
      src={logo}
      alt="soservice"
      className={`h-20 w-auto transition ${dark ? 'drop-shadow-lg' : ''}`}
    />
  );
}
