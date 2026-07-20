import React, { useEffect, useRef, useState } from 'react';
import Logo from './ui/Logo';
import GradientButton from './ui/GradientButton';

const NAV_LINKS = [
  { label: 'Features', href: '#intro' },
  { label: 'Notifications', href: '#notifications' },
  { label: 'Digital Bills', href: '#digital-bills' },
  { label: 'Family Access', href: '#family-access' },
  { label: 'Security', href: '#secure' },
  { label: 'Contact', href: '#contact' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section detection
  useEffect(() => {
    const sections = document.querySelectorAll('[data-section]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        ref={navRef}
        id="navbar"
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(255,255,255,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,191,165,0.12)' : 'none',
          boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.06)' : 'none',
        }}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <a
            href="#intro"
            onClick={(e) => { e.preventDefault(); handleNavClick('#intro'); }}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-lg"
            aria-label="GET MORE — Back to top"
          >
            <Logo variant={scrolled ? 'gradient' : 'white'} size="md" />
          </a>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = activeSection === href.slice(1);
              return (
                <a
                  key={label}
                  href={href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                  className="relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                  style={{
                    color: scrolled
                      ? (isActive ? 'var(--gm-teal)' : 'var(--gm-text-2)')
                      : 'rgba(255,255,255,0.9)',
                  }}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                      style={{ background: 'var(--gm-teal)' }}
                      aria-hidden="true"
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <GradientButton
              href="https://play.google.com/store"
              variant="primary"
              size="sm"
              id="nav-download-btn"
              className="hidden md:inline-flex"
            >
              Download App
            </GradientButton>

            {/* Hamburger */}
            <button
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={mobileOpen}
              style={{ color: scrolled ? 'var(--gm-text)' : 'white' }}
            >
              <span
                className="w-5 h-0.5 rounded-full bg-current transition-all duration-200"
                style={{ transform: mobileOpen ? 'translateY(7px) rotate(45deg)' : 'none' }}
              />
              <span
                className="w-5 h-0.5 rounded-full bg-current transition-all duration-200"
                style={{ opacity: mobileOpen ? 0 : 1 }}
              />
              <span
                className="w-5 h-0.5 rounded-full bg-current transition-all duration-200"
                style={{ transform: mobileOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className="lg:hidden fixed inset-0 z-40 transition-all duration-300"
        style={{
          pointerEvents: mobileOpen ? 'auto' : 'none',
        }}
        aria-hidden={!mobileOpen}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 transition-opacity duration-300"
          style={{ opacity: mobileOpen ? 1 : 0 }}
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer panel */}
        <div
          className="absolute top-0 right-0 w-72 h-full bg-white shadow-2xl flex flex-col transition-transform duration-300"
          style={{ transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)' }}
          role="dialog"
          aria-label="Navigation menu"
        >
          {/* Drawer header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <Logo variant="gradient" size="sm" />
            <button
              className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {/* Links */}
          <nav className="flex-1 p-4 space-y-1">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 font-medium hover:bg-teal-50 hover:text-teal-700 transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Drawer CTA */}
          <div className="p-6 border-t border-gray-100 space-y-3">
            <GradientButton href="https://play.google.com/store" variant="android" size="md" className="w-full justify-center">
              Download for Android
            </GradientButton>
            <GradientButton href="https://apps.apple.com" variant="ios" size="md" className="w-full justify-center">
              Download on iOS
            </GradientButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
