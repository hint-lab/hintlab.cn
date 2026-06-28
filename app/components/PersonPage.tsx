'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Github, Globe, Mail, GraduationCap, Twitter, ArrowUpRight } from 'lucide-react';
import LangSwitch from './LangSwitch';
import SideToc from './SideToc';
import { getDict } from '../lib/i18n';
import type { Locale, Localized, Person, Publication, PersonProject } from '../lib/people';

type Props = {
  person: Person;
  locale: Locale;
};

const wordLabels: Record<Locale, {
  back: string;
  about: string;
  research: string;
  publications: string;
  projects: string;
  home: string;
  about_short: string;
}> = {
  zh: { back: '← 返回主页', about: '关于我', research: '研究方向', publications: '论文成果', projects: '项目经历', home: '主页', about_short: '简介' },
  en: { back: '← Back to home', about: 'About', research: 'Research', publications: 'Publications', projects: 'Projects', home: 'Home', about_short: 'About' },
  ja: { back: '← ホームに戻る', about: '自己紹介', research: '研究テーマ', publications: '研究業績', projects: 'プロジェクト', home: 'ホーム', about_short: '概要' },
};

function pick<T>(field: Localized<T> | undefined, locale: Locale): T | undefined {
  if (!field) return undefined;
  if (locale === 'zh') return field.zh;
  const value = field[locale];
  if (value === undefined || value === null) return field.zh;
  if ((typeof value === 'string' || Array.isArray(value)) && value.length === 0) return field.zh;
  return value;
}

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="section-head">
      <h2 className="section-title" style={{ fontSize: 28 }}>{title}</h2>
      <div className="section-line" />
    </div>
  );
}

function Avatar({ person, locale }: { person: Person; locale: Locale }) {
  const name = pick(person.name, locale) || person.name.zh || '?';
  if (person.photo) {
    return (
      <div className="about-photo-wrap" style={{ width: 132, height: 132 }}>
        <Image src={person.photo} alt={name} width={132} height={132} />
      </div>
    );
  }
  const initial = name.trim().charAt(0).toUpperCase();
  return (
    <div className="about-photo-wrap" style={{
      width: 132, height: 132,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.08) 100%)',
      color: 'var(--color-text)',
      fontSize: 48, fontWeight: 600, letterSpacing: '-0.02em',
    }}>
      {initial}
    </div>
  );
}

function LinkChip({ href, children }: { href: string; children: React.ReactNode }) {
  const isExternal = href.startsWith('http');
  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        height: 34, padding: '0 14px', borderRadius: 999,
        background: 'rgba(0,0,0,0.04)',
        border: '1px solid var(--color-border)',
        color: 'var(--color-text)',
        fontSize: 13, fontWeight: 500,
        transition: 'all 0.2s ease',
      }}
    >
      {children}
    </a>
  );
}

export default function PersonPage({ person, locale }: Props) {
  const t = getDict(locale);
  const L = wordLabels[locale];
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const name = pick(person.name, locale) || person.name.zh;
  const title = pick(person.title, locale);
  const tagline = pick(person.tagline, locale);
  const aboutParagraphs = pick(person.about, locale);
  const researchItems = pick(person.research, locale);
  const pubs = person.publications ?? [];
  const projects = person.projects ?? [];
  const links = person.links ?? {};

  const homeHref = locale === 'zh' ? '/' : locale === 'en' ? '/en' : '/ja';
  const tocItems = [
    aboutParagraphs?.length ? { id: 'about', label: L.about } : null,
    researchItems?.length ? { id: 'research', label: L.research } : null,
    pubs.length ? { id: 'publications', label: L.publications } : null,
    projects.length ? { id: 'projects', label: L.projects } : null,
  ].filter(Boolean) as { id: string; label: string }[];

  let altSection = false;

  return (
    <main className="page-shell">
      <header
        className={`site-header ${scrolled ? 'scrolled' : ''}`}
        style={{ position: 'sticky', background: '#fff', color: 'var(--color-text)', borderBottom: '1px solid var(--color-border)' }}
      >
        <div className="container header-inner">
          <div className="brand"><Link href={homeHref}>{t.brand}</Link></div>
          <div className="header-actions" style={{ marginLeft: 'auto', gap: 16 }}>
            <LangSwitch scope="person" personId={person.id} theme="light" />
          </div>
        </div>
      </header>

      {/* Profile hero */}
      <section id="about" className="section" style={{ paddingTop: 80, paddingBottom: 56 }}>
        <div className="container">
          <Link
            href={homeHref}
            style={{
              display: 'inline-block', marginBottom: 32,
              fontSize: 13, color: 'var(--color-muted)',
              transition: 'color 0.2s ease',
            }}
          >
            {L.back}
          </Link>

          <div className="about-grid" style={{ gridTemplateColumns: '132px 1fr', gap: 36, alignItems: 'center', marginBottom: 0 }}>
            <Avatar person={person} locale={locale} />
            <div className="profile-card">
              <h2 style={{ fontSize: 32, marginBottom: 8 }}>{name}</h2>
              {title ? (
                <div style={{ color: 'var(--color-muted)', fontSize: 15, marginBottom: tagline ? 8 : 16, fontWeight: 500 }}>{title}</div>
              ) : null}
              {tagline ? (
                <div style={{ color: 'var(--color-text)', fontSize: 16, marginBottom: 16, opacity: 0.78 }}>{tagline}</div>
              ) : null}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {links.homepage ? (
                  <LinkChip href={links.homepage}><Globe size={15} />{locale === 'zh' ? '主页' : locale === 'ja' ? 'ホーム' : 'Website'}</LinkChip>
                ) : null}
                {links.github ? (
                  <LinkChip href={links.github}><Github size={15} />GitHub</LinkChip>
                ) : null}
                {links.scholar ? (
                  <LinkChip href={links.scholar}><GraduationCap size={15} />Scholar</LinkChip>
                ) : null}
                {links.email ? (
                  <LinkChip href={`mailto:${links.email}`}><Mail size={15} />Email</LinkChip>
                ) : null}
                {links.twitter ? (
                  <LinkChip href={links.twitter}><Twitter size={15} />Twitter</LinkChip>
                ) : null}
              </div>
            </div>
          </div>

          {aboutParagraphs && aboutParagraphs.length > 0 ? (
            <div style={{ maxWidth: 800, marginTop: 40 }}>
              {aboutParagraphs.map((p, idx) => (
                <p key={idx} style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--color-text)', marginBottom: 16, opacity: 0.9 }}>{p}</p>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* Research */}
      {researchItems && researchItems.length > 0 ? (
        <section id="research" className={altSection ? 'section section-alt' : 'section'} style={{ paddingTop: 56, paddingBottom: 56 }}>
          {altSection ? null : null}
          <div className="container">
            <SectionHeading title={L.research} />
            <ul className="list" style={{ maxWidth: 800 }}>
              {researchItems.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          {(() => { altSection = !altSection; return null; })()}
        </section>
      ) : null}

      {/* Publications */}
      {pubs.length > 0 ? (
        <section id="publications" className={altSection ? 'section section-alt' : 'section'} style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div className="container">
            <SectionHeading title={L.publications} />
            <div style={{ maxWidth: 880 }} className="pub-list">
              {pubs.map((p, idx) => (
                <PubItem key={idx} pub={p} />
              ))}
            </div>
          </div>
          {(() => { altSection = !altSection; return null; })()}
        </section>
      ) : null}

      {/* Projects */}
      {projects.length > 0 ? (
        <section id="projects" className={altSection ? 'section section-alt' : 'section'} style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div className="container">
            <SectionHeading title={L.projects} />
            <div style={{ maxWidth: 880, display: 'grid', gap: 16 }}>
              {projects.map((proj, idx) => (
                <ProjectCard key={idx} project={proj} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <footer className="site-footer" style={{ marginTop: 80 }}>
        <div className="container">
          <p className="footer-brand">© {new Date().getFullYear()} H!NT Lab · Shanghai University</p>
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

      {tocItems.length > 0 ? <SideToc items={tocItems} /> : null}
    </main>
  );
}

function PubItem({ pub }: { pub: Publication }) {
  const venue = [pub.year, pub.venue].filter(Boolean).join(' · ');
  return (
    <div className="pub-item" style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      {pub.year ? <div className="pub-year">{pub.year}</div> : null}
      <div style={{ flex: 1 }}>
        {pub.href ? (
          <a href={pub.href} target="_blank" rel="noopener noreferrer" className="pub-title" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            {pub.title}
            <ArrowUpRight size={14} style={{ opacity: 0.5 }} />
          </a>
        ) : (
          <div className="pub-title">{pub.title}</div>
        )}
        {pub.authors ? <div style={{ fontSize: 13, color: 'var(--color-muted)', marginTop: 4 }}>{pub.authors}</div> : null}
        {pub.venue ? <div className="pub-venue">{pub.venue}</div> : null}
      </div>
    </div>
  );
}

function ProjectCard({ project, locale }: { project: PersonProject; locale: Locale }) {
  const desc = pick(project.description, locale);
  const inner = (
    <>
      <h3 style={{ fontSize: 18, margin: '0 0 6px' }}>{project.name}</h3>
      {desc ? <p style={{ fontSize: 14, color: 'var(--color-muted)', margin: 0, lineHeight: 1.6 }}>{desc}</p> : null}
    </>
  );
  const style: React.CSSProperties = {
    display: 'block', padding: 20, borderRadius: 12,
    background: 'var(--color-surface)', border: '1px solid var(--color-border)',
    boxShadow: 'var(--shadow-sm)',
    transition: 'all 0.2s ease',
  };
  if (project.href) {
    return (
      <a href={project.href} target="_blank" rel="noopener noreferrer" style={{ ...style, color: 'inherit' }}>
        {inner}
      </a>
    );
  }
  return <div style={style}>{inner}</div>;
}
