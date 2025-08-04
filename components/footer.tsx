import { Scale, MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin, Youtube } from "lucide-react"
import Head from "next/head"

export default function Footer() {
  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/wpplogo.png" />
        <link rel="icon" href="/logoaba.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/logoaba.png" sizes="192x192" type="image/png" />
        <link rel="icon" href="/logoaba.png" sizes="512x512" type="image/png" />
        <link rel="icon" href="/logoaba.ico" sizes="any" />
        <script dangerouslySetInnerHTML={{ __html: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
              navigator.serviceWorker.register('/service-worker.js');
            });
          }
        ` }} />
      </Head>
      <footer id="footer-contato" className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <Scale className="h-8 w-8 text-blue-400" />
                <div>
                  <h3 className="text-xl font-bold">Williams Silva</h3>
                  <p className="text-sm text-slate-400">Advocacia</p>
                </div>
              </div>
              <p className="text-slate-300 mb-6 leading-relaxed">
                Defendendo seus direitos com excelência, ética e comprometimento. Sua confiança é nossa
                maior conquista.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Áreas de Atuação</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-slate-300 hover:text-blue-400 transition-colors">
                    Direito Tributário
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-300 hover:text-blue-400 transition-colors">
                    Direito Previdenciário
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-300 hover:text-blue-400 transition-colors">
                    Direito Imobiliário
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-300 hover:text-blue-400 transition-colors">
                    Direito Consumidor
                  </a>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Links Úteis</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#inicio" className="text-slate-300 hover:text-blue-400 transition-colors">
                    Início
                  </a>
                </li>
                <li>
                  <a href="#sobre" className="text-slate-300 hover:text-blue-400 transition-colors">
                    Sobre Nós
                  </a>
                </li>
                <li>
                  <a href="#servicos" className="text-slate-300 hover:text-blue-400 transition-colors">
                    Serviços
                  </a>
                </li>
                <li>
                  <a href="#contato" className="text-slate-300 hover:text-blue-400 transition-colors">
                    Contato
                  </a>
                </li>
                
                <li className="flex gap-2 items-center">
                  <a href="/politica-de-privacidade" className="text-slate-300 hover:text-blue-400 transition-colors">
                    Política de Privacidade
                  </a>
                </li>
                <li className="flex gap-2 items-center">
                  <a href="/termos-de-uso" className="text-slate-300 hover:text-blue-400 transition-colors">
                    Termos de Uso
                  </a>
                </li>      
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Contato</h4>
              <div className="space-y-4">

                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-400" />
                  <div className="text-slate-300">
                    <p>+55 92 99368-7089</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-400" />
                  <p className="text-slate-300">ws.advocacia1@outlook.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-slate-400 text-sm">© 2025 Williams Silva Advocacia. Todos os direitos reservados.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="/termos-de-uso" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">
                  Termos de Uso
                </a>
                <a href="/politica-de-privacidade" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">
                  Política de Privacidade
                </a>
                <a href="/cookies" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
