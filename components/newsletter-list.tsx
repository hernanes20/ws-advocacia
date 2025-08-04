"use client"
import { useEffect, useState } from "react";

export default function NewsletterList() {
  const [emails, setEmails] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/newsletter")
      .then(res => res.json())
      .then(data => {
        setEmails(data.emails || []);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-gray-500 p-4">Carregando lista de e-mails...</div>;
  }
  if (!emails.length) {
    return <div className="text-gray-500 p-4">Nenhum e-mail cadastrado.</div>;
  }
  return (
    <section className="max-w-lg mx-auto my-8 p-6 bg-white rounded-xl shadow border border-gray-200">
      <h2 className="text-xl font-bold mb-4 text-blue-700">Lista de E-mails cadastrados</h2>
      <ul className="divide-y divide-gray-100">
        {emails.map((email, idx) => (
          <li key={idx} className="py-2 px-2 text-gray-800 text-sm flex items-center gap-2">
            <span className="bg-blue-50 px-2 py-1 rounded text-blue-700 font-mono">{email}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}


