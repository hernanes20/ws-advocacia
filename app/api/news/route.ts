import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json([], { status: 500 });
  return NextResponse.json(data || []);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { data, error } = await supabase
      .from("news")
      .insert([{ ...body }])
      .select();
    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, news: data?.[0] });
  } catch (err) {
    return NextResponse.json({ success: false, error: (err as Error).message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
        const { id, ...updateFields } = body;
        const { data, error } = await supabase
          .from("news")
          .update(updateFields)
          .eq("id", id)
          .select();
        if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
        if (!data || data.length === 0) {
          return NextResponse.json({ success: false, error: "Notícia não encontrada." }, { status: 404 });
        }
        return NextResponse.json({ success: true, news: data[0] });
  } catch (err) {
    return NextResponse.json({ success: false, error: (err as Error).message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
        const { id } = body;
        const { data, error } = await supabase
          .from("news")
          .delete()
          .eq("id", id)
          .select();
        if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
        if (!data || data.length === 0) {
          return NextResponse.json({ success: false, error: "Notícia não encontrada." }, { status: 404 });
        }
        return NextResponse.json({ success: true, news: data[0] });
  } catch (err) {
    return NextResponse.json({ success: false, error: (err as Error).message }, { status: 500 });
  }
}
