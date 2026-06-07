"use client";

export default function WhatsappFloatButton() {
  return (
    <a
      href="https://wa.me/+559293687089"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-6 bottom-6 z-50 bg-transparent rounded-full p-0 flex items-center justify-center transition-transform duration-200 hover:scale-105"
      aria-label="Fale conosco pelo WhatsApp"
    >
      <span className="bg-[#25D366] rounded-full shadow-lg border-2 border-white p-2 flex items-center justify-center hover:bg-[#1da851] transition-colors duration-200">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="16" fill="#25D366" />
          <path d="M16 6C10.477 6 6 10.477 6 16c0 2.09.64 4.03 1.74 5.65L6 26l4.43-1.73A9.94 9.94 0 0 0 16 26c5.523 0 10-4.477 10-10S21.523 6 16 6Z" stroke="#fff" strokeWidth="2" fill="none" />
          <path d="M21.2 19.1c-.3-.2-1.6-.8-1.8-.9-.2-.1-.4-.2-.6.2-.2.3-.7.9-.8 1-.2.2-.3.2-.6.1-.3-.2-1.1-.4-2.1-1.2-.7-.6-1.3-1.5-1.5-1.7-.2-.3 0-.5.1-.6.1-.1.2-.3.3-.4.1-.1.1-.2.2-.3.1-.1.1-.2.2-.3.1-.2.1-.3 0-.5-.1-.2-.6-1.6-.8-2.1-.2-.6-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.2.2-.7.7-.7 1.6 0 .9.7 1.8 1 2.3.4.5 1.6 2.1 3.8 2.9.6.2 1 .3 1.2.2.4-.1 1.1-.5 1.3-.9.2-.5.2-.8.1-1Z" stroke="#fff" strokeWidth="1.5" fill="none" />
        </svg>
      </span>
    </a>
  );
}
