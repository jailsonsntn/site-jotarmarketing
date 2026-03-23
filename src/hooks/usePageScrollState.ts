import { useEffect, useRef, useState } from "react";

type PageScrollState = {
  scrolled: boolean;
  scrollY: number;
  scrollProgress: number;
};

const INITIAL_STATE: PageScrollState = {
  scrolled: false,
  scrollY: 0,
  scrollProgress: 0,
};

export const usePageScrollState = (threshold = 12) => {
  const [state, setState] = useState<PageScrollState>(INITIAL_STATE);
  const frameRef = useRef<number | null>(null);
  const stateRef = useRef<PageScrollState>(INITIAL_STATE);

  useEffect(() => {
    const measure = () => {
      frameRef.current = null;

      const nextScrollY = window.scrollY;
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
      const nextState = {
        scrolled: nextScrollY > threshold,
        scrollY: nextScrollY,
        scrollProgress: maxScroll > 0 ? (nextScrollY / maxScroll) * 100 : 0,
      };

      const previous = stateRef.current;
      if (
        previous.scrolled === nextState.scrolled &&
        previous.scrollY === nextState.scrollY &&
        previous.scrollProgress === nextState.scrollProgress
      ) {
        return;
      }

      stateRef.current = nextState;
      setState(nextState);
    };

    const scheduleMeasure = () => {
      if (frameRef.current !== null) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(measure);
    };

    scheduleMeasure();

    window.addEventListener("scroll", scheduleMeasure, { passive: true });
    window.addEventListener("resize", scheduleMeasure);

    return () => {
      window.removeEventListener("scroll", scheduleMeasure);
      window.removeEventListener("resize", scheduleMeasure);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [threshold]);

  return state;
};