import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GradientButton from '../ui/GradientButton';
import Logo from '../ui/Logo';

gsap.registerPlugin(ScrollTrigger);

// Sri Lanka map dots — approximate positions as % of SVG viewBox
const SL_DOTS = [
  { id: 'colombo',      cx: 62,  cy: 145, label: 'Colombo',       delay: 0 },
  { id: 'kandy',        cx: 95,  cy: 110, label: 'Kandy',          delay: 0.2 },
  { id: 'galle',        cx: 70,  cy: 185, label: 'Galle',          delay: 0.4 },
  { id: 'jaffna',       cx: 95,  cy: 20,  label: 'Jaffna',         delay: 0.6 },
  { id: 'matara',       cx: 80,  cy: 195, label: 'Matara',         delay: 0.8 },
  { id: 'trincomalee',  cx: 135, cy: 60,  label: 'Trincomalee',    delay: 1.0 },
  { id: 'kurunegala',   cx: 78,  cy: 90,  label: 'Kurunegala',     delay: 1.2 },
  { id: 'negombo',      cx: 56,  cy: 120, label: 'Negombo',        delay: 1.4 },
  { id: 'ratnapura',    cx: 82,  cy: 160, label: 'Ratnapura',      delay: 1.6 },
  { id: 'badulla',      cx: 115, cy: 140, label: 'Badulla',        delay: 1.8 },
  { id: 'batticaloa',   cx: 145, cy: 115, label: 'Batticaloa',     delay: 2.0 },
  { id: 'anuradhapura', cx: 98,  cy: 55,  label: 'Anuradhapura',   delay: 2.2 },
];

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
        }
      );

      // Animate map dots
      if (mapRef.current) {
        const dots = mapRef.current.querySelectorAll('.sl-dot');
        gsap.fromTo(dots,
          { scale: 0, transformOrigin: 'center' },
          {
            scale: 1, duration: 0.4, ease: 'back.out(2)', stagger: 0.15,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', toggleActions: 'play none none none' },
          }
        );
        // Animate lines
        const lines = mapRef.current.querySelectorAll('.sl-line');
        gsap.fromTo(lines,
          { strokeDashoffset: 200 },
          {
            strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut', stagger: 0.1,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 55%', toggleActions: 'play none none none' },
            delay: 0.5,
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      data-section
      className="gm-section"
      style={{
        background: 'linear-gradient(135deg, #00BFA5 0%, #0288D1 45%, #1565C0 80%, #0D47A1 100%)',
        minHeight: '100vh',
      }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div className="absolute rounded-full" style={{
          width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(0,229,255,0.15) 0%, transparent 70%)',
          top: '-200px', right: '-100px',
        }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-12 py-20 md:py-28 flex flex-col lg:flex-row items-center gap-12">
        {/* Left: Sri Lanka Map with glowing dots */}
        <div className="lg:w-5/12 flex justify-center">
          <div className="relative" style={{ width: 260, height: 320 }}>
            <svg
              ref={mapRef}
              viewBox="0 0 200 220"
              className="w-full h-full"
              aria-label="Map of Sri Lanka showing GET MORE coverage"
            >
              <defs>
                <linearGradient id="map-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.25)"/>
                  <stop offset="100%" stopColor="rgba(255,255,255,0.10)"/>
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>

              {/* Sri Lanka outline (simplified) */}
              <path
                d="M90 15 Q115 12 135 30 Q160 50 165 80 Q168 110 155 140 Q145 165 130 185 Q110 205 90 210 Q70 208 58 190 Q42 168 38 140 Q30 110 35 80 Q42 50 60 30 Q72 18 90 15Z"
                fill="url(#map-grad)"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.5"
              />

              {/* Connection lines to center (Colombo) */}
              {SL_DOTS.filter(d => d.id !== 'colombo').map(dot => (
                <line
                  key={`line-${dot.id}`}
                  className="sl-line"
                  x1={62} y1={145}
                  x2={dot.cx} y2={dot.cy}
                  stroke="rgba(0,229,255,0.4)"
                  strokeWidth="0.8"
                  strokeDasharray="200"
                  strokeDashoffset="200"
                />
              ))}

              {/* City dots */}
              {SL_DOTS.map((dot) => (
                <g key={dot.id} className="sl-dot" filter="url(#glow)">
                  {/* Outer pulse ring */}
                  <circle
                    cx={dot.cx} cy={dot.cy} r="8"
                    fill="rgba(0,229,255,0.15)"
                    style={{ animation: `map-dot-pulse 2s ease-in-out ${dot.delay}s infinite` }}
                  />
                  {/* Main dot */}
                  <circle
                    cx={dot.cx} cy={dot.cy} r="4"
                    fill={dot.id === 'colombo' ? '#00E5FF' : 'rgba(0,229,255,0.8)'}
                    stroke="white"
                    strokeWidth="1"
                  />
                  {/* School icon inside large dots */}
                  {dot.id === 'colombo' && (
                    <>
                      <circle cx={dot.cx} cy={dot.cy} r="8" fill="rgba(0,229,255,0.3)" stroke="#00E5FF" strokeWidth="1.5"/>
                      <circle cx={dot.cx} cy={dot.cy} r="4" fill="#00E5FF"/>
                    </>
                  )}
                </g>
              ))}
            </svg>

            {/* GET MORE phone overlay on map */}
            <div
              className="absolute"
              style={{
                bottom: '0%', right: '-20%',
                width: 80, height: 140,
                background: 'linear-gradient(145deg, #1a1a2e, #16213e)',
                borderRadius: 18,
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: 5,
              }}
            >
              <div style={{ background: 'linear-gradient(160deg, #00BFA5, #1565C0)', borderRadius: 13, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                <div style={{ width: 28, height: 28, background: 'rgba(255,255,255,0.2)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </div>
                <span className="text-white text-[8px] font-bold">GET MORE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: CTA content */}
        <div ref={contentRef} className="lg:w-7/12 space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold"
            style={{ background: 'rgba(255,255,255,0.18)', color: 'white', border: '1px solid rgba(255,255,255,0.25)' }}>
            <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
            Connecting Schools &amp; Families
          </div>

          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800 }} className="text-4xl md:text-5xl text-white leading-tight">
            Ready to Join{' '}
            <span className="text-cyan-200">GET MORE?</span>
          </h2>

          <p className="text-lg text-white/80 leading-relaxed">
            Bring your school, tuition class or educational institute closer to parents. Call or
            message us today, and our team will guide you through the complete setup.
          </p>

          {/* Phone number */}
          <div className="flex justify-center lg:justify-start">
            <a
              href="tel:+94767446265"
              className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-200 hover:scale-105"
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.3)',
                backdropFilter: 'blur(12px)',
              }}
              aria-label="Call GET MORE: 076 744 6265"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)' }}>
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </div>
              <div>
                <div className="text-xs text-white/60 font-medium">Call us now</div>
                <div className="text-2xl font-bold text-white tracking-wide">076 744 6265</div>
              </div>
            </a>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            <GradientButton href="tel:+94767446265" variant="secondary" size="lg" id="contact-call-btn"
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>}
            >
              Call Us Now
            </GradientButton>
            <GradientButton href="https://wa.me/94767446265" variant="secondary" size="lg" id="contact-whatsapp-btn"
              icon={<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>}
            >
              Send a Message
            </GradientButton>
            <GradientButton href="tel:+94767446265" variant="primary" size="lg" id="contact-join-btn"
              className="border border-white/30"
            >
              Join GET MORE ↗
            </GradientButton>
          </div>

          {/* Download reminder */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <GradientButton href="https://play.google.com/store" variant="android" size="md" id="contact-android-btn"
              className="bg-white/10 border border-white/25 text-white hover:bg-white/20">
              Download for Android
            </GradientButton>
            <GradientButton href="https://apps.apple.com" variant="ios" size="md" id="contact-ios-btn">
              Download on iOS
            </GradientButton>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 border-t border-white/10 mt-8">
        <div className="max-w-7xl mx-auto px-5 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo variant="white" size="sm" />
          <p className="text-white/50 text-sm text-center">
            © {new Date().getFullYear()} GET MORE. All rights reserved. Free for parents.
          </p>
          <p className="text-white/50 text-sm">Sri Lanka</p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
