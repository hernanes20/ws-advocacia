"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Send, CheckCircle } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: formData.name,
          email: formData.email,
          telefone: formData.phone,
          assunto: formData.subject,
          mensagem: formData.message,
        }),
      });
      if (res.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 3000);
      } else {
        alert("Erro ao enviar mensagem. Tente novamente.");
      }
    } catch {
      alert("Erro ao enviar mensagem. Tente novamente.");
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contato" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Entre em Contato</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Estamos prontos para ajudá-lo. Entre em contato conosco e agende sua consulta gratuita.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">


            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Telefones</h3>
                    <p className="text-slate-600">
                      +55 92 9368-7089
                      <br />
                      WhatsApp disponível
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">E-mail</h3>
                    <p className="text-slate-600">
                      ws.advocacia1@outlook.com
                      <br />
                      
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>


          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Envie sua Mensagem</CardTitle>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">Mensagem Enviada!</h3>
                    <p className="text-slate-600">Obrigado pelo contato. Retornaremos em breve.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                          Nome Completo *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Seu nome completo"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                          E-mail *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                          Telefone
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="(55) 99999-9999"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                          Assunto *
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Assunto da consulta"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                        Mensagem *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Descreva sua situação ou dúvida jurídica..."
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                      <Send className="h-5 w-5 mr-2" />
                      Enviar Mensagem
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>


      </div>
    </section>
  )
}
