import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldNotifIcon, PhoneNotifIcon } from '../ui/NotificationCard';

gsap.registerPlugin(ScrollTrigger);

interface Device {
  id: string;
  label: string;
  abbrev: string;
  color: string;
  status: 'connected' | 'blocked';
  lastActive: string;
}

const DEVICES: Device[] = [
  { id: 'mother',      label: "Mother's Phone",      abbrev: 'M', color: '#00BFA5', status: 'connected', lastActive: 'Active now' },
  { id: 'father',      label: "Father's Phone",       abbrev: 'F', color: '#0288D1', status: 'connected', lastActive: '2 min ago' },
  { id: 'grandmother', label: "Grandmother's Phone",  abbrev: 'G', color: '#1565C0', status: 'connected', lastActive: '15 min ago' },
  { id: 'unknown',     label: 'Unknown Device',       abbrev: '?', color: '#ef4444', status: 'blocked',   lastActive: 'Blocked' },
];

const SecureSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const shieldRef = useRef<HTMLDivElement>(null);
  const unknownRef = useRef<HTMLDivElement>(null);
  const [unknownBlocked, setUnknownBlocked] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
        }
      );

      gsap.fromTo(shieldRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1, scale: 1, duration: 0.9, ease: 'back.out(1.3)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', toggleActions: 'play none none reverse' },
        }
      );

      // Unknown device appears then gets blocked
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
          toggleActions: 'play none none none',
        },
      });

      tl.fromTo(unknownRef.current,
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out', delay: 1.5 }
      ).to(unknownRef.current, {
        x: -20, opacity: 0, duration: 0.4, ease: 'power2.in', delay: 1.5,
        onComplete: () => setUnknownBlocked(true),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="secure"
      data-section
      className="gm-section"
      style={{ background: 'linear-gradient(135deg, #F7F9FA 0%, #EFF6FF 100%)', minHeight: '100vh' }}
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute rounded-full" style={{
          width: 700, height: 700,
          background: 'radial-gradient(circle, rgba(21,101,192,0.06) 0%, transparent 70%)',
          top: '-200px', right: '-200px',
        }} />
        <div className="absolute" style={{
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(0,191,165,0.06) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-12 py-20 md:py-28 flex flex-col lg:flex-row items-center gap-16">
        {/* Left: Security shield diagram */}
        <div className="lg:w-1/2 flex justify-center items-center">
          <div ref={shieldRef} className="relative animate-shield-glow" style={{ width: 340, height: 380 }}>
            {/* Shield SVG */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 340 380"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="shield-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00BFA5" stopOpacity="0.2"/>
                  <stop offset="100%" stopColor="#1565C0" stopOpacity="0.15"/>
                </linearGradient>
                <linearGradient id="shield-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00BFA5"/>
                  <stop offset="100%" stopColor="#1565C0"/>
                </linearGradient>
              </defs>
              <path
                d="M170 20 L310 75 L310 190 C310 270 170 340 170 340 C170 340 30 270 30 190 L30 75 Z"
                fill="url(#shield-grad)"
                stroke="url(#shield-stroke)"
                strokeWidth="2"
              />
              {/* Inner glow */}
              <path
                d="M170 45 L285 90 L285 190 C285 255 170 315 170 315 C170 315 55 255 55 190 L55 90 Z"
                fill="rgba(0,191,165,0.05)"
                stroke="rgba(0,191,165,0.2)"
                strokeWidth="1"
              />
            </svg>

            {/* Child profile center */}
            <div
              className="absolute"
              style={{
                width: 64, height: 64,
                background: 'linear-gradient(135deg, #00BFA5, #1565C0)',
                borderRadius: '50%',
                top: '45%', left: '50%',
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 0 0 8px rgba(0,191,165,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 5,
              }}
            >
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
              </svg>
            </div>

            {/* Connected devices inside shield */}
            {DEVICES.filter(d => d.status === 'connected').map((device, i) => {
              const positions = [
                { top: '22%', left: '18%' },
                { top: '22%', left: '62%' },
                { top: '68%', left: '40%' },
              ];
              const pos = positions[i];
              return (
                <div
                  key={device.id}
                  className="absolute flex flex-col items-center gap-1"
                  style={{ top: pos.top, left: pos.left, transform: 'translate(-50%, -50%)', zIndex: 4 }}
                >
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center text-white text-sm font-bold shadow-md border-2 border-white"
                    style={{ background: `linear-gradient(135deg, ${device.color}, ${device.color}AA)` }}
                  >
                    {device.abbrev}
                  </div>
                  <span className="text-[9px] font-medium text-gray-600 bg-white/90 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                    {device.label.split("'")[0]}
                  </span>
                  {/* Online dot */}
                  <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
                </div>
              );
            })}

            {/* Unknown device (outside shield, blocked) */}
            {!unknownBlocked && (
              <div
                ref={unknownRef}
                className="absolute flex flex-col items-center gap-1"
                style={{ top: '30%', right: '-10%', zIndex: 6, opacity: 0 }}
              >
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center text-white text-sm font-bold shadow-lg border-2 border-red-200"
                  style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}
                >
                  ?
                </div>
                <span className="text-[9px] font-medium text-red-500 bg-red-50 px-1.5 py-0.5 rounded-full whitespace-nowrap border border-red-200">
                  Unknown
                </span>
              </div>
            )}

            {/* Blocked badge */}
            {unknownBlocked && (
              <div
                className="absolute flex items-center gap-2 px-3 py-2 rounded-xl"
                style={{ top: '30%', right: '-20%', background: '#fee2e2', border: '1px solid #fca5a5' }}
              >
                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
                </svg>
                <span className="text-xs font-semibold text-red-600">Blocked</span>
              </div>
            )}

            {/* Lock icon at bottom of shield */}
            <div
              className="absolute"
              style={{ bottom: '8%', left: '50%', transform: 'translateX(-50%)', zIndex: 5 }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #00BFA5, #1565C0)', boxShadow: '0 4px 16px rgba(0,191,165,0.4)' }}
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Text */}
        <div ref={contentRef} className="lg:w-1/2 space-y-7">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold"
            style={{ background: 'rgba(21,101,192,0.1)', color: '#1565C0', border: '1px solid rgba(21,101,192,0.2)' }}>
            <ShieldNotifIcon />
            <span>Privacy &amp; Security</span>
          </div>

          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800 }} className="text-4xl md:text-5xl text-gray-900 leading-tight">
            Secure, Transparent{' '}
            <span className="gm-gradient-text">and Under Your Control</span>
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            See exactly who is connected to your child's profile, which devices are receiving notifications,
            and how many devices currently have access. Review connections and remove unauthorised devices at any time.
          </p>

          {/* Device list */}
          <div className="space-y-3">
            {DEVICES.map((device) => (
              <div
                key={device.id}
                className="flex items-center gap-3 p-3.5 rounded-2xl border transition-all"
                style={{
                  borderColor: device.status === 'blocked' ? '#fca5a5' : 'var(--gm-border)',
                  background: device.status === 'blocked' ? '#fff5f5' : 'white',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                  style={{ background: device.status === 'blocked' ? '#ef4444' : `linear-gradient(135deg, ${device.color}, ${device.color}AA)` }}
                >
                  <PhoneNotifIcon />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-800 truncate">{device.label}</div>
                  <div className="text-xs text-gray-400">{device.lastActive}</div>
                </div>
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{
                    background: device.status === 'blocked' ? '#fee2e2' : '#dcfce7',
                    color: device.status === 'blocked' ? '#ef4444' : '#16a34a',
                  }}
                >
                  {device.status === 'blocked' ? '✕ Blocked' : '✓ Active'}
                </span>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-500 italic">
            Tap any device to remove access instantly — you're always in control.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SecureSection;
