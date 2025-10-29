import { useEffect, useRef, useState, useCallback } from 'react';

interface UseSnapScrollOptions {
  totalSections: number;
  threshold?: number;
  transitionDuration?: number;
}

interface UseSnapScrollReturn {
  currentSection: number;
  isTransitioning: boolean;
  goToSection: (index: number) => void;
}

export function useSnapScroll({
  totalSections,
  threshold = 0.5,
  transitionDuration = 800,
}: UseSnapScrollOptions): UseSnapScrollReturn {
  const [currentSection, setCurrentSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const scrollAccumulator = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const touchStartY = useRef(0);
  const transitionTimeoutRef = useRef<number | null>(null);
  const isTransitioningRef = useRef(false);
  const currentSectionRef = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);

      if (!desktop) {
        const container = document.getElementById('snap-scroll-container');
        if (container) {
          container.style.transform = 'none';
          container.style.transition = 'none';
        }
        document.body.style.overflow = '';
      } else {
        document.body.style.overflow = 'hidden';
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    isTransitioningRef.current = isTransitioning;
  }, [isTransitioning]);

  useEffect(() => {
    currentSectionRef.current = currentSection;
  }, [currentSection]);

  const goToSection = useCallback(
    (index: number) => {
      if (index < 0 || index >= totalSections || isTransitioningRef.current || index === currentSectionRef.current) {
        return;
      }

      setIsTransitioning(true);
      isTransitioningRef.current = true;
      setCurrentSection(index);
      currentSectionRef.current = index;
      scrollAccumulator.current = 0;

      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }

      transitionTimeoutRef.current = window.setTimeout(() => {
        setIsTransitioning(false);
        isTransitioningRef.current = false;
        transitionTimeoutRef.current = null;
      }, transitionDuration);
    },
    [totalSections, transitionDuration]
  );

  const handleBounceBack = useCallback(() => {
    const container = document.getElementById('snap-scroll-container');
    if (!container) {
      setIsTransitioning(false);
      isTransitioningRef.current = false;
      scrollAccumulator.current = 0;
      return;
    }

    const scrollAmount = scrollAccumulator.current;
    const bounceDistance = Math.min(Math.abs(scrollAmount) * 0.3, 50);
    const direction = scrollAmount > 0 ? 1 : -1;
    const section = currentSectionRef.current;

    container.style.transition = 'transform 200ms cubic-bezier(0.33, 1, 0.68, 1)';
    container.style.transform = `translateY(${-section * 100 + direction * bounceDistance}vh)`;

    setTimeout(() => {
      container.style.transition = `transform 500ms cubic-bezier(0.4, 0, 0.2, 1)`;
      container.style.transform = `translateY(${-section * 100}vh)`;

      setTimeout(() => {
        setIsTransitioning(false);
        isTransitioningRef.current = false;
        scrollAccumulator.current = 0;
      }, 500);
    }, 200);
  }, []);

  const handleScroll = useCallback(
    (deltaY: number) => {
      if (isTransitioningRef.current) {
        scrollAccumulator.current = 0;
        return;
      }

      const now = Date.now();
      const timeDelta = now - lastScrollTime.current;
      lastScrollTime.current = now;

      if (timeDelta > 150) {
        scrollAccumulator.current = 0;
      }

      scrollAccumulator.current += deltaY;

      const viewportHeight = window.innerHeight;
      const thresholdDistance = viewportHeight * threshold;

      if (Math.abs(scrollAccumulator.current) >= thresholdDistance) {
        const direction = scrollAccumulator.current > 0 ? 1 : -1;
        const nextSection = currentSectionRef.current + direction;

        if (nextSection >= 0 && nextSection < totalSections) {
          goToSection(nextSection);
        } else {
          scrollAccumulator.current = 0;
          setIsTransitioning(false);
          isTransitioningRef.current = false;
        }
      }
    },
    [totalSections, threshold, goToSection]
  );

  const checkThresholdAndBounce = useCallback(() => {
    if (isTransitioningRef.current) {
      scrollAccumulator.current = 0;
      return;
    }

    const viewportHeight = window.innerHeight;
    const thresholdDistance = viewportHeight * threshold;

    if (Math.abs(scrollAccumulator.current) > 0 && Math.abs(scrollAccumulator.current) < thresholdDistance) {
      setIsTransitioning(true);
      isTransitioningRef.current = true;
      handleBounceBack();
    } else {
      scrollAccumulator.current = 0;
    }
  }, [threshold, handleBounceBack]);

  useEffect(() => {
    if (!isDesktop) {
      return;
    }

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      handleScroll(e.deltaY);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioningRef.current) return;

      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
          e.preventDefault();
          if (currentSectionRef.current < totalSections - 1) {
            goToSection(currentSectionRef.current + 1);
          }
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          if (currentSectionRef.current > 0) {
            goToSection(currentSectionRef.current - 1);
          }
          break;
        case 'Home':
          e.preventDefault();
          goToSection(0);
          break;
        case 'End':
          e.preventDefault();
          goToSection(totalSections - 1);
          break;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      scrollAccumulator.current = 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isTransitioningRef.current) {
        e.preventDefault();
        return;
      }

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY.current - touchY;

      handleScroll(deltaY);
      touchStartY.current = touchY;
    };

    const handleTouchEnd = () => {
      checkThresholdAndBounce();
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);

      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [handleScroll, checkThresholdAndBounce, totalSections, goToSection, isDesktop]);

  useEffect(() => {
    if (!isDesktop) return;

    const container = document.getElementById('snap-scroll-container');
    if (!container) return;

    container.style.transition = `transform ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
    container.style.transform = `translateY(${-currentSection * 100}vh)`;
  }, [currentSection, transitionDuration, isDesktop]);

  useEffect(() => {
    if (!isDesktop) return;

    const preventScroll = (e: Event) => e.preventDefault();
    document.body.style.overflow = 'hidden';
    window.addEventListener('scroll', preventScroll, { passive: false });

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('scroll', preventScroll);
    };
  }, [isDesktop]);

  return {
    currentSection,
    isTransitioning,
    goToSection,
  };
}
