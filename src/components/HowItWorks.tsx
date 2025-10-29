import { useEffect, useRef, useState } from 'react';
import { MessageSquare, Settings, Rocket, TrendingUp } from 'lucide-react';

interface Step {
  number: number;
  icon: any;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: 1,
    icon: MessageSquare,
    title: 'Consult & Strategize',
    description: 'We learn about your specific business goals and bottlenecks.',
  },
  {
    number: 2,
    icon: Settings,
    title: 'Custom Build',
    description: 'We design and build an AI Solution that solves the bottleneck.',
  },
  {
    number: 3,
    icon: Rocket,
    title: 'Integrate & Launch',
    description: 'We connect it seamlessly to your business along with the existing operations.',
  },
  {
    number: 4,
    icon: TrendingUp,
    title: 'Optimize & Support',
    description: 'We monitor performance and provide ongoing support.',
  },
];

export default function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
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
      <div className="max-w-5xl mx-auto w-full">
        <div
          className={`text-center mb-12 lg:mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight">
            Simple Setup, Powerful Results
          </h2>
        </div>

        <div className="space-y-6 lg:space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isHovered = hoveredStep === step.number;
            return (
              <div
                key={step.number}
                className={`flex items-start gap-4 transition-all duration-1000 cursor-pointer group ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                } ${isHovered ? 'scale-[1.02]' : ''}`}
                style={{ transitionDelay: `${200 + index * 150}ms` }}
                onMouseEnter={() => setHoveredStep(step.number)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent-teal/10 border border-accent-teal/30 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    isHovered ? 'scale-110 animate-glow-pulse bg-accent-teal/20 border-accent-teal/50' : ''
                  }`}
                >
                  <span className={`text-lg sm:text-xl font-light text-accent-teal transition-all duration-300 ${
                    isHovered ? 'scale-110 font-normal' : ''
                  }`}>
                    {step.number}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start gap-2 mb-2">
                    <div className="relative flex-1">
                      <h3 className="text-xl sm:text-2xl font-light text-white leading-snug">
                        {step.title}
                      </h3>
                      <div
                        className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-accent-teal to-accent-emerald transition-all duration-700 ${
                          isHovered ? 'w-full' : 'w-0'
                        }`}
                      />
                    </div>
                    <Icon
                      className={`w-5 h-5 sm:w-6 sm:h-6 text-accent-teal flex-shrink-0 mt-0.5 transition-all duration-300 ${
                        isHovered ? 'scale-125 rotate-12 brightness-125' : ''
                      }`}
                      strokeWidth={1.5}
                    />
                  </div>
                  <p className={`text-base sm:text-lg text-gray-300 leading-relaxed transition-colors duration-300 ${
                    isHovered ? 'text-gray-200' : ''
                  }`}>
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
