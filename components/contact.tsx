"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Send, CheckCircle, Clock, ArrowRight } from "lucide-react"
import ScrollReveal from "@/components/ScrollReveal"

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

  const contactInfo = [
    {
      icon: Phone,
      title: "Telefones",
      items: ["+55 92 9368-7089", "WhatsApp disponível"],
    },
    {
      icon: Mail,
      title: "E-mail",
      items: ["ws.advocacia1@outlook.com"],
    },
    {
      icon: Clock,
      title: "Horário de Atendimento",
      items: ["Seg. a Sex.: 8h às 18h", "Urgências disponíveis"],
    },
  ]

  return (
    <section id="contato" className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl mx-2 md:mx-0 mt-8 mb-8">
      <ScrollReveal delay={0.3}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
              <Send size={16} className="text-blue-400" />
              <span className="text-sm font-semibold text-blue-400">Entre em Contato</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Pronto para Ajudar</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Entre em contato conosco para agendar uma consulta gratuita. Estamos disponíveis para discutir suas necessidades jurídicas.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Info Cards */}
            {contactInfo.map((info, index) => (
              <div key={index} className="group relative">
                {/* Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-500"></div>
                
                {/* Card */}
                <Card className="relative overflow-hidden border-2 border-slate-700 bg-gradient-to-b from-slate-800 to-slate-800 backdrop-blur-sm transition-all duration-500 group-hover:shadow-2xl group-hover:scale-105 group-hover:-translate-y-2">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      {/* Icon Container */}
                      <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 border border-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                        <info.icon className="h-7 w-7 text-blue-400" />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-3">{info.title}</h3>
                        <ul className="space-y-2">
                          {info.items.map((item, idx) => (
                            <p key={idx} className="text-slate-300 text-sm leading-relaxed">
                              {item}
                            </p>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <div className="group relative">
              {/* Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-10 blur transition duration-500"></div>
              
              {/* Form Card */}
              <Card className="relative overflow-hidden border-2 border-slate-700 bg-gradient-to-b from-slate-800 to-slate-800 backdrop-blur-sm">
                <CardHeader className="pb-6">
                  <CardTitle className="text-2xl text-white">Envie sua Mensagem</CardTitle>
                  <p className="text-slate-300 text-sm mt-2">Preencha o formulário abaixo e entraremos em contato em breve.</p>
                </CardHeader>

                <CardContent>
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4 border border-green-500/30">
                        <CheckCircle className="h-8 w-8 text-green-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">Mensagem Enviada com Sucesso!</h3>
                      <p className="text-slate-300">Obrigado pelo contato. Retornaremos em breve para conversar sobre seu caso.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-slate-200 mb-2">
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
                            className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-slate-200 mb-2">
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
                            className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-slate-200 mb-2">
                            Telefone
                          </label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="(55) 99999-9999"
                            className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="subject" className="block text-sm font-medium text-slate-200 mb-2">
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
                            className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-slate-200 mb-2">
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
                          className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg transition-all duration-300 group/btn flex items-center justify-center gap-2 hover:from-blue-600 hover:to-blue-700">
                        <Send className="h-5 w-5" />
                        Enviar Mensagem
                        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
