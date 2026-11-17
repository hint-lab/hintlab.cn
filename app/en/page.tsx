import { getDict } from '../lib/i18n';
import LandingPage from '../components/LandingPage';

export const metadata = {
    title: 'H!NT Lab · Human–AI Intelligence',
    description: 'We study how people and AI understand, decide, and create together in complex, open, and uncertain real-world environments.',
};

export default function HomePageEN() {
    const t = getDict('en');
    return <LandingPage t={t} locale="en" aboutHref="/people/wang_hao/en" publicationHref="/en/publication" />;
}
