import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ImpressiveWorks() {
  const containerRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Animação do Vídeo no Scroll (Efeito Expansão Cinematográfica)
      gsap.fromTo(videoWrapperRef.current,
        { scale: 0.9, borderRadius: '32px' },
        {
          scale: 1.0,
          borderRadius: '16px',
          ease: 'power1.out',
          scrollTrigger: {
            trigger: videoWrapperRef.current,
            start: 'top 85%',
            end: 'top 30%',
            scrub: 1.2,
          }
        }
      );

      // Animação de Surgimento dos Cards do Bento Grid
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, y: 45 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none'
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const solutions = [
    {
      title: 'Homepages de Alto Padrão',
      description: 'Landing pages e websites institucionais rápidos, responsivos e projetados sob medida para consolidar a autoridade digital da sua marca.',
      badge: 'Marcas Únicas',
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-.91-8.01-2.478" />
        </svg>
      )
    },
    {
      title: 'Catálogos Virtuais',
      description: 'Estruturas interativas que exibem seus produtos com fotos imponentes. O cliente seleciona os opcionais e envia o pedido pronto direto no seu WhatsApp.',
      badge: 'Conversão Direta',
      icon: (
        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    },
    {
      title: 'Links de Bio Premium',
      description: 'Uma apresentação profissional para suas redes sociais. Substitua links genéricos por uma página sofisticada e alinhada com a identidade visual do seu negócio.',
      badge: 'Redes Sociais',
      icon: (
        <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      )
    },
    {
      title: 'Projetos sob Demanda',
      description: 'Plataformas customizadas, interações 3D, simuladores e qualquer outro projeto web interativo planejado nos mínimos detalhes para impressionar seus clientes.',
      badge: 'Exclusividade',
      icon: (
        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.973-5.904m-8.973 0L4 12l8.973-5.904m0 9.808L20 12l-8.973-5.904m0 9.808V6" />
        </svg>
      )
    }
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#f5f5f7] py-20 overflow-hidden select-none"
      id="impressive-works"
    >
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-semibold text-xs md:text-sm tracking-widest text-zinc-400 uppercase block mb-3">✦ Impacto Visual</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-900 tracking-tight leading-tight mb-4">
            Para vender, você precisa <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">impressionar</span>.
          </h2>
          <p className="text-zinc-500 text-sm sm:text-base md:text-lg leading-relaxed">
            Seu cliente decide em segundos. Nós desenvolvemos a vitrine que gera percepção de valor imediata, impulsiona sua credibilidade e transforma visitas em resultados de venda reais.
          </p>
        </div>

        {/* Player de Vídeo Cinema */}
        <div 
          ref={videoWrapperRef}
          className="relative w-full aspect-video bg-black overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.12)] border border-zinc-200/50 mb-20 will-change-transform"
        >
          <video
            src="/assets/video1.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Grade de Especialidades (Bento Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {solutions.map((sol, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-white/80 backdrop-blur-[12px] border border-zinc-200/40 rounded-3xl p-8 md:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:border-zinc-300/60 transition-all duration-300 flex flex-col justify-between group cursor-default"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center border border-zinc-100 group-hover:scale-105 transition-transform duration-300">
                    {sol.icon}
                  </div>
                  <span className="text-[10px] tracking-wider text-zinc-400 font-bold uppercase bg-zinc-100 px-3 py-1 rounded-full">
                    {sol.badge}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold text-zinc-900 mb-3 tracking-tight">
                  {sol.title}
                </h3>
                <p className="text-zinc-500 text-sm sm:text-base leading-relaxed mb-6">
                  {sol.description}
                </p>
              </div>
              <div className="flex items-center text-xs font-semibold text-blue-600 gap-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                Saiba mais
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
