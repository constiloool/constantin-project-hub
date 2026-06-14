export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  category: string;
  tags: string[];
  url: string;
  featured: boolean;
  status: "Live" | "Coming Soon";
};

export const projects: Project[] = [
  {
    slug: "typemydocs",
    name: "TypeMyDocs",
    tagline: "Practice typing with your own documents.",
    description:
      "Turn PDFs into focused typing sessions and improve your typing with material that actually matters.",
    longDescription:
      "TypeMyDocs is a typing practice app built around the idea that practicing should feel relevant. Instead of typing random generated words, users can upload PDFs and turn real documents into structured typing sessions.",
    category: "Learning Tool",
    tags: ["Typing", "PDFs", "Learning", "Productivity"],
    url: "https://typemydocs.vercel.app/",
    featured: true,
    status: "Live",
  },
];

export const projectPlaceholders = [
  {
    name: "Study Tools",
    description: "Future experiments for active recall, notes and better study loops.",
  },
  {
    name: "Focus Apps",
    description: "Small utilities for deeper work, attention and everyday momentum.",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
