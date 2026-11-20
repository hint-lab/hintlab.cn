'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Brain, FileText, Lightbulb, LockKeyhole, Mail, Menu, Play, X } from 'lucide-react';
import LangSwitch from './LangSwitch';
import SideToc from './SideToc';
import ProjectCard, { projectHref } from './ProjectCard';
import type { Dict } from '../lib/i18n';
import { getProjects, type Locale } from '../lib/projects';
import pubs from '../../data/publications.json';

type LandingPageProps = {
  t: Dict;
  aboutHref: string;
  publicationHref: string;
  locale: Locale;
};

const iconMap = { Brain, Lightbulb, FileText };
const portalHref = 'https://portal.hintlab.cn/';
const labFilm = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/media/hintlab-film-20261121`;

function SectionHeading({ kicker, title, summary }: { kicker?: string; title: string; summary?: string }) {
  return (
    <div className="section-head">
      {kicker && <p className="section-kicker">{kicker}</p>}
      <h2 className="section-title">{title}</h2>
      {summary && <p className="section-summary">{summary}</p>}
      <div className="section-line" />
    </div>
  );
}

export default function LandingPage({ t, aboutHref, publicationHref, locale }: LandingPageProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const filmButton = useRef<HTMLButtonElement>(null);
  const filmDialog = useRef<HTMLDialogElement>(null);
  const filmPlayer = useRef<HTMLVideoElement>(null);
  const openFilm = () => {
    const dialog = filmDialog.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    void filmPlayer.current?.play().catch(() => {});
  };
  // Keep the homepage selection and order independent of publication dates.
  const homePubs = ['qi2026babeldoc', 'lian2026deeptrans', 'liu2026deepmed']
    .flatMap((id) => pubs.filter((pub) => pub.id === id));
  const projects = getProjects(locale);
  const featuredProjects = ['babeldoc', 'deeptrans-studio', 'deepmed-search', 'sea-law', 'runos', 'hetuos']
    .flatMap((slug) => projects.filter((project) => project.slug === slug));
  const homeHref = locale === 'zh' ? '/' : `/${locale}/`;
  const teamHref = `${homeHref}team`;
  const projectsHref = `${homeHref}projects`;
  const footerLinks = { home: t.nav.home, research: t.nav.research, projects: t.nav.projects, contact: t.nav.contact };
  const contactSummary = locale === 'zh' ? '欢迎咨询研究合作、招生及实验室服务。' : locale === 'ja' ? '共同研究、学生募集、研究室サービスについてお問い合わせください。' : 'Contact us about research collaboration, graduate study, or lab services.';
  const portalLabel = locale === 'zh' ? '成员入口' : locale === 'ja' ? 'メンバー入口' : 'Members';
  const closeMenu = () => setMenuOpen(false);
  const projectLinks = (slugs: string[]) => (
    <div className="research-project-links">
      {slugs.map((slug) => {
        const project = projects.find((item) => item.slug === slug);
        return project ? <Link key={slug} href={projectHref(locale, slug)}>{project.name}<ArrowRight size={12} aria-hidden="true" /></Link> : null;
      })}
    </div>
  );

  return (
    <main className="page-shell">
      <header className={`site-header${menuOpen ? ' header-menu-open' : ''}`}>
        <div className="container header-inner">
          <div className="brand"><Link href={homeHref}>{t.brand}</Link></div>
          <nav id="main-nav" className={`nav${menuOpen ? ' nav-open' : ''}`}>
            <a href="#home" aria-current="page" onClick={closeMenu}>{t.nav.home}</a>
            <Link href={aboutHref} onClick={closeMenu}>{t.nav.about}</Link>
            <a href="#research-areas" onClick={closeMenu}>{t.nav.research}</a>
            <Link href={projectsHref} onClick={closeMenu}>{t.nav.projects}</Link>
            <Link href={publicationHref} onClick={closeMenu}>{t.nav.publications}</Link>
            <Link href={teamHref} onClick={closeMenu}>{t.team.nav}</Link>
            <a href="#contact" onClick={closeMenu}>{t.nav.contact}</a>
            <a className="member-entry-mobile" href={portalHref} onClick={closeMenu}>{portalLabel}</a>
          </nav>
          <div className="header-actions">
            <LangSwitch />
            <a className="member-entry" href={portalHref}>
              <LockKeyhole size={15} aria-hidden="true" />
              {portalLabel}
            </a>
            <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={locale === 'zh' ? '切换导航菜单' : locale === 'ja' ? 'メニュー切替' : 'Toggle menu'} aria-expanded={menuOpen} aria-controls="main-nav">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <section id="home" className="hero mission-hero">
        <Image src="/hero-portal-20261117.webp" alt="" fill sizes="100vw" className="hero-bg" priority />
        <div className="hero-overlay" />
        <div className="container">
          <div className="hero-content">
            <p className="hero-eyebrow">{t.hero.eyebrow}</p>
            <h1 className="hero-title">{t.hero.title}</h1>
            <p className="hero-description">{t.labIntro.p1}</p>
            <p className="hero-keywords">{t.hero.subtitle}</p>
            <div className="hero-actions">
              <button ref={filmButton} id="lab-film" className="btn btn-primary lab-film-trigger" type="button"
                aria-haspopup="dialog" aria-controls="lab-film-dialog" onClick={openFilm}>
                <Play size={17} aria-hidden="true" />{t.labFilm.view}
              </button>
              <a className="btn btn-outline" href="#expectations">{t.hero.ctaEmail}<ArrowRight size={18} /></a>
            </div>
          </div>
        </div>
      </section>

      <dialog ref={filmDialog} id="lab-film-dialog" className="lab-film-dialog" aria-labelledby="lab-film-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        onClose={() => {
          filmPlayer.current?.pause();
          filmButton.current?.focus({ preventScroll: true });
        }}>
        <div className="lab-film-content">
          <header className="lab-film-header">
            <h2 id="lab-film-title">{t.labFilm.title}</h2>
            <form method="dialog">
              <button className="lab-film-close" type="submit" aria-label={t.labFilm.close}>
                <X size={22} aria-hidden="true" />
              </button>
            </form>
          </header>
          <video ref={filmPlayer} id="lab-film-player" className="lab-film-player" aria-labelledby="lab-film-title"
            poster={`${labFilm}-poster.webp`} width={2560} height={1440} controls playsInline preload="none" tabIndex={0}>
            <source src={`${labFilm}.mp4`} type="video/mp4" />
            <track kind="captions" src={`${labFilm}-zh.vtt`} srcLang="zh-CN" label="简体中文" />
            <track kind="subtitles" src={`${labFilm}-en.vtt`} srcLang="en" label="English" default={locale === 'en'} />
            <track kind="subtitles" src={`${labFilm}-ja.vtt`} srcLang="ja" label="日本語" default={locale === 'ja'} />
            <a href={`${labFilm}.mp4`}>{t.labFilm.view}</a>
          </video>
        </div>
      </dialog>

      <section id="research-areas" className="section section-alt">
        <div className="container">
          <SectionHeading kicker="01 · Research" title={t.labIntro.researchTitle} summary={t.labIntro.researchIntro} />
          <div className="feature-grid research-map">
            {t.labIntro.areas.map((area, index) => {
              const Icon = iconMap[area.icon as keyof typeof iconMap] || Brain;
              return (
                <article key={area.title} className="feature-card research-area">
                  <div className="research-area-top"><span>0{index + 1}</span><Icon size={26} strokeWidth={1.5} aria-hidden="true" /></div>
                  <h3>{area.title}</h3>
                  <p className="research-discipline">{area.subtitle}</p>
                  <p className="research-question">{area.description}</p>
                  <ul className="research-bullets">{area.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                  {projectLinks(area.projectSlugs)}
                </article>
              );
            })}
          </div>
          <p className="research-synergy">{t.labIntro.synergy}</p>
        </div>
      </section>

      <section id="projects" className="section">
        <div className="container">
          <SectionHeading kicker="02 · Projects" title={t.projects.title} summary={t.projects.subtitle} />
          <div className="projects-grid">{featuredProjects.map((project) => <ProjectCard key={project.slug} project={project} locale={locale} />)}</div>
          <div className="view-all-wrap"><Link className="btn btn-light" href={projectsHref}>{t.projects.all.replace('{count}', String(projects.length))}<ArrowRight size={16} /></Link></div>
        </div>
      </section>

      <section id="publications" className="section section-alt">
        <div className="container">
          <SectionHeading kicker="03 · Publications" title={t.nav.publications} summary={locale === 'zh' ? '近期代表性论文' : locale === 'ja' ? '最近の主な論文' : 'Selected recent papers'} />
          <div className="pub-list">
            {homePubs.map((entry) => (
              <a key={entry.id} className="pub-item" href={entry.doi || entry.url || `${publicationHref}#${entry.id}`}>
                <div className="pub-year">{entry.year}</div>
                <div className="pub-title">{entry.title}</div>
                <div className="pub-venue">{entry.abbr || entry.journal || entry.booktitle || ''}</div>
                <div className="card-arrow"><ArrowRight size={18} /></div>
              </a>
            ))}
          </div>
          <div className="view-all-wrap"><Link href={publicationHref} className="btn btn-light">{locale === 'zh' ? '查看全部成果' : locale === 'ja' ? '全ての業績を見る' : 'View all publications'}<ArrowRight size={16} /></Link></div>
        </div>
      </section>

      <section id="community" className="section">
        <div className="container">
          <SectionHeading kicker="04 · Community" title={t.community.title} summary={t.community.summary} />
          <div className="community-grid">
            {t.community.items.map((item, index) => (
              <article className="community-card" key={item.name}>
                <h3>{item.name}</h3>
                <p className="community-role">{item.role}</p>
                <p>{item.description}</p>
                {index === 0 ? (
                  <Link className="text-action" href={projectsHref}>{item.action}<ArrowRight size={16} /></Link>
                ) : index === 1 ? (
                  <a className="text-action" href="https://space.hintlab.cn/" target="_blank" rel="noopener noreferrer">{item.action}<ArrowRight size={16} /></a>
                ) : (
                  <a className="text-action" href={portalHref}>{item.action}<ArrowRight size={16} /></a>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="students" className="section section-alt">
        <div className="container">
          <SectionHeading kicker="05 · Team" title={t.team.title} summary={t.team.summary.replace('{count}', String(t.students.rows.length))} />
          <div className="team-preview">
            {[6, 7, 11].map((index) => {
              const row = t.students.rows[index];
              if (!row) return null;
              const name = row[0];
              return <article className="team-member" key={index}>
                <p className="member-cohort">{t.team.cohort.replace('{year}', String(row[1]))}</p>
                <h3>{typeof name === 'object' ? <Link href={name.href}>{name.text}<ArrowRight size={16} /></Link> : name}</h3>
                <p className="member-direction-label">{t.team.direction}</p>
                <p>{typeof row[4] === 'string' ? row[4] : row[4].text}</p>
              </article>;
            })}
          </div>
          <div className="view-all-wrap"><Link className="btn btn-light" href={teamHref}>{t.team.all}<ArrowRight size={16} /></Link></div>
        </div>
      </section>

      <section id="open-questions" className="section">
        <div className="container">
          <SectionHeading kicker="06 · Open Questions" title={t.openQuestions.title} summary={t.openQuestions.summary} />
          <div className="open-questions-list">
            {t.openQuestions.items.map((question, index) => (
              <article className="open-question" key={question.title}>
                <span className="question-number">0{index + 1}</span>
                <div><h3>{question.title}</h3><p>{question.body}</p>{projectLinks(question.slugs)}</div>
              </article>
            ))}
          </div>
          <a className="text-action" href="#expectations">{t.openQuestions.cta}<ArrowRight size={16} /></a>
        </div>
      </section>

      <section id="expectations" className="section">
        <div className="container">
          <SectionHeading title={t.expectations.title} />
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {t.expectations.paragraphs.map((p: string, idx: number) => {
              if (idx === 0) {
                return (
                  <figure key={idx} className="contribution-figure">
                    <figcaption>{p}</figcaption>
                    <a href="/images/github-contributions-2026-09-22.png" target="_blank" rel="noopener noreferrer">
                      <Image
                        src="/images/github-contributions-2026-09-22.png"
                        alt={p}
                        width={1566}
                        height={432}
                        className="contribution-image"
                      />
                    </a>
                  </figure>
                );
              }
              const isLast = idx === t.expectations.paragraphs.length - 1;
              const isQuestion = idx >= t.expectations.paragraphs.length - 4 && idx < t.expectations.paragraphs.length - 1 && p.endsWith('？');
              if (isQuestion) {
                return (
                  <p key={idx} style={{
                    fontSize: '16px',
                    lineHeight: '1.85',
                    marginBottom: '8px',
                    paddingLeft: '20px',
                    color: 'var(--color-text)',
                    position: 'relative'
                  }}>
                    <span style={{ position: 'absolute', left: 0, color: '#2563eb' }}>▸</span>
                    {p}
                  </p>
                );
              }
              return (
                <p key={idx} style={{
                  fontSize: '16px',
                  lineHeight: '1.85',
                  marginBottom: isLast ? 0 : '16px',
                  color: isLast ? 'var(--color-primary)' : 'var(--color-text)',
                  fontWeight: isLast ? 600 : 400,
                  marginTop: isQuestion ? '16px' : undefined
                }}>{p}</p>
              );
            })}
          </div>
        </div>
      </section>


      <section id="contact" className="section section-alt">
        <div className="container">
          <SectionHeading
            title={t.contact.title}
            summary={contactSummary}
          />

          <div className="contact-panel">
            <div className="contact-panel-item">
              <div className="contact-icon-box">
                <Mail size={22} strokeWidth={1.5} />
              </div>
              <div className="contact-text-box">
                <label>{t.contact.emailLabel}</label>
                <a className="contact-email-link" href={`mailto:${t.contact.email}`}>{t.contact.email}</a>
              </div>
            </div>

            <div className="contact-panel-divider" />

            <a
              className="contact-panel-item"
              href="https://github.com/hint-lab"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="contact-icon-box">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
              </div>
              <div className="contact-text-box">
                <label>GitHub</label>
                <span>github.com/hint-lab</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container">
          <p className="footer-brand">© {new Date().getFullYear()} H!NT Lab · Shanghai University</p>
          <div className="footer-links">
            <a href="#home">{footerLinks.home}</a>
            <a href="#research-areas">{footerLinks.research}</a>
            <a href="#projects">{footerLinks.projects}</a>
            <Link href={teamHref}>{t.team.nav}</Link>
            <a href="#contact">{footerLinks.contact}</a>
          </div>
          <div className="footer-beian">
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">
              <img src="/beian.png" alt="beian" />
              沪ICP备2025152739号-2
            </a>
            <span className="footer-beian-divider">|</span>
            <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010702010261" target="_blank" rel="noopener noreferrer">
              <img src="/gongan.png" alt="gongan" />
              沪公网安备31010702010261号
            </a>
          </div>
        </div>
      </footer>

      <SideToc items={[
        { id: 'home', label: t.nav.home },
        { id: 'research-areas', label: t.nav.research },
        { id: 'projects', label: t.nav.projects },
        { id: 'publications', label: t.nav.publications },
        { id: 'community', label: 'H!NT SPACE' },
        { id: 'open-questions', label: locale === 'zh' ? '开放问题' : locale === 'ja' ? '未解決の問い' : 'Open questions' },
        { id: 'expectations', label: t.hero.ctaEmail },
      ]} />
    </main>
  );
}
