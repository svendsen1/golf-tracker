import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  const { id } = await params;
  const { holes } = await request.json();

  const deteleExisting = db.prepare("DELETE FROM holes WHERE round_id = ?")
  const insert = db.prepare(
    "INSERT INTO holes (round_id, hole_number, par, strokes, putts, fairway_hit) VALUES (?, ?, ?, ?, ?, ?)"
  );

  const insertMany = db.transaction((holes) => {
    deteleExisting.run(id);
    for (const hole of holes) {
      insert.run(id, hole.hole_number, hole.par, hole.strokes, hole.putts ?? null, hole.fairway_hit ?? null);
    }
  });

  insertMany(holes);

  return NextResponse.json({ success: true });
}