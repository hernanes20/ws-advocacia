// Adiciona declaração para evitar erro de tipagem
declare module "nodemailer";
import nodemailer from "nodemailer";

async function testSend() {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  try {
    await transporter.verify();
    console.log("Conexão SMTP OK!");
  } catch (err) {
    console.error("Erro na conexão SMTP:", err);
  }
}

testSend();
