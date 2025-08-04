import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "E-mail inválido" }, { status: 400 });
  }
  const newsletterDir = path.join(process.cwd(), "data");
  await fs.mkdir(newsletterDir, { recursive: true });
  const filePath = path.join(newsletterDir, "newsletter.json");
  let emails: string[] = [];
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    emails = JSON.parse(raw);
  } catch {}
  if (emails.includes(email)) {
    return NextResponse.json({ error: "E-mail já cadastrado." }, { status: 409 });
  }
  emails.push(email);
  await fs.writeFile(filePath, JSON.stringify(emails, null, 2));

  // Envia a última notícia para o usuário por e-mail
  try {
    // Certifique-se de instalar o pacote node-fetch: pnpm add node-fetch
    const fetch = (await import('node-fetch')).default;
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/send-newsletter-to-user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });
  } catch (err) {
    console.error("Erro ao enviar notícia por e-mail:", err);
  }

  return NextResponse.json({ success: true });
}
