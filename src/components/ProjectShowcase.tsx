"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Project } from "@/data/projects";
import { RotatingInfoTile, type RotatingInfoSlide } from "@/components/RotatingInfoTile";

type ProjectShowcaseProps = {
  projects: Project[];
};

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasMultipleProjects = projects.length > 1;
  const activeProject = projects[activeIndex] ?? projects[0];

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") {
      return true;
    }

    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (!hasMultipleProjects || prefersReducedMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % projects.length);
    }, 6500);

    return () => window.clearInterval(interval);
  }, [hasMultipleProjects, prefersReducedMotion, projects.length]);

  if (!activeProject) {
    return null;
  }

  const featuredSlides: RotatingInfoSlide[] = [
    {
      label: "FEATURED PROJECT",
      title: activeProject.name,
      text: "Practice typing with your own PDFs instead of random word drills.",
      button: {
        label: "View Project",
        href: `/projects/${activeProject.slug}`,
      },
    },
    {
      label: "WHY IT EXISTS",
      title: "Practice should feel relevant.",
      text: "TypeMyDocs turns real documents into structured typing sessions, so training feels more useful.",
      button: {
        label: "View Project",
        href: `/projects/${activeProject.slug}`,
      },
    },
    {
      label: "HOW IT WORKS",
      title: "Upload. Type. Improve.",
      text: "Add a PDF, work through sections, skip when needed and track your progress over time.",
      button: {
        label: "View Project",
        href: `/projects/${activeProject.slug}`,
      },
    },
    {
      label: "LIVE APP",
      title: "Try the first project.",
      text: "TypeMyDocs is the first live project in this hub and will be followed by more experiments.",
      button: {
        label: "Open App",
        href: activeProject.url,
        external: true,
      },
    },
  ];

  return (
    <section className="showcase-section" aria-labelledby="project-showcase-title">
      <div className="section-heading">
        <span className="eyebrow">Current Projects</span>
        <span className="section-count">Featured tile</span>
      </div>

      <article className="showcase-card">
        <div className="showcase-content">
          <div className="showcase-meta">
            <span>{activeProject.category}</span>
            <span>{activeProject.status}</span>
          </div>
          <h2 id="project-showcase-title">{activeProject.name}</h2>
          <p>{activeProject.description}</p>

          <div className="tag-row" aria-label={`${activeProject.name} tags`}>
            {activeProject.tags.map((tag) => (
              <span className="tag" key={tag}>{tag}</span>
            ))}
          </div>

          <div className="showcase-actions">
            <Link className="button button-dark group" href={`/projects/${activeProject.slug}`}>
              View Project <span aria-hidden="true" className="button-arrow">→</span>
            </Link>
            <a
              className="button button-light group"
              href={activeProject.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open App <span aria-hidden="true" className="button-arrow">↗</span>
            </a>
          </div>
        </div>

        <div className="showcase-visual">
          <div className="aero-orb orb-large" aria-hidden="true" />
          <div className="aero-orb orb-small" aria-hidden="true" />
          <RotatingInfoTile
            title="Featured Project Tile"
            slides={featuredSlides}
            intervalMs={5600}
            className="featured-rotator"
          />
        </div>
      </article>

      {hasMultipleProjects ? (
        <div className="showcase-tabs" aria-label="Choose featured project">
          {projects.map((project, index) => (
            <button
              key={project.slug}
              type="button"
              aria-pressed={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            >
              {project.name}
            </button>
          ))}
        </div>
      ) : null}
    </section>
  );
}
