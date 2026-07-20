import React from 'react';

interface GradientButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'android' | 'ios';
  onClick?: () => void;
  href?: string;
  className?: string;
  icon?: React.ReactNode;
  id?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  children, variant = 'primary', onClick, href, className = '', icon, id, size = 'md',
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm min-h-[40px]',
    md: 'px-6 py-3 text-base min-h-[48px]',
    lg: 'px-8 py-4 text-lg min-h-[56px]',
  };

  const baseClass = `inline-flex items-center gap-2 rounded-full font-semibold cursor-pointer transition-all duration-150 whitespace-nowrap ${sizeClasses[size]} ${className}`;

  const variantClass = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
    android: 'btn-primary',
    ios: 'bg-gray-900 text-white hover:bg-gray-700 rounded-full inline-flex items-center gap-2 font-semibold transition-all duration-150 shadow-lg hover:shadow-xl hover:-translate-y-0.5',
  }[variant];

  const content = (
    <>
      {variant === 'android' && (
        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M6.18 15.64a2.18 2.18 0 0 1-2.18-2.18V9.18a2.18 2.18 0 0 1 4.36 0v4.28a2.18 2.18 0 0 1-2.18 2.18m11.64 0a2.18 2.18 0 0 1-2.18-2.18V9.18a2.18 2.18 0 0 1 4.36 0v4.28a2.18 2.18 0 0 1-2.18 2.18M3.18 7.64A2.18 2.18 0 0 1 5 5.64l.96-.37L4.82 3.1A.5.5 0 0 1 5.76 2.6l1.2 2.25A8 8 0 0 1 12 3.64a8 8 0 0 1 5.04 1.21l1.2-2.25a.5.5 0 0 1 .94.5L18.04 5.27l.96.37a2.18 2.18 0 0 1 1.82 2v7.82A2.18 2.18 0 0 1 18.64 17.64H5.36A2.18 2.18 0 0 1 3.18 15.46V7.64m8.82 8.18V17H5.36v1.64A2.18 2.18 0 0 0 7.54 20.82h1.09a1.09 1.09 0 0 0 1.09-1.09V17.82h.82v1.91a1.09 1.09 0 0 0 1.09 1.09h1.09a2.18 2.18 0 0 0 2.18-2.18V17H12z"/>
        </svg>
      )}
      {variant === 'ios' && (
        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
        </svg>
      )}
      {icon && variant !== 'android' && variant !== 'ios' && icon}
      {children}
    </>
  );

  if (href) {
    return (
      <a id={id} href={href} className={`${baseClass} ${variantClass}`} target={href.startsWith('tel') || href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <button id={id} type="button" onClick={onClick} className={`${baseClass} ${variantClass}`}>
      {content}
    </button>
  );
};

export default GradientButton;
