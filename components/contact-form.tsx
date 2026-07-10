"use client"

import { useState } from "react"

export default function ContactForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, mensagem }),
      });
      if (res.ok) {
        setStatus("Mensagem enviada com sucesso!");
        setNome("");
        setEmail("");
        setMensagem("");
      } else {
        setStatus("Erro ao enviar mensagem. Tente novamente.");
      }
    } catch {
      setStatus("Erro ao enviar mensagem. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-8 rounded shadow-md space-y-6">
      <h3 className="text-2xl font-bold mb-4 text-slate-900">Entre em Contato</h3>
      <div>
        <label className="block text-slate-700 mb-1">Nome</label>
        <input
          type="text"
          className="w-full border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-slate-700 mb-1">E-mail</label>
        <input
          type="email"
          className="w-full border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-slate-700 mb-1">Mensagem</label>
        <textarea
          className="w-full border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={mensagem}
          onChange={e => setMensagem(e.target.value)}
          rows={5}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition-colors disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Enviando..." : "Enviar Mensagem"}
      </button>
      {status && <p className="text-center text-sm mt-2 text-slate-700">{status}</p>}
    </form>
  );
}
