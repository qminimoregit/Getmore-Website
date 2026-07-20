import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReceiptNotifIcon, CalendarNotifIcon } from '../ui/NotificationCard';

gsap.registerPlugin(ScrollTrigger);

interface ReceiptCard {
  label: string;
  amount: string;
  date: string;
  color: string;
  icon: React.ReactNode;
}

const RECEIPTS: ReceiptCard[] = [
  { label: 'School Fees', amount: 'Rs. 12,500', date: 'Jul 1, 2025', color: '#00BFA5', icon: <ReceiptNotifIcon /> },
  { label: 'Tuition Fees', amount: 'Rs. 4,500', date: 'Jun 28, 2025', color: '#0288D1', icon: <ReceiptNotifIcon /> },
  { label: 'Class Fees', amount: 'Rs. 2,000', date: 'Jun 15, 2025', color: '#1565C0', icon: <ReceiptNotifIcon /> },
  { label: 'Activity Fees', amount: 'Rs. 1,200', date: 'Jun 5, 2025', color: '#006064', icon: <CalendarNotifIcon /> },
];

const PAPER_RECEIPTS = [
  { rot: '-12deg', tx: '-20px', ty: '-30px', label: 'Term 2 Receipt' },
  { rot: '8deg',  tx: '30px',  ty: '-20px', label: 'Tuition Invoice' },
  { rot: '-5deg', tx: '-40px', ty: '20px',  label: 'Activity Bill' },
  { rot: '15deg', tx: '10px',  ty: '30px',  label: 'School Fees' },
];

const DigitalBillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);
  const paperGroupRef = useRef<HTMLDivElement>(null);
  const digitalGroupRef = useRef<HTMLDivElement>(null);
  const [transformed, setTransformed] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Trigger scan + transform sequence on scroll
      ScrollTrigger.create({
        trigger: sceneRef.current,
        start: 'top 60%',
        once: true,
        onEnter: () => {
          gsap.fromTo(scanRef.current,
            { top: '0%', opacity: 0 },
            {
              top: '100%', opacity: 1,
              duration: 1.2, ease: 'power1.inOut', delay: 0.5,
              onComplete: () => {
                setTransformed(true);
                if (scanRef.current) gsap.to(scanRef.current, { opacity: 0, duration: 0.3 });
              },
            }
          );
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sceneRef.current,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
      });

      // Paper receipts float in
      if (paperGroupRef.current) {
        const papers = paperGroupRef.current.querySelectorAll('.paper-receipt');
        tl.fromTo(papers,
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.4)', stagger: 0.1 }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="digital-bills"
      data-section
      className="gm-section"
      style={{ background: 'white', minHeight: '100vh' }}
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute rounded-full" style={{
          width: 700, height: 700,
          background: 'radial-gradient(circle, rgba(0,191,165,0.05) 0%, transparent 70%)',
          bottom: '-200px', right: '-200px',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(0,191,165,0.08) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-12 py-20 md:py-28 flex flex-col lg:flex-row items-center gap-16">
        {/* Left: Text */}
        <div ref={contentRef} className="lg:w-1/2 space-y-7">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold"
            style={{ background: 'rgba(0,191,165,0.1)', color: 'var(--gm-teal)', border: '1px solid rgba(0,191,165,0.2)' }}>
            <ReceiptNotifIcon />
            <span>Paperless Receipts</span>
          </div>

          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800 }} className="text-4xl md:text-5xl text-gray-900 leading-tight">
            No More Lost{' '}
            <span className="gm-gradient-text">Paper Receipts</span>
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            No paper bills. No manual payment verification. Every school, tuition and educational
            payment receipt is stored securely inside GET MORE — findable anytime, from anywhere.
          </p>

          <p className="text-base font-semibold italic" style={{ color: 'var(--gm-teal)' }}>
            Your educational payment records, always in your pocket.
          </p>

          {/* Feature chips */}
          <div className="flex flex-wrap gap-3">
            {['School Fees', 'Tuition Fees', 'Class Fees', 'Activity Fees'].map((tag) => (
              <span key={tag} className="px-4 py-1.5 rounded-full text-sm font-medium border"
                style={{ borderColor: 'var(--gm-border)', color: 'var(--gm-text-2)', background: 'var(--gm-surface)' }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            {[
              { label: 'Receipts Stored', value: '100%', sub: 'digitally safe' },
              { label: 'Paper Used', value: '0', sub: 'bills to lose' },
            ].map((stat) => (
              <div key={stat.label} className="bg-gray-50 rounded-2xl p-4 border" style={{ borderColor: 'var(--gm-border)' }}>
                <div className="text-2xl font-bold gm-gradient-text">{stat.value}</div>
                <div className="text-sm font-semibold text-gray-700">{stat.label}</div>
                <div className="text-xs text-gray-400">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Animated receipt transformation scene */}
        <div className="lg:w-1/2 flex justify-center items-center">
          <div
            ref={sceneRef}
            className="relative flex items-center justify-center"
            style={{ width: 360, height: 480 }}
          >
            {/* Paper receipts (before state) */}
            <div
              ref={paperGroupRef}
              className="absolute inset-0 flex items-center justify-center"
              style={{ transition: 'opacity 0.5s ease', opacity: transformed ? 0 : 1, pointerEvents: 'none' }}
            >
              {PAPER_RECEIPTS.map((paper, i) => (
                <div
                  key={i}
                  className="paper-receipt absolute"
                  style={{
                    width: 160, height: 200,
                    background: 'white',
                    borderRadius: 8,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    border: '1px solid #e5e7eb',
                    transform: `rotate(${paper.rot}) translate(${paper.tx}, ${paper.ty})`,
                    padding: '16px',
                    display: 'flex', flexDirection: 'column', gap: 8,
                  }}
                >
                  {/* Receipt content skeleton */}
                  <div className="h-3 bg-gray-200 rounded w-3/4" />
                  <div className="h-2 bg-gray-100 rounded w-1/2" />
                  <div className="border-t border-dashed border-gray-200 my-1" />
                  {[0,1,2].map(j => (
                    <div key={j} className="flex justify-between">
                      <div className="h-2 bg-gray-100 rounded w-2/5" />
                      <div className="h-2 bg-gray-100 rounded w-1/4" />
                    </div>
                  ))}
                  <div className="border-t border-gray-200 mt-auto pt-2">
                    <div className="h-3 bg-gray-200 rounded w-1/3 ml-auto" />
                  </div>
                  <div className="text-center text-[9px] text-gray-300">{paper.label}</div>
                </div>
              ))}
            </div>

            {/* Scan line */}
            <div
              ref={scanRef}
              className="absolute w-full pointer-events-none z-20"
              style={{
                height: 3,
                background: 'linear-gradient(90deg, transparent, #00BFA5, #00E5FF, #00BFA5, transparent)',
                boxShadow: '0 0 20px 8px rgba(0,191,165,0.4)',
                opacity: 0,
              }}
              aria-hidden="true"
            />

            {/* Digital receipts (after state) */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ transition: 'opacity 0.6s ease', opacity: transformed ? 1 : 0, pointerEvents: 'none' }}
            >
              {/* Phone with digital receipt list */}
              <div
                style={{
                  width: 260, height: 440,
                  background: 'linear-gradient(145deg, #1a1a2e, #16213e)',
                  borderRadius: 36,
                  boxShadow: '0 40px 80px rgba(0,0,0,0.3), inset 0 0 0 2px rgba(255,255,255,0.06)',
                  padding: 12,
                }}
              >
                {/* Screen */}
                <div style={{ background: 'linear-gradient(160deg, #e0f7fa, #e3f2fd)', borderRadius: 26, height: '100%', overflow: 'hidden' }}>
                  {/* Header */}
                  <div style={{ background: 'linear-gradient(135deg, #00BFA5, #1565C0)', padding: '10px 12px 8px' }}>
                    <div className="text-white text-[10px] font-bold">Payment History</div>
                    <div className="text-white/70 text-[8px]">{RECEIPTS.length} receipts</div>
                  </div>
                  {/* Receipt list */}
                  <div className="p-2 space-y-2">
                    {RECEIPTS.map((r, i) => (
                      <div
                        key={i}
                        className="bg-white rounded-xl p-2 flex items-center gap-2 shadow-sm"
                        style={{ borderLeft: `3px solid ${r.color}`, animation: `slide-in-up 0.4s ease ${i * 0.1 + 0.2}s both` }}
                      >
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${r.color}20` }}>
                          <div style={{ color: r.color, width: 12, height: 12 }}>{r.icon}</div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[9px] font-bold text-gray-800 truncate">{r.label}</div>
                          <div className="text-[8px] text-gray-400">{r.date}</div>
                        </div>
                        <div className="text-[9px] font-bold" style={{ color: r.color }}>{r.amount}</div>
                      </div>
                    ))}
                    {/* Search & calendar icons */}
                    <div className="flex gap-2 mt-2">
                      {[
                        { label: 'Search', path: 'M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z' },
                        { label: 'Calendar', path: 'M3 4h18v16H3V4zm5-2v4M16 2v4M3 10h18' },
                      ].map(({ label, path }) => (
                        <div key={label} className="flex-1 bg-white rounded-xl p-2 flex flex-col items-center gap-1 shadow-sm">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="var(--gm-teal)" strokeWidth="2">
                            <path d={path} strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span className="text-[8px] text-gray-400">{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tap to see animation button */}
            {!transformed && (
              <button
                className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-gray-400 font-medium border border-gray-200 rounded-full px-4 py-2 bg-white shadow hover:bg-gray-50"
                onClick={() => setTransformed(true)}
                aria-label="See the digital transformation"
              >
                ✨ See transformation
              </button>
            )}
            {transformed && (
              <button
                className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-gray-400 font-medium border border-gray-200 rounded-full px-4 py-2 bg-white shadow hover:bg-gray-50"
                onClick={() => setTransformed(false)}
                aria-label="Reset transformation"
              >
                ↩ Reset
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitalBillsSection;
