
import { useEffect, useRef } from 'react';

interface UseScrollZoomOptions {
  threshold?: number;
  rootMargin?: string;
  zoomInClass?: string;
  zoomOutClass?: string;
}

export const useScrollZoom = <T extends HTMLElement = HTMLDivElement>(options: UseScrollZoomOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -100px 0px',
    zoomInClass = 'animate-zoom-in',
    zoomOutClass = 'animate-zoom-out'
  } = options;

  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Element is entering viewport - zoom in
            entry.target.classList.remove(zoomOutClass);
            entry.target.classList.add(zoomInClass);
          } else {
            // Element is leaving viewport - zoom out
            entry.target.classList.remove(zoomInClass);
            entry.target.classList.add(zoomOutClass);
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, zoomInClass, zoomOutClass]);

  return elementRef;
};
