import Link from "next/link";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "mailto:hello@example.com" },
];

export function Nav() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 py-4 md:px-8">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/60 bg-cloud/80 px-4 py-3 shadow-soft backdrop-blur-xl">
        <Link href="/" className="text-sm font-semibold tracking-tight text-ink">
          Constantin Projects
        </Link>
        <div className="hidden items-center gap-7 text-xs font-medium text-ink/60 md:flex">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="transition hover:text-ink">
              {item.label}
            </Link>
          ))}
        </div>
        <Link className="button button-dark group text-xs" href="/projects">
          Explore
          <span aria-hidden="true" className="button-arrow">→</span>
        </Link>
      </nav>
    </header>
  );
}
