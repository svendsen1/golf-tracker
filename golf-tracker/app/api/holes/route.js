import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { round_id, hole_number, par, strokes, putts, fairway_hit } = await request.json();

  if (!round_id || !hole_number || !par || !strokes) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const stmt = db.prepare(
    "INSERT INTO holes (round_id, hole_number, par, strokes, putts, fairways_hit) VALUES (?, ?, ?, ?, ?, ?)"
  );
  const result = stmt.run(round_id, hole_number, par, strokes, putts ?? null, fairway_hit ?? null);

  return NextResponse.json({ id: result.lastInsertRowid }, { status: 201 });
}