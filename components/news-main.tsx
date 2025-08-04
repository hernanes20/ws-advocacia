"use client"
import { useEffect, useState } from "react";

interface News {
  id: string;
  title: string;
  text: string;
  image?: string;
  category?: string;
  highlights?: string[];
  createdAt?: string;
}

export default function NewsMain() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);

  useEffect(() => {
    fetch("/api/news")
      .then(res => res.json())
      .then(data => {
        setNews(Array.isArray(data) ? data : []);
        setLoading(false);
      });
    // Atualiza automaticamente a cada 10 segundos
    const interval = setInterval(() => {
      fetch("/api/news")
        .then(res => res.json())
        .then(data => setNews(Array.isArray(data) ? data : []));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Assuntos passados: mostrar os 10 mais antigos primeiro
  let trending: News[] = [];
  if (news.length > 10) {
    trending = news.slice(0, 10);
  } else if (news.length > 3) {
    trending = news.slice(0, news.length);
  }

  return (
    <>
      <main id="newsletter" className="bg-[#fafafa] min-h-screen py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 px-4">
          {/* Notícias principais */}
          <section className="flex-1">
            {loading ? (
              <p className="text-gray-500">Carregando...</p>
            ) : news.length === 0 ? (
              <p className="text-gray-500">Nenhuma notícia encontrada.</p>
            ) : (
              news.slice(0, 4).map((item) => (
                <button
                  key={item.id}
                  className="mb-10 pb-8 border-b border-gray-200 flex flex-col md:flex-row gap-6 text-left w-full hover:bg-gray-50 transition"
                  onClick={() => setSelectedNews(item)}
                >
                  <img
                    src={item.image || "/placeholder.jpg"}
                    alt={item.title}
                    className="rounded-xl w-full md:w-72 h-48 object-cover mb-4 md:mb-0"
                  />
                  <div className="flex-1">
                    <span className="block text-sm text-gray-500 font-semibold mb-2">{item.category || "Notícia"}</span>
                    <h2 className="text-2xl font-bold text-blue-900 mb-2 leading-tight">{item.title}</h2>
                    <p className="text-base text-gray-700 mb-3">{item.text}</p>
                    <span className="text-xs text-gray-500">{item.createdAt ? new Date(item.createdAt).toLocaleString("pt-BR") : ""}</span>
                  </div>
                </button>
              ))
            )}
          </section>
          {/* Assuntos passados */}
          <aside className="w-full md:w-96 bg-white rounded-2xl shadow border border-gray-200 p-6 h-fit">
            <h3 className="text-lg font-bold mb-6 text-gray-800">Assuntos passados</h3>
            <div className="divide-y divide-gray-100">
              {trending.length === 0 ? (
                <p className="text-gray-500">Nenhum assunto passado encontrado.</p>
              ) : (
                trending.map((item) => (
                  <button
                    key={item.id}
                    className="flex items-center gap-3 py-4 w-full text-left hover:bg-gray-50 transition"
                    onClick={() => setSelectedNews(item)}
                  >
                    <img
                      src={item.image || "/placeholder.jpg"}
                      alt={item.title}
                      className="rounded-lg w-16 h-16 object-cover"
                    />
                    <div>
                      <h4 className="text-blue-900 font-semibold text-base leading-tight mb-1">{item.title}</h4>
                      <span className="text-xs text-gray-500">{item.category || "Notícia"}</span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </aside>
        </div>
      </main>
      {/* Modal de notícia ampliada */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-700 text-2xl font-bold"
              onClick={() => setSelectedNews(null)}
              aria-label="Fechar"
            >
              ×
            </button>
            <img
              src={selectedNews.image || "/placeholder.jpg"}
              alt={selectedNews.title}
              className="rounded-xl w-full max-h-96 object-contain mb-4"
            />
            <span className="block text-sm text-gray-500 font-semibold mb-2">{selectedNews.category || "Notícia"}</span>
            <h2 className="text-2xl font-bold text-blue-900 mb-2 leading-tight">{selectedNews.title}</h2>
            <p className="text-base text-gray-700 mb-3 whitespace-pre-line">{selectedNews.text}</p>
            <span className="text-xs text-gray-500">{selectedNews.createdAt ? new Date(selectedNews.createdAt).toLocaleString("pt-BR") : ""}</span>
          </div>
        </div>
      )}
    </>
  );
}
