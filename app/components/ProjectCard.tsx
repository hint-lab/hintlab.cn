import Link from 'next/link';
import { ArrowRight, ExternalLink, FileText, PlayCircle } from 'lucide-react';
import type { Locale, ProjectView } from '../lib/projects';

const labels = {
  zh: { details: '项目详情', website: '网站', video: '视频' },
  en: { details: 'Project details', website: 'Website', video: 'Video' },
  ja: { details: 'プロジェクト詳細', website: 'ウェブサイト', video: '動画' },
};

export function projectHref(locale: Locale, slug: string) {
  return `${locale === 'zh' ? '' : `/${locale}`}/projects/${slug}`;
}

export default function ProjectCard({ project, locale }: { project: ProjectView; locale: Locale }) {
  const L = labels[locale];
  const href = projectHref(locale, project.slug);
  return (
    <article className="project-card">
      <div className={`project-thumb thumb-${project.theme}`}>
        <span className={`project-thumb-status project-thumb-status-${project.statusTone || 'neutral'}`}>{project.status}</span>
        <span>{project.label}</span>
      </div>
      <div className="project-content">
        <h3><Link className="project-title-link" href={href}>{project.name}</Link></h3>
        <p>{project.description}</p>
        <div className="project-actions">
          <Link href={href} className="project-link"><ArrowRight size={14} />{L.details}</Link>
          {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link"><ExternalLink size={14} />{L.website}</a>}
          {project.video && <a href={project.video} target="_blank" rel="noopener noreferrer" className="project-link"><PlayCircle size={14} />{L.video}</a>}
          {project.papers.map((paper) => paper.href ? (
            <a key={`${paper.label}-${paper.href}`} href={paper.href} className="project-link"><FileText size={14} />{paper.label}</a>
          ) : (
            <span key={paper.label} className="project-link project-link-static"><FileText size={14} />{paper.label}</span>
          ))}
        </div>
      </div>
    </article>
  );
}
