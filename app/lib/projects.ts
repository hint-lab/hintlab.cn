import projectsData from '../../data/projects.json';

export type Locale = 'zh' | 'en' | 'ja';

type Localized<T> = {
  zh: T;
  en: T;
  ja: T;
};

type ProjectSource = {
  slug: string;
  name: string;
  label: string;
  theme: string;
  link?: string;
  video?: string;
  logo?: string;
  statusTone?: string;
  status?: Localized<string>;
  description: Localized<string>;
  papers?: Array<{
    label: Localized<string>;
    href: Localized<string>;
  }>;
  detail: {
    tagline: Localized<string>;
    overview: Localized<string>;
    highlights: Localized<string[]>;
    sections?: Array<{
      title: Localized<string>;
      body: Localized<string>;
    }>;
  };
};

export type ProjectView = {
  slug: string;
  name: string;
  label: string;
  theme: string;
  link: string;
  video: string;
  logo: string;
  status: string;
  statusTone: string;
  description: string;
  papers: Array<{
    label: string;
    href: string;
  }>;
  detail: {
    tagline: string;
    overview: string;
    highlights: string[];
    sections: Array<{
      title: string;
      body: string;
    }>;
  };
};

const projectSources = projectsData as ProjectSource[];

function pick<T>(field: Localized<T>, locale: Locale): T {
  return field[locale] ?? field.zh;
}

export function getProjects(locale: Locale): ProjectView[] {
  return projectSources.map((project) => ({
    slug: project.slug,
    name: project.name,
    label: project.label,
    theme: project.theme,
    link: project.link || '',
    video: project.video || '',
    logo: project.logo || '',
    status: project.status ? pick(project.status, locale) : '',
    statusTone: project.statusTone || '',
    description: pick(project.description, locale),
    papers: (project.papers || []).map((paper) => ({
      label: pick(paper.label, locale),
      href: pick(paper.href, locale),
    })),
    detail: {
      tagline: pick(project.detail.tagline, locale),
      overview: pick(project.detail.overview, locale),
      highlights: pick(project.detail.highlights, locale),
      sections: (project.detail.sections || []).map((section) => ({
        title: pick(section.title, locale),
        body: pick(section.body, locale),
      })),
    },
  }));
}

export function getProject(locale: Locale, slug: string): ProjectView | undefined {
  return getProjects(locale).find((project) => project.slug === slug);
}

export function listProjectSlugs(): string[] {
  return projectSources.map((project) => project.slug);
}
