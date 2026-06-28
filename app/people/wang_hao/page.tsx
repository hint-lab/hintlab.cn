'use client';

import LangSwitch from '../../components/LangSwitch';
import Link from 'next/link';
import SideToc from '../../components/SideToc';
import ContactModal from '../../components/ContactModal';
import { getDict } from '../../lib/i18n';
import Image from 'next/image';
import { useEffect, useState } from 'react';

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="section-head">
      <h2 className="section-title">{title}</h2>
      <div className="section-line" />
    </div>
  );
}

export default function WangHaoPage() {
    const t = getDict('zh');
    const [scrolled, setScrolled] = useState(false);
    const [showContactModal, setShowContactModal] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <main className="page-shell">
            <header className={`site-header ${scrolled ? 'scrolled' : ''}`} style={{ position: 'sticky', background: '#fff', color: 'var(--color-text)', borderBottom: '1px solid var(--color-border)' }}>
                <div className="container header-inner">
                    <div className="brand"><Link href="/">{t.brand}</Link></div>
                    <nav className="nav">
                        <Link href="/">{t.nav.home}</Link>
                        <Link href="/people/wang_hao" aria-current="page">{t.nav.about}</Link>
                        <a href="/#research-areas">{t.labIntro.researchTitle}</a>
                        <a href="/#projects">{t.nav.projects}</a>
                        <Link href="/publication">{t.nav.publications}</Link>
                        <a href="#students">{t.nav.students}</a>
                        <a href="/#contact">{t.nav.contact}</a>
                    </nav>
                    <div className="header-actions">
                        <LangSwitch scope="about" theme="light" />
                    </div>
                </div>
            </header>

            <section id="about" className="section">
                <div className="container">
                    <div className="about-grid">
                        <div className="about-photo-wrap">
                            <Image src="/wang_hao.jpeg" alt="Hao WANG" width={160} height={160} />
                        </div>
                        <div className="profile-card">
                            <h2>{t.profile.name}</h2>
                            <div className="lines">
                                {t.profile.lines.map((line: string, idx: number) => (<div key={idx}>{line}</div>))}
                            </div>
                            <div className="contact-email">
                                <a href="#" onClick={(e) => { e.preventDefault(); setShowContactModal(true); }}>{t.contact.email}</a>
                            </div>
                        </div>
                    </div>
                    
                    <SectionHeading title={t.about.title} />
                    <div style={{ maxWidth: '800px' }}>
                        <p>{t.about.p1}</p>
                        <p>{t.about.p2}</p>
                    </div>
                </div>
            </section>

            <section id="courses" className="section section-alt">
                <div className="container">
                    <SectionHeading title={t.courses.title} />
                    <ul className="list">
                        {t.courses.list.map((item, idx) => (
                            <li key={idx}>
                                {item.href ? (
                                    <a href={item.href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)' }}>{item.text}</a>
                                ) : (
                                    item.text
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section id="research" className="section">
                <div className="container">
                    <SectionHeading title={t.research.title} />
                    <ul className="list">
                        {t.research.bullets.map((b, idx) => (<li key={idx}>{b}</li>))}
                    </ul>
                    <p style={{ marginTop: '24px', color: 'var(--color-muted)' }}>
                        {t.research.notePrefix} <a href="#" onClick={(e) => { e.preventDefault(); setShowContactModal(true); }} style={{ color: 'var(--color-primary)', fontWeight: '600' }}>{t.research.contactCta}</a> {t.research.noteSuffix}
                    </p>
                </div>
            </section>

            <section id="insights" className="section">
                <div className="container">
                    <SectionHeading title={t.insights.title} />
                    <blockquote className="quote">
                        <p>
                            {t.insights.quoteLines[0]}
                            <br />
                            {t.insights.quoteLines[1]}
                        </p>
                    </blockquote>
                </div>
            </section>

            <section id="students" className="section section-alt">
                <div className="container">
                    <SectionHeading title={t.students.title} />
                    <div className="table-wrap">
                        <table className="table">
                            <thead>
                                <tr>
                                    {t.students.columns.map((c, idx) => (<th key={idx}>{c}</th>))}
                                </tr>
                            </thead>
                            <tbody>
                                {t.students.rows.map((r, idx) => (
                                    <tr key={idx}>
                                        {r.map((cell: any, cidx: number) => (
                                            <td key={cidx}>
                                                {cell && typeof cell === 'object' && 'href' in cell ? (
                                                    <a href={cell.href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)' }}>{cell.text}</a>
                                                ) : (
                                                    cell
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <section id="alumni" className="section">
                <div className="container">
                    <SectionHeading title={t.alumni.title} />
                    <div className="table-wrap">
                        <table className="table">
                            <thead>
                                <tr>
                                    {t.alumni.columns.map((c, idx) => (<th key={idx}>{c}</th>))}
                                </tr>
                            </thead>
                            <tbody>
                                {t.alumni.rows.map((r, idx) => (
                                    <tr key={idx}>
                                        {r.map((cell: any, cidx: number) => (
                                            <td key={cidx}>
                                                {cell && typeof cell === 'object' && 'href' in cell ? (
                                                    <a href={cell.href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)' }}>{cell.text}</a>
                                                ) : (
                                                    cell
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <footer className="site-footer">
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

            <SideToc items={[
                { id: 'about', label: t.nav.about },
                { id: 'courses', label: t.nav.courses },
                { id: 'research', label: t.nav.research },
                { id: 'insights', label: t.nav.insights },
                { id: 'students', label: t.nav.students },
                { id: 'alumni', label: t.nav.alumni }
            ]} />

            {showContactModal && (
                <ContactModal
                    t={{ ...t.expectations, email: t.contact.email }}
                    onClose={() => setShowContactModal(false)}
                />
            )}
        </main>
    );
}
