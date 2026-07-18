import React, { useEffect, useState } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setScrolled(window.scrollY >= heroHeight - 64);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 border-b transition-all duration-300 ${
      scrolled 
        ? 'bg-bg-base/80 border-black/5 backdrop-blur-[12px] saturate-[180%]' 
        : 'bg-bg-base/95 border-black/10 shadow-md'
    }`}>
      <div className="max-w-[1024px] mx-auto px-6 h-16 flex items-center justify-between antialiased">
        {/* Lado Esquerdo: Logo estilo Apple */}
        <div className="flex items-center">
          <a 
            href="#hero-video" 
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('hero-video')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center hover:opacity-85 transition-opacity"
          >
            <img 
              src="/assets/logo_atual.png" 
              alt="Impulse Logo" 
              className="h-[50px] w-auto transition-all duration-300" 
            />
          </a>
        </div>

        {/* Lado Direito: Links e CTA estilo Apple local nav */}
        <div className="flex items-center gap-6">
          <nav aria-label="Navegação local" className="hidden sm:block">
            <ul className="flex items-center gap-6 text-[12px] font-normal tracking-tight transition-colors duration-300 text-text-muted">
              <li>
                <a 
                  href="#hero-video" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('hero-video')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="transition-colors duration-300 hover:text-text-main"
                >
                  Início
                </a>
              </li>
              {/* Link de Catálogos ocultado temporariamente
              <li>
                <a 
                  href="#showcase" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="transition-colors duration-300 hover:text-text-main"
                >
                  Catálogos
                </a>
              </li>
              */}
            </ul>
          </nav>

          <a 
            href="https://wa.me/5521979362517?text=Olá, gostaria de solicitar um orçamento para criação do meu site ou catálogo!" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-tertiary hover:bg-tertiary-hover text-white text-[12px] font-normal px-3 py-1 rounded-full transition-all duration-200"
          >
            Falar com Agência
          </a>
        </div>
      </div>
    </header>
  );
}
