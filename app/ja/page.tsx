import { getDict } from '../lib/i18n';
import LandingPage from '../components/LandingPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'H!NT Lab | 研究室ホームページ',
    description: '人工知能、人間とAIの協働認知、自然言語処理に関する研究室ホームページ'
};

export default function HomePageJA() {
    const t = getDict('ja');
    return <LandingPage t={t} locale="ja" aboutHref="/people/wang_hao/ja" publicationHref="/ja/publication" />;
}
