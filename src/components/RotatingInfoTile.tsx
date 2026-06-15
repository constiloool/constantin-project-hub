"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export type RotatingInfoSlide = {
  label: string;
  title: string;
  text: string;
  button?: {
    label: string;
    href: string;
    external?: boolean;
  };
};

type RotatingInfoTileProps = {
  title: string;
  slides: RotatingInfoSlide[];
  intervalMs?: number;
  className?: string;
};

export function RotatingInfoTile({
  title,
  slides,
  intervalMs = 5200,
  className = "",
}: RotatingInfoTileProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const hasMultipleSlides = slides.length > 1;
  const activeSlide = slides[activeIndex] ?? slides[0];

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") {
      return true;
    }

    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (!hasMultipleSlides || paused || prefersReducedMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, intervalMs);

    return () => window.clearInterval(interval);
  }, [hasMultipleSlides, intervalMs, paused, prefersReducedMotion, slides.length]);

  if (!activeSlide) {
    return null;
  }

  return (
    <article
      className={`rotating-tile ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label={title}
    >
      <div className="rotating-tile-content" key={activeSlide.title}>
        <span className="rotating-tile-label">{activeSlide.label}</span>
        <h3>{activeSlide.title}</h3>
        <p>{activeSlide.text}</p>

        {activeSlide.button ? (
          activeSlide.button.external ? (
            <a
              className="rotating-tile-link"
              href={activeSlide.button.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {activeSlide.button.label} <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <Link className="rotating-tile-link" href={activeSlide.button.href}>
              {activeSlide.button.label} <span aria-hidden="true">→</span>
            </Link>
          )
        ) : null}
      </div>

      {hasMultipleSlides ? (
        <div className="rotating-tile-dots" aria-label={`${title} slides`}>
          {slides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              aria-label={`Show ${slide.title}`}
              aria-pressed={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      ) : null}
    </article>
  );
}
