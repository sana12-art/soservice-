import React from 'react';
import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import StorySection from '../components/landing/StorySection';
import HowItWorksSection from '../components/landing/HowItWorksSection';
import ServicesSection from '../components/landing/ServicesSection';
import WhyUsSection from '../components/landing/WhyUsSection';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import BookingSection from '../components/landing/BookingSection';
import ClientsSection from '../components/landing/ClientsSection';
import ContactSection from '../components/landing/ContactSection';
import Footer from '../components/landing/Footer';
import WhatsAppButton from '../components/landing/WhatsAppButton';

const IMAGES = {
  hero: '/src/assets/2.jpeg',
  desk: 'https://media.base44.com/images/public/69e63cfe37163cac729de2ea/6f4700767_WhatsAppImage2026-04-09at1549551.jpg',
  living: 'https://media.base44.com/images/public/69e63cfe37163cac729de2ea/f849825c2_WhatsAppImage2026-04-09at1549552.jpg',
  conference: 'https://media.base44.com/images/public/69e63cfe37163cac729de2ea/c8e32bc21_WhatsAppImage2026-04-09at1549553.jpg',
  bathroom: 'https://media.base44.com/images/public/69e63cfe37163cac729de2ea/728961c77_WhatsAppImage2026-04-09at154955.jpg',
  team: 'https://media.base44.com/images/public/69e63cfe37163cac729de2ea/9a1ddb3e7_rocket_gen_img_173e30a36-1767018661005.png',
  equipment: 'https://media.base44.com/images/public/69e63cfe37163cac729de2ea/f46cdd92b_rocket_gen_img_19676fb3c-1764663983156.png',
  specialist: 'https://media.base44.com/images/public/69e63cfe37163cac729de2ea/1c67bc4af_rocket_gen_img_182721e97-1768388583120.png',
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
  <HeroSection />
      <StorySection />
      <HowItWorksSection />
      <ServicesSection images={{ desk: IMAGES.desk, living: IMAGES.living, conference: IMAGES.conference, bathroom: IMAGES.bathroom, team: IMAGES.team, equipment: IMAGES.equipment, specialist: IMAGES.specialist }} />
      <WhyUsSection />
      <BookingSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
