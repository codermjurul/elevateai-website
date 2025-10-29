import { useEffect, useState } from 'react';
import CyclingText from './CyclingText';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 lg:px-8 py-20 lg:py-0 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="leading-tight mb-6 lg:mb-8">
          <span
            className={`hero-line-1 block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light white-silver-animated-text transition-all duration-1000 delay-200 mb-2 lg:mb-4 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            We Build Custom AI
          </span>
          <span
            id="animated-word-container"
            className={`block text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-normal transition-all duration-1000 delay-400 mb-2 lg:mb-4 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ minHeight: '1.2em' }}
          >
            <CyclingText words={['Agents', 'Automations', 'Workflows']} />
          </span>
          <span
            className={`hero-line-3 block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light white-silver-animated-text1 transition-all duration-1000 delay-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            For Business Growth
          </span>
        </h1>

        <p
          className={`hero-subheading text-lg sm:text-xl lg:text-2xl white-silver-animated-text2 font-light tracking-wide transition-all duration-1000 delay-800 mt-6 lg:mt-8 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Automate. Engage. Convert.
        </p>
      </div>
    </section>
  );
}
