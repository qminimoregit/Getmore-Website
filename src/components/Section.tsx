import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface Props {
  id: string;
  title: string;
  body: string;
  videoSrc: string;
  children?: React.ReactNode;
}

export const Section: React.FC<Props> = ({ id, title, body, videoSrc, children }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = contentRef.current;
    
    gsap.fromTo(element, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  return (
    <section id={id} className="h-screen w-full relative flex items-center p-8 md:p-16 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        poster="/placeholder-video-poster.jpg"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px] z-0" />
      <div ref={contentRef} className="relative z-10 max-w-xl space-y-6">
        <h2 className="font-display text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
          {title}
        </h2>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
          {body}
        </p>
        {children}
      </div>
    </section>
  );
};

export default Section;
