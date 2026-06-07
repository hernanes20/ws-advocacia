"use client";

import { Instagram, MessageCircle } from "lucide-react";

export default function SocialFloatButtons() {
  const socialButtons = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      href: "https://wa.me/+559293687089",
      bgColor: "bg-[#25D366]",
      hoverColor: "hover:bg-[#1da851]",
      ariaLabel: "Fale conosco pelo WhatsApp",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://instagram.com",
      bgColor: "bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#dc2743]",
      hoverColor: "hover:opacity-80",
      ariaLabel: "Siga-nos no Instagram",
    },
  ];

  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-center gap-4">
      {/* Tooltip Background */}
      <div className="absolute right-20 bottom-6 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        Redes Sociais
      </div>

      {/* Social Buttons */}
      <div className="flex flex-col gap-3">
        {socialButtons.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
            aria-label={social.ariaLabel}
          >
            <div
              className={`${social.bgColor} ${social.hoverColor} rounded-full shadow-lg border-2 border-white p-3 flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer`}
              title={social.name}
            >
              <social.icon className="w-6 h-6 text-white" />
            </div>
          </a>
        ))}
      </div>

      {/* Pulse Animation Background */}
      <style>{`
        @keyframes pulse-ring {
          0% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4);
          }
          70% {
            box-shadow: 0 0 0 12px rgba(37, 211, 102, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
          }
        }
        
        .animate-pulse-ring {
          animation: pulse-ring 2s infinite;
        }
      `}</style>
    </div>
  );
}
