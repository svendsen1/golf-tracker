import db from "@/lib/db";
import HoleScoreForm from "@/components/HolesLogScoreForm";

export default async function RoundPage({ params }) {
  const { id } = await params;

  const round = db.prepare("SELECT * FROM rounds WHERE id = ?").get(id);
  const holes = db.prepare("SELECT * FROM holes WHERE round_id = ? ORDER BY hole_number").all(id);

  if (!round) {
    return <p>Round not found.</p>;
  }

  return (
    <main>
      <h1>{round.course} — {round.date}</h1>
      <HoleScoreForm roundId={round.id} existingHoles={holes} />
    </main>
  );
}