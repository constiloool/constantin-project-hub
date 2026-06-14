import Link from "next/link";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  large?: boolean;
};

export function ProjectCard({ project, large = false }: ProjectCardProps) {
  return (
    <article className={`project-card group ${large ? "lg:col-span-2" : ""}`}>
      <div className="flex items-center justify-between gap-4">
        <span className="eyebrow">{project.category}</span>
        <span className="rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white">
          {project.status}
        </span>
      </div>
      <div className="mt-10 grid gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-end">
        <div>
          <h3 className="text-5xl font-semibold leading-none tracking-tight md:text-7xl">
            {project.name}
          </h3>
          <p className="mt-5 max-w-xl text-lg leading-tight text-ink/68">
            {project.description}
          </p>
        </div>
        <div className="mock-window" aria-hidden="true">
          <div className="mock-bar">
            <span />
            <span />
            <span />
          </div>
          <div className="mock-lines">
            <strong>PDF Practice</strong>
            <span>Section 3 of 12</span>
            <div className="mock-progress">
              <i />
            </div>
          </div>
          <div className="mock-stats">
            <b>72 WPM</b>
            <b>97%</b>
          </div>
        </div>
      </div>
      <div className="mt-10 flex flex-wrap items-center justify-between gap-5">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <Link className="button button-dark group" href={`/projects/${project.slug}`}>
            View Project <span aria-hidden="true" className="button-arrow">→</span>
          </Link>
          <a
            className="button button-light group"
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open App <span aria-hidden="true" className="button-arrow">↗</span>
          </a>
        </div>
      </div>
    </article>
  );
}
