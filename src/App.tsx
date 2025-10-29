import Header from './components/Header';
import Hero from './components/Hero';
import ValueProposition from './components/ValueProposition';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import BookingCTA from './components/BookingCTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useSnapScroll } from './hooks/useSnapScroll';

function App() {
  const { currentSection, isTransitioning } = useSnapScroll({
    totalSections: 7,
    threshold: 0.3,
    transitionDuration: 800,
  });

  return (
    <div className="relative lg:h-screen lg:overflow-hidden gradient-bg">
      <div className="absolute inset-0 gradient-overlay"></div>

      <div className="relative z-10">
        <Header currentSection={currentSection} />

        <div
          id="snap-scroll-container"
          className="snap-scroll-container"
          style={{ willChange: isTransitioning ? 'transform' : 'auto' }}
        >
          <Hero />
          <ValueProposition />
          <Services />
          <HowItWorks />
          <BookingCTA />
          <Contact />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
