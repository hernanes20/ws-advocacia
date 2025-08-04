import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

const NEWS_PATH = path.join(process.cwd(), "data/news.json");

export async function GET() {
  try {
    if (!fs.existsSync(NEWS_PATH)) {
      return NextResponse.json([]);
    }
    const file = fs.readFileSync(NEWS_PATH, "utf-8");
    const news = JSON.parse(file);
    return NextResponse.json(news);
  } catch (err) {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let news = [];
    if (fs.existsSync(NEWS_PATH)) {
      news = JSON.parse(fs.readFileSync(NEWS_PATH, "utf-8"));
    }
    const newItem = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
    };
    news.unshift(newItem);
    fs.writeFileSync(NEWS_PATH, JSON.stringify(news, null, 2));
    return NextResponse.json({ success: true, news: newItem });
  } catch (err) {
    return NextResponse.json({ success: false, error: (err as Error).message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    if (!body.id) {
      return NextResponse.json({ error: "ID da notícia não informado." }, { status: 400 });
    }
    let news = [];
    if (fs.existsSync(NEWS_PATH)) {
      news = JSON.parse(fs.readFileSync(NEWS_PATH, "utf-8"));
    }
    const idx = news.findIndex((item: any) => item.id === body.id);
    if (idx === -1) {
      return NextResponse.json({ error: "Notícia não encontrada." }, { status: 404 });
    }
    news[idx] = {
      ...news[idx],
      ...body,
      id: news[idx].id,
      createdAt: news[idx].createdAt,
    };
    fs.writeFileSync(NEWS_PATH, JSON.stringify(news, null, 2));
    return NextResponse.json({ success: true, news: news[idx] });
  } catch (err) {
    return NextResponse.json({ success: false, error: (err as Error).message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    if (!body.id) {
      return NextResponse.json({ error: "ID da notícia não informado." }, { status: 400 });
    }
    let news = [];
    if (fs.existsSync(NEWS_PATH)) {
      news = JSON.parse(fs.readFileSync(NEWS_PATH, "utf-8"));
    }
    const idx = news.findIndex((item: any) => item.id === body.id);
    if (idx === -1) {
      return NextResponse.json({ error: "Notícia não encontrada." }, { status: 404 });
    }
    news.splice(idx, 1);
    fs.writeFileSync(NEWS_PATH, JSON.stringify(news, null, 2));
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: (err as Error).message }, { status: 500 });
  }
}
