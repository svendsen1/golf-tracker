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
        }))
  );

  function updateHole(index, field, value) {
    const updated = [...holes];
    updated[index][field] = value;
    setHoles(updated);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch(`/api/rounds/${roundId}/holes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ holes }),
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
        </div>
      ))}
      <button type="submit">Save Hole Scores</button>
    </form>
  );
}