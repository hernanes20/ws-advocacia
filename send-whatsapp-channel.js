const wppconnect = require('@wppconnect-team/wppconnect');

const CHANNEL_LINK = 'https://whatsapp.com/channel/0029VbB2A5u0lwgvRUt7c334';
const MESSAGE = 'Olá! Esta é uma newsletter de teste enviada automaticamente.';

async function main() {
  const client = await wppconnect.create({
    session: 'newsletter-channel',
    headless: true,
    useChrome: true,
    logQR: true,
  });

  // Tenta enviar mensagem para o canal
  try {
    await client.sendText(CHANNEL_LINK, MESSAGE);
    console.log('Mensagem enviada para o canal!');
  } catch (err) {
    console.error('Erro ao enviar para o canal:', err);
  }
}

main();
