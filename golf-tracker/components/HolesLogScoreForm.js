"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HoleScoreForm({ roundId, existingHoles }) {
  const router = useRouter();
  const [holes, setHoles] = useState(
    existingHoles.length > 0
      ? existingHoles
      : Array.from({ length: 18 }, (_, i) => ({
          hole_number: i + 1,
          par: "",
          strokes: "",
          putts: "",
          fairway_hit: false
        }))
  );

  function updateHole(index, field, value) {
    const updated = [...holes];
    updated[index][field] = value;
    setHoles(updated);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const preparedHoles = holes.map((hole) => ({
    ...hole,
    fairway_hit: hole.fairway_hit ? 1 : 0,
  }));
    const res = await fetch(`/api/rounds/${roundId}/holes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ holes: preparedHoles }),
    });

    if (res.ok) {
      router.push("/");
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {holes.map((hole, i) => (
        <div key={hole.hole_number}>
          <span>Hole {hole.hole_number}</span>
          <input
            type="number"
            placeholder="Par"
            value={hole.par}
            onChange={(e) => updateHole(i, "par", e.target.value)}
          />
          <input
            type="number"
            placeholder="Strokes"
            value={hole.strokes}
            onChange={(e) => updateHole(i, "strokes", e.target.value)}
          />
          <input
            type="number"
            placeholder="Putts"
            value={hole.putts}
            onChange={(e) => updateHole(i, "putts", e.target.value)}
          />
          <input
            type="checkbox"
            checked={!!hole.fairway_hit}
            onChange={(e) => updateHole(i, "fairway_hit", e.target.checked)}
          />
        </div>
      ))}
      <button type="submit">Save Hole Scores</button>
    </form>
  );
}