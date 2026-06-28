import { getDict } from '../../lib/i18n';
import { listProjectSlugs } from '../../lib/projects';
import ProjectDetailPage from '../../components/ProjectDetailPage';

export function generateStaticParams() {
  return listProjectSlugs().map((slug) => ({ slug }));
}

export default function ProjectZH({ params }: { params: { slug: string } }) {
  return <ProjectDetailPage t={getDict('zh')} locale="zh" slug={params.slug} homeHref="/" />;
}
