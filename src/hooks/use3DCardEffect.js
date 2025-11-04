import { useState, useEffect, useRef } from 'react';

const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

export const use3DCardEffect = (containerRef, options = {}) => {
  const {
    maxRotation = 10,
    maxShineOpacity = 0.6,
    scaleOnHover = 1.05,
    perspective = 1000,
  } = options;

  const [style, setStyle] = useState({});
  const [shineStyle, setShineStyle] = useState({});
  const prefersReducedMotion = usePrefersReducedMotion();
  const rafId = useRef(null);

  const containerStyle = {
    perspective: `${perspective}px`,
  };

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame(() => {
        const { left, top, width, height } = container.getBoundingClientRect();

        const x = e.clientX - left;
        const y = e.clientY - top;
        const centerX = width / 2;
        const centerY = height / 2;
        const relativeX = x - centerX;
        const relativeY = y - centerY;

        const normX = relativeX / centerX;
        const normY = relativeY / centerY;

        const rotateY = normX * maxRotation;
        const rotateX = -normY * maxRotation;

        const shineAngle = Math.atan2(relativeY, relativeX) * (180 / Math.PI) - 90;
        const shineOpacity = Math.min(
          Math.sqrt(normX ** 2 + normY ** 2) * maxShineOpacity,
          maxShineOpacity
        );

        setStyle({
          transform: `scale(${scaleOnHover}) translateZ(20px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          willChange: 'transform',
          transition: 'transform 0.05s ease-out',
        });

        setShineStyle({
          opacity: shineOpacity,
          background: `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.8), transparent 40%)`,
          willChange: 'opacity, background',
        });
      });
    };

    const handleMouseLeave = () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      setStyle({
        transform: 'scale(1) translateZ(0) rotateX(0deg) rotateY(0deg)',
        willChange: 'transform',
        transition: 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
      });
      setShineStyle({
        opacity: 0,
        willChange: 'opacity',
        transition: 'opacity 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [containerRef, prefersReducedMotion, maxRotation, maxShineOpacity, scaleOnHover]);

  return { style, shineStyle, containerStyle };
};