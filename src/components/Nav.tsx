import Link from "next/link";

const navItems = [
  { label: "Projects", href: "/projects" },
  { label: "TypeMyDocs", href: "/projects/typemydocs" },
];

export function Nav() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 py-4 md:px-8">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/60 bg-cloud/80 px-4 py-3 shadow-soft backdrop-blur-xl">
        <Link href="/" className="text-sm font-semibold tracking-tight text-ink">
          Constantin Projects
        </Link>
        <div className="nav-links">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="transition hover:text-ink">
              {item.label}
            </Link>
          ))}
        </div>
        <a
          className="button button-dark group text-xs"
          href="https://typemydocs.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open TypeMyDocs
          <span aria-hidden="true" className="button-arrow">→</span>
        </a>
      </nav>
    </header>
  );
}
