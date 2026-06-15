import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { projects } from "@/data/projects";

const featuredProject = projects.find((project) => project.featured) ?? projects[0];

export default function Home() {
  return (
    <main>
      <section className="hero-shell">
        <div className="hero-panel">
          <div className="hero-topline">
            <span>* THE PROJECT HUB</span>
            <span>01 / 03</span>
          </div>
          <h1 className="hero-title">
            A growing hub for useful digital experiments.
          </h1>
          <p className="hero-copy">
            I build digital projects out of curiosity - tools that help people
            learn, practice, focus or improve in some way.
          </p>
          <div className="hero-actions">
            <Link className="button button-light group" href="/projects">
              Explore Projects <span aria-hidden="true" className="button-arrow">→</span>
            </Link>
            <Link className="button button-ghost group" href="#mission">
              View Mission <span aria-hidden="true" className="button-arrow">↓</span>
            </Link>
          </div>
        </div>
      </section>

      <ProjectShowcase projects={projects} />

      <section id="mission" className="section-grid">
        <div>
          <span className="eyebrow">* WHY I BUILD</span>
        </div>
        <div>
          <h2 className="section-title">I like turning ideas into useful digital products.</h2>
          <p className="section-copy">
            Some are built to make learning easier, some help with focused practice,
            and others are experiments in improving everyday workflows.
          </p>
        </div>
      </section>

      <section className="wide-section">
        <div className="section-heading">
          <span className="eyebrow">Current Projects Preview</span>
          <span className="section-count">From projects.ts</span>
        </div>
        <p className="section-intro">
          A growing collection of tools and experiments. Right now, the first live
          project is {featuredProject.name}.
        </p>
        <ProjectCard project={featuredProject} large showExternalLink={false} />
      </section>

      <section className="values-section">
        <div className="section-heading">
          <span className="eyebrow">* PRINCIPLES</span>
          <span className="section-count">03 / 03</span>
        </div>
        <div className="values-grid">
          {[
            ["Learn by doing", "Projects should help people practice actively, not just consume information."],
            ["Build useful things", "Small tools should solve specific problems and feel practical."],
            ["Keep experimenting", "Curiosity makes room for new ideas, sharper skills and better workflows."],
          ].map(([title, text]) => (
            <article className="value-card" key={title}>
              <span aria-hidden="true">✦</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
