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
            Traga sua marca para designs minimalistas imersivos e catálogos integrados de alta conversão.
          </p>

          {/* Botão de WhatsApp com sombra verde brilhante */}
          <button
            onClick={handleClick}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(16,185,129,0.2)] hover:shadow-[0_15px_40px_rgba(16,185,129,0.35)]"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
            <span>Desenvolver com a Impulse</span>
          </button>

          {/* Grid de Diferenciais Rápidos com visual claro */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-12 border-t border-zinc-200/60 max-w-3xl mx-auto">
            <div className="flex flex-col items-center p-4">
              <span className="text-xl mb-2">⚡</span>
              <h4 className="text-zinc-800 text-xs font-bold uppercase tracking-wider font-mono mb-1">Fluidez Extrema</h4>
              <p className="text-zinc-500 text-[11px] leading-relaxed">Layouts com animações que prendem a atenção.</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <span className="text-xl mb-2">📈</span>
              <h4 className="text-zinc-800 text-xs font-bold uppercase tracking-wider font-mono mb-1">Alta Conversão</h4>
              <p className="text-zinc-500 text-[11px] leading-relaxed">Foco estratégico em vendas e pedidos no WhatsApp.</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <span className="text-xl mb-2">🔮</span>
              <h4 className="text-zinc-800 text-xs font-bold uppercase tracking-wider font-mono mb-1">Design de Elite</h4>
              <p className="text-zinc-500 text-[11px] leading-relaxed">Identidade exclusiva com design inovador.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
