"use client";

import { useState } from 'react';
import Link from 'next/link';
import pubs from '../../data/publications.json';
import LangSwitch from './LangSwitch';

type Pub = typeof pubs[number] & {
  areas?: string[];
  doi?: string;
  journal?: string;
  booktitle?: string;
  volume?: string;
  number?: string;
  pages?: string;
  articleNumber?: string;
  series?: string;
  status?: string;
  acceptedDate?: string;
  publishedDate?: string;
  printYear?: number;
  jcrYear?: number;
  url?: string;
  html?: string;
};

const detailLabels = {
  zh: { volume: '卷', number: '期', pages: '页码', article: '文章编号', accepted: '已录用', online: '在线发表', acceptedDate: '录用日期', published: '发表日期', printYear: '纸本年份' },
  en: { volume: 'Vol.', number: 'No.', pages: 'Pages', article: 'Article', accepted: 'Accepted', online: 'Online publication', acceptedDate: 'Accepted', published: 'Published', printYear: 'Print year' },
  ja: { volume: '巻', number: '号', pages: 'ページ', article: '論文番号', accepted: '採録済み', online: 'オンライン公開', acceptedDate: '採録日', published: '公開日', printYear: '冊子刊行年' },
};

type PublicationPageProps = {
  title: string;
  summary: string;
  homeHref: string;
  homeLabel: string;
  emptyYearLabel: string;
  pdfLabel: string;
  urlLabel: string;
  doiLabel: string;
  allYearsLabel: string;
  filterAllLabel: string;
  filterDocLabel: string;
  filterHciLabel: string;
  filterCogLabel: string;
  filterSocialLabel: string;
  emptyCategoryLabel: string;
  locale?: keyof typeof detailLabels;
  langScope?: 'site' | 'about';
};

function buildMeta(entry: Pub): string {
  const authors = Array.isArray(entry.authors) ? entry.authors.join(', ') : '';
  const venue = entry.journal || entry.booktitle || '';
  const parts = [authors, venue].filter(Boolean);
  return parts.join(' · ');
}

function buildDetails(entry: Pub, locale: keyof typeof detailLabels): string {
  const labels = detailLabels[locale];
  return [
    entry.status === 'accepted' && labels.accepted,
    entry.status === 'early-access' && labels.online,
    entry.series,
    entry.volume && `${labels.volume} ${entry.volume}`,
    entry.number && (entry.number.startsWith('Part ') ? entry.number : `${labels.number} ${entry.number}`),
    entry.articleNumber && `${labels.article} ${entry.articleNumber}`,
    entry.pages && entry.pages !== entry.articleNumber && `${labels.pages} ${entry.pages.replace(/-+/g, '–')}`,
    entry.acceptedDate && `${labels.acceptedDate} ${entry.acceptedDate}`,
    entry.publishedDate && `${labels.published} ${entry.publishedDate}`,
    entry.printYear && `${labels.printYear} ${entry.printYear}`,
    entry.jcrYear && `JCR ${entry.jcrYear}`,
  ].filter(Boolean).join(' · ');
}

export default function PublicationPage({
  title,
  summary,
  homeHref,
  homeLabel,
  emptyYearLabel,
  pdfLabel,
  urlLabel,
  doiLabel,
  allYearsLabel,
  filterAllLabel,
  filterDocLabel,
  filterHciLabel,
  filterCogLabel,
  filterSocialLabel,
  emptyCategoryLabel,
  locale = 'zh',
  langScope = 'site',
}: PublicationPageProps) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredPubs = pubs.filter((entry: Pub) => {
    if (activeFilter === 'all') return true;
    return entry.areas?.includes(activeFilter);
  });

  const byYear: Record<string, Pub[]> = {};
  filteredPubs.forEach((entry: Pub) => {
    const year = String(entry.year || emptyYearLabel);
    (byYear[year] ||= []).push(entry);
  });
  const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a));

  const filterOptions = [
    { id: 'all', label: filterAllLabel },
    { id: 'doc-understanding', label: filterDocLabel },
    { id: 'hci', label: filterHciLabel },
    { id: 'collaborative-cognition', label: filterCogLabel },
    { id: 'social-networks', label: filterSocialLabel },
  ];

  return (
    <main className="page-shell">
      <header className="site-header" style={{ position: 'sticky', background: '#fff', color: 'var(--color-text)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container header-inner">
          <div className="brand"><Link href={homeHref}>H!NT Lab</Link></div>
          <div className="header-actions">
            <LangSwitch scope={langScope} theme="light" />
          </div>
        </div>
      </header>
      <section className="section publication-page">
        <div className="container">
          <header className="publication-header">
            <div>
              <p className="publication-kicker">{allYearsLabel}</p>
              <h1 className="publication-title">{title}</h1>
              <p className="publication-summary">{summary}</p>
            </div>
            <Link href={homeHref} className="publication-link">
              {homeLabel}
            </Link>
          </header>

          <div className="publication-filters">
            {filterOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setActiveFilter(opt.id)}
                className={`filter-btn ${activeFilter === opt.id ? 'active' : ''}`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="publication-groups">
            {years.length > 0 ? (
              years.map((year) => (
                <section key={year} className="publication-group">
                  <div className="publication-year-rail">
                    <h2 className="publication-year">{year}</h2>
                  </div>
                  <ul className="publication-list">
                    {byYear[year].map((entry) => (
                      <li key={`${year}-${entry.id}`} id={entry.id} className="publication-card">
                        <div className="publication-main">
                          <div className="publication-badge">
                            {entry.abbr || ((entry as any).journal || (entry as any).booktitle || 'Paper').split(' ')[0]}
                          </div>
                          <h3 className="publication-card-title">{entry.title}</h3>
                          <p className="publication-card-meta">{buildMeta(entry)}</p>
                          {buildDetails(entry, locale) && (
                            <p className="publication-card-details">{buildDetails(entry, locale)}</p>
                          )}
                        </div>
                        <div className="publication-actions">
                          {entry.html && (
                            <a href={entry.html} target="_blank" rel="noopener noreferrer" className="publication-link">
                              {pdfLabel}
                            </a>
                          )}
                          {entry.url && entry.url !== entry.html && (
                            <a href={entry.url} target="_blank" rel="noopener noreferrer" className="publication-link">
                              {entry.url.startsWith('https://arxiv.org/') ? 'arXiv' : urlLabel}
                            </a>
                          )}
                          {entry.doi && entry.doi !== entry.url && (
                            <a href={entry.doi} target="_blank" rel="noopener noreferrer" className="publication-link">
                              {doiLabel}
                            </a>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              ))
            ) : (
              <p className="publication-empty">{emptyCategoryLabel}</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
