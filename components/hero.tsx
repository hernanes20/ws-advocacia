"use client"

import { Button } from "@/components/ui/button"
import { Shield, Award, Users } from "lucide-react"

export default function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById("contato")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="inicio" className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Defendendo Seus
              <span className="text-blue-400 block">Direitos</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Mais de 10 anos de experiência em advocacia, oferecendo soluções jurídicas personalizadas com excelência e
              comprometimento.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-slate-900 text-lg px-8 py-3 bg-transparent"
                onClick={() => {
                  const servicos = document.getElementById("servicos");
                  if (servicos) servicos.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Nossos Serviços
              </Button>
            </div>

            {/* Stats */}
            <div className="flex w-full mt-8">
              <div className="flex flex-col items-center justify-center ml-0">
                <Award className="h-10 w-10 text-blue-400 mb-2" />
                <div className="text-3xl font-bold">10+</div>
                <div className="text-base text-slate-300">Anos de Experiência</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="/fotowill.jpeg"
              alt="Advogado profissional"
              className="rounded-lg shadow-2xl object-cover w-full h-[28rem] sm:h-[32rem] bg-slate-200"
              onError={e => { e.currentTarget.src = "/placeholder.jpg"; }}
            />
            <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white p-6 rounded-lg shadow-xl">
              <div className="text-2xl font-bold">100%</div>
              <div className="text-sm">Taxa de Sucesso</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
