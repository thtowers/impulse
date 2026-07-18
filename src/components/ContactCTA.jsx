import React from 'react';

const WHATSAPP_NUMBER = '5521979362517';
const WHATSAPP_MESSAGE = 'Olá, gostaria de saber mais sobre como desenvolver meu site ou catálogo de alta conversão com a Impulse!';

export default function ContactCTA() {
  const handleClick = () => {
    const encodedText = encodeURIComponent(WHATSAPP_MESSAGE);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`, '_blank');
  };

  return (
    <section className="relative py-28 px-6 overflow-hidden bg-[#f5f5f7]" id="contact">
      {/* Luzes difusas decorativas de fundo em tons pastéis sutis */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 rounded-full bg-cyan-300/30 blur-[100px] pointer-events-none z-0" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-300/20 blur-[120px] pointer-events-none z-0" />

      {/* Container Principal */}
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Card de Vidro Translúcido Branco Premium */}
        <div className="backdrop-blur-3xl bg-white/70 border border-zinc-200/80 rounded-[32px] p-8 md:p-16 text-center shadow-[0_20px_50px_rgba(0,0,0,0.04)] relative overflow-hidden">
          {/* Efeito de brilho de luz superior */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent pointer-events-none rounded-[32px]" />

          {/* Badge Decorativo */}
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-[#29368f] bg-zinc-100 border border-zinc-200/80 uppercase mb-6 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#29368f] animate-pulse" />
            Inicie seu Projeto
          </span>

          {/* Título Principal */}
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#090d29] leading-tight mb-6 max-w-2xl mx-auto">
            Pronto para construir o extraordinário?
          </h2>

          {/* Subtítulo Explicativo */}
          <p className="text-zinc-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-10">
            Traga sua marca para o futuro com animações de altíssima fluidez (120 FPS), designs minimalistas imersivos e catálogos integrados de alta conversão.
          </p>

          {/* Botão de WhatsApp com sombra verde brilhante */}
          <button
            onClick={handleClick}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(16,185,129,0.2)] hover:shadow-[0_15px_40px_rgba(16,185,129,0.35)]"
          >
            {/* Ícone de Balão de Conversa */}
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.248 8.477 3.517 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654z" />
            </svg>
            <span>Desenvolver com a Impulse</span>
          </button>

          {/* Grid de Diferenciais Rápidos com visual claro */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-12 border-t border-zinc-200/60 max-w-3xl mx-auto">
            <div className="flex flex-col items-center p-4">
              <span className="text-xl mb-2">⚡</span>
              <h4 className="text-zinc-800 text-xs font-bold uppercase tracking-wider font-mono mb-1">Fluidez Extrema</h4>
              <p className="text-zinc-500 text-[11px] leading-relaxed">Layouts acelerados via GPU a 120 FPS constantes.</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <span className="text-xl mb-2">📈</span>
              <h4 className="text-zinc-800 text-xs font-bold uppercase tracking-wider font-mono mb-1">Alta Conversão</h4>
              <p className="text-zinc-500 text-[11px] leading-relaxed">Foco estratégico em vendas e pedidos no WhatsApp.</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <span className="text-xl mb-2">🔮</span>
              <h4 className="text-zinc-800 text-xs font-bold uppercase tracking-wider font-mono mb-1">Design de Elite</h4>
              <p className="text-zinc-500 text-[11px] leading-relaxed">Identidade exclusiva inspirada na estética Apple.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
