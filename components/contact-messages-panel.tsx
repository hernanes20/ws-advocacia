"use client"
import { useEffect, useState } from "react";

interface Mensagem {
  nome: string;
  email: string;
  mensagem: string;
  data: string;
}

export default function ContactMessagesPanel() {
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/contato")
      .then(res => res.json())
      .then(data => setMensagens(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="max-w-3xl mx-auto my-12 p-6 bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-2xl border border-blue-100 overflow-y-auto max-h-[600px]">
      <h2 className="text-3xl font-extrabold mb-8 text-blue-800 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8a9 9 0 1118 0z" /></svg>
        Mensagens de Contato
      </h2>
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <span className="animate-spin h-6 w-6 mr-2 border-4 border-blue-300 border-t-transparent rounded-full"></span>
          <span className="text-blue-500 font-semibold">Carregando...</span>
        </div>
      ) : mensagens.length === 0 ? (
        <div className="flex flex-col items-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8a9 9 0 1118 0z" /></svg>
          <p className="text-gray-500 text-lg">Nenhuma mensagem recebida ainda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mensagens.slice().reverse().map((msg, idx) => (
            <div key={idx} className="bg-white border border-blue-100 rounded-xl shadow p-5 flex flex-col gap-2 hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-700 font-bold text-lg">
                  {msg.nome.charAt(0).toUpperCase()}
                </span>
                <div className="flex flex-col">
                  <span className="font-semibold text-blue-700 text-base">{msg.nome}</span>
                  <a
                    href={`mailto:${msg.email}`}
                    className="text-xs text-blue-600 underline hover:text-blue-800"
                    title="Responder pelo Outlook ou outro e-mail"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {msg.email}
                  </a>
                </div>
                <span className="text-xs text-gray-400 ml-auto">{new Date(msg.data).toLocaleString()}</span>
              </div>
              <div className="bg-blue-50 rounded p-3 text-gray-800 text-sm whitespace-pre-line mb-2 border border-blue-100">
                {msg.mensagem}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
