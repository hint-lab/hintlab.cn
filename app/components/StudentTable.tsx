import Link from 'next/link';
import type { Dict } from '../lib/i18n';

export default function StudentTable({ students }: { students: Dict['students'] }) {
  return (
    <div className="table-wrap student-table-wrap" tabIndex={0} role="region" aria-label={students.title}>
      <table className="table student-table">
        <thead><tr>{students.columns.map((column) => <th key={column} scope="col">{column}</th>)}</tr></thead>
        <tbody>
          {students.rows.map((row, index) => (
            <tr key={index}>{row.map((cell, column) => (
              <td key={column}>{typeof cell === 'object' ? <Link href={cell.href}>{cell.text}</Link> : cell}</td>
            ))}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
