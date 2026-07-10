'use client';

import { Star, Quote, Users, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import ScrollReveal from './ScrollReveal';
import { useState, useRef, useEffect } from 'react';

interface Review {
  name: string;
  rating: number;
  text: string;
  time?: string;
  role?: string;
}

const reviews: Review[] = [
  {
    name: "Davi Hernanes",
    role: "Cliente",
    rating: 5,
    text: "Ótimos profissionais, lugar de paz e tranquilidade é ótimo atendimento",
    time: "Recente"
  },
  {
    name: "Wanila Melo",
    role: "Cliente",
    rating: 5,
    text: "Excelência",
    time: "3 semanas atrás"
  },
  {
    name: "Wanessa Silva",
    role: "Cliente",
    rating: 5,
    text: "Profissional eficiente e assertivo, pontual em seu retorno. Super recomendo.",
    time: "2 semanas atrás"
  },
  {
    name: "Erianny Costa",
    role: "Cliente",
    rating: 5,
    text: "Um excelente profissional. Tem muita experiência na área da Advocacia. Super Recomendo. Somente pontos Positivos.",
    time: "2 semanas atrás"
  },
  {
    name: "Amanda Barbosa",
    role: "Cliente",
    rating: 5,
    text: "Gostaria de registrar minha satisfação com o trabalho do advogado Williams Silva. Profissional extremamente competente, atencioso e comprometido com seus clientes.",
    time: "2 semanas atrás"
  },
  {
    name: "Maria Isabel Costa da Silva",
    role: "Cliente",
    rating: 5,
    text: "Perfeito, o local passa uma sensação muito familiar e tranquilo, o jardim é muito lindo e o advogado Williams é muito gentil",
    time: "3 semanas atrás"
  },
  {
    name: "Lauren Ferreira",
    role: "Cliente",
    rating: 5,
    text: "Incrível demais, super recomendo.",
    time: "3 semanas atrás"
  },
  {
    name: "hermogenes medeiros",
    role: "Cliente",
    rating: 5,
    text: "Lugar aconchegante, recepção de excelência, trabalho feito com responsabilidade.",
    time: "3 semanas atrás"
  },
  {
    name: "DH Social",
    role: "Cliente",
    rating: 5,
    text: "Incrível, fui muito bem atendido do início ao fim, o local é extremamente aconchegante",
    time: "3 semanas atrás"
  }
];

export function Reviews() {
  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.querySelector('div')?.offsetWidth || 0;
      const gap = 32;
      const scrollAmount = cardWidth + gap;
      
      if (direction === 'left') {
        carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        setCurrentIndex(prev => Math.max(0, prev - 1));
      } else {
        carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        setCurrentIndex(prev => Math.min(reviews.length - 1, prev + 1));
      }
    }
    
    if (autoScrollRef.current) clearTimeout(autoScrollRef.current);
    startAutoScroll();
  };

  const startAutoScroll = () => {
    autoScrollRef.current = setTimeout(() => {
      if (carouselRef.current && currentIndex < reviews.length - 1) {
        scroll('right');
      }
    }, 5000);
  };

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (autoScrollRef.current) clearTimeout(autoScrollRef.current);
    };
  }, [currentIndex]);

  return (
    <section id="avaliacoes" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal delay={0.1}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700">
              <span className="text-xs uppercase tracking-widest text-blue-400 font-semibold">O QUE NOSSOS CLIENTES DIZEM</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Confira as avaliações e depoimentos de quem confia em nós
            </h2>
          </div>
        </ScrollReveal>

        {/* Google Reviews Logo and Call to Action */}
        <ScrollReveal delay={0.2}>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              {/* Google Reviews Logo */}
              <Image 
                src="/image-removebg-preview.png" 
                alt="Google Reviews" 
                width={200} 
                height={80}
                className="h-auto"
                priority
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Carousel Container */}
        <ScrollReveal delay={0.3}>
          <div className="relative mb-16">
            {/* Carousel */}
            <div
              ref={carouselRef}
              className="flex gap-8 overflow-x-auto scroll-smooth pb-4 px-2 scrollbar-hide"
              style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {reviews.map((review, index) => (
                <div key={index} className="flex-shrink-0 w-full md:w-96">
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 flex flex-col items-center text-center h-full">
                    {/* Avatar */}
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg mb-4">
                      {getInitials(review.name)}
                    </div>

                    {/* Name and role */}
                    <h3 className="text-lg font-bold text-white mb-1">{review.name}</h3>
                    {review.role && <p className="text-slate-400 text-xs mb-3">{review.role}</p>}
                    
                    {/* Stars */}
                    <div className="flex items-center justify-center gap-1 mb-3">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    {/* Quote */}
                    <div className="relative">
                      <Quote className="absolute -top-2 -left-2 h-5 w-5 text-blue-500/30" />
                      <p className="text-slate-200 text-sm italic leading-relaxed line-clamp-3">
                        {review.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={() => scroll('left')}
              disabled={currentIndex === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white p-3 rounded-full shadow-lg transition-all duration-300 z-10"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button
              onClick={() => scroll('right')}
              disabled={currentIndex === reviews.length - 1}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white p-3 rounded-full shadow-lg transition-all duration-300 z-10"
              aria-label="Próximo"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Indicators */}
          <div className="flex items-center justify-center gap-2 mb-12">
            {reviews.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-blue-500 w-8' : 'bg-slate-600 w-2'
                }`}
              ></div>
            ))}
          </div>
        </ScrollReveal>

        {/* CTA Button */}
        <ScrollReveal delay={0.5}>
          <div className="text-center">
            <a
              href="https://www.google.com/search?q=williams+silva+advocacia&rlz=1C1UEAD_pt-BRBR1167BR1167&oq=williams+silva+advocacia&gs_lcrp=EgZjaHJvbWUyCQgAEEUYORigATIGCAEQRRg80gEINTQ1NWowajSoAgCwAgE&sourceid=chrome&source=chrome.ob&ie=UTF-8#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold px-8 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Image 
                src="/image-removebg-preview.png" 
                alt="Google Reviews" 
                width={32} 
                height={32}
                className="h-8 w-auto"
              />
              <span>Ver avaliações no Google</span>
              <ExternalLink className="h-5 w-5" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
