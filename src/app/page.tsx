import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { RotatingInfoTile } from "@/components/RotatingInfoTile";
import { projects } from "@/data/projects";

export default function Home() {
  const missionSlides = [
    {
      label: "WHY I BUILD",
      title: "Ideas become tools.",
      text: "I turn small ideas into digital projects that help people learn, practice or improve.",
    },
    {
      label: "LEARNING FIRST",
      title: "Built for progress.",
      text: "The goal is not just to make websites, but to create tools that make practice feel useful.",
    },
    {
      label: "EXPERIMENTS",
      title: "Small builds, real lessons.",
      text: "Every project is a way to test an idea, learn faster and create something practical.",
    },
    {
      label: "PROJECT HUB",
      title: "One place for every build.",
      text: "This hub collects the projects I create, from learning tools to productivity experiments.",
    },
  ];

  const principleSlides = [
    {
      label: "PRINCIPLE 01",
      title: "Learn by doing.",
      text: "Projects should help people actively practice instead of only consuming information.",
    },
    {
      label: "PRINCIPLE 02",
      title: "Useful over random.",
      text: "The best tools solve specific problems and make progress easier to see.",
    },
    {
      label: "PRINCIPLE 03",
      title: "Keep experimenting.",
      text: "Each build is a chance to test ideas, improve design and learn something new.",
    },
    {
      label: "PRINCIPLE 04",
      title: "Make it feel good.",
      text: "A simple idea becomes more valuable when the experience is clean, clear and enjoyable.",
    },
  ];

  return (
    <main>
      <section className="hero-shell">
        <div className="hero-panel">
          <div className="hero-layout">
            <div className="hero-main">
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
                <Link className="button button-dark group" href="/projects">
                  Explore Projects <span aria-hidden="true" className="button-arrow">→</span>
                </Link>
                <Link className="button button-ghost group" href="#mission">
                  View Mission <span aria-hidden="true" className="button-arrow">↓</span>
                </Link>
              </div>
            </div>

            <RotatingInfoTile
              title="Mission Tile"
              slides={missionSlides}
              className="hero-info-tile"
            />
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
          A growing collection of tools and experiments. The hub now includes
          focused practice tools for typing and deep work.
        </p>
        <div className="projects-list">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} showExternalLink={false} />
          ))}
        </div>
      </section>

      <section className="values-section">
        <div className="section-heading">
          <span className="eyebrow">* PRINCIPLES</span>
          <span className="section-count">03 / 03</span>
        </div>
        <div className="values-grid values-grid-mixed">
          {[
            ["Learn by doing", "Projects should help people practice actively, not just consume information."],
            ["Build useful things", "Small tools should solve specific problems and feel practical."],
          ].map(([title, text]) => (
            <article className="value-card" key={title}>
              <span aria-hidden="true">✦</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
          <RotatingInfoTile
            title="Principles Tile"
            slides={principleSlides}
            className="principle-rotator"
          />
        </div>
      </section>
    </main>
  );
}
