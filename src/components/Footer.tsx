import Link from "next/link";
import { projects } from "@/data/projects";

export function Footer() {
  return (
    <footer className="footer">
      <div>
        <strong>Constantin Projects</strong>
        <p>Built as a growing archive of experiments, tools and learning projects.</p>
      </div>
      <nav aria-label="Footer navigation">
        <Link href="/">Home</Link>
        <Link href="/projects">Projects</Link>
        {projects.map((project) => (
          <Link key={project.slug} href={`/projects/${project.slug}`}>
            {project.name}
          </Link>
        ))}
      </nav>
    </footer>
  );
}
