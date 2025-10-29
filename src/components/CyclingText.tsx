import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface CyclingTextProps {
  words: string[];
  displayDuration?: number;
  className?: string;
}

export default function CyclingText({
  words,
  displayDuration = 2000,
  className = ''
}: CyclingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const currentWord = words[currentIndex];

    container.innerHTML = '';
    container.className = `green-text ${className}`;

    currentWord.split('').forEach(letter => {
      const letterSpan = document.createElement('span');
      letterSpan.textContent = letter === ' ' ? '\u00A0' : letter;
      container.appendChild(letterSpan);
    });

    const letters = container.querySelectorAll('span');

    gsap.fromTo(letters,
      { opacity: 0, x: -15 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out"
      }
    );

    const timeout = setTimeout(() => {
      gsap.to(letters, {
        opacity: 0,
        x: 20,
        duration: 0.4,
        stagger: { each: 0.04, from: "end" },
        ease: "power2.in",
        onComplete: () => {
          setCurrentIndex((prev) => (prev + 1) % words.length);
        }
      });
    }, displayDuration);

    return () => {
      clearTimeout(timeout);
      gsap.killTweensOf(letters);
    };
  }, [currentIndex, words, displayDuration, className]);

  return <span ref={containerRef} className={`inline-block ${className}`}></span>;
}
