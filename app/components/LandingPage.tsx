'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Brain, ExternalLink, FileText, Lightbulb, Mail, Menu, PlayCircle, Shield, X } from 'lucide-react';
import LangSwitch from './LangSwitch';
import SideToc from './SideToc';
import ContactModal from './ContactModal';
import type { Dict } from '../lib/i18n';
import { getProjects } from '../lib/projects';
import pubs from '../../data/publications.json';

type LandingPageProps = {
  t: Dict;
  aboutHref: string;
  publicationHref: string;
  locale: 'zh' | 'en' | 'ja';
};

const iconMap: Record<string, any> = {
  Brain,
  Lightbulb,
  FileText,
  Shield,
};

function SectionHeading({ kicker, title, summary }: { kicker?: string; title: string; summary?: string }) {
  return (
    <div className="section-head">
      {kicker ? (
        <p className="section-kicker" style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 12 }}>
          {kicker}
        </p>
      ) : null}
      <h2 className="section-title">{title}</h2>
      {summary ? <p className="section-summary">{summary}</p> : null}
      <div className="section-line" />
    </div>
  );
}

export default function LandingPage({ t, aboutHref, publicationHref, locale }: LandingPageProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  // Display latest 4 publications on home
  const homePubs = pubs.slice(0, 4);
  const projects = getProjects(locale);
  const contactSummary =
    locale === 'zh'
      ? '如需了解实验室、合作研究或招生信息，请与我们联系。'
      : locale === 'ja'
        ? '研究室、共同研究、学生募集に関する問い合わせはこちら。'
        : 'Questions about the lab, research collaboration, or student opportunities.';
  const footerLinks =
    locale === 'zh'
      ? { home: '首页', research: '研究方向', projects: '项目', contact: '联系' }
      : locale === 'ja'
        ? { home: 'ホーム', research: '研究領域', projects: '研究プロジェクト', contact: '連絡先' }
        : { home: 'Home', research: 'Research', projects: 'Projects', contact: 'Contact' };
  const actionLabels =
    locale === 'zh'
      ? { website: '网站', video: '视频' }
      : locale === 'ja'
        ? { website: 'ウェブサイト', video: '動画' }
        : { website: 'Website', video: 'Video' };

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="page-shell">
      <header className={`site-header${menuOpen ? ' header-menu-open' : ''}`}>
        <div className="container header-inner">
          <div className="brand">
            <Link href="/">{t.brand}</Link>
          </div>

          <nav className={`nav${menuOpen ? ' nav-open' : ''}`}>
            <a href="#home" aria-current="page" onClick={closeMenu}>{t.nav.home}</a>
            <Link href={aboutHref} onClick={closeMenu}>{t.nav.about}</Link>
            <a href="#research-areas" onClick={closeMenu}>{t.labIntro.researchTitle}</a>
            <a href="#projects" onClick={closeMenu}>{t.nav.projects}</a>
            <Link href={publicationHref} onClick={closeMenu}>{t.nav.publications}</Link>
            <a href="#contact" onClick={closeMenu}>{t.nav.contact}</a>
          </nav>

          <div className="header-actions">
            <LangSwitch />
            <button
              className="menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <section id="home" className="hero">
        <Image
          src="/hero.jpg"
          alt="H!NT Lab Hero Background"
          fill
          className="hero-bg"
          priority
        />
        <div className="hero-overlay" />
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">{t.hero.title}</h1>
            <p className="hero-subtitle">
              {locale === 'zh'
                ? '人机智能融合实验室'
                : locale === 'ja'
                  ? '人間-AI統合研究室'
                  : 'Human-Intelligence iNTegration Lab'}
            </p>
            <p className="hero-keywords">{t.hero.subtitle}</p>
            <p className="hero-description">{t.labIntro.p1}</p>

            <div className="hero-actions">
              <a className="btn btn-primary" href="#research-areas">
                <span>{t.hero.ctaLearn}</span>
                <ArrowRight size={18} />
              </a>
              <button className="btn btn-outline" onClick={() => setShowContactModal(true)}>
                <span>{t.hero.ctaEmail}</span>
                <Mail size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="research-areas" className="section section-alt">
        <div className="container">
          <SectionHeading
            title={t.labIntro.researchTitle}
            summary={t.labIntro.researchIntro}
          />

          <div className="feature-grid">
            {t.labIntro.areas.map((area: any, idx: number) => {
              const IconComponent = iconMap[area.icon] || Brain;
              return (
                <article key={idx} className="feature-card" style={{ textAlign: 'left' }}>
                  <div className="feature-icon">
                    <IconComponent size={44} strokeWidth={1.5} />
                  </div>
                  <h3>{area.title}</h3>
                  {area.subtitle && (
                    <p style={{ marginTop: 0, fontSize: 13, color: '#888', fontWeight: 400 }}>{area.subtitle}</p>
                  )}
                  <p style={{ textAlign: 'left' }}>{area.description}</p>
                  {area.bullets && area.bullets.length > 0 && (
                    <ul style={{ marginTop: 12, paddingLeft: 0, fontSize: 14, color: '#555', listStyleType: 'none' }}>
                      {area.bullets.map((bullet: string, i: number) => (
                        <li key={i} style={{ marginBottom: 6, paddingLeft: 16, textAlign: 'left', position: 'relative' }}>
                          <span style={{ position: 'absolute', left: 0, color: '#2563eb' }}>▸</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              );
            })}
          </div>

          <div className="callout" style={{ textAlign: 'center', marginTop: 80, border: 'none', background: 'transparent', boxShadow: 'none', fontSize: 16, color: '#86868b' }}>
            <p>{t.labIntro.synergy}</p>
          </div>
        </div>
      </section>

      <section id="projects" className="section">
        <div className="container">
          <SectionHeading
            title={t.projects.title}
            summary={t.projects.subtitle}
          />

          <div className="projects-grid">
            {projects.map((project) => {
              const papers = project.papers;
              const detailHref = project.slug
                ? locale === 'zh'
                  ? `/projects/${project.slug}`
                  : `/${locale}/projects/${project.slug}`
                : '';
              const style = { class: `thumb-${project.theme}`, label: project.label };
              const openDetail = () => {
                if (detailHref) router.push(detailHref);
              };
              const openDetailByKeyboard = (event: React.KeyboardEvent<HTMLElement>) => {
                if (!detailHref) return;
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  router.push(detailHref);
                }
              };
              const keepActionClick = (event: React.MouseEvent<HTMLElement>) => {
                event.stopPropagation();
              };

              return (
                <article
                  key={project.slug}
                  className="project-card"
                  role={detailHref ? 'link' : undefined}
                  tabIndex={detailHref ? 0 : undefined}
                  onClick={openDetail}
                  onKeyDown={openDetailByKeyboard}
                  aria-label={`${project.name} ${locale === 'zh' ? '详情' : locale === 'ja' ? '詳細' : 'details'}`}
                >
                  <div className={`project-thumb ${style.class}`}>
                    {project.status && (
                      <span className={`project-thumb-status project-thumb-status-${project.statusTone || 'neutral'}`}>
                        {project.status}
                      </span>
                    )}
                    <span>{style.label}</span>
                  </div>
                  <div className="project-content">
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    {(detailHref || project.link || project.video || papers.length > 0) && (
                      <div className="project-actions">
                        {detailHref && (
                          <Link href={detailHref} className="project-link" onClick={keepActionClick}>
                            <ArrowRight size={14} />
                            {locale === 'zh' ? '详情' : locale === 'ja' ? '詳細' : 'Details'}
                          </Link>
                        )}
                        {project.link && (
                          <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link" onClick={keepActionClick}>
                            <ExternalLink size={14} />
                            {actionLabels.website}
                          </a>
                        )}
                        {project.video && (
                          <a href={project.video} target="_blank" rel="noopener noreferrer" className="project-link" onClick={keepActionClick}>
                            <PlayCircle size={14} />
                            {actionLabels.video}
                          </a>
                        )}
                        {papers.map((paper: any) => (
                          paper.href ? (
                            <a key={`${paper.label}-${paper.href}`} href={paper.href} className="project-link" onClick={keepActionClick}>
                              <FileText size={14} />
                              {paper.label || 'Paper'}
                            </a>
                          ) : (
                            <span key={paper.label} className="project-link project-link-static" onClick={keepActionClick}>
                              <FileText size={14} />
                              {paper.label || 'Paper'}
                            </span>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="publications" className="section section-alt">
        <div className="container">
          <SectionHeading
            title={t.nav.publications}
            summary={locale === 'zh' ? '实验室近年发表的代表性学术论文' : locale === 'ja' ? '近年の代表的な研究成果' : 'Selected research publications from our lab'}
          />

          <div className="pub-list">
            {homePubs.map((e, idx) => (
              <div key={idx} className="pub-item">
                <div className="pub-year">{e.year}</div>
                <div className="pub-title">{e.title}</div>
                <div className="pub-venue">{(e as any).abbr || (e as any).journal || (e as any).booktitle || ''}</div>
                <div className="card-arrow">
                  <ArrowRight size={18} />
                </div>
              </div>
            ))}
          </div>

          <div className="view-all-wrap">
            <Link href={publicationHref} className="btn btn-outline" style={{ color: 'var(--color-text)', borderColor: 'var(--color-border)' }}>
              <span>{locale === 'zh' ? '查看全部成果' : locale === 'ja' ? '全ての業績を見る' : 'View all publications'}</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section id="contact" className="section">
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
                <button onClick={() => setShowContactModal(true)} style={{ background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', fontSize: 'inherit', fontWeight: 500, textDecoration: 'underline', padding: 0 }}>{t.contact.email}</button>
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

      <section id="expectations" className="section section-alt">
        <div className="container">
          <SectionHeading title={t.expectations.title} />
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {t.expectations.paragraphs.map((p: string, idx: number) => {
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

      <footer className="site-footer">
        <div className="container">
          <p className="footer-brand">© {new Date().getFullYear()} H!NT Lab · Shanghai University</p>
          <div className="footer-links">
            <a href="#home">{footerLinks.home}</a>
            <a href="#research-areas">{footerLinks.research}</a>
            <a href="#projects">{footerLinks.projects}</a>
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

      <SideToc
        items={[
          { id: 'home', label: t.nav.home },
          { id: 'research-areas', label: t.labIntro.researchTitle },
          { id: 'projects', label: t.nav.projects },
          { id: 'contact', label: t.nav.contact },
          { id: 'expectations', label: t.expectations.title },
        ]}
      />

      {showContactModal && (
        <ContactModal
          t={{ ...t.expectations, email: t.contact.email }}
          onClose={() => setShowContactModal(false)}
        />
      )}
    </main>
  );
}
