import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'gradient' | 'white' | 'dark';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', variant = 'gradient', className = '' }) => {
  const sizes = { sm: 'h-7', md: 'h-9', lg: 'h-12' };

  if (variant === 'gradient') {
    return (
      <div className={`flex items-center gap-2.5 ${className}`}>
        {/* Icon mark */}
        <svg
          className={sizes[size]}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="logo-icon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00BFA5" />
              <stop offset="50%" stopColor="#0288D1" />
              <stop offset="100%" stopColor="#1565C0" />
            </linearGradient>
          </defs>
          <rect width="40" height="40" rx="10" fill="url(#logo-icon-grad)" />
          {/* G letter stylized */}
          <path
            d="M12 20a8 8 0 1 1 8 8H14v-5h6v-3H12z"
            fill="white"
            opacity="0.95"
          />
          {/* Plus / sparkle */}
          <path d="M29 11v3M27.5 12.5h3M29 17v3M27.5 18.5h3" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
        </svg>
        {/* Wordmark */}
        <svg
          className={sizes[size]}
          viewBox="0 0 160 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="GET MORE"
        >
          <defs>
            <linearGradient id="logo-text-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00BFA5" />
              <stop offset="100%" stopColor="#1565C0" />
            </linearGradient>
          </defs>
          <text
            x="0" y="28"
            fontFamily="Manrope, sans-serif"
            fontWeight="800"
            fontSize="28"
            fill="url(#logo-text-grad)"
            letterSpacing="-0.5"
          >
            GET MORE
          </text>
        </svg>
      </div>
    );
  }

  if (variant === 'white') {
    return (
      <div className={`flex items-center gap-2.5 ${className}`}>
        <svg className={sizes[size]} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect width="40" height="40" rx="10" fill="rgba(255,255,255,0.25)" />
          <path d="M12 20a8 8 0 1 1 8 8H14v-5h6v-3H12z" fill="white" />
          <path d="M29 11v3M27.5 12.5h3M29 17v3M27.5 18.5h3" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
        </svg>
        <span
          style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, color: 'white', letterSpacing: '-0.5px' }}
          className={`${size === 'sm' ? 'text-lg' : size === 'md' ? 'text-2xl' : 'text-3xl'}`}
        >
          GET MORE
        </span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg className={sizes[size]} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="logo-icon-dark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00BFA5" />
            <stop offset="100%" stopColor="#1565C0" />
          </linearGradient>
        </defs>
        <rect width="40" height="40" rx="10" fill="url(#logo-icon-dark)" />
        <path d="M12 20a8 8 0 1 1 8 8H14v-5h6v-3H12z" fill="white" />
        <path d="M29 11v3M27.5 12.5h3M29 17v3M27.5 18.5h3" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
      </svg>
      <span
        style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, letterSpacing: '-0.5px' }}
        className={`text-gray-900 ${size === 'sm' ? 'text-lg' : size === 'md' ? 'text-2xl' : 'text-3xl'}`}
      >
        GET MORE
      </span>
    </div>
  );
};

export default Logo;
