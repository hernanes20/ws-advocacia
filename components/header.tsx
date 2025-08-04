"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Scale, Phone, Mail } from "lucide-react"
import { Instagram } from "lucide-react"

export default function Header() {
  // Definição dos itens de navegação
  const navItems = [
    { label: 'Início', href: 'inicio' },
    { label: 'Sobre', href: 'sobre' },
    { label: 'Serviços', href: 'servicos' },
    { label: 'Newsletter', href: 'newsletter' },
  ];
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <>
      {/* Top Bar */}
      <div className="bg-slate-900 text-white py-2 px-4 shadow-md fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 opacity-80" />
              <span className="opacity-90">+55 92 9368-7089</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 opacity-80" />
              <span className="opacity-90">ws.advocacia1@outlook.com</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <a href="https://www.instagram.com/williams_silva77?utm_source=ig_web_button_share_sheet&igsh=amx6b2h3b2ViZjZl" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="h-5 w-5 opacity-80 hover:opacity-100 transition" />
            </a>
            <a href="mailto:ws.advocacia1@outlook.com" aria-label="E-mail">
              <Mail className="h-5 w-5 opacity-80 hover:opacity-100 transition" />
            </a>
            <a href="https://wa.me/559293687089" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <svg className="h-5 w-5 opacity-80 hover:opacity-100 transition" viewBox="0 0 32 32" fill="currentColor">
                <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.832 4.584 2.236 6.393L4 29l7.824-2.05C13.74 27.634 14.857 28 16 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.01 0-2.005-.152-2.96-.451l-.211-.066-4.646 1.217 1.24-4.527-.137-.22C7.44 18.36 7 16.7 7 15c0-5.065 4.935-9 9-9s9 3.935 9 9-4.935 9-9 9zm5.07-6.29c-.277-.139-1.637-.808-1.89-.899-.253-.092-.437-.139-.62.139-.184.277-.713.899-.873 1.084-.161.184-.322.208-.599.069-.277-.139-1.17-.431-2.23-1.374-.824-.735-1.38-1.64-1.542-1.917-.161-.277-.017-.427.122-.565.126-.125.277-.322.415-.483.139-.161.184-.277.277-.462.092-.184.046-.346-.023-.484-.069-.139-.62-1.497-.849-2.052-.224-.539-.453-.466-.62-.475l-.528-.009c-.184 0-.484.069-.737.346-.253.277-.966.945-.966 2.304 0 1.359.99 2.672 1.127 2.857.138.184 1.949 2.98 4.725 4.058.661.285 1.176.456 1.578.584.663.211 1.267.181 1.743.11.532-.079 1.637-.669 1.87-1.316.23-.646.23-1.199.161-1.316-.069-.115-.253-.184-.53-.323z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Espaço para compensar a altura da barra fixa */}
      <div className="h-[104px] md:h-[120px]"></div>

      {/* Main Header */}
      <header className="bg-white/95 shadow-lg border-b border-blue-100 fixed top-10 left-0 w-full z-40">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="/logowill.png"
              alt="Logo"
              className="h-14 w-auto"
              style={{ maxHeight: '56px', width: 'auto' }}
            />
          </div>
          <nav className="hidden md:flex gap-2 ml-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                className="px-4 py-2 text-gray-800 font-medium hover:bg-blue-50 rounded transition-colors"
                onClick={() => scrollToSection(item.href)}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="hidden md:block ml-2">
            <Button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors border-0" onClick={() => {
              const el = document.getElementById('footer-contato');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              setIsMenuOpen(false);
            }}>
              Contato
            </Button>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="text-slate-700 hover:text-slate-900"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
            <div className="bg-white w-64 h-full shadow-lg p-6">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="mb-6 text-slate-700 hover:text-slate-900"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    className="text-slate-700 hover:text-slate-900 text-left transition-colors"
                    onClick={() => {
                    scrollToSection(item.href);
                      setIsMenuOpen(false);
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
