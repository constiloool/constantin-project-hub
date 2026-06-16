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
  showcaseSlides: Array<{
    label: string;
    title: string;
    text: string;
    buttonLabel?: string;
    external?: boolean;
  }>;
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
    showcaseSlides: [
      {
        label: "FEATURED PROJECT",
        title: "TypeMyDocs",
        text: "Practice typing with your own PDFs instead of random word drills.",
        buttonLabel: "View Project",
      },
      {
        label: "WHY IT EXISTS",
        title: "Practice should feel relevant.",
        text: "TypeMyDocs turns real documents into structured typing sessions, so training feels more useful.",
        buttonLabel: "View Project",
      },
      {
        label: "HOW IT WORKS",
        title: "Upload. Type. Improve.",
        text: "Add a PDF, work through sections, skip when needed and track your progress over time.",
        buttonLabel: "View Project",
      },
      {
        label: "LIVE APP",
        title: "Try TypeMyDocs.",
        text: "Open the live app and start practicing with a document that matters to you.",
        buttonLabel: "Open App",
        external: true,
      },
    ],
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
  {
    slug: "focus-timer",
    name: "Focus Timer",
    tagline: "Ein personalisierbarer Pomodoro-Timer für Deep Work, Lernen und produktive Pausen.",
    shortDescription: "Pomodoro-Timer mit analogem Dial, Fullscreen-Modus und Custom Settings.",
    description:
      "Ein fokussierter Timer für Deep Work, Lernen und Pausen.",
    longDescription:
      "Focus Timer kombiniert eine digitale Countdown-Uhr mit einem analogen Pomodoro-Dial. Nutzer können Fokuszeiten, Pausenlängen, Farben und den Fullscreen-Fokusmodus individuell anpassen. Die App ist dafür gebaut, beim Lernen oder Arbeiten möglichst wenig abzulenken und trotzdem visuell motivierend zu wirken.",
    why:
      "Fokus-Tools sollten ruhig, schnell verständlich und persönlich anpassbar sein. Focus Timer macht Pomodoro-Sessions sichtbar, groß und angenehm genug, um ihn wirklich während Lern- oder Arbeitsphasen offen zu lassen.",
    category: "Focus Tool",
    tags: ["Pomodoro", "Fullscreen", "Custom Colors", "Custom Time", "Focus Mode"],
    url: "https://pomodoro-dial.vercel.app/",
    featured: false,
    status: "Live",
    showcaseSlides: [
      {
        label: "FOCUS TIMER",
        title: "Focus Timer",
        text: "Ein Pomodoro-Timer für konzentrierte Arbeitsphasen.",
        buttonLabel: "View Project",
      },
      {
        label: "FULLSCREEN FOCUS",
        title: "Fullscreen Focus",
        text: "Starte den Fokusmodus und lass nur noch die Uhr sichtbar.",
        buttonLabel: "View Project",
      },
      {
        label: "CUSTOM SETTINGS",
        title: "Custom Settings",
        text: "Passe Farben, Fokuszeit und Pausen genau an deinen Workflow an.",
        buttonLabel: "View Project",
      },
      {
        label: "ANALOG FEEL",
        title: "Analog Feel",
        text: "Der digitale Timer läuft mit einem analogen Pomodoro-Dial.",
        buttonLabel: "Open App",
        external: true,
      },
    ],
    features: [
      {
        title: "Digitaler Pomodoro-Countdown",
        description: "Klare Fokus-, Kurzpausen- und Long-Break-Sessions.",
      },
      {
        title: "Analoger Timer-Dial",
        description: "Ein großer Kreis zeigt sichtbar, wie viel Zeit übrig bleibt.",
      },
      {
        title: "Fullscreen-Fokusmodus",
        description: "Eine ruhige, zentrierte Uhr ohne unnötige Ablenkungen.",
      },
      {
        title: "Custom Fokuszeiten",
        description: "Fokus-, Pausen- und Long-Break-Zeiten lassen sich frei einstellen.",
      },
      {
        title: "Anpassbare Farben",
        description: "Themes und eigene Farben machen den Timer persönlicher.",
      },
      {
        title: "Browser-Speicherung",
        description: "Zeit- und Farbeinstellungen bleiben beim nächsten Besuch erhalten.",
      },
      {
        title: "Responsive Design",
        description: "Der Timer bleibt auf Desktop und Mobile klar nutzbar.",
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
