import { useEffect, useRef } from 'react';

const animationClasses = {
  'reveal': 'reveal-base',
  'reveal-left': 'reveal-left',
  'reveal-right': 'reveal-right',
  'stagger-children': 'stagger-children',
};

export default function ScrollReveal({
  children,
  animation = 'reveal',
  threshold = 0.15,
  rootMargin = '0px 0px -50px 0px',
  className = '',
  as: Tag = 'div',
  ...props
}) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      element.classList.add('revealed');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const animClass = animationClasses[animation] || animation;

  return (
    <Tag ref={ref} className={`${animClass} ${className}`} {...props}>
      {children}
    </Tag>
  );
}
