import React from 'react';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import HeroSection from './components/sections/HeroSection';
import NotificationsSection from './components/sections/NotificationsSection';
import DigitalBillsSection from './components/sections/DigitalBillsSection';
import FamilyAccessSection from './components/sections/FamilyAccessSection';
import MultiChildSection from './components/sections/MultiChildSection';
import SecureSection from './components/sections/SecureSection';
import ContactSection from './components/sections/ContactSection';

export default function App() {
  return (
    <div className="relative">
      <ScrollProgress />
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <NotificationsSection />
        <DigitalBillsSection />
        <FamilyAccessSection />
        <MultiChildSection />
        <SecureSection />
        <ContactSection />
      </main>
      <FloatingWhatsApp />
    </div>
  );
}
