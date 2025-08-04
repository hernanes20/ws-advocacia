"use client";
import React, { useState, useEffect, useRef } from "react";

interface News {
  id: string;
  title: string;
  text: string;
  image?: string;
  category?: string;
}

export default function NewsAdminPanel() {
  const [news, setNews] = useState<News[]>([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchNews = () => {
    fetch("/api/news")
      .then(res => res.ok ? res.json() : [])
      .then(data => setNews(Array.isArray(data) ? data : []));
  };
  useEffect(() => {
    fetchNews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
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
      const res = await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, text, image: imageUrl, category }),
      });
      if (res.ok) {
        setTitle("");
        setText("");
        setImage("");
        setCategory("");
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        setSuccess(true);
        fetchNews();
      } else {
        setError("Erro ao cadastrar notícia.");
      }
    } catch {
      setError("Erro ao cadastrar notícia.");
    }
    setLoading(false);
  };

  return (
    <section className="max-w-2xl mx-auto my-12 p-8 bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-2xl border border-blue-200 overflow-y-auto max-h-[600px]">
      <h2 className="text-3xl font-extrabold mb-8 text-blue-800 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8a9 9 0 1118 0z" /></svg>
        Painel de Administração
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
        <input
          type="text"
          required
          placeholder="Título da notícia"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="border rounded px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-red-200"
        />
        <textarea
          required
          placeholder="Texto da notícia"
          value={text}
          onChange={e => setText(e.target.value)}
          className="border rounded px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-red-200"
        />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={e => setFile(e.target.files?.[0] || null)}
          className="border rounded px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-red-200"
        />
        {file && (
          <div className="flex justify-center mb-2">
            <img
              src={URL.createObjectURL(file)}
              alt="Pré-visualização da imagem"
              className="max-h-48 rounded shadow border"
            />
          </div>
        )}
        <input
          type="text"
          placeholder="URL da imagem (opcional)"
          value={image}
          onChange={e => setImage(e.target.value)}
          className="border rounded px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-red-200"
        />
        <input
          type="text"
          placeholder="Categoria (opcional)"
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="border rounded px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-red-200"
        />
        <button
          type="submit"
          className="bg-red-700 text-white font-semibold rounded px-6 py-2 hover:bg-red-800 transition"
          disabled={loading}
        >
          {loading ? "Enviando..." : "Cadastrar"}
        </button>
        {success && <span className="text-green-600 mt-2">Notícia cadastrada com sucesso!</span>}
        {error && <span className="text-red-600 mt-2">{error}</span>}
      </form>
      <h3 className="text-lg font-bold mb-4 text-gray-800">Notícias cadastradas</h3>
      <div className="divide-y divide-gray-100">
        {news.length === 0 ? (
          <p className="text-gray-500">Nenhuma notícia cadastrada.</p>
        ) : (
          news.map(item => (
            <NewsEditItem key={item.id} item={item} onUpdate={fetchNews} />
          ))
        )}
      </div>
    </section>
  );
}

function NewsEditItem({ item, onUpdate }: { item: News; onUpdate: () => void }) {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [text, setText] = useState(item.text);
  const [image, setImage] = useState(item.image || "");
  const [category, setCategory] = useState(item.category || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError("");
    const formData = new FormData();
    formData.append("file", file);
    const uploadRes = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    if (uploadRes.ok) {
      const data = await uploadRes.json();
      setImage(data.url || image);
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } else {
      setError("Erro ao fazer upload da imagem.");
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/news", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, title, text, image, category }),
      });
      if (res.ok) {
        setEditMode(false);
        onUpdate();
      } else {
        setError("Erro ao atualizar notícia.");
      }
    } catch {
      setError("Erro ao atualizar notícia.");
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!window.confirm("Tem certeza que deseja deletar esta notícia?")) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/news", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id }),
      });
      if (res.ok) {
        setEditMode(false);
        onUpdate();
      } else {
        setError("Erro ao deletar notícia.");
      }
    } catch {
      setError("Erro ao deletar notícia.");
    }
    setLoading(false);
  };

  return (
    <div className="py-4 flex items-center gap-4">
      <img
        src={image || "/placeholder.jpg"}
        alt={title}
        className="rounded-lg w-16 h-16 object-cover"
      />
      <div className="flex-1">
        {editMode ? (
          <>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="border rounded px-2 py-1 text-sm mb-1 w-full"
            />
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              className="border rounded px-2 py-1 text-sm mb-1 w-full"
              rows={2}
            />
            <input
              type="text"
              value={image}
              onChange={e => setImage(e.target.value)}
              className="border rounded px-2 py-1 text-sm mb-1 w-full"
              placeholder="URL da imagem"
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={e => setFile(e.target.files?.[0] || null)}
              className="border rounded px-2 py-1 text-sm mb-1 w-full"
            />
            {file && (
              <button
                className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold hover:bg-blue-700 mb-2"
                onClick={handleImageUpload}
                disabled={loading}
              >
                {loading ? "Enviando..." : "Enviar nova imagem"}
              </button>
            )}
            <input
              type="text"
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="border rounded px-2 py-1 text-sm mb-1 w-full"
              placeholder="Categoria"
            />
            <div className="flex gap-2 mt-1">
              <button
                className="bg-green-600 text-white px-3 py-1 rounded text-xs font-bold hover:bg-green-700"
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? "Salvando..." : "Salvar"}
              </button>
              <button
                className="bg-gray-400 text-white px-3 py-1 rounded text-xs font-bold hover:bg-gray-500"
                onClick={() => setEditMode(false)}
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold hover:bg-red-700"
                onClick={handleDelete}
                disabled={loading}
              >
                Deletar
              </button>
            </div>
            {error && <span className="text-red-600 text-xs mt-1">{error}</span>}
          </>
        ) : (
          <>
            <h4 className="text-red-700 font-semibold text-base leading-tight mb-1">{title}</h4>
            <span className="text-xs text-gray-500">{category || "Notícia"}</span>
            <p className="text-xs text-gray-600 mt-1">{text}</p>
            <button
              className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold hover:bg-blue-700"
              onClick={() => setEditMode(true)}
            >
              Editar
            </button>
          </>
        )}
      </div>
    </div>
  );
}
