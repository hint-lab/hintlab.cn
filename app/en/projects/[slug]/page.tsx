import { getDict } from '../../../lib/i18n';
import { listProjectSlugs } from '../../../lib/projects';
import ProjectDetailPage from '../../../components/ProjectDetailPage';

export function generateStaticParams() {
  return listProjectSlugs().map((slug) => ({ slug }));
}

export default function ProjectEN({ params }: { params: { slug: string } }) {
  return <ProjectDetailPage t={getDict('en')} locale="en" slug={params.slug} homeHref="/en" />;
}
