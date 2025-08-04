"use client"
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSuccess(true);
        setEmail("");
      } else {
        setSuccess(false);
        alert("Erro ao cadastrar e-mail.");
      }
    } catch {
      setSuccess(false);
      alert("Erro ao cadastrar e-mail.");
    }
  };

  return (
    <section className="max-w-xl mx-auto my-12 p-8 bg-white rounded-2xl shadow-lg border border-blue-200">
      {/* Newsletter removida */}
    </section>
  );
}
