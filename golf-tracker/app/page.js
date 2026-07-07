import Link from 'next/link';
import db from '@/lib/db';

export default async function Home() {
  const rounds = db.prepare(`
    SELECT * FROM rounds ORDER BY date DESC LIMIT 10
  `).all()

  return (
    <main className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">⛳ Golf Tracker</h1>
        <Link href="/rounds/new" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
          Log runde
        </Link>
      </div>

      {rounds.length === 0 ? (
        <p className="text-gray-500">Ingen runder endnu — log din første runde!</p>
      ) : (
        <ul className="space-y-4">
          {rounds.map((round) => (
            <li key={round.id} className="border rounded-lg p-4 flex justify-between items-center">
              <div>
                <p className="font-semibold text-lg">{round.course}</p>
                <p className="text-gray-500 text-sm">{round.date}</p>
                <p className="text-gray-500"> {round.notes} </p>
              </div>
              <div className="text-2xl font-bold text-green-600">{round.score}</div>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}