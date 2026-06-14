import type { Metadata } from "next";
import Link from "next/link";
import { getProject } from "@/data/projects";

const project = getProject("typemydocs");

export const metadata: Metadata = {
  title: "TypeMyDocs — Practice Typing With Your Own Documents",
  description:
    "TypeMyDocs turns PDFs into focused typing practice sessions with sections, progress and learning-oriented features.",
};

export default function TypeMyDocsPage() {
  if (!project) {
    return null;
  }

  return (
    <main className="page-stack">
      <section className="project-hero">
        <div>
          <span className="eyebrow">* LIVE PROJECT</span>
          <h1>{project.name}</h1>
          <p>Practice typing with your own documents instead of random word drills.</p>
          <p className="external-note">The button below opens the live TypeMyDocs app in a new tab.</p>
          <div className="hero-actions">
            <a
              className="button button-light group"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open TypeMyDocs App <span aria-hidden="true" className="button-arrow">↗</span>
            </a>
            <Link className="button button-ghost group" href="/projects">
              Back to Projects <span aria-hidden="true" className="button-arrow">→</span>
            </Link>
          </div>
        </div>
        <div className="detail-mockup" aria-label="Stylized TypeMyDocs product preview">
          <div className="detail-mockup-header">
            <span>PDF Upload</span>
            <b>Section 3 of 12</b>
          </div>
          <div className="typing-line active">Practice typing with your own documents.</div>
          <div className="typing-line">Build better habits with relevant material.</div>
          <div className="typing-line short">Track progress over time.</div>
          <div className="metric-row">
            <div><strong>72</strong><span>WPM</span></div>
            <div><strong>97%</strong><span>Accuracy</span></div>
            <div><strong>68%</strong><span>Level Progress</span></div>
          </div>
        </div>
      </section>

      <section className="section-grid">
        <div><span className="eyebrow">* WHAT IT IS</span></div>
        <div>
          <h2 className="section-title">Typing practice with material that matters.</h2>
          <p className="section-copy">
            TypeMyDocs turns PDFs into structured typing sessions. Upload a document,
            work through it section by section, and build better typing habits with
            material that actually matters to you.
          </p>
        </div>
      </section>

      <section className="section-grid">
        <div><span className="eyebrow">* WHY I BUILT IT</span></div>
        <div>
          <h2 className="section-title">Less generic practice. More personal progress.</h2>
          <p className="section-copy">
            Most typing websites use random words or generic drills. I wanted to build
            something more personal and useful: a tool where people can practice with
            material that actually matters to them.
          </p>
        </div>
      </section>

      <section className="values-section">
        <div className="section-heading">
          <span className="eyebrow">* FEATURES</span>
          <span className="section-count">Built for practice</span>
        </div>
        <div className="values-grid">
          {[
            ["Upload PDFs", "Turn documents into practice material."],
            ["Section-based practice", "Work through longer texts step by step."],
            ["Progress tracking", "See improvement through levels, badges and stats."],
            ["Learning-focused design", "Built to make typing practice more useful and motivating."],
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
