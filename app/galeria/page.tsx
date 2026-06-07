'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  { id: 1, src: '/1.jpeg', alt: 'Foto da galeria 1' },
  { id: 2, src: '/22.jpeg', alt: 'Foto da galeria 2' },
  { id: 3, src: '/33.png', alt: 'Foto da galeria 3' },
  { id: 4, src: '/5232.png', alt: 'Foto da galeria 4' },
  { id: 5, src: '/543534.png', alt: 'Foto da galeria 5' },
];

export default function GaleriaPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = (src: string) => {
    setSelectedImage(src);
    const index = images.findIndex((img) => img.src === src);
    setCurrentImageIndex(index);
  };

  const handlePrevious = () => {
    const newIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
    setSelectedImage(images[newIndex].src);
  };

  const handleNext = () => {
    const newIndex = currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
    setSelectedImage(images[newIndex].src);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') setSelectedImage(null);
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, currentImageIndex]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Galeria de Fotos
        </h1>
        <p className="text-xl text-gray-600">
          Conheça nossos trabalhos e projetos
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mt-6 rounded-full"></div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <div
              key={image.id}
              onClick={() => handleImageClick(image.src)}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white"
            >
              <div className="relative w-full h-64 sm:h-72">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white bg-opacity-90 rounded-full p-3">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão Anterior */}
            <button
              onClick={handlePrevious}
              className="absolute -left-16 sm:left-0 top-1/2 -translate-y-1/2 sm:translate-y-0 sm:-translate-x-16 text-white hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-white/10"
              aria-label="Foto anterior"
            >
              <ChevronLeft size={40} />
            </button>

            {/* Botão Próximo */}
            <button
              onClick={handleNext}
              className="absolute -right-16 sm:right-0 top-1/2 -translate-y-1/2 sm:translate-y-0 sm:translate-x-16 text-white hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-white/10"
              aria-label="Próxima foto"
            >
              <ChevronRight size={40} />
            </button>

            {/* Botão Fechar */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X size={32} />
            </button>

            {/* Imagem */}
            <img
              src={selectedImage}
              alt={images[currentImageIndex].alt}
              className="w-full h-auto rounded-lg shadow-2xl"
            />

            {/* Contador */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
              {currentImageIndex + 1} de {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
