"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LogRoundForm() {
  const router = useRouter();
  const [course, setCourse] = useState("");
  const [date, setDate] = useState("");
  const [score, setScore] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    const res = await fetch("/api/rounds", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ course, date, score, notes }),
    });

    if (!res.ok) {
      setError("Something went wrong saving the round.");
      return;
    }

    router.push("/"); // back to the round list
    router.refresh();  // force the server component to refetch fresh data
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Course
        <input value={course} onChange={(e) => setCourse(e.target.value)} required />
      </label>

      <label>
        Date
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </label>

      <label>
        Score
        <input
          type="number"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          required
        />
      </label>

      <label>
        Notes
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
      </label>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">Save Round</button>
    </form>
  );
}