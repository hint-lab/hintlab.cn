"use client";

import { useState } from 'react';
import Link from 'next/link';
import pubs from '../../data/publications.json';
import LangSwitch from './LangSwitch';

type Pub = typeof pubs[number] & { areas?: string[]; doi?: string };

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
  langScope?: 'site' | 'about';
};

function buildMeta(entry: Pub): string {
  const authors = Array.isArray(entry.authors) ? entry.authors.join(', ') : '';
  const venue = (entry as any).journal || (entry as any).booktitle || '';
  const parts = [authors, venue].filter(Boolean);
  return parts.join(' · ');
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
                        </div>
                        <div className="publication-actions">
                          {(entry as any).html ? (
                            <a href={(entry as any).html} target="_blank" rel="noopener noreferrer" className="publication-link">
                              {pdfLabel}
                            </a>
                          ) : (entry as any).url ? (
                            <a href={(entry as any).url} target="_blank" rel="noopener noreferrer" className="publication-link">
                              {urlLabel}
                            </a>
                          ) : entry.doi ? (
                            <a href={entry.doi} target="_blank" rel="noopener noreferrer" className="publication-link">
                              {doiLabel}
                            </a>
                          ) : null}
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
