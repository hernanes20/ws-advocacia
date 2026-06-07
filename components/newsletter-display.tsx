"use client"
import { useEffect, useState } from "react";
import { Mail, Calendar, Users } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

interface NewsletterItem {
  id: string;
  title: string;
  text: string;
  image?: string;
  sentAt: string;
  recipientCount?: number;
}

export default function NewsletterDisplay() {
  const [newsletters, setNewsletters] = useState<NewsletterItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/send-newsletter")
      .then(res => res.json())
      .then(data => {
        setNewsletters(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setNewsletters([]);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-400">Carregando newsletters...</p>
        </div>
      </section>
    );
  }

  if (newsletters.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <ScrollReveal delay={0.2}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
              <Mail size={16} className="text-blue-400" />
              <span className="text-sm font-semibold text-blue-400">Nossas Newsletters</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Acompanhe Nossas Notícias
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Fique por dentro de tudo que acontece em nosso escritório de advocacia
            </p>
          </div>

          {/* Newsletter Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-8">
            {newsletters.map((newsletter) => (
              <div
                key={newsletter.id}
                className="group relative"
              >
                {/* Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-500"></div>

                {/* Card */}
                <div className="relative overflow-hidden border-2 border-slate-700 bg-gradient-to-b from-slate-800 to-slate-800 backdrop-blur-sm rounded-2xl transition-all duration-500 group-hover:shadow-2xl group-hover:scale-[1.02] group-hover:-translate-y-1 p-8">
                  <div className="grid md:grid-cols-3 gap-8 items-start">
                    {/* Image */}
                    {newsletter.image && (
                      <div className="md:col-span-1">
                        <img
                          src={newsletter.image}
                          alt={newsletter.title}
                          className="w-full h-48 object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className={newsletter.image ? "md:col-span-2" : "md:col-span-3"}>
                      {/* Meta */}
                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center gap-2 text-slate-400 text-sm">
                          <Calendar size={16} />
                          {formatDate(newsletter.sentAt)}
                        </div>
                        {newsletter.recipientCount && (
                          <div className="flex items-center gap-2 text-slate-400 text-sm">
                            <Users size={16} />
                            {newsletter.recipientCount} destinatários
                          </div>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                        {newsletter.title}
                      </h3>

                      {/* Text */}
                      <p className="text-slate-300 text-base leading-relaxed line-clamp-3">
                        {newsletter.text}
                      </p>

                      {/* Read More Link */}
                      <div className="mt-6">
                        <button className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                          Ler mais
                          <svg
                            className="w-4 h-4 group-hover:translate-x-2 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter Signup CTA */}
          <div className="mt-16 relative">
            {/* Glow Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl opacity-10 blur"></div>

            {/* Card */}
            <div className="relative overflow-hidden border-2 border-slate-700 bg-gradient-to-br from-slate-800 to-slate-800 backdrop-blur-sm rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Não perca nossas newsletters</h3>
              <p className="text-slate-300 mb-6">
                Inscreva-se para receber as atualizações diretamente no seu e-mail
              </p>
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-300 hover:from-blue-600 hover:to-blue-700">
                Inscrever-se
              </button>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
