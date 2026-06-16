import type { Metadata } from "next";
import Link from "next/link";
import { getProject, projects } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {
      title: "Project — Constantin Projects",
    };
  }

  return {
    title: `${project.name} — ${project.tagline}`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return null;
  }

  const isTypeMyDocs = project.slug === "typemydocs";
  const isFocusTimer = project.slug === "focus-timer";
  const openLabel = isFocusTimer ? "Focus Timer öffnen" : `Open ${project.name} App`;

  return (
    <main className="page-stack">
      <section className="project-hero">
        <div className="project-hero-content">
          <div className="project-hero-meta">
            <span className="eyebrow">* PROJECT</span>
            <span className="status-pill">{project.status}</span>
          </div>
          <h1>{project.name}</h1>
          <p>{project.tagline}</p>
          <p className="project-hero-description">{project.description}</p>
          <p className="external-note">The primary action opens the live app in a new tab.</p>
          <div className="hero-actions">
            <a
              className="button button-light group"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {openLabel} <span aria-hidden="true" className="button-arrow">↗</span>
            </a>
            <Link className="button button-ghost group" href="/projects">
              Back to Projects <span aria-hidden="true" className="button-arrow">→</span>
            </Link>
          </div>
        </div>
        <div className={`detail-mockup ${isFocusTimer ? "timer-detail-mockup" : ""}`} aria-label={`${project.name} product preview`}>
          {isFocusTimer ? (
            <>
              <div className="detail-mockup-header">
                <span>Focus Session</span>
                <b>25:00</b>
              </div>
              <div className="timer-detail-dial">
                <span>25:00</span>
              </div>
              <div className="metric-row">
                <div><strong>Focus</strong><span>Mode</span></div>
                <div><strong>Custom</strong><span>Time</span></div>
                <div><strong>Saved</strong><span>Settings</span></div>
              </div>
            </>
          ) : (
            <>
              <div className="detail-mockup-header">
                <span>{isTypeMyDocs ? "PDF Upload" : "Project Preview"}</span>
                <b>{isTypeMyDocs ? "Section 3 of 12" : project.status}</b>
              </div>
              <div className="typing-line active">{project.tagline}</div>
              <div className="typing-line">{project.description}</div>
              <div className="typing-line short">Built for useful, focused practice.</div>
              <div className="metric-row">
                <div><strong>Live</strong><span>Status</span></div>
                <div><strong>{project.tags[0]}</strong><span>Focus</span></div>
                <div><strong>{project.tags[1]}</strong><span>Area</span></div>
              </div>
            </>
          )}
        </div>
      </section>

      <section className="section-grid">
        <div><span className="eyebrow">* OVERVIEW</span></div>
        <div>
          <h2 className="section-title">What this project is</h2>
          <p className="section-copy">{project.longDescription}</p>
        </div>
      </section>

      <section className="section-grid">
        <div><span className="eyebrow">* WHY I BUILT IT</span></div>
        <div>
          <h2 className="section-title">The idea behind it</h2>
          <p className="section-copy">{project.why}</p>
        </div>
      </section>

      <section className="values-section">
        <div className="section-heading">
          <span className="eyebrow">* FEATURES</span>
          <span className="section-count">Built for practice</span>
        </div>
        <div className="values-grid">
          {project.features.map((feature) => (
            <article className="value-card" key={feature.title}>
              <span aria-hidden="true">✦</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-panel">
        <span className="eyebrow">* OPEN THE LIVE APP</span>
        <h2>Try {project.name}.</h2>
        <a
          className="button button-light group"
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {openLabel} <span aria-hidden="true" className="button-arrow">↗</span>
        </a>
      </section>
    </main>
  );
}
