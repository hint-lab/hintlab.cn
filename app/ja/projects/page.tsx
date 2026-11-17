import { getDict } from '../../lib/i18n';
import CollectionPage from '../../components/CollectionPage';

export const metadata = { title: '研究プロジェクト · H!NT Lab' };

export default function Page() {
  return <CollectionPage t={getDict('ja')} locale="ja" kind="projects" />;
}
