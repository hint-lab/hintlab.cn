import { getDict } from '../../../lib/i18n';
import { listProjectSlugs } from '../../../lib/projects';
import ProjectDetailPage from '../../../components/ProjectDetailPage';

export function generateStaticParams() {
  return listProjectSlugs().map((slug) => ({ slug }));
}

export default function ProjectJA({ params }: { params: { slug: string } }) {
  return <ProjectDetailPage t={getDict('ja')} locale="ja" slug={params.slug} homeHref="/ja" />;
}
