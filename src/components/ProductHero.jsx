import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar o plugin ScrollTrigger no GSAP
gsap.registerPlugin(ScrollTrigger);

export default function ProductHero() {
  const containerRef = useRef(null);
  const mockupRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const blocks = gsap.utils.toArray('.text-block');

      blocks.forEach((block) => {
        // Criar uma timeline ScrollTrigger para cada bloco de texto.
        // O bloco começa opaco (0.15) e deslocado para baixo (y: 40).
        // Quando entra na metade da viewport, atinge opacidade 1 e y: 0.
        // Ao rolar para fora (rumo ao topo), volta a opacidade 0.15 e desloca para cima (y: -40).
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: block,
            start: 'top 85%',
            end: 'bottom 15%',
            scrub: true,
          }
        });

        tl.fromTo(block, 
          { opacity: 0.15, y: 40 },
          { opacity: 1, y: 0, ease: 'power4.out', duration: 1 }
        )
        .to(block, 
          { opacity: 0.15, y: -40, ease: 'power4.in', duration: 1 }
        );
      });

      // Efeito sutil de revelação do Mockup ao scrollar a primeira seção (Apresentação)
      gsap.fromTo(mockupRef.current,
        { scale: 0.92, opacity: 0.85 },
        {
          scale: 1,
          opacity: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.text-section-0',
            start: 'top 80%',
            end: 'bottom 40%',
            scrub: true,
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full bg-[#f5f5f7] select-none"
      id="principles"
    >
      {/* Elemento de Gradiente Sutil de Fundo (Estilo Apple) */}
      <div className="absolute inset-0 bg-radial-gradient from-blue-100/20 via-transparent to-transparent pointer-events-none" />

      {/* Cabeçalho Secundário Fixo no Topo do Hero */}
      <div className="absolute top-8 left-0 w-full z-30 pointer-events-none">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center opacity-65">
          <span className="font-semibold text-xs tracking-widest text-zinc-500 uppercase">Nossa Filosofia</span>
          <span className="font-semibold text-xs tracking-widest text-zinc-500 uppercase">Impulse Experiência</span>
        </div>
      </div>

      {/* Main Split Screen Container */}
      <div className="relative w-full max-w-6xl mx-auto px-6 flex flex-col md:flex-row">
        
        {/* Lado Esquerdo / Superior: Mockup Fixo (Sticky) */}
        <div className="w-full md:w-1/2 h-[45vh] md:h-screen sticky top-0 flex flex-col justify-between py-8 z-20 bg-[#f5f5f7]">
          {/* Espaçador superior para equilibrar o cabeçalho */}
          <div className="h-8 w-full" />
          
          {/* Imagem Centralizada */}
          <div className="flex-grow flex items-center justify-center p-4">
            <div 
              ref={mockupRef}
              className="relative flex items-center justify-center w-full"
            >
              <img 
                src="/assets/website_device_mockup.png" 
                alt="Impulse Website Mockup" 
                className="max-h-[35vh] md:max-h-[58vh] w-auto object-contain rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] border border-zinc-200/40 bg-white"
              />
            </div>
          </div>

          {/* Rodapé do lado esquerdo (apenas no desktop para equilíbrio visual) */}
          <div className="w-full text-center opacity-50 pb-4 hidden md:block">
            <span className="text-[10px] tracking-widest text-zinc-400 uppercase">Role para explorar</span>
          </div>
        </div>

        {/* Lado Direito / Inferior: Seções de Texto Roláveis */}
        <div className="w-full md:w-1/2 flex flex-col z-10 pl-0 md:pl-16 relative">
          
          {/* Seção 0: Headline Principal */}
          <div className="text-section-0 h-[70vh] md:h-screen flex items-center justify-start py-12 md:py-0">
            <div className="text-block w-full flex flex-col justify-center text-left">
              <span className="font-semibold text-xs md:text-sm tracking-widest text-zinc-500 uppercase mb-4">Apresentação</span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 text-zinc-900 leading-tight">
                Quer impressionar seus clientes?
              </h1>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-blue-600">
                Deixe conosco.
              </h1>
            </div>
          </div>

          {/* Seção 1: Propósito */}
          <div className="text-section-1 h-[70vh] md:h-screen flex items-center justify-start py-12 md:py-0">
            <div className="text-block w-full flex flex-col justify-center text-left">
              <span className="text-zinc-500 text-xs md:text-sm font-bold tracking-widest uppercase mb-4">✦ Propósito</span>
              <h3 className="text-zinc-900 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">Valor de Marca</h3>
              <p className="text-zinc-600 text-sm sm:text-base md:text-lg leading-relaxed">
                Seu catálogo não é apenas um link, é a vitrine digital da sua marca. Focamos no que gera percepção de valor e vendas: imagens imponentes e conversão rápida.
              </p>
            </div>
          </div>

          {/* Seção 2: Simplicidade */}
          <div className="text-section-2 h-[70vh] md:h-screen flex items-center justify-start py-12 md:py-0">
            <div className="text-block w-full flex flex-col justify-center text-left">
              <span className="text-zinc-500 text-xs md:text-sm font-bold tracking-widest uppercase mb-4">☉ Simplicidade</span>
              <h3 className="text-zinc-900 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">Navegação sem Atrito</h3>
              <p className="text-zinc-600 text-sm sm:text-base md:text-lg leading-relaxed">
                Sem downloads burocráticos ou cadastros chatos. O seu cliente monta o pedido com os opcionais que preferir e envia tudo finalizado no seu WhatsApp em segundos.
              </p>
            </div>
          </div>

          {/* Seção 3: Arte & Detalhe */}
          <div className="text-section-3 h-[70vh] md:h-screen flex items-center justify-start py-12 md:py-0">
            <div className="text-block w-full flex flex-col justify-center text-left">
              <span className="text-zinc-500 text-xs md:text-sm font-bold tracking-widest uppercase mb-4">❊ Arte & Detalhe</span>
              <h3 className="text-zinc-900 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">Design de Alta Costura</h3>
              <p className="text-zinc-600 text-sm sm:text-base md:text-lg leading-relaxed">
                Cada botão, hover, espaçamento e transição é planejado milimetricamente sob os padrões de usabilidade modernos. O toque de elegância atemporal que destaca seus produtos.
              </p>
            </div>
          </div>

          {/* Seção 4: Prazer Visual */}
          <div className="text-section-4 h-[70vh] md:h-screen flex items-center justify-start py-12 md:py-0">
            <div className="text-block w-full flex flex-col justify-center text-left">
              <span className="text-zinc-500 text-xs md:text-sm font-bold tracking-widest uppercase mb-4">❦ Prazer Visual</span>
              <h3 className="text-zinc-900 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">Efeito Encantador</h3>
              <p className="text-zinc-600 text-sm sm:text-base md:text-lg leading-relaxed">
                Navegação super fluida com visual light premium e micro-animações interativas. Um design requintado que transforma a compra em uma experiência prazerosa.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
