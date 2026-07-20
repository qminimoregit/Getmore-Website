import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CHILDREN = [
  {
    name: 'Amal',
    school: 'Royal College',
    grade: 'Grade 9',
    color: '#00BFA5',
    abbrev: 'A',
    notifCount: 3,
    subjects: ['Maths', 'Science', 'English'],
  },
  {
    name: 'Nimal',
    school: 'Nalanda College',
    grade: 'Grade 6',
    color: '#0288D1',
    abbrev: 'N',
    notifCount: 1,
    subjects: ['Sinhala', 'History', 'Maths'],
  },
  {
    name: 'Sandali',
    school: 'Visakha Vidyalaya',
    grade: 'Grade 11',
    color: '#1565C0',
    abbrev: 'S',
    notifCount: 5,
    subjects: ['Commerce', 'Accounting', 'Econ'],
  },
];

const MultiChildSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
        }
      );
      gsap.fromTo(cardsRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-cycle through children
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % CHILDREN.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const active = CHILDREN[activeIdx];

  return (
    <section
      ref={sectionRef}
      id="multiple-children"
      data-section
      className="gm-section"
      style={{ background: 'white', minHeight: '100vh' }}
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute" style={{
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,191,165,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,191,165,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />
        <div className="absolute rounded-full" style={{
          width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(0,191,165,0.06) 0%, transparent 70%)',
          top: '-100px', right: '-150px',
        }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-12 py-20 md:py-28 flex flex-col lg:flex-row items-center gap-16">
        {/* Left: Card stack */}
        <div ref={cardsRef} className="lg:w-1/2 flex justify-center items-center">
          <div className="relative" style={{ width: 320, height: 420 }}>
            {/* Stacked background cards */}
            {CHILDREN.map((child, i) => {
              const isActive = i === activeIdx;
              const offset = (i - activeIdx + CHILDREN.length) % CHILDREN.length;
              return (
                <div
                  key={child.name}
                  className="absolute w-full cursor-pointer transition-all duration-500"
                  style={{
                    height: 360,
                    borderRadius: 24,
                    background: `linear-gradient(135deg, ${child.color}22, ${child.color}11)`,
                    border: `1.5px solid ${child.color}33`,
                    boxShadow: isActive ? `0 20px 60px ${child.color}33` : `0 8px 24px rgba(0,0,0,0.08)`,
                    transform: isActive
                      ? 'translateY(0) scale(1) perspective(1000px) rotateY(0deg)'
                      : `translateY(${offset * 20}px) scale(${1 - offset * 0.04}) perspective(1000px) rotateY(${offset * 5}deg)`,
                    zIndex: isActive ? 3 : 3 - offset,
                    padding: '28px 24px',
                  }}
                  onClick={() => setActiveIdx(i)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${child.name}'s profile`}
                  onKeyDown={(e) => e.key === 'Enter' && setActiveIdx(i)}
                >
                  {/* Card header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-md"
                      style={{ background: `linear-gradient(135deg, ${child.color}, ${child.color}AA)` }}
                    >
                      {child.abbrev}
                    </div>
                    <div>
                      <div className="font-bold text-lg text-gray-900">{child.name}</div>
                      <div className="text-sm text-gray-500">{child.grade}</div>
                    </div>
                    {child.notifCount > 0 && (
                      <div
                        className="ml-auto w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        style={{ background: child.color }}
                      >
                        {child.notifCount}
                      </div>
                    )}
                  </div>

                  {/* School badge */}
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl mb-4"
                    style={{ background: `${child.color}15`, border: `1px solid ${child.color}25` }}>
                    <svg className="w-4 h-4" fill="none" stroke={child.color} strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                    </svg>
                    <span className="text-sm font-medium" style={{ color: child.color }}>{child.school}</span>
                  </div>

                  {/* Subject chips */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {child.subjects.map(s => (
                      <span key={s} className="px-2.5 py-1 rounded-full text-xs font-medium bg-white border"
                        style={{ borderColor: `${child.color}33`, color: child.color }}>
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Notification preview */}
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Recent</div>
                    {['School notice updated', 'Tuition class at 4 PM'].map((msg, j) => (
                      <div key={j} className="bg-white/70 rounded-xl px-3 py-2 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: child.color }} />
                        <span className="text-xs text-gray-600 truncate">{msg}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Selector dots */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
              {CHILDREN.map((_, i) => (
                <button
                  key={i}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === activeIdx ? 20 : 8,
                    height: 8,
                    background: i === activeIdx ? active.color : '#d1d5db',
                  }}
                  onClick={() => setActiveIdx(i)}
                  aria-label={`View child ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right: Text */}
        <div ref={contentRef} className="lg:w-1/2 space-y-7">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold"
            style={{ background: 'rgba(0,191,165,0.1)', color: 'var(--gm-teal)', border: '1px solid rgba(0,191,165,0.2)' }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
            <span>Multiple Children</span>
          </div>

          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800 }} className="text-4xl md:text-5xl text-gray-900 leading-tight">
            More Than One Child?{' '}
            <span className="gm-gradient-text">No Problem.</span>
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            Manage all of your children from a single GET MORE account. Switch between each
            child's school, tuition classes, notifications, reminders and payment records —
            without juggling multiple apps.
          </p>

          {/* Feature list */}
          <div className="space-y-4">
            {[
              { title: 'One Account', desc: "All children under a single login — no need for separate accounts", color: '#00BFA5' },
              { title: 'Easy Switching', desc: "Tap a profile to instantly switch and see that child's updates", color: '#0288D1' },
              { title: 'Separate Records', desc: "Each child's school, tuition and receipts stay organized separately", color: '#1565C0' },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${item.color}15` }}>
                  <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{item.title}</div>
                  <div className="text-sm text-gray-500">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Active child highlight */}
          <div
            className="p-4 rounded-2xl border-l-4 transition-all duration-500"
            style={{ background: `${active.color}0D`, borderColor: active.color }}
          >
            <div className="text-sm font-semibold" style={{ color: active.color }}>
              Now viewing: {active.name}
            </div>
            <div className="text-sm text-gray-500">{active.school} · {active.grade}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MultiChildSection;
