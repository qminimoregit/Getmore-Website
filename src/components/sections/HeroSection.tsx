import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PhoneMockup from '../ui/PhoneMockup';
import NotificationCard, {
  SchoolNotifIcon, BellNotifIcon, CalendarNotifIcon, ReceiptNotifIcon, NewsNotifIcon
} from '../ui/NotificationCard';
import GradientButton from '../ui/GradientButton';

gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const phone1Ref = useRef<HTMLDivElement>(null);
  const phone2Ref = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);
  const card5Ref = useRef<HTMLDivElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Content entrance
      tl.fromTo(contentRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }
      );

      // Phones rise
      tl.fromTo(phone1Ref.current,
        { opacity: 0, y: 80, rotateY: -15 },
        { opacity: 1, y: 0, rotateY: 0, duration: 1, ease: 'power3.out' }, '-=0.5'
      );
      tl.fromTo(phone2Ref.current,
        { opacity: 0, y: 80, rotateY: 15 },
        { opacity: 1, y: 0, rotateY: 0, duration: 1, ease: 'power3.out' }, '-=0.8'
      );

      // Cards appear staggered
      const cards = [card1Ref, card2Ref, card3Ref, card4Ref, card5Ref];
      cards.forEach((cardRef, i) => {
        tl.fromTo(cardRef.current,
          { opacity: 0, scale: 0.8, x: i % 2 === 0 ? -20 : 20 },
          { opacity: 1, scale: 1, x: 0, duration: 0.5, ease: 'back.out(1.4)' },
          `-=${0.3}`
        );
      });

      // Wave pulse loop
      if (waveRef.current) {
        gsap.fromTo(waveRef.current.children,
          { scale: 0.5, opacity: 0.7 },
          { scale: 2.5, opacity: 0, duration: 3, ease: 'power2.out', stagger: 1, repeat: -1 }
        );
      }

      // Scroll-driven floating effect
      gsap.to([phone1Ref.current, phone2Ref.current], {
        y: -30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="intro"
      data-section
      className="gm-section"
      style={{
        background: 'linear-gradient(135deg, #00BFA5 0%, #0288D1 40%, #1565C0 80%, #0D47A1 100%)',
        minHeight: '100vh',
      }}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Wave rings */}
        <div
          ref={waveRef}
          className="absolute"
          style={{ bottom: '20%', right: '25%', width: 300, height: 300 }}
        >
          {[0,1,2].map(i => (
            <div
              key={i}
              className="absolute inset-0 rounded-full border-2 border-white/20"
            />
          ))}
        </div>

        {/* Background blobs */}
        <div
          className="absolute rounded-full"
          style={{
            width: 500, height: 500,
            background: 'radial-gradient(circle, rgba(0,229,255,0.15) 0%, transparent 70%)',
            top: '-100px', right: '-100px',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 400, height: 400,
            background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
            bottom: '-80px', left: '10%',
          }}
        />

        {/* Grid overlay */}
        <div
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Glowing platform under phones */}
        <div
          className="absolute rounded-full"
          style={{
            width: 400, height: 40,
            background: 'radial-gradient(ellipse, rgba(0,229,255,0.4) 0%, transparent 70%)',
            bottom: '18%', right: '12%',
            filter: 'blur(20px)',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-12 py-24 md:py-32 flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
        {/* Left: Text content */}
        <div ref={contentRef} className="lg:w-1/2 space-y-6 lg:pr-12">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
            style={{ background: 'rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.95)', border: '1px solid rgba(255,255,255,0.25)' }}
          >
            <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" aria-hidden="true" />
            Free for Parents • Android &amp; iOS
          </div>

          {/* Headline */}
          <h1
            style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800 }}
            className="text-4xl md:text-5xl xl:text-6xl text-white leading-tight"
          >
            Everything About Your Child's Education,{' '}
            <span className="text-cyan-200">in One App</span>
          </h1>

          {/* Body */}
          <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-lg">
            GET MORE is free for parents, available on both Android and iOS.
            Receive school, tuition and educational institute notifications, digital payment receipts,
            reminders and important news — all in one place.
          </p>

          {/* Tagline */}
          <p className="text-base font-semibold text-cyan-200 italic">
            Free for Parents. Simple for Families.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <GradientButton
              href="https://play.google.com/store"
              variant="android"
              size="lg"
              id="hero-android-btn"
              className="bg-white text-gray-900 hover:bg-gray-50"
            >
              Download for Android
            </GradientButton>
            <GradientButton
              href="https://apps.apple.com"
              variant="ios"
              size="lg"
              id="hero-ios-btn"
            >
              Download on App Store
            </GradientButton>
            <GradientButton
              href="#notifications"
              variant="ghost"
              size="lg"
              id="hero-learn-more"
              className="text-white hover:text-cyan-200"
            >
              Learn More ↓
            </GradientButton>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center gap-6 pt-2 opacity-80">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {['#00BFA5','#0288D1','#1565C0','#00ACC1'].map((c,i) => (
                  <div key={i} className="w-7 h-7 rounded-full border-2 border-white/50 flex items-center justify-center text-white text-xs font-bold" style={{ background: c }}>
                    {['M','F','G','P'][i]}
                  </div>
                ))}
              </div>
              <span className="text-sm text-white/80">10,000+ parents trust GET MORE</span>
            </div>
          </div>
        </div>

        {/* Right: Phone mockups + floating cards */}
        <div className="lg:w-1/2 flex items-center justify-center relative" style={{ minHeight: 560 }}>
          {/* Phone 1 (main, front) */}
          <div
            ref={phone1Ref}
            className="absolute animate-float-slow"
            style={{ left: '5%', zIndex: 3, filter: 'drop-shadow(0 40px 60px rgba(0,0,0,0.35))' }}
          >
            <PhoneMockup size="md" />
          </div>

          {/* Phone 2 (secondary, back-right) */}
          <div
            ref={phone2Ref}
            className="absolute animate-float"
            style={{ right: '0%', top: '40px', zIndex: 2, opacity: 0.9, filter: 'drop-shadow(0 30px 50px rgba(0,0,0,0.25))', transform: 'perspective(800px) rotateY(-15deg) scale(0.9)' }}
          >
            <PhoneMockup size="sm" />
          </div>

          {/* Floating notification cards */}
          <div ref={card1Ref} className="absolute animate-float" style={{ top: '2%', left: '2%', zIndex: 5, animationDuration: '4.5s' }}>
            <NotificationCard
              icon={<SchoolNotifIcon />}
              title="School Notice"
              subtitle="Extra class today at 3pm"
              time="now"
              color="#00BFA5"
              accentColor="#E0F7FA"
            />
          </div>

          <div ref={card2Ref} className="absolute animate-float-reverse" style={{ top: '10%', right: '0%', zIndex: 5, animationDuration: '5s' }}>
            <NotificationCard
              icon={<CalendarNotifIcon />}
              title="Term Reminder"
              subtitle="Term exams start Monday"
              time="2h"
              color="#0288D1"
              accentColor="#E3F2FD"
            />
          </div>

          <div ref={card3Ref} className="absolute animate-float" style={{ bottom: '28%', left: '0%', zIndex: 5, animationDuration: '3.8s' }}>
            <NotificationCard
              icon={<ReceiptNotifIcon />}
              title="Payment Received"
              subtitle="School Fees • Rs. 4,500"
              time="1d"
              color="#1565C0"
              accentColor="#EDE7F6"
            />
          </div>

          <div ref={card4Ref} className="absolute animate-float-slow" style={{ bottom: '14%', right: '2%', zIndex: 5 }}>
            <NotificationCard
              icon={<BellNotifIcon />}
              title="Tuition Reminder"
              subtitle="Class at 5:30 PM"
              time="30m"
              color="#00ACC1"
              accentColor="#E0F7FA"
            />
          </div>

          <div ref={card5Ref} className="absolute animate-float-reverse" style={{ bottom: '2%', left: '15%', zIndex: 5, animationDuration: '6s' }}>
            <NotificationCard
              icon={<NewsNotifIcon />}
              title="Education News"
              subtitle="New curriculum update"
              time="3h"
              color="#00BFA5"
              accentColor="#E8F5E9"
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-70" aria-hidden="true">
        <span className="text-white/70 text-xs font-medium tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-8 border-2 border-white/40 rounded-full flex items-start justify-center p-1">
          <div
            className="w-1 h-2 bg-white rounded-full"
            style={{ animation: 'float 1.5s ease-in-out infinite' }}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
