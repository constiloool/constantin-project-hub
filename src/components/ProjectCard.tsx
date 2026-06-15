import Link from "next/link";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  large?: boolean;
  showExternalLink?: boolean;
};

export function ProjectCard({ project, large = false, showExternalLink = true }: ProjectCardProps) {
  return (
    <article className={`project-card group ${large ? "lg:col-span-2" : ""}`}>
      <div className="flex items-center justify-between gap-4">
        <span className="eyebrow">{project.category}</span>
        <span className="rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white">
          {project.status}
        </span>
      </div>
      <div className="project-card-body">
        <div className="min-w-0">
          <h3 className="project-card-title">
            {project.name}
          </h3>
          <p className="project-card-copy">
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
      <div className="project-card-footer">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <Link className="button button-dark group" href={`/projects/${project.slug}`}>
            View Project Details <span aria-hidden="true" className="button-arrow">→</span>
          </Link>
          {showExternalLink ? (
            <a
              className="button button-light group"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open {project.name} App <span aria-hidden="true" className="button-arrow">↗</span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
