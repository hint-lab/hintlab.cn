import { getDict } from '../lib/i18n';
import CollectionPage from '../components/CollectionPage';

export const metadata = { title: '研究项目 · H!NT Lab' };

export default function Page() {
  return <CollectionPage t={getDict('zh')} locale="zh" kind="projects" />;
}
