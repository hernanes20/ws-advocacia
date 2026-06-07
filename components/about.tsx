import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Scale, Heart, Briefcase } from "lucide-react"
import ScrollReveal from "@/components/ScrollReveal"

export default function About() {
  return (
    <section id="sobre" className="py-20 bg-slate-50 rounded-3xl shadow-xl mx-2 md:mx-0 mt-8 mb-8 border border-blue-100">
      <ScrollReveal>
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
        
          
      </ScrollReveal>
    </section>
  )
}
