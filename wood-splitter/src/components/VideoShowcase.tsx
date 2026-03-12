'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function VideoShowcase({
  src,
  poster,
  className = '',
  scrollDriven = false,
  scrollHeight = '300vh',
}: {
  src: string;
  poster?: string;
  className?: string;
  /** When true, video playback is controlled by scroll position instead of autoplay */
  scrollDriven?: boolean;
  /** Height of the scroll container (controls how much scrolling = full video). Default: 300vh */
  scrollHeight?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const rafRef = useRef<number>(0);

  const handleScroll = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      const video = videoRef.current;
      const container = containerRef.current;
      if (!video || !container || !video.duration) return;

      const rect = container.getBoundingClientRect();
      const scrollableDistance = container.offsetHeight - window.innerHeight;

      if (scrollableDistance <= 0) return;

      // How far through the container we've scrolled (0 to 1)
      const scrolled = -rect.top / scrollableDistance;
      const progress = Math.max(0, Math.min(1, scrolled));

      video.currentTime = progress * video.duration;
    });
  }, []);

  // Scroll-driven mode
  useEffect(() => {
    if (!scrollDriven || prefersReducedMotion) return;

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [scrollDriven, prefersReducedMotion, handleScroll]);

  // Autoplay mode (original behavior)
  useEffect(() => {
    if (scrollDriven) return;
    const video = videoRef.current;
    if (!video || prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [prefersReducedMotion, scrollDriven]);

  if (prefersReducedMotion && poster) {
    return (
      <img
        src={poster}
        alt="BOWS 20 product showcase"
        data-product-video-poster
        className={className}
      />
    );
  }

  // Scroll-driven layout: tall container with sticky video
  if (scrollDriven) {
    return (
      <div ref={containerRef} style={{ height: scrollHeight }} className="relative">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-dark">
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            muted
            playsInline
            preload="auto"
            data-product-video
            className={className}
          />
        </div>
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      data-product-video
      className={className}
    />
  );
}
