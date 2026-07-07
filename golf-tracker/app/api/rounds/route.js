import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { course, date, score, notes } = await request.json();

  if (!course || !date || !score) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const stmt = db.prepare(
    "INSERT INTO rounds (course, date, score, notes) VALUES (?, ?, ?, ?)"
  );
  const result = stmt.run(course, date, score, notes ?? null);

  return NextResponse.json({ id: result.lastInsertRowid }, { status: 201 });
}