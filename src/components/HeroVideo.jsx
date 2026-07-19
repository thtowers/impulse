import React from 'react';

export default function HeroVideo() {
  const handleScrollToNext = (e) => {
    e.preventDefault();
    const nextSection = document.getElementById('magic-words');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black"
      id="hero-video"
    >
      {/* 1. Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-80 scale-105"
      >
        <source src="/assets/video1.mp4" type="video/mp4" />
        Seu navegador não suporta a tag de vídeo.
      </video>

      {/* 2. Overlay Gradiente Escuro para Contraste e Elegância */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 z-10 pointer-events-none" />

      {/* Luzes Suaves de Ambientação em Degradê (estilo Premium Apple) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-500/10 rounded-full filter blur-[80px] md:blur-[120px] z-10 pointer-events-none" />

      {/* 3. Conteúdo Centralizado */}
      <div className="relative z-20 text-center text-white px-6 max-w-4xl flex flex-col items-center gap-6 md:gap-8">

        {/* Tag Premium no topo do Hero */}
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-[11px] font-semibold tracking-widest text-blue-400 uppercase">
          🚀 Agência Impulse Digital
        </span>

        {/* Título de Alto Impacto */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter leading-none text-white drop-shadow-sm">
          Sua Marca com Presença Digital <br className="hidden md:inline" />
          <span className="bg-gradient-to-r from-[#00c6ff] via-[#0072ff] to-[#a259ff] bg-clip-text text-transparent">
            Premium
          </span>
        </h1>

        {/* Subtítulo Sofisticado */}
        <p className="text-base sm:text-lg md:text-xl text-zinc-300 font-normal max-w-2xl leading-relaxed drop-shadow-sm">
          Desenvolvemos sites institucionais, landing pages e catálogos interativos de altíssima performance. Design exclusivo projetado para converter cliques em faturamento.
        </p>

        {/* Botões de Chamada para Ação (CTAs) */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full mt-4">
          <a
            href="https://wa.me/5521979362517?text=Olá, gostaria de solicitar um orçamento para criação do meu site ou catálogo!"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-tertiary hover:bg-tertiary-hover text-white font-medium text-sm px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] shadow-[0_4px_20px_rgba(0,113,227,0.35)]"
          >
            Quero meu Projeto
          </a>

          <a
            href="#magic-words"
            onClick={handleScrollToNext}
            className="w-full sm:w-auto bg-white/10 hover:bg-white/15 text-white border border-white/20 backdrop-blur-md font-medium text-sm px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98]"
          >
            Conhecer Nossos Pilares
          </a>
        </div>
      </div>

      {/* 4. Indicador de Rolagem com Animação Bounce */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="text-[10px] text-zinc-400 font-medium tracking-widest uppercase opacity-75">
          Role para Explorar
        </span>
        <a
          href="#magic-words"
          onClick={handleScrollToNext}
          aria-label="Rolar para próxima seção"
          className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-700/50 bg-black/40 text-zinc-400 hover:text-white hover:border-zinc-500 hover:bg-black/60 transition-all duration-300 animate-bounce"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
