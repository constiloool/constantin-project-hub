export type Project = {
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  description: string;
  longDescription: string;
  why: string;
  category: string;
  tags: string[];
  url: string;
  featured: boolean;
  status: "Live" | "Coming Soon";
  features: Array<{
    title: string;
    description: string;
  }>;
};

export const projects: Project[] = [
  {
    slug: "typemydocs",
    name: "TypeMyDocs",
    tagline: "Practice typing with your own documents.",
    shortDescription: "Typing practice with your own PDFs.",
    description:
      "Turn PDFs into focused typing sessions instead of random word drills.",
    longDescription:
      "TypeMyDocs helps users practice typing with documents that actually matter to them. Upload a PDF, work through it section by section, and build better typing habits with relevant material.",
    why:
      "Most typing websites use random words or generic drills. I wanted to make practice feel more personal: a tool where people can train with material they already care about.",
    category: "Learning Tool",
    tags: ["Typing", "PDFs", "Learning", "Productivity"],
    url: "https://typemydocs.vercel.app/",
    featured: true,
    status: "Live",
    features: [
      {
        title: "Upload PDFs",
        description: "Turn documents into practice material.",
      },
      {
        title: "Section-based practice",
        description: "Work through longer texts step by step.",
      },
      {
        title: "Progress tracking",
        description: "See improvement through levels, badges and stats.",
      },
      {
        title: "Learning-focused workflow",
        description: "Practice with material that feels useful and motivating.",
      },
    ],
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
