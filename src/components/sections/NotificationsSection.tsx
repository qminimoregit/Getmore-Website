import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BellNotifIcon, CalendarNotifIcon, ClockNotifIcon, SchoolNotifIcon, NewsNotifIcon } from '../ui/NotificationCard';

gsap.registerPlugin(ScrollTrigger);

interface NotifItem {
  id: number;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  time: string;
  color: string;
  accentColor: string;
  category: string;
}

const NOTIFS: NotifItem[] = [
  { id: 1, icon: <SchoolNotifIcon />, title: 'Extra Class Today', subtitle: 'Science — Lab Room 3 at 3:00 PM', time: 'now', color: '#00BFA5', accentColor: '#E0F7FA', category: 'School' },
  { id: 2, icon: <BellNotifIcon />, title: 'School Announcement', subtitle: 'Sports Day rescheduled to Friday', time: '5m', color: '#0288D1', accentColor: '#E3F2FD', category: 'Announcement' },
  { id: 3, icon: <CalendarNotifIcon />, title: 'Timetable Change', subtitle: 'Mathematics moved to Period 4', time: '1h', color: '#1565C0', accentColor: '#EDE7F6', category: 'Timetable' },
  { id: 4, icon: <ClockNotifIcon />, title: 'Exam Reminder', subtitle: 'Term exam starts Monday 8:00 AM', time: '2h', color: '#00ACC1', accentColor: '#E0F7FA', category: 'Reminder' },
  { id: 5, icon: <NewsNotifIcon />, title: 'School Event', subtitle: 'Annual concert — Gate opens at 6 PM', time: '3h', color: '#006064', accentColor: '#E0F2F1', category: 'Event' },
];

const NotificationsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const notifsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content entrance
      gsap.fromTo(contentRef.current,
        { opacity: 0, x: 60 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Phone entrance
      gsap.fromTo(phoneRef.current,
        { opacity: 0, x: -60, rotateY: 20 },
        {
          opacity: 1, x: 0, rotateY: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Notification cards stagger in
      if (notifsRef.current) {
        const cards = notifsRef.current.querySelectorAll('.notif-feed-item');
        gsap.fromTo(cards,
          { opacity: 0, x: -30 },
          {
            opacity: 1, x: 0, duration: 0.5, ease: 'power2.out', stagger: 0.12,
            scrollTrigger: {
              trigger: notifsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="notifications"
      data-section
      className="gm-section"
      style={{ background: '#F7F9FA', minHeight: '100vh' }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute rounded-full"
          style={{
            width: 600, height: 600,
            background: 'radial-gradient(circle, rgba(0,191,165,0.06) 0%, transparent 70%)',
            top: '-150px', left: '-150px',
          }}
        />
        <div
          className="absolute"
          style={{
            width: '40%', height: '100%',
            background: 'linear-gradient(90deg, rgba(0,191,165,0.04) 0%, transparent 100%)',
            left: 0, top: 0,
          }}
        />
        {/* Morning light gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 70% 20%, rgba(255,245,200,0.2) 0%, transparent 60%)',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-12 py-20 md:py-28 flex flex-col lg:flex-row items-center gap-16">
        {/* Left: Phone with notification feed */}
        <div ref={phoneRef} className="lg:w-1/2 flex justify-center items-center">
          <div
            className="relative"
            style={{
              width: 300, height: 600,
              background: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)',
              borderRadius: 44,
              boxShadow: '0 40px 80px rgba(0,0,0,0.30), inset 0 0 0 2px rgba(255,255,255,0.06)',
            }}
          >
            {/* Side buttons */}
            <div className="absolute bg-gray-700 rounded-r-sm" style={{ top: 80, right: -3, width: 3, height: 40 }} />
            <div className="absolute bg-gray-700 rounded-l-sm" style={{ top: 60, left: -3, width: 3, height: 28 }} />
            <div className="absolute bg-gray-700 rounded-l-sm" style={{ top: 96, left: -3, width: 3, height: 28 }} />

            {/* Screen */}
            <div
              className="absolute overflow-hidden"
              style={{
                top: 14, left: 14, right: 14, bottom: 14,
                borderRadius: 34,
                background: 'linear-gradient(160deg, #e0f7fa 0%, #e3f2fd 100%)',
              }}
            >
              {/* Status bar */}
              <div className="flex items-center justify-between px-5 py-2" style={{ height: 30, background: 'linear-gradient(135deg, #00BFA5, #1565C0)' }}>
                <span className="text-white text-[9px] font-semibold">9:41</span>
                <div style={{ width: 60, height: 10, borderRadius: 10, background: 'rgba(0,0,0,0.4)' }} />
                <div className="flex gap-1">
                  {[4,3,2].map(i => <div key={i} className="w-1 rounded-sm bg-white/80" style={{ height: i * 3 }} />)}
                </div>
              </div>

              {/* App header */}
              <div className="px-4 py-3 flex items-center gap-2 border-b border-gray-100">
                <div className="w-8 h-8 rounded-xl" style={{ background: 'linear-gradient(135deg, #00BFA5, #1565C0)' }} />
                <div>
                  <div className="text-[11px] font-bold text-gray-800">GET MORE</div>
                  <div className="text-[9px] text-gray-400">Notifications</div>
                </div>
                <div className="ml-auto w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center">
                  <span className="text-[8px] font-bold text-teal-700">5</span>
                </div>
              </div>

              {/* Notification feed */}
              <div ref={notifsRef} className="p-3 space-y-2 overflow-hidden">
                {NOTIFS.map((notif) => (
                  <div
                    key={notif.id}
                    className="notif-feed-item bg-white rounded-xl p-2.5 flex items-center gap-2 shadow-sm"
                    style={{ borderLeft: `3px solid ${notif.color}` }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: notif.accentColor }}
                    >
                      <div style={{ color: notif.color, width: 14, height: 14 }}>{notif.icon}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-bold text-gray-800 truncate">{notif.title}</div>
                      <div className="text-[9px] text-gray-400 truncate">{notif.subtitle}</div>
                    </div>
                    <div className="text-[8px] text-gray-300 flex-shrink-0">{notif.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Animated notification badge appearing */}
          <div
            className="absolute"
            style={{ top: '15%', left: '5%', zIndex: 10 }}
          >
            <div
              className="notif-card px-3 py-2.5 flex items-center gap-2.5 shadow-xl"
              style={{ animation: 'notif-slide 0.6s ease-out 1.5s both, float 5s ease-in-out 2.5s infinite' }}
            >
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: '#E0F7FA' }}>
                <div style={{ color: '#00BFA5', width: 16, height: 16 }}><SchoolNotifIcon /></div>
              </div>
              <div>
                <div className="text-xs font-bold text-gray-800">GET MORE</div>
                <div className="text-[11px] text-gray-500">New notification</div>
              </div>
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#00BFA5' }} />
            </div>
          </div>
        </div>

        {/* Right: Text content */}
        <div ref={contentRef} className="lg:w-1/2 space-y-7 lg:pl-8">
          {/* Label */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold"
            style={{ background: 'rgba(0,191,165,0.1)', color: 'var(--gm-teal)', border: '1px solid rgba(0,191,165,0.2)' }}
          >
            <BellNotifIcon />
            <span>Instant Notifications</span>
          </div>

          <h2
            style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800 }}
            className="text-4xl md:text-5xl text-gray-900 leading-tight"
          >
            Never Miss an{' '}
            <span className="gm-gradient-text">Important</span>{' '}
            Update
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            Extra classes, school announcements, timetable changes, reminders and important
            educational news — delivered straight to you through GET MORE, the moment they happen.
          </p>

          <p className="text-base font-semibold italic" style={{ color: 'var(--gm-teal)' }}>
            Everything important reaches you at the right time.
          </p>

          {/* Feature list */}
          <div className="space-y-3">
            {[
              { icon: <SchoolNotifIcon />, text: 'Extra classes & school announcements', color: '#00BFA5' },
              { icon: <CalendarNotifIcon />, text: 'Timetable changes & exam reminders', color: '#0288D1' },
              { icon: <BellNotifIcon />, text: 'Important educational news & events', color: '#1565C0' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${item.color}15` }}
                >
                  <div style={{ color: item.color, width: 18, height: 18 }}>{item.icon}</div>
                </div>
                <span className="text-gray-700 font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotificationsSection;
