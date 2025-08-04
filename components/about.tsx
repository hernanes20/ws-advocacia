import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Scale, Heart, Briefcase } from "lucide-react"

export default function About() {
  return (
    <section id="sobre" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Sobre Nosso Escritório</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Fundado em 2025, o Williams Silva é reconhecido pela excelência em serviços jurídicos e pelo compromisso
            com a justiça.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img
              src="/perfilnosso.png"
              alt="Escritório de advocacia"
              className="rounded-lg shadow-xl object-cover w-full h-[28rem] sm:h-[32rem] bg-slate-200"
              onError={e => { e.currentTarget.src = "/placeholder.jpg"; }}
            />
          </div>

          <div>
            <h3 className="text-3xl font-bold text-slate-900 mb-6">Nossa Missão</h3>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Proporcionar soluções jurídicas eficazes e personalizadas, defendendo os interesses de nossos clientes com
              ética, transparência e dedicação integral.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-slate-900">Atendimento Personalizado</h4>
                  <p className="text-slate-600">Cada caso é único e merece atenção especializada</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-slate-900">Transparência Total</h4>
                  <p className="text-slate-600">Comunicação clara sobre processos e custos</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-slate-900">Resultados Comprovados</h4>
                  <p className="text-slate-600">Histórico de sucesso em diversas áreas do direito</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center p-8 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Scale className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">Justiça</h3>
              <p className="text-slate-600">
                Comprometidos com a busca incansável pela justiça e pelos direitos de nossos clientes.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-8 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Heart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">Ética</h3>
              <p className="text-slate-600">
                Atuamos sempre com integridade, honestidade e respeito aos princípios éticos da advocacia.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-8 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Briefcase className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">Excelência</h3>
              <p className="text-slate-600">
                Buscamos constantemente a excelência em nossos serviços e no atendimento aos clientes.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Botão WhatsApp fixo */}
      <a
        href="https://wa.me/+559293687089" // Altere para o número do escritório
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-6 bottom-6 z-50 bg-transparent rounded-full p-0 flex items-center justify-center transition-transform duration-200 hover:scale-105"
        aria-label="Fale conosco pelo WhatsApp"
      >
        <span className="bg-[#25D366] rounded-full shadow-lg border-2 border-white p-2 flex items-center justify-center hover:bg-[#1da851] transition-colors duration-200">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#25D366" />
            <path d="M16 6C10.477 6 6 10.477 6 16c0 2.09.64 4.03 1.74 5.65L6 26l4.43-1.73A9.94 9.94 0 0 0 16 26c5.523 0 10-4.477 10-10S21.523 6 16 6Z" stroke="#fff" strokeWidth="2" fill="none" />
            <path d="M21.2 19.1c-.3-.2-1.6-.8-1.8-.9-.2-.1-.4-.2-.6.2-.2.3-.7.9-.8 1-.2.2-.3.2-.6.1-.3-.2-1.1-.4-2.1-1.2-.7-.6-1.3-1.5-1.5-1.7-.2-.3 0-.5.1-.6.1-.1.2-.3.3-.4.1-.1.1-.2.2-.3.1-.1.1-.2.2-.3.1-.2.1-.3 0-.5-.1-.2-.6-1.6-.8-2.1-.2-.6-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.2.2-.7.7-.7 1.6 0 .9.7 1.8 1 2.3.4.5 1.6 2.1 3.8 2.9.6.2 1 .3 1.2.2.4-.1 1.1-.5 1.3-.9.2-.5.2-.8.1-1Z" stroke="#fff" strokeWidth="1.5" fill="none" />
          </svg>
        </span>
      </a>
    </section>
  )
}
