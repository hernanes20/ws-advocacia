// Adiciona declaração para evitar erro de tipagem
declare module "nodemailer";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const { title, text, image } = await req.json();
    // Carrega os inscritos
    const newsletterPath = path.join(process.cwd(), "data", "newsletter.json");
    let emails: string[] = [];
    if (fs.existsSync(newsletterPath)) {
      const raw = fs.readFileSync(newsletterPath, "utf-8");
      try {
        emails = JSON.parse(raw);
        if (!Array.isArray(emails)) emails = [];
      } catch {
        emails = [];
      }
    }
    if (emails.length === 0) {
      return NextResponse.json({ error: "Nenhum inscrito encontrado." }, { status: 400 });
    }
    // Verifica variáveis de ambiente
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return NextResponse.json({ error: "Configuração SMTP ausente. Verifique .env.local" }, { status: 500 });
    }
    // Configura o transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    // Monta o conteúdo do e-mail
    const html = `<h2>${title}</h2><p>${text}</p>${image ? `<img src='${image}' style='max-width:400px;' />` : ""}`;
    // Envia para todos e registra status
    const results: { email: string; success: boolean; error?: string }[] = [];
    for (const email of emails) {
      try {
        await transporter.sendMail({
          from: process.env.SMTP_FROM || process.env.SMTP_USER,
          to: email,
          subject: title,
          html,
        });
        results.push({ email, success: true });
      } catch (err: any) {
        results.push({ email, success: false, error: err.message || String(err) });
      }
    }
    return NextResponse.json({ ok: true, results });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
