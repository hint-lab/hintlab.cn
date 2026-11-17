import Link from 'next/link';
import { ArrowLeft, ExternalLink, FileText, PlayCircle } from 'lucide-react';
import type { Dict } from '../lib/i18n';
import { getProject, researchFields } from '../lib/projects';

type ProjectDetailPageProps = {
  t: Dict;
  locale: 'zh' | 'en' | 'ja';
  slug: string;
  homeHref: string;
};

const labels = {
  zh: {
    back: '返回项目',
    overview: '项目概览',
    highlights: '核心内容',
    outputs: '项目产出',
    video: '视频介绍',
    website: '项目网站',
    paper: '论文',
    notFound: '项目不存在',
    research: '研究问题与工程证据',
    researchNote: '技术假设用于引导研究；验证进展与适用范围见现有证据和研究边界。',
    fields: { question: '研究问题', hypothesis: '技术假设 · 待检验', system: '系统与当前阶段', evidence: '现有证据', limitations: '研究边界', openProblems: '开放问题' },
  },
  en: {
    back: 'Back to Projects',
    overview: 'Overview',
    highlights: 'Highlights',
    outputs: 'Outputs',
    video: 'Video',
    website: 'Website',
    paper: 'Paper',
    notFound: 'Project Not Found',
    research: 'Research questions and engineering evidence',
    researchNote: 'Hypotheses guide the research; evidence and limitations describe what has been examined and its scope.',
    fields: { question: 'Research question', hypothesis: 'Working hypothesis · to test', system: 'System and current stage', evidence: 'Available evidence', limitations: 'Limitations', openProblems: 'Open problems' },
  },
  ja: {
    back: 'プロジェクトへ戻る',
    overview: '概要',
    highlights: '主な内容',
    outputs: '成果',
    video: '動画',
    website: 'ウェブサイト',
    paper: '論文',
    notFound: 'プロジェクトが見つかりません',
    research: '研究課題と実装の根拠',
    researchNote: '仮説は研究の出発点です。検証の進捗と適用範囲は、公開資料と研究の限界をご覧ください。',
    fields: { question: '研究課題', hypothesis: '技術的仮説 · 要検証', system: 'システムと現在の段階', evidence: '公開された根拠', limitations: '研究の限界', openProblems: '未解決の課題' },
  },
} as const;

function youtubeEmbed(url?: string) {
  if (!url) return '';
  const watch = url.match(/[?&]v=([^&]+)/);
  if (watch) return `https://www.youtube.com/embed/${watch[1]}`;
  const short = url.match(/youtu\.be\/([^?&]+)/);
  if (short) return `https://www.youtube.com/embed/${short[1]}`;
  return '';
}

export default function ProjectDetailPage({ t, locale, slug, homeHref }: ProjectDetailPageProps) {
  const L = labels[locale];
  const project = getProject(locale, slug);

  if (!project) {
    return (
      <main className="page-shell">
        <section className="section">
          <div className="container">
            <h1 className="section-title">{L.notFound}</h1>
            <Link href={`${homeHref}#projects`} className="project-link"><ArrowLeft size={14} />{L.back}</Link>
          </div>
        </section>
      </main>
    );
  }

  const papers = project.papers || [];
  const detail = project.detail || {};
  const sections = detail.sections || [];
  const embed = youtubeEmbed(project.video);

  return (
    <main className="page-shell">
      <section className="project-detail-hero">
        <div className="container project-detail-hero-inner">
          <div className="project-detail-copy">
            <Link href={`${homeHref}#projects`} className="project-link project-back">
              <ArrowLeft size={14} />
              {L.back}
            </Link>
            <h1>{project.name}</h1>
            <p>{detail.tagline || project.description}</p>
            <div className="project-actions project-detail-actions">
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                  <ExternalLink size={14} />
                  {L.website}
                </a>
              )}
              {project.video && (
                <a href="#project-video" className="project-link">
                  <PlayCircle size={14} />
                  {L.video}
                </a>
              )}
              {papers.map((paper: any) => (
                paper.href ? (
                  <a key={paper.label} href={paper.href} className="project-link">
                    <FileText size={14} />
                    {paper.label || L.paper}
                  </a>
                ) : (
                  <span key={paper.label} className="project-link project-link-static">
                    <FileText size={14} />
                    {paper.label || L.paper}
                  </span>
                )
              ))}
            </div>
          </div>
          <div className={`project-thumb project-detail-thumb thumb-${project.theme}`}>
            {project.status && (
              <span className={`project-thumb-status project-thumb-status-${project.statusTone || 'neutral'}`}>
                {project.status}
              </span>
            )}
            <span>{project.label}</span>
          </div>
        </div>
      </section>

      <section className="section project-detail-section">
        <div className="container">
          <p className="project-overview-copy">{detail.overview}</p>
          <h2 className="project-detail-heading">{L.research}</h2>
          <p className="section-summary">{L.researchNote}</p>
          <div className="research-evidence-grid">
            {researchFields.map((field, index) => (
              <article className="research-evidence-panel" key={field}>
                <span className="section-kicker">0{index + 1}</span>
                <h3>{L.fields[field]}</h3>
                <p>{project.research[field]}</p>
                {field === 'evidence' && (
                  <div className="project-actions">
                    {project.link && <a className="project-link" href={project.link} target="_blank" rel="noopener noreferrer"><ExternalLink size={14} />{L.website}</a>}
                    {project.video && <a className="project-link" href="#project-video"><PlayCircle size={14} />{L.video}</a>}
                    {papers.map((paper) => paper.href ? <a className="project-link" key={paper.label} href={paper.href}><FileText size={14} />{paper.label}</a> : <span className="project-link" key={paper.label}>{paper.label}</span>)}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {sections.length > 0 && (
        <section className="section section-alt project-detail-section">
          <div className="container project-detail-sections">
            {sections.map((section) => (
              <article key={section.title} className="project-detail-panel">
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {embed && (
        <section id="project-video" className="section section-alt project-detail-section">
          <div className="container">
            <h2 className="project-detail-heading">{L.video}</h2>
            <div className="project-video-frame">
              <iframe
                src={embed}
                title={`${project.name} video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      )}

      {(project.link || project.video || papers.length > 0) && (
        <section className="section project-detail-section">
          <div className="container">
            <h2 className="project-detail-heading">{L.outputs}</h2>
            <div className="project-output-list">
              {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer">{L.website}</a>}
              {project.video && <a href={project.video} target="_blank" rel="noopener noreferrer">{L.video}</a>}
              {papers.map((paper: any) => (
                paper.href ? (
                  <a key={paper.label} href={paper.href}>{paper.label || L.paper}</a>
                ) : (
                  <span key={paper.label}>{paper.label || L.paper}</span>
                )
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
