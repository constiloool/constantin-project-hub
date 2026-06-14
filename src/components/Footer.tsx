import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer">
      <div>
        <strong>Constantin Projects</strong>
        <p>Built as a growing archive of experiments, tools and learning projects.</p>
      </div>
      <nav aria-label="Footer navigation">
        <Link href="/projects">Projects</Link>
        <Link href="/projects/typemydocs">TypeMyDocs</Link>
        <a href="https://typemydocs.vercel.app/" target="_blank" rel="noopener noreferrer">
          Open TypeMyDocs App
        </a>
      </nav>
    </footer>
  );
}
