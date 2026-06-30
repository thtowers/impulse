import React, { useEffect, useState } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 border-b transition-all duration-300 ${
      scrolled 
        ? 'bg-[#f5f5f7]/80 border-black/10 backdrop-blur-[20px] saturate-[180%]' 
        : 'bg-[#f5f5f7]/60 border-black/5 backdrop-blur-[15px]'
    }`}>
      <div className="max-w-[1024px] mx-auto px-6 h-16 flex items-center justify-between antialiased">
        {/* Lado Esquerdo: Logo estilo Apple */}
        <div className="flex items-center">
          <a href="#magic-words" className="flex items-center hover:opacity-85 transition-opacity">
            <img src="/assets/logo_atual.png" alt="Impulse Logo" className="h-[50px] w-auto" />
          </a>
        </div>

        {/* Lado Direito: Links e CTA estilo Apple local nav */}
        <div className="flex items-center gap-6">
          <nav aria-label="Navegação local" className="hidden sm:block">
            <ul className="flex items-center gap-6 text-[12px] font-normal tracking-tight text-zinc-600">
              <li><a href="#magic-words" className="hover:text-black transition-colors">Início</a></li>
              <li><a href="#showcase" className="hover:text-black transition-colors">Catálogos</a></li>
            </ul>
          </nav>

          <a 
            href="https://wa.me/5521979362517?text=Olá, gostaria de solicitar um orçamento para criação do meu site ou catálogo!" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#0071e3] hover:bg-[#0077ed] text-white text-[12px] font-normal px-3 py-1 rounded-full transition-all duration-200"
          >
            Falar com Agência
          </a>
        </div>
      </div>
    </header>
  );
}
