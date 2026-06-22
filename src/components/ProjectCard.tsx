import Link from "next/link";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  large?: boolean;
  showExternalLink?: boolean;
};

export function ProjectCard({ project, large = false, showExternalLink = true }: ProjectCardProps) {
  const isFocusTimer = project.slug === "focus-timer";
  const isCapitolTrades = project.slug === "capitol-trades-bot";

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
        <div className={`mock-window ${isFocusTimer ? "timer-mock" : ""} ${isCapitolTrades ? "trades-mock" : ""}`} aria-hidden="true">
          <div className="mock-bar">
            <span />
            <span />
            <span />
          </div>
          {isCapitolTrades ? (
            <div className="trades-mock-body">
              <div className="trades-mock-metrics">
                <span><small>Portfolio</small><strong>$10,420</strong></span>
                <span><small>Return</small><strong>+4.2%</strong></span>
              </div>
              <svg viewBox="0 0 320 90" role="presentation">
                <path className="trades-mock-area" d="M4 74 C35 66 48 72 76 59 S120 64 148 43 S195 50 222 30 S275 38 316 12 L316 88 L4 88 Z" />
                <path className="trades-mock-line" d="M4 74 C35 66 48 72 76 59 S120 64 148 43 S195 50 222 30 S275 38 316 12" />
              </svg>
              <div className="trades-mock-row"><b>NVDA</b><span>Copied</span></div>
              <div className="trades-mock-row"><b>TSLA</b><span>Skipped · Age</span></div>
            </div>
          ) : isFocusTimer ? (
            <div className="timer-mock-body">
              <div className="timer-dial-preview">
                <span>25:00</span>
              </div>
              <strong>Focus Mode</strong>
              <span>Custom time + colors</span>
            </div>
          ) : (
            <>
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
            </>
          )}
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
          {showExternalLink && project.url ? (
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
