import React from 'react';

const WHATSAPP_NUMBER = '5548988290742'; // Número oficial Impulse IT
const WHATSAPP_MESSAGE = 'Olá! Gostaria de conversar com a Impulse sobre o desenvolvimento do meu projeto.';

export default function ContactCTA() {
  const handleWhatsApp = () => {
    const encodedText = encodeURIComponent(WHATSAPP_MESSAGE);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`, '_blank');
  };

  return (
    <section className="relative py-28 px-6 overflow-hidden bg-bg-base border-t border-zinc-200/80" id="contato">
      {/* Luzes difusas decorativas de fundo em tons institucionais suaves */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 rounded-full bg-blue-200/40 blur-[100px] pointer-events-none z-0" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-emerald-200/30 blur-[120px] pointer-events-none z-0" />

      {/* Container Principal */}
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Card Translúcido Premium */}
        <div className="backdrop-blur-3xl bg-white border border-zinc-200/80 rounded-[32px] p-8 md:p-16 text-center shadow-lg relative overflow-hidden">
          {/* Efeito de brilho de luz superior */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/60 via-transparent to-emerald-50/20 pointer-events-none rounded-[32px]" />

          {/* Badge Decorativo */}
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-secondary bg-bg-base border border-zinc-200/80 uppercase mb-6 font-mono shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            // VAMOS CONVERSAR?
          </span>

          {/* Título Principal */}
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-title leading-tight mb-6 max-w-2xl mx-auto">
            Pronto para transformar sua ideia em um software lucrativo?
          </h2>

          {/* Subtítulo Explicativo */}
          <p className="text-text-muted text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-10">
            Converse diretamente com nossos especialistas pelo WhatsApp. Vamos entender seu momento e apresentar a melhor solução para tirar seu projeto do papel.
          </p>

          {/* Botão de WhatsApp Único e Centralizado */}
          <div className="flex justify-center">
            <button
              onClick={handleWhatsApp}
              className="inline-flex items-center justify-center gap-3 px-8 py-4.5 rounded-full text-sm sm:text-base font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-[0_10px_25px_rgba(16,185,129,0.3)] hover:shadow-[0_15px_35px_rgba(16,185,129,0.45)]"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              <span>Falar no WhatsApp</span>
            </button>
          </div>

          {/* Grid de Diferenciais Rápidos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-12 border-t border-zinc-200/60 max-w-3xl mx-auto">
            <div className="flex flex-col items-center p-4">
              <span className="text-xl mb-2">⚡</span>
              <h4 className="text-title text-xs font-bold uppercase tracking-wider font-mono mb-1">
                Agilidade Extrema
              </h4>
              <p className="text-text-muted text-[11px] leading-relaxed">
                Ciclos curtos de desenvolvimento com feedback contínuo.
              </p>
            </div>
            <div className="flex flex-col items-center p-4">
              <span className="text-xl mb-2">💼</span>
              <h4 className="text-title text-xs font-bold uppercase tracking-wider font-mono mb-1">
                Parceria de Produto
              </h4>
              <p className="text-text-muted text-[11px] leading-relaxed">
                Visão estratégica que alinha tecnologia com lucratividade.
              </p>
            </div>
            <div className="flex flex-col items-center p-4">
              <span className="text-xl mb-2">🛡️</span>
              <h4 className="text-title text-xs font-bold uppercase tracking-wider font-mono mb-1">
                Código 100% Seu
              </h4>
              <p className="text-text-muted text-[11px] leading-relaxed">
                Propriedade intelectual integral e sem taxas ocultas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
