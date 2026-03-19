import { NextResponse } from "next/server";
import { supabase } from "@/src/lib/supabaseClient";

// 📥 GET reviews
export async function GET() {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}

// 📤 POST review
export async function POST(req: Request) {
  const body = await req.json();
  const { name, comment, rating } = body;

  // 🛡️ validation
  if (!name || !comment) {
    return NextResponse.json(
      { error: "Missing fields" },
      { status: 400 }
    );
  }

  const { error } = await supabase.from("reviews").insert([
    {
      name,
      comment,
      rating,
    },
  ]);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}