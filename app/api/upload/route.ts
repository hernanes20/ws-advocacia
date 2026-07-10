

import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    console.log("/api/upload POST received");
    console.log("headers:", Object.fromEntries(req.headers.entries()));
    const formData = await req.formData();
    // Log available keys for debugging
    try {
      const keys: string[] = [];
      // formData.keys() returns an iterator
      for (const k of formData.keys()) keys.push(k);
      console.log("formData keys:", keys);
    } catch (e) {
      console.log("could not enumerate formData keys", e);
    }
    const file = formData.get("file") as File;
    const title = (formData.get("title") as string) || "";
    const text = (formData.get("text") as string) || "";
    if (!file) {
      console.error("No file received in formData");
      return NextResponse.json({ error: "No file" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadDir, { recursive: true });
  const filename = Date.now() + "-" + file.name.replace(/[^a-zA-Z0-9.]/g, "_");
  const filepath = path.join(uploadDir, filename);
  await fs.writeFile(filepath, buffer);
  console.log(`Wrote file: ${filepath} (${buffer.length} bytes)`);

  // Salva metadados (título/texto) em um arquivo JSON
  const meta = {
    filename,
    title: title || "",
    text: text || "",
    createdAt: new Date().toISOString(),
  };
  const metaPath = path.join(uploadDir, filename + ".json");
  await fs.writeFile(metaPath, JSON.stringify(meta, null, 2));
  console.log(`Wrote metadata: ${metaPath}`);

  const imageUrl = `/uploads/${filename}`;
    return NextResponse.json({ success: true, url: imageUrl });
  } catch (err) {
    console.error("Error in /api/upload:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
