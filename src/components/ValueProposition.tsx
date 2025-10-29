import { useEffect, useRef, useState } from 'react';

export default function ValueProposition() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-6 lg:px-8 py-20 lg:py-0"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-6 lg:mb-10 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          We help founders implement <span className="text-red-500">practical AI</span> that delivers <span className="text-red-500">clear ROI, fast</span>.
        </h2>

        <p
          className={`text-base sm:text-lg lg:text-xl text-gray-300 font-light tracking-wide max-w-5xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          Confused about AI? We build and manage simple <span className="text-red-400">AI Voice Agents & Chatbots</span> that solve real problems like <span className="text-red-400">missed calls and lead follow-up</span>, <span className="text-red-400">saving time and recovering lost income</span>.
        </p>
      </div>
    </section>
  );
}
