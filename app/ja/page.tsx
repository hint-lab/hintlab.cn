import { getDict } from '../lib/i18n';
import LandingPage from '../components/LandingPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'H!NT Lab | 研究室ホームページ',
    description: '複雑で開かれた、不確実性のある現実の環境で、人間とAIがともに理解し、判断し、創造する仕組みを研究します。'
};

export default function HomePageJA() {
    const t = getDict('ja');
    return <LandingPage t={t} locale="ja" aboutHref="/people/wang_hao/ja" publicationHref="/ja/publication" />;
}
