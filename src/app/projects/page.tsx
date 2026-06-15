import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";

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
          A growing collection of projects built around learning, practice and useful
          digital experiments.
        </p>
      </section>

      <section className="wide-section">
        <div className="projects-list">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

    </main>
  );
}
