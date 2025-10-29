import { useEffect, useRef, useState } from 'react';
import { Calendar } from 'lucide-react';

export default function BookingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-6 lg:px-8 py-16 lg:py-20"
    >
      <div className="max-w-3xl mx-auto w-full text-center">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mb-6">
            Ready to Elevate Your Business with AI?
          </h2>

          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-4 max-w-2xl mx-auto">
            Schedule a <span className="font-bold">Free Consultation Call with our Founder</span> to discuss your specific business challenges.
          </p>

          <p className="text-base sm:text-lg text-gray-400 leading-relaxed mb-10 max-w-2xl mx-auto">
            Discover how AI can save you time, capture more leads, and solve the bottlenecks holding your business back.
          </p>

          <a
            href="https://cal.com/manjarul-ch/free-consultation-call"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-accent-teal text-black text-lg font-medium rounded-lg hover:bg-accent-teal/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-accent-teal/20"
          >
            <Calendar className="w-6 h-6" strokeWidth={2} />
            Book Your Free Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
