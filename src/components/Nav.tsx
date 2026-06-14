"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/data/projects";

export function Nav() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 py-4 md:px-8">
      <nav className="nav-shell" aria-label="Main navigation">
        <Link href="/" className="nav-brand" onClick={() => setOpen(false)}>
          Constantin Projects
        </Link>

        <div className="nav-links">
          <Link href="/" className="nav-link" onClick={() => setOpen(false)}>
            Home
          </Link>

          <div className="project-menu" ref={dropdownRef}>
            <button
              type="button"
              className="nav-link project-menu-trigger"
              aria-expanded={open}
              aria-controls="project-menu-list"
              onClick={() => setOpen((value) => !value)}
            >
              Projects <span aria-hidden="true">⌄</span>
            </button>

            <div
              id="project-menu-list"
              className="project-menu-panel"
              data-open={open}
            >
              <Link
                href="/projects"
                className="project-menu-overview"
                onClick={() => setOpen(false)}
              >
                All Projects
              </Link>
              {projects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="project-menu-item"
                  onClick={() => setOpen(false)}
                >
                  <span>
                    <strong>{project.name}</strong>
                    <small>{project.shortDescription}</small>
                  </span>
                  <em>{project.status}</em>
                </Link>
              ))}
            </div>
          </div>

          <Link href="/#mission" className="nav-link" onClick={() => setOpen(false)}>
            Mission
          </Link>
        </div>

        <Link className="button button-dark group text-xs" href="/projects">
          Explore Projects
          <span aria-hidden="true" className="button-arrow">→</span>
        </Link>
      </nav>
    </header>
  );
}
