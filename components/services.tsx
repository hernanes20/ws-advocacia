import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building, Users, Home, Briefcase, Shield, FileText, Gavel, CreditCard } from "lucide-react"

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
    <section id="servicos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Nossos Serviços</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Oferecemos assessoria jurídica completa em diversas áreas do direito, sempre com foco na excelência e nos
            resultados.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow group">
              <CardHeader className="text-center pb-4">
                <service.icon className="h-12 w-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-lg">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4 text-sm">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-slate-500 flex items-center">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
