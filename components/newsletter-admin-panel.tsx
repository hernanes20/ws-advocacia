"use client";
import React, { useState, useEffect, useRef } from "react";
import { Mail, Send, Trash2, Eye } from "lucide-react";

interface NewsletterSubscriber {
  email: string;
}

export default function NewsletterAdminPanel() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchSubscribers = () => {
    fetch("/api/newsletter")
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        const parsed = Array.isArray(data) ? data : (data?.emails || []);
        setSubscribers(Array.isArray(parsed) ? parsed : []);
      })
      .catch(() => setSubscribers([]));
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    if (!title || !text) {
      setError("Título e texto são obrigatórios.");
      setLoading(false);
      return;
    }

    let imageUrl = image;
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (uploadRes.ok) {
        const data = await uploadRes.json();
        imageUrl = data.url || imageUrl;
        setImage(imageUrl);
      } else {
        setError("Erro ao fazer upload da imagem.");
        setLoading(false);
        return;
      }
    }

    try {
      const res = await fetch("/api/send-newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, text, image: imageUrl }),
      });
      if (res.ok) {
        setTitle("");
        setText("");
        setImage("");
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Erro ao enviar newsletter.");
      }
    } catch (err) {
      setError("Erro ao enviar newsletter.");
    }
    setLoading(false);
  };

  const deleteSubscriber = async (email: string) => {
    if (!confirm(`Deseja deletar o email ${email}?`)) return;
    
    try {
      const res = await fetch("/api/newsletter", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        fetchSubscribers();
      } else {
        alert("Erro ao deletar subscriber.");
      }
    } catch {
      alert("Erro ao deletar subscriber.");
    }
  };

  return (
    <section className="w-full">
      <div className="max-w-4xl mx-auto my-12 p-8 bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-2xl border border-blue-200">
        <h2 className="text-3xl font-extrabold mb-8 text-blue-800 flex items-center gap-2">
          <Mail className="h-8 w-8 text-blue-500" />
          Gerenciador de Newsletter
        </h2>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
              <h3 className="text-lg font-bold mb-4 text-gray-800">Enviar Newsletter</h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  required
                  placeholder="Título da newsletter"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="border border-gray-300 rounded px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  required
                  placeholder="Conteúdo da newsletter"
                  value={text}
                  onChange={e => setText(e.target.value)}
                  rows={6}
                  className="border border-gray-300 rounded px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={e => setFile(e.target.files?.[0] || null)}
                  className="border border-gray-300 rounded px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {file && (
                  <div className="flex justify-center mb-2">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Pré-visualização"
                      className="max-h-40 rounded shadow"
                    />
                  </div>
                )}
                <input
                  type="url"
                  placeholder="URL da imagem (opcional)"
                  value={image}
                  onChange={e => setImage(e.target.value)}
                  className="border border-gray-300 rounded px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPreview(!showPreview)}
                    className="flex-1 bg-slate-600 text-white font-semibold rounded px-6 py-2 hover:bg-slate-700 transition flex items-center justify-center gap-2"
                  >
                    <Eye size={18} />
                    {showPreview ? "Ocultar" : "Visualizar"}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-700 text-white font-semibold rounded px-6 py-2 hover:bg-blue-800 transition flex items-center justify-center gap-2"
                    disabled={loading}
                  >
                    <Send size={18} />
                    {loading ? "Enviando..." : "Enviar"}
                  </button>
                </div>

                {success && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded">
                    ✓ Newsletter enviada com sucesso para {subscribers.length} inscrito(s)!
                  </div>
                )}
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
                    ✗ {error}
                  </div>
                )}
              </form>
            </div>

            {/* Preview Section */}
            {showPreview && (title || text) && (
              <div className="mt-6 bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
                <h3 className="text-lg font-bold mb-4 text-gray-800">Pré-visualização</h3>
                <div className="border border-gray-300 rounded p-4 bg-gray-50">
                  {image && (
                    <img
                      src={image || (file ? URL.createObjectURL(file) : "")}
                      alt="Preview"
                      className="w-full max-h-64 object-cover rounded mb-4"
                    />
                  )}
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{title}</h4>
                  <p className="text-gray-700 whitespace-pre-wrap">{text}</p>
                </div>
              </div>
            )}
          </div>

          {/* Subscribers List Section */}
          <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
            <h3 className="text-lg font-bold mb-4 text-gray-800">
              Inscritos ({subscribers.length})
            </h3>
            <div className="max-h-96 overflow-y-auto space-y-2">
              {subscribers.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-4">
                  Nenhum inscrito ainda
                </p>
              ) : (
                subscribers.map((sub, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-blue-50 p-3 rounded border border-blue-100 hover:bg-blue-100 transition"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800 truncate">{sub.email}</p>
                    </div>
                    <button
                      onClick={() => deleteSubscriber(sub.email)}
                      className="ml-2 text-red-600 hover:text-red-800 hover:bg-red-50 p-1 rounded transition"
                      title="Deletar"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
