import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building, Users, Home, Briefcase, Shield, FileText, Gavel, CreditCard, ArrowRight, Zap } from "lucide-react"
import ScrollReveal from "@/components/ScrollReveal"

export default function Services() {
  const services = [
    {
      icon: CreditCard,
      title: "Direito Tributário",
      description: "Planejamento tributário e defesa em questões fiscais.",
      features: ["Planejamento fiscal", "Defesas administrativas", "Recuperação de tributos"],
    },
    {
      icon: FileText,
      title: "Direito Previdenciário",
      description: "Assessoria em benefícios previdenciários e aposentadorias.",
      features: ["Aposentadorias", "Auxílios", "Revisões de benefícios"],
    },
    {
      icon: Home,
      title: "Direito Imobiliário",
      description: "Assessoria completa em transações imobiliárias e regularização de propriedades.",
      features: ["Compra e venda", "Financiamentos", "Regularização fundiária"],
    },
    {
      icon: Briefcase,
      title: "Direito Consumidor",
      description: "Atuação em defesa dos direitos do consumidor em diversas situações.",
      features: ["Ações contra fornecedores", "Cobranças indevidas", "Garantias e contratos"],
    },
  ]

  return (
    <section id="servicos" className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl mx-2 md:mx-0 mt-8 mb-8">
      <ScrollReveal delay={0.15}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
              <Zap size={16} className="text-blue-400" />
              <span className="text-sm font-semibold text-blue-400">Nossas Especialidades</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Serviços Jurídicos Completos</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Oferecemos assessoria especializada em diversas áreas do direito, com foco em resultados e excelência.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative h-full"
              >
                {/* Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-500"></div>
                
                {/* Card */}
                <Card className="relative h-full overflow-hidden border-2 border-slate-700 bg-gradient-to-b from-slate-800 to-slate-800 backdrop-blur-sm transition-all duration-500 group-hover:shadow-2xl group-hover:scale-105 group-hover:-translate-y-2">
                  <CardHeader className="text-center pb-4">
                    {/* Icon */}
                    <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 group-hover:rotate-12 border border-blue-500/30">
                      <service.icon className="h-8 w-8 text-blue-400" />
                    </div>
                    <CardTitle className="text-xl text-white">{service.title}</CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-slate-300 text-sm leading-relaxed">{service.description}</p>
                    
                    {/* Features */}
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-slate-400 flex items-start gap-2 group/item">
                          <div className="w-2 h-2 rounded-full mt-1 flex-shrink-0 bg-blue-400"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <div className="pt-4">
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg transition-all duration-300 group/btn flex items-center justify-center gap-2 hover:from-blue-600 hover:to-blue-700">
                        Saiba Mais
                        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <p className="text-slate-300 mb-6">Pronto para começar? Entre em contato conosco hoje.</p>
            <Button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-6 text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 hover:from-blue-600 hover:to-blue-700">
              Agendar Consulta Gratuita
            </Button>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
