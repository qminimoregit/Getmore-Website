import React from 'react';

export interface NotifCardData {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  time?: string;
  color?: string;
  accentColor?: string;
}

interface NotificationCardProps extends NotifCardData {
  style?: React.CSSProperties;
  className?: string;
  delay?: number;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  icon, title, subtitle, time, color = '#00BFA5', accentColor = '#E0F7FA',
  style, className = '', delay = 0,
}) => {
  return (
    <div
      className={`notif-card px-3.5 py-3 flex items-center gap-3 min-w-[220px] max-w-[280px] ${className}`}
      style={{
        animationDelay: `${delay}ms`,
        ...style,
      }}
      role="status"
      aria-label={`Notification: ${title}`}
    >
      {/* Icon container */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: accentColor }}
      >
        <div style={{ color }} className="w-5 h-5">
          {icon}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800 truncate leading-tight">{title}</p>
        {subtitle && (
          <p className="text-xs text-gray-500 truncate mt-0.5">{subtitle}</p>
        )}
      </div>

      {/* Time / badge */}
      {time && (
        <span className="text-[10px] font-medium text-gray-400 flex-shrink-0">{time}</span>
      )}

      {/* Color accent dot */}
      <span
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ background: color }}
        aria-hidden="true"
      />
    </div>
  );
};

/* ── Preset notification cards for sections ── */

export const SchoolNotifIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

export const BellNotifIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 01-3.46 0"/>
  </svg>
);

export const CalendarNotifIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

export const ReceiptNotifIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);

export const NewsNotifIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 01-2 2zm0 0a2 2 0 01-2-2v-9c0-1.1.9-2 2-2h2"/>
    <path d="M18 14h-8M15 18h-5M10 6h8v4h-8z"/>
  </svg>
);

export const ClockNotifIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

export const ShieldNotifIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

export const PhoneNotifIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.06 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/>
  </svg>
);

export default NotificationCard;
