import React, { useEffect, useRef } from 'react';

const ScrollProgress: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateBar = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    window.addEventListener('scroll', updateBar, { passive: true });
    return () => window.removeEventListener('scroll', updateBar);
  }, []);

  return (
    <div
      ref={barRef}
      className="scroll-progress-bar"
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
};

export default ScrollProgress;
