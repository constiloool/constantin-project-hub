import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { projectPlaceholders, projects } from "@/data/projects";

const featuredProject = projects.find((project) => project.featured) ?? projects[0];

export default function Home() {
  return (
    <main>
      <section className="hero-shell">
        <div className="hero-panel">
          <div className="hero-topline">
            <span>* THE PROJECT HUB</span>
            <span>01 / 04</span>
          </div>
          <h1 className="hero-title">
            Projects that help people learn, practice and improve.
          </h1>
          <p className="hero-copy">
            A personal hub for digital projects designed to make learning, practicing and
            self-improvement feel more focused, useful and enjoyable.
          </p>
          <div className="hero-actions">
            <Link className="button button-light group" href="/projects">
              Explore Projects <span aria-hidden="true" className="button-arrow">→</span>
            </Link>
            <Link className="button button-ghost group" href="/projects/typemydocs">
              View TypeMyDocs <span aria-hidden="true" className="button-arrow">→</span>
            </Link>
          </div>
          <div className="float-card float-one">Learning Tools</div>
          <div className="float-card float-two">Practice Apps</div>
          <div className="float-card float-three">Built with curiosity</div>
        </div>
      </section>

      <section id="about" className="section-grid">
        <div>
          <span className="eyebrow">* WHY I BUILD</span>
        </div>
        <div>
          <h2 className="section-title">
            I turn small ideas into focused digital tools.
          </h2>
          <p className="section-copy">
            I like creating projects that turn ideas into useful products. Some help you
            learn faster, some make practice more focused, and others are experiments in
            building calmer, better digital experiences.
          </p>
        </div>
      </section>

      <section className="wide-section">
        <div className="section-heading">
          <span className="eyebrow">* FEATURED BUILD</span>
          <span className="section-count">02 / 04</span>
        </div>
        <ProjectCard project={featuredProject} large />
      </section>

      <section className="values-section">
        <div className="section-heading">
          <span className="eyebrow">* PRINCIPLES</span>
          <span className="section-count">03 / 04</span>
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

      <section className="wide-section">
        <div className="section-heading">
          <span className="eyebrow">* PROJECT PREVIEW</span>
          <span className="section-count">04 / 04</span>
        </div>
        <div className="preview-grid">
          <Link className="mini-project live" href="/projects/typemydocs">
            <span>Live Project</span>
            <strong>TypeMyDocs</strong>
            <p>Typing practice with your own PDFs.</p>
          </Link>
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
