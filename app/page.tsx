"use client"


import Header from "@/components/header"
import NewsAdminPanel from "@/components/news-admin-panel"
import Hero from "@/components/hero"
import About from "@/components/about"
import Services from "@/components/services"
import Contact from "@/components/contact"

import Footer from "@/components/footer"
import NewsMain from "@/components/news-main"
import { useState } from "react";


export default function HomePage() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setError("");
    if (!email || !email.includes("@")) {
      setError("Digite um e-mail válido.");
      return;
    }
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (res.ok) {
      setSuccess(true);
      setEmail("");
    } else {
      setError("Erro ao cadastrar e-mail. Tente novamente.");
    }
  };

  return (
    <>
      <Header />
      <Hero />
      <About />
      <Services />
      <Contact />
      <NewsMain />
      <Footer />
    </>
  );
}
