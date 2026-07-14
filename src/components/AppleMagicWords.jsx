import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar o plugin ScrollTrigger no GSAP
gsap.registerPlugin(ScrollTrigger);

export default function AppleMagicWords() {
  const containerRef = useRef(null);
  const textWrapperRef = useRef(null);
  const titleRef = useRef(null);
  const wordsContainerRef = useRef(null);
  const word1Ref = useRef(null);
  const word2Ref = useRef(null);
  const word3Ref = useRef(null);
  const magicalGradientRef = useRef(null);
  const imageRef = useRef(null);
  const mockupImgRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Estado Inicial do carregamento (Intro)
      gsap.fromTo(imageRef.current,
        { opacity: 0, scale: 0.94, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power3.out' }
      );

      gsap.fromTo(textWrapperRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.15 }
      );

      // Configuração inicial para a animação do Scroll
      gsap.set(titleRef.current, { opacity: 1, scale: 1, y: 0 });
      gsap.set(wordsContainerRef.current, { opacity: 0, y: 15 });
      gsap.set(word1Ref.current, { opacity: 1, y: 0 });
      gsap.set(word2Ref.current, { opacity: 0.15, y: 0 });
      gsap.set(word3Ref.current, { opacity: 0.15, y: 0 });
      gsap.set(magicalGradientRef.current, { opacity: 0 });

      // Timeline de ScrollTrigger para scroll natural e transições de palavras
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 50%', // Inicia quando o topo da seção atinge 50% (meio) da viewport
          toggleActions: 'play none none reverse',
        }
      });

      // FASE 1: A palavra "Impulse" some com o scroll
      tl.to(titleRef.current, { 
        opacity: 0, 
        scale: 0.88, 
        y: -40, 
        duration: 1.2, 
        ease: 'power1.inOut' 
      }, 0)

      // FASE 2: Transição e revelação das palavras mágicas ("Impressione. Impulsione. Venda.")
      // O container das palavras mágicas surge
      .to(wordsContainerRef.current, { 
        opacity: 1, 
        y: 0, 
        duration: 1.0, 
        ease: 'power1.inOut' 
      }, 0.8)

      // De t=0.8 a t=2.0: as palavras começam a se afastar e "Impulsione." acende
      .to(word1Ref.current, { y: -30, duration: 1.4, ease: 'power1.inOut' }, 0.8)
      .to(word2Ref.current, { opacity: 1, y: 0, duration: 1.4, ease: 'power1.inOut' }, 0.8)
      .to(word3Ref.current, { y: 30, duration: 1.4, ease: 'power1.inOut' }, 0.8)
      
      // De t=1.6 a t=2.6 (mais rápido e antecipado): as palavras se afastam no limite final, "Venda." acende e ganha gradiente
      .to(word1Ref.current, { y: -65, duration: 1.0, ease: 'power1.inOut' }, 1.6)
      .to(word2Ref.current, { y: 0, duration: 1.0, ease: 'power1.inOut' }, 1.6)
      .to(word3Ref.current, { opacity: 1, y: 65, duration: 1.0, ease: 'power1.inOut' }, 1.6)
      .to(magicalGradientRef.current, { opacity: 1, duration: 0.8, ease: 'power1.out' }, 1.8);

      // Efeito sutil de parallax e escala no mockup lateral atrelado ao scroll
      tl.to(imageRef.current, {
        y: -25,
        scale: 1.06,
        ease: 'none',
        duration: tl.duration()
      }, 0);

      // Animação de flutuação suave e contínua no mockup (independente de scroll)
      gsap.to(mockupImgRef.current, {
        y: -10,
        duration: 5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-gradient-to-b from-bg-base via-white to-bg-base overflow-hidden select-none flex items-center justify-center"
      id="magic-words"
    >
      {/* Luz Radial Traseira para profundidade (Estilo Clean Apple) */}
      <div className="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[650px] h-[350px] md:h-[650px] bg-gradient-to-tr from-blue-200/20 via-indigo-200/10 to-transparent rounded-full filter blur-[60px] md:blur-[95px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-[45%_55%] items-center gap-8 md:gap-12 h-full py-16 md:py-0 relative z-10">

        {/* Lado Esquerdo: Imagem 3D Mockup */}
        <div
          ref={imageRef}
          className="flex items-center justify-center w-full h-full max-h-[50vh] md:max-h-full overflow-hidden will-change-transform order-1 md:order-1"
        >
          <img
            ref={mockupImgRef}
            src="/assets/hero-mockups.png"
            alt="Impulse Agency Portfólio 3D"
            className="max-h-[42vh] md:max-h-[85vh] w-auto object-contain select-none filter drop-shadow-[0_30px_60px_rgba(0,0,0,0.06)] scale-105"
          />
        </div>

        {/* Lado Direito: Palavras Mágicas com Rolagem Vertical */}
        <div
          ref={textWrapperRef}
          className="relative flex items-center justify-center w-full h-[280px] sm:h-[360px] md:h-[440px] order-2 md:order-2 px-4 md:px-8"
        >
          {/* Logo de Introdução "Impulse" */}
          <div
            ref={titleRef}
            className="absolute flex items-center justify-center w-[260px] sm:w-[320px] md:w-[400px] lg:w-[460px] px-4 select-none will-change-transform"
          >
            <img 
              src="/assets/logo_atual.png" 
              alt="Impulse" 
              className="w-full h-auto object-contain" 
            />
          </div>

          {/* Container das Palavras Mágicas */}
          <div
            ref={wordsContainerRef}
            className="absolute flex flex-col justify-center items-center text-center gap-0 w-full select-none will-change-transform"
          >
            {/* Palavra 1 */}
            <span
              ref={word1Ref}
              className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-text-main py-2 will-change-transform"
            >
              IMPRESSIONE.
            </span>

            {/* Palavra 2 */}
            <span
              ref={word2Ref}
              className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-text-main py-2 will-change-transform"
            >
              IMPULSIONE.
            </span>

            {/* Palavra 3 */}
            <div
              ref={word3Ref}
              className="relative block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-text-main py-2 will-change-transform"
            >
              {/* Camada cinza base */}
              <span>VENDA.</span>
              
              {/* Camada Gradiente Superior (revelada com opacidade) */}
              <span
                ref={magicalGradientRef}
                className="absolute inset-0 w-full text-center bg-gradient-to-r from-[#ff2d55] via-[#a259ff] to-[#007aff] bg-clip-text text-transparent opacity-0 pointer-events-none py-2"
              >
                VENDA.
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
