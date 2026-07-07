import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  const { id } = await params;
  const { holes } = await request.json();

  const insert = db.prepare(
    "INSERT INTO holes (round_id, hole_number, par, strokes) VALUES (?, ?, ?, ?)"
  );

  const insertMany = db.transaction((holes) => {
    for (const hole of holes) {
      insert.run(id, hole.hole_number, hole.par, hole.strokes);
    }
  });

  insertMany(holes);

  return NextResponse.json({ success: true });
}