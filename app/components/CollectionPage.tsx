import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Dict } from '../lib/i18n';
import { getProjects, type Locale } from '../lib/projects';
import LangSwitch from './LangSwitch';
import ProjectCard from './ProjectCard';
import StudentTable from './StudentTable';

export default function CollectionPage({ t, locale, kind }: { t: Dict; locale: Locale; kind: 'team' | 'projects' }) {
  const home = locale === 'zh' ? '/' : `/${locale}/`;
  const about = `/people/wang_hao${locale === 'zh' ? '' : `/${locale}`}`;
  return (
    <main className="page-shell">
      <header className="collection-header">
        <div className="container collection-nav">
          <Link href={home} className="brand">{t.brand}</Link>
          <LangSwitch scope={kind} theme="light" />
        </div>
      </header>
      <section className="section collection-intro">
        <div className="container">
          <Link href={home} className="project-link"><ArrowLeft size={14} />{t.team.back}</Link>
          <p className="section-kicker">H!NT LAB · {kind === 'team' ? 'PEOPLE' : 'RESEARCH'}</p>
          <h1 className="section-title">{kind === 'team' ? t.team.pageTitle : t.projects.indexTitle}</h1>
          <p className="section-summary">{kind === 'team' ? t.team.pageSummary : t.projects.indexSummary}</p>
          {kind === 'team' ? (
            <>
              <Link href={about} className="team-lead-link">{t.team.lead} · {t.profile.name}<ArrowRight size={16} /></Link>
              <h2 className="collection-subtitle">{t.students.title}</h2>
              <p className="section-summary">{t.students.summary.replace('{count}', String(t.students.rows.length))}</p>
              <StudentTable students={t.students} />
            </>
          ) : (
            <>
              <p className="status-guide">{t.projects.statusGuide}</p>
              <div className="projects-grid">{getProjects(locale).map((project) => <ProjectCard key={project.slug} project={project} locale={locale} />)}</div>
            </>
          )}
        </div>
      </section>
      <footer className="collection-footer container"><Link href={`${home}#expectations`}>{t.hero.ctaEmail}<ArrowRight size={16} /></Link></footer>
    </main>
  );
}
