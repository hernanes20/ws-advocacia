import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const newsletterDir = path.join(process.cwd(), "data");
const filePath = path.join(newsletterDir, "newsletter.json");

async function readEmails() {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const emails = JSON.parse(raw);
    return Array.isArray(emails) ? emails : [];
  } catch {
    return [];
  }
}

export async function GET() {
  await fs.mkdir(newsletterDir, { recursive: true });
  const emails = await readEmails();
  return NextResponse.json(emails);
}

export async function DELETE(req: NextRequest) {
  const { email } = await req.json();
  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "E-mail inválido" }, { status: 400 });
  }

  await fs.mkdir(newsletterDir, { recursive: true });
  const emails = await readEmails();
  const filtered = emails.filter((item) => item !== email);
  await fs.writeFile(filePath, JSON.stringify(filtered, null, 2));

  return NextResponse.json({ success: true, emails: filtered });
}

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "E-mail inválido" }, { status: 400 });
  }
  await fs.mkdir(newsletterDir, { recursive: true });
  let emails = await readEmails();

  if (emails.includes(email)) {
    return NextResponse.json({ error: "E-mail já cadastrado." }, { status: 409 });
  }
  emails.push(email);
  await fs.writeFile(filePath, JSON.stringify(emails, null, 2));

  // Envia a última notícia para o usuário por e-mail
  try {
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
