import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FamilyMember {
  id: string;
  label: string;
  abbrev: string;
  color: string;
  angle: number;
}

const FAMILY: FamilyMember[] = [
  { id: 'mother',      label: 'Mother',      abbrev: 'M', color: '#00BFA5', angle: -90 },
  { id: 'father',      label: 'Father',      abbrev: 'F', color: '#0288D1', angle: 0 },
  { id: 'grandmother', label: 'Grandmother', abbrev: 'G', color: '#1565C0', angle: 90 },
  { id: 'grandfather', label: 'Grandfather', abbrev: 'Gf', color: '#006064', angle: 180 },
];

const RADIUS = 130;

const FamilyAccessSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const memberRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content entrance
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
        }
      );

      // Diagram entrance + stagger member nodes
      gsap.fromTo(diagramRef.current,
        { opacity: 0, scale: 0.7 },
        {
          opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.3)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', toggleActions: 'play none none reverse' },
        }
      );

      // Members connect one by one
      memberRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { opacity: 0, scale: 0 },
          {
            opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 55%',
              toggleActions: 'play none none reverse',
            },
            delay: i * 0.2,
          }
        );
      });

      // SVG link lines draw
      if (svgRef.current) {
        const lines = svgRef.current.querySelectorAll('.connect-line');
        gsap.fromTo(lines,
          { strokeDashoffset: 200 },
          {
            strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut', stagger: 0.2,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 55%', toggleActions: 'play none none none' },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Compute positions
  const cx = 180, cy = 180;
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  return (
    <section
      ref={sectionRef}
      id="family-access"
      data-section
      className="gm-section"
      style={{ background: 'linear-gradient(135deg, #F7F9FA 0%, #E0F7FA 100%)', minHeight: '100vh' }}
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute rounded-full animate-float-slow" style={{
          width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(0,191,165,0.08) 0%, transparent 70%)',
          top: '-100px', left: '-100px',
        }} />
        <div className="absolute rounded-full animate-float-reverse" style={{
          width: 400, height: 400,
          background: 'radial-gradient(circle, rgba(21,101,192,0.06) 0%, transparent 70%)',
          bottom: '-80px', right: '-80px',
        }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-12 py-20 md:py-28 flex flex-col lg:flex-row items-center gap-16">
        {/* Left: Text */}
        <div ref={contentRef} className="lg:w-1/2 space-y-7">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold"
            style={{ background: 'rgba(0,191,165,0.1)', color: 'var(--gm-teal)', border: '1px solid rgba(0,191,165,0.2)' }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <span>Family Access</span>
          </div>

          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800 }} className="text-4xl md:text-5xl text-gray-900 leading-tight">
            One Child.{' '}
            <span className="gm-gradient-text">The Whole Family</span>{' '}
            Connected.
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            No additional SMS charges — ever. Mothers, fathers, grandparents and other trusted guardians
            can each link themselves to a child's profile in seconds, and every one of them receives
            the same school and tuition updates on their own phone.
          </p>

          <p className="text-base font-semibold italic" style={{ color: 'var(--gm-teal)' }}>
            Managing your family's education has never been easier.
          </p>

          {/* Benefits */}
          <div className="space-y-3">
            {[
              'No SMS charges — ever, for any family member',
              'Each guardian gets updates on their own device',
              'Link or unlink guardians anytime',
              'Works across Android and iOS devices',
            ].map((benefit, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'linear-gradient(135deg, #00BFA5, #1565C0)' }}>
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Family connection diagram */}
        <div className="lg:w-1/2 flex justify-center items-center">
          <div ref={diagramRef} className="relative" style={{ width: 360, height: 360 }}>
            {/* SVG connection lines */}
            <svg
              ref={svgRef}
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 360 360"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="link-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00BFA5" />
                  <stop offset="100%" stopColor="#1565C0" />
                </linearGradient>
              </defs>
              {FAMILY.map((member) => {
                const angle = toRad(member.angle);
                const x2 = cx + RADIUS * Math.cos(angle);
                const y2 = cy + RADIUS * Math.sin(angle);
                return (
                  <line
                    key={member.id}
                    className="connect-line"
                    x1={cx} y1={cy}
                    x2={x2} y2={y2}
                    stroke="url(#link-grad)"
                    strokeWidth="2.5"
                    strokeDasharray="200"
                    strokeDashoffset="200"
                    opacity="0.6"
                  />
                );
              })}
            </svg>

            {/* Child center node */}
            <div
              className="absolute flex flex-col items-center justify-center animate-glow-pulse"
              style={{
                width: 90, height: 90,
                background: 'linear-gradient(135deg, #00BFA5, #1565C0)',
                borderRadius: '50%',
                top: cy - 45, left: cx - 45,
                boxShadow: '0 0 0 12px rgba(0,191,165,0.15)',
                zIndex: 5,
              }}
              aria-label="Child's profile at center"
            >
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
              </svg>
              <span className="text-white text-[10px] font-bold mt-0.5">Child</span>
            </div>

            {/* Family member nodes */}
            {FAMILY.map((member, i) => {
              const angle = toRad(member.angle);
              const x = cx + RADIUS * Math.cos(angle);
              const y = cy + RADIUS * Math.sin(angle);
              return (
                <div
                  key={member.id}
                  ref={(el) => { memberRefs.current[i] = el; }}
                  className="absolute flex flex-col items-center gap-1"
                  style={{
                    transform: 'translate(-50%, -50%)',
                    top: y, left: x,
                    zIndex: 4,
                  }}
                >
                  {/* Avatar */}
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-sm border-2 border-white shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${member.color}, ${member.color}CC)` }}
                  >
                    {member.abbrev}
                  </div>
                  {/* Label */}
                  <span className="text-xs font-semibold text-gray-700 bg-white px-2 py-0.5 rounded-full shadow-sm border border-gray-100">
                    {member.label}
                  </span>
                  {/* Connected badge */}
                  <span
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center"
                    style={{ background: '#22c55e', fontSize: 8 }}
                    aria-label={`${member.label} connected`}
                  >
                    <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                  </span>
                </div>
              );
            })}

            {/* Pulse rings on center */}
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="absolute rounded-full border-2 border-teal-400/30"
                style={{
                  width: 90 + i * 30, height: 90 + i * 30,
                  top: cy - 45 - i * 15, left: cx - 45 - i * 15,
                  animation: `pulse-ring ${2 + i * 0.5}s ease-out ${i * 0.4}s infinite`,
                }}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FamilyAccessSection;
