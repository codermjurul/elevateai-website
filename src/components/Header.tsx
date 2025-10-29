import { ArrowRight } from 'lucide-react';

interface HeaderProps {
  currentSection: number;
}

export default function Header({ currentSection }: HeaderProps) {
  const isVisible = currentSection === 0;

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`absolute top-0 left-0 right-0 z-50 transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer">
            <svg
              className="w-7 h-7 text-white transition-all duration-300 group-hover:scale-110"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M13 2L3 14h8l-2 8 10-12h-8l2-8z" />
            </svg>
            <span className="text-white text-xl font-bold tracking-[0.2em] uppercase">ELEVATE AI</span>
          </div>

          <button
            onClick={scrollToContact}
            className="group relative flex items-center gap-2 px-6 py-3 text-white border border-white/30 rounded-full overflow-hidden transition-all duration-300 hover:border-accent-teal hover:scale-105"
          >
            <span className="absolute inset-0 bg-accent-teal/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative text-sm font-medium tracking-wide">Get In Touch</span>
            <ArrowRight className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </header>
  );
}
