"use client"
import { useState, useEffect } from "react"

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Só mostra se o usuário ainda não aceitou
    if (typeof window !== "undefined" && !localStorage.getItem("cookieAccepted")) {
      setVisible(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookieAccepted", "true")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 w-full z-[9999] flex justify-center">
      <div className="bg-slate-900 text-white rounded-t-lg shadow-lg p-4 max-w-xl w-full mx-2 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-blue-400">
        <span className="text-sm">
          Este site utiliza cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa
          <a href="/politica-de-privacidade" className="underline text-blue-400 ml-1" target="_blank" rel="noopener noreferrer">Política de Privacidade</a>.
        </span>
        <button
          onClick={acceptCookies}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition-colors text-sm"
        >
          Aceitar
        </button>
      </div>
    </div>
  )
}
