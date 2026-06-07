export async function PUT(req: Request) {
  try {
    const { index, resposta } = await req.json();
    if (typeof index !== 'number') {
      return new Response(JSON.stringify({ error: 'Índice inválido.' }), { status: 400 });
    }
    const file = await fs.readFile(MESSAGES_PATH, 'utf-8');
    const mensagens = JSON.parse(file);
    // Mensagens são exibidas no admin em ordem reversa, então o index recebido é do array invertido
    const realIndex = mensagens.length - 1 - index;
    if (!mensagens[realIndex]) {
      return new Response(JSON.stringify({ error: 'Mensagem não encontrada.' }), { status: 404 });
    }
    mensagens[realIndex].resposta = resposta;
    await fs.writeFile(MESSAGES_PATH, JSON.stringify(mensagens, null, 2));

    // Enviar e-mail para o usuário com a resposta
    const destinatarioEmail = mensagens[realIndex].email;
    const destinatarioNome = mensagens[realIndex].nome;
    const mensagemOriginal = mensagens[realIndex].mensagem;

    // Configure aqui os dados do seu e-mail Outlook
    const transporter = nodemailer.createTransport({
      service: 'Outlook365',
      auth: {
        user: process.env.OUTLOOK_USER, // coloque seu e-mail Outlook nas variáveis de ambiente
        pass: process.env.OUTLOOK_PASS,
      },
    });

    const mailOptions = {
      from: process.env.OUTLOOK_USER,
      to: destinatarioEmail,
      subject: 'Resposta ao seu contato',
      text: `Olá ${destinatarioNome},\n\nSua mensagem: ${mensagemOriginal}\n\nResposta do admin: ${resposta}\n\nAtenciosamente,\nEquipe do site`,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (err) {
  
      return new Response(JSON.stringify({ success: true, warning: 'Resposta salva, mas não foi possível enviar o e-mail.' }), { status: 200 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), { status: 500 });
  }
}
export async function GET() {
  try {
    const file = await fs.readFile(MESSAGES_PATH, 'utf-8');
    const mensagens = JSON.parse(file);
    return new Response(JSON.stringify(mensagens), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify([]), { status: 200 });
  }
}



import { promises as fs } from 'fs';
import path from 'path';
const MESSAGES_PATH = path.join(process.cwd(), 'messages.json');
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { nome, email, mensagem } = await req.json();

    if (!nome || !email || !mensagem) {
      return new Response(JSON.stringify({ error: 'Dados obrigatórios não enviados.' }), { status: 400 });
    }

    // Salvar mensagem no arquivo messages.json
    const novaMensagem = {
      nome,
      email,
      mensagem,
      data: new Date().toISOString(),
    };
    try {
      const file = await fs.readFile(MESSAGES_PATH, 'utf-8');
      const mensagens = JSON.parse(file);
      mensagens.push(novaMensagem);
      await fs.writeFile(MESSAGES_PATH, JSON.stringify(mensagens, null, 2));
    } catch (err) {
      // Se o arquivo não existir ou estiver corrompido, cria um novo
      await fs.writeFile(MESSAGES_PATH, JSON.stringify([novaMensagem], null, 2));
    }


    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    return new Response(JSON.stringify({ error: String(error) }), { status: 500 });
  }
}
