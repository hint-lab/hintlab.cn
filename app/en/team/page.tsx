import { getDict } from '../../lib/i18n';
import CollectionPage from '../../components/CollectionPage';

export const metadata = { title: 'Team · H!NT Lab' };

export default function Page() {
  return <CollectionPage t={getDict('en')} locale="en" kind="team" />;
}
