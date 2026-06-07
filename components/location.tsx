"use client"

import { MapPin, Phone, Mail, Clock } from "lucide-react"
import ScrollReveal from "@/components/ScrollReveal"
import { useEffect, useRef, useState } from "react"
import "leaflet/dist/leaflet.css"

export default function Location() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<any>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    if (!mapRef.current || mapInstance.current || !mapLoaded) return

    const initializeMap = async () => {
      // Import Leaflet apenas no cliente
      const L = await import("leaflet")

      if (!mapRef.current) return

      // Corrigir ícones padrão do Leaflet
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      })

      // Coordenadas fornecidas
      const latitude = -3.1039800931284067
      const longitude = -60.02257560838562

      try {
        // Criar o mapa Leaflet
        mapInstance.current = L.map(mapRef.current).setView([latitude, longitude], 17)

        // Adicionar camada de tiles do OpenStreetMap
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(mapInstance.current)

        // Criar ícone customizado (marcador vermelho)
        const customIcon = L.divIcon({
          className: "custom-marker",
          html: `
            <div style="
              width: 40px;
              height: 40px;
              border-radius: 50%;
              background-color: #DC2626;
              border: 4px solid white;
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              color: white;
              font-size: 20px;
            ">
              📍
            </div>
          `,
          iconSize: [40, 40],
          iconAnchor: [20, 20],
        })

        // Adicionar marcador no mapa
        const marker = L.marker([latitude, longitude], { icon: customIcon }).addTo(mapInstance.current)

        // Criar popup com informações
        marker.bindPopup(`
          <div style="padding: 12px; font-family: Arial, sans-serif; max-width: 250px;">
            <h3 style="margin: 0 0 8px 0; color: #1f2937; font-weight: bold; font-size: 16px;">Williams Silva Advocacia</h3>
            <p style="margin: 4px 0; color: #4b5563; font-size: 14px;">
              <strong>Endereço:</strong> Rua Rio Içá, 13
            </p>
            <p style="margin: 4px 0; color: #4b5563; font-size: 14px;">
              Nossa Sra. das Graças, Manaus - AM
            </p>
            <p style="margin: 4px 0; color: #4b5563; font-size: 14px;">
              CEP: 69053-100
            </p>
          </div>
        `)

        // Abrir popup ao adicionar o marcador
        marker.openPopup()
      } catch (error) {
        console.error("Erro ao inicializar o mapa Leaflet:", error)
      }
    }

    initializeMap()

    return () => {
      // Limpar o mapa ao desmontar
      if (mapInstance.current) {
        mapInstance.current.remove()
        mapInstance.current = null
      }
    }
  }, [mapLoaded])

  // Usar useEffect separado para definir que o mapa foi carregado
  useEffect(() => {
    setMapLoaded(true)
  }, [])

  return (
    <section id="localizacao" className="py-20 bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50">
      <ScrollReveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
                📍 Nossa Localização
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Encontre-nos em Manaus</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Visite nosso escritório localizado estrategicamente no coração de Manaus. Estamos prontos para atendê-lo presencialmente com toda a excelência que você merece.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            {/* Mapa */}
            <div 
              ref={mapRef}
              className="rounded-2xl overflow-hidden shadow-2xl h-96 md:h-full min-h-[450px] border-4 border-blue-200 hover:shadow-3xl transition-shadow duration-300"
            />

            {/* Informações de Contato */}
            <div className="flex flex-col justify-center space-y-6">
              {/* Card Endereço */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-blue-600">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg">
                      <MapPin className="h-7 w-7" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Endereço</h3>
                    <p className="text-slate-700 font-medium">Rua Rio Içá, 13</p>
                    <p className="text-slate-700 font-medium">Nossa Sra. das Graças</p>
                    <p className="text-slate-700 font-medium">Manaus - AM, 69053-100</p>
                    <p className="text-sm text-slate-500 mt-2 font-mono">
                      3°06'14.5"S 60°01'21.3"W
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Telefone */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-green-600">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-br from-green-600 to-green-700 text-white shadow-lg">
                      <Phone className="h-7 w-7" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Telefone</h3>
                    <a href="tel:+5592936870" className="text-green-600 font-bold text-lg hover:underline">
                      +55 92 9368-7089
                    </a>
                    <p className="text-sm text-slate-500 mt-1">
                      📲 Chamar agora via WhatsApp
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Email */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-purple-600">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-lg">
                      <Mail className="h-7 w-7" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Email</h3>
                    <a href="mailto:ws.advocacia1@outlook.com" className="text-purple-600 font-bold hover:underline break-all">
                      ws.advocacia1@outlook.com
                    </a>
                    <p className="text-sm text-slate-500 mt-1">
                      ⏱️ Respondemos em até 24 horas
                    </p>
                  </div>
                </div>
              </div>

              {/* Botão CTA */}
              <a
                href="https://www.google.com/maps/place/-3.1038364307833084,-60.022571604475644"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 mt-4"
              >
                <MapPin className="h-5 w-5 mr-2" />
                Abrir no Google Maps
              </a>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
