import { useEffect, useRef, useState } from 'react';
import { Phone, Clock, MessageCircle, Zap } from 'lucide-react';

interface Service {
  id: string;
  icon: any;
  title: string;
  description: string;
  keyResult: string;
}

const services: Service[] = [
  {
    id: 'lead-response',
    icon: Zap,
    title: 'Instant Lead Response AI',
    description: 'Stop losing leads to competitors who respond faster. Our AI contacts new leads within 60 seconds via call or text, qualifying them instantly and booking appointments automatically.',
    keyResult: 'Increase lead conversion by up to 300%',
  },
  {
    id: 'voice-receptionist',
    icon: Phone,
    title: '24/7 AI Voice Receptionist',
    description: 'Never miss another call, even after hours. Our AI receptionist answers every call, answers FAQs, schedules appointments, and routes urgent matters to your team.',
    keyResult: 'Never miss another call',
  },
  {
    id: 'chatbots',
    icon: MessageCircle,
    title: 'Smart AI Chatbots',
    description: 'Engage website visitors 24/7 with intelligent chatbots that answer questions, capture leads, and guide prospects through your sales funnel automatically.',
    keyResult: 'Capture leads while you sleep',
  },
  {
    id: 'automation',
    icon: Clock,
    title: 'Workflow Automation with AI',
    description: 'Free up hours every week by automating repetitive tasks like follow-ups, data entry, appointment reminders, and customer communications.',
    keyResult: 'Save 10+ hours per week',
  },
];

export default function Services() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
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
      <div className="max-w-7xl mx-auto w-full">
        <div
          className={`text-center mb-12 lg:mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mb-6 px-4">
            AI Solutions for Your Business
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isHovered = hoveredCard === service.id;
            return (
              <div
                key={service.id}
                className={`bg-gray-900/50 border border-gray-800 rounded-lg p-6 lg:p-8 transition-all duration-1000 hover:border-accent-teal/50 hover:bg-gray-900/70 cursor-pointer ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="mb-4">
                  <Icon className="w-10 h-10 lg:w-12 lg:h-12 text-accent-teal" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl lg:text-2xl font-light text-white mb-3 leading-snug">
                  {service.title}
                </h3>
                <p className="text-sm lg:text-base text-gray-300 leading-relaxed mb-4">
                  {service.description}
                </p>
                <div className="relative inline-block">
                  <p className="text-base lg:text-lg font-medium text-accent-teal">
                    {service.keyResult}
                  </p>
                  <div
                    className={`absolute -bottom-0.5 left-0 h-0.5 bg-gradient-to-r from-accent-teal to-accent-emerald transition-all duration-700 ${
                      isHovered ? 'w-full' : 'w-0'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div
          className={`text-center transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <p className="text-base lg:text-lg text-gray-300">
            Curious how this works for your business?{' '}
            <a
              href="#contact"
              className="font-medium text-accent-teal hover:text-accent-teal/80 transition-colors underline decoration-accent-teal/50 hover:decoration-accent-teal"
            >
              Book a free consultation
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
