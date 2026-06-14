import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
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
            Projects that help people learn, practice and improve.
          </h1>
          <p className="hero-copy">
            A personal hub for digital tools built around learning, focus and
            self-improvement.
          </p>
          <div className="hero-actions">
            <Link className="button button-light group" href="/projects">
              Explore Projects <span aria-hidden="true" className="button-arrow">→</span>
            </Link>
            <Link className="button button-ghost group" href="/projects/typemydocs">
              View TypeMyDocs <span aria-hidden="true" className="button-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section-grid">
        <div>
          <span className="eyebrow">* WHY I BUILD</span>
        </div>
        <div>
          <h2 className="section-title">Small tools, clear purpose.</h2>
          <p className="section-copy">
            I build small digital projects that turn ideas into useful tools. Some help
            with studying, some with practice, and others are experiments in making
            focused work feel better.
          </p>
        </div>
      </section>

      <section className="wide-section">
        <div className="section-heading">
          <span className="eyebrow">* FEATURED BUILD</span>
          <span className="section-count">02 / 03</span>
        </div>
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
            ["Useful over random", "Tools should solve specific problems and feel practical."],
            ["Small ideas, polished execution", "Even simple projects can feel valuable when the experience is clean."],
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
