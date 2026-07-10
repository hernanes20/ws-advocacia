'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import ScrollReveal from './ScrollReveal';

interface Informativo {
  id: number;
  title: string;
  description: string;
  url: string;
  color: string;
}

const informativos: Informativo[] = [
  {
    id: 1,
    title: "TEA Previdenciário",
    description: "Informações e atualizações sobre o programa TEA e legislação relacionada",
    url: "https://tea-sandy-five.vercel.app/",
    color: "from-blue-600 to-blue-700"
  },
  {
    id: 2,
    title: "STJ esclarece a negativa indevida de plano de saúde",
    description: "Entenda quando a recusa de cobertura por operadoras de saúde gera, ou não, o direito à indenização por danos morais segundo a nova tese do Superior Tribunal de Justiça.",
    url: "https://willinformativo.vercel.app/",
    color: "from-purple-600 to-purple-700"
  },
  {
    id: 3,
    title: "Manaus cria cota de bolsas universitárias para pais de crianças com TEA",
    description: "A notícia é verdadeira: a lei existe e já foi sancionada",
    url: "https://informativotea.vercel.app/",
    color: "from-emerald-600 to-emerald-700"
  },
  {
    id: 4,
    title: "Águas de Anamá",
    description: "ransparência, informação e acompanhamento da qualidade da água no município de Anamã - AM. ",
    url: "https://aguasdeanama.vercel.app/",
    color: "from-cyan-600 to-cyan-700"
  }
];

export function Informativos() {
  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal delay={0.1}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700">
              <span className="text-xs uppercase tracking-widest text-blue-400 font-semibold">MANTENHA-SE INFORMADO</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Informativos e Notícias
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Acesse nossos portais de informações com atualizações sobre legislação, programas tributários e notícias do setor jurídico
            </p>
          </div>
        </ScrollReveal>

        {/* Informativos Grid */}
        <ScrollReveal delay={0.2}>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {informativos.map((info, index) => (
              <a
                key={info.id}
                href={info.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="relative h-full">
                  {/* Glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${info.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300`}></div>
                  
                  {/* Card */}
                  <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 group-hover:border-slate-600 rounded-2xl p-8 h-full flex flex-col transition-all duration-300 hover:shadow-2xl">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                      {info.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-300 text-sm leading-relaxed flex-grow mb-6">
                      {info.description}
                    </p>

                    {/* Footer with CTA and Logo */}
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-700/50">
                      <div className="flex items-center gap-2 text-blue-400 group-hover:text-blue-300 transition-colors font-semibold">
                        <span>Acessar</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <Image
                        src="/perfilnosso.png"
                        alt="Williams Silva"
                        width={40}
                        height={40}
                        className="h-8 w-auto opacity-60 group-hover:opacity-80 transition-opacity"
                      />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
