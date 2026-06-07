"use client";
import { useState } from "react";
import NewsAdminPanel from "@/components/news-admin-panel";
import ContactMessagesPanel from "@/components/contact-messages-panel";

export default function AdminPrivadoPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "williams.silva" && password === "Amazonia07!") {
      setAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Usuário ou senha incorretos.");
    }
  };

  if (!authenticated) {
    return (
      <section className="max-w-xs w-full mx-auto my-20 p-6 bg-white rounded-xl shadow-xl border border-gray-200">
        <h2 className="text-xl font-bold mb-4 text-blue-700 text-center">
          Login do Admin
        </h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-200"
            autoFocus
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <button
            type="submit"
            className="bg-blue-700 text-white font-semibold rounded px-6 py-2 hover:bg-blue-800 transition"
          >
            Entrar
          </button>
          {loginError && (
            <span className="text-red-600 mt-2 text-center">{loginError}</span>
          )}
        </form>
      </section>
    );
  }

  return (
    <>
      <NewsAdminPanel />
      <ContactMessagesPanel />
    </>
  );
}
