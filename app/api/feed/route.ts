
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  try {
    const files = await fs.readdir(uploadDir);
    const images = files.filter(file => /\.(jpe?g|png|gif|webp)$/i.test(file));
    // Lê metadados e ordena por data
    const posts = await Promise.all(images.map(async (img) => {
      const metaPath = path.join(uploadDir, img + ".json");
      let meta = { title: "", text: "", createdAt: null };
      try {
        const metaRaw = await fs.readFile(metaPath, "utf-8");
        meta = JSON.parse(metaRaw);
      } catch {}
      return {
        image: img,
        title: meta.title,
        text: meta.text,
        createdAt: meta.createdAt,
      };
    }));
    // Ordena por data de criação (mais recente primeiro)
    posts.sort((a, b) => {
      if (!a.createdAt && !b.createdAt) return 0;
      if (!a.createdAt) return 1;
      if (!b.createdAt) return -1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    // Limita a 3 publicações mais recentes
    return NextResponse.json({ posts: posts.slice(0, 3) });
  } catch (e) {
    return NextResponse.json({ posts: [] });
  }
}
