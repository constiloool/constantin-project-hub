import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
import { projectPlaceholders, projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects — Constantin Projects",
  description:
    "A growing collection of tools built around learning, practice and personal progress.",
};

export default function ProjectsPage() {
  return (
    <main className="page-stack">
      <section className="simple-hero">
        <span className="eyebrow">* ALL BUILDS</span>
        <h1>Projects</h1>
        <p>
          A growing collection of tools built around learning, practice and personal
          progress.
        </p>
      </section>

      <section className="wide-section">
        <div className="projects-list">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="wide-section">
        <div className="section-heading">
          <span className="eyebrow">* NEXT AREAS</span>
          <span className="section-count">Growing archive</span>
        </div>
        <div className="preview-grid">
          {projectPlaceholders.map((project) => (
            <div className="mini-project muted" key={project.name}>
              <span>Coming Soon</span>
              <strong>{project.name}</strong>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
