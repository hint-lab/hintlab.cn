import { notFound } from 'next/navigation';
import PersonPage from '../../../components/PersonPage';
import { getPerson, listPersonIds, type Locale } from '../../../lib/people';

export function generateStaticParams() {
  return listPersonIds().map((id) => ({ id }));
}

export default function PersonJaPage({ params }: { params: { id: string } }) {
  const person = getPerson(params.id);
  if (!person) notFound();
  return <PersonPage person={person} locale={'ja' as Locale} />;
}
