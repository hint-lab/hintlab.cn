import { getDict } from '../lib/i18n';

export default function ProfileServiceSections({ locale }: { locale: 'zh' | 'en' | 'ja' }) {
    const t = getDict(locale);

    return (
        <>
            <section id="services" className="section section-alt">
                <div className="container">
                    <div className="section-head">
                        <h2 className="section-title">{t.services.title}</h2>
                        <div className="section-line" />
                    </div>
                    <ul className="list">
                        {t.services.list.map(item => (
                            <li key={item.label}>
                                <strong>{item.label}</strong>
                                <p>
                                    {item.href ? (
                                        <a href={item.href} target="_blank" rel="noopener noreferrer">{item.text}</a>
                                    ) : item.text}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section id="awards" className="section">
                <div className="container">
                    <div className="section-head">
                        <h2 className="section-title">{t.awards.title}</h2>
                        <div className="section-line" />
                    </div>
                    <ul className="list">
                        {t.awards.list.map(item => (
                            <li key={item.text}>
                                <a href={item.href} target="_blank" rel="noopener noreferrer">{item.text}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    );
}
