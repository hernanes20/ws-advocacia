// API route para enviar notícia por e-mail Outlook
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";
import nodemailer from "nodemailer";

export async function POST(req) {
  const { title, text, image, category, to } = await req.json();
  if (!title || !text || !to) {
    return NextResponse.json({ error: "Título, texto e destinatário obrigatórios" }, { status: 400 });
  }
  let html = `<h2>${title}</h2>`;
  if (category) html += `<p><b>Categoria:</b> ${category}</p>`;
  html += `<p>${text}</p>`;
  if (image) html += `<img src='${image}' alt='Imagem da notícia' style='max-width:400px;'/><br/>`;

  // Configuração do Outlook via .env.local
  const transporter = nodemailer.createTransport({
    host: process.env.OUTLOOK_HOST,
    port: Number(process.env.OUTLOOK_PORT),
    secure: false,
    auth: {
      user: process.env.OUTLOOK_USER,
      pass: process.env.OUTLOOK_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.OUTLOOK_USER,
      to,
      subject: `Nova notícia publicada no site Willsilva!`,
      html,
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
