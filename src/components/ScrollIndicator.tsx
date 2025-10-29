interface ScrollIndicatorProps {
  totalSections: number;
  currentSection: number;
  onSectionClick: (index: number) => void;
}

const sectionNames = ['Hero', 'Value Proposition', 'Services', 'Contact'];

export default function ScrollIndicator({
  totalSections,
  currentSection,
  onSectionClick,
}: ScrollIndicatorProps) {
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4">
      {Array.from({ length: totalSections }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSectionClick(index)}
          className="group relative"
          aria-label={`Go to ${sectionNames[index]} section`}
        >
          <div
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
              currentSection === index
                ? 'bg-accent-teal border-accent-teal scale-125 shadow-lg shadow-accent-teal/50'
                : 'bg-transparent border-white/30 hover:border-white/60 hover:scale-110'
            }`}
          ></div>

          <div
            className={`absolute right-6 top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded text-sm text-white transition-all duration-200 pointer-events-none ${
              currentSection === index
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
            }`}
          >
            {sectionNames[index]}
          </div>
        </button>
      ))}
    </div>
  );
}
