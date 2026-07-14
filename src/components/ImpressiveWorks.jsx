import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const brandsData = {
  auria: {
    name: 'Auria Luxury',
    logo: 'Auria',
    isSerif: true,
    themeColor: '#1e130f',
    headerBg: 'bg-[#160d0a]',
    headerTextColor: 'text-[#e8dcd0]',
    headerLinks: ['COLEÇÕES', 'MATERIAIS', 'SOBRE NÓS'],
    headerButtons: ['BUSCA', 'CARRINHO (0)'],
    heroImg: '/assets/auria_hero.png',
    heroTitle: <>Elegância<br />Atemporal</>,
    heroSubtitle: 'Descubra a Auria, onde o design encontra a sua essência. Bolsas que definem sua voz.',
    heroBtnBg: 'bg-[#2c1b15] hover:bg-[#38221a] border-[#3e271e] text-[#e8dcd0]',
    heroBtnText: 'Ver Coleção',
    heroTextColor: 'text-[#e8dcd0]',
    heroSubtitleColor: 'text-[#cfa890]',
    heroGradient: 'from-[#1e130f]/60 via-[#1e130f]/20 to-transparent',
    bottomTitle: 'Em Destaque',
    bottomBg: 'bg-white',
    bottomTextColor: 'text-zinc-900',
    bottomBorder: 'border-[#2c1b15]/10',
    products: [
      { name: 'Bolsa Curva Sand', price: 'R$ 1.980,00', img: '/assets/auria_bag1.png', tag: 'Destaque' },
      { name: 'Clutch Marrom Deep', price: 'R$ 2.450,00', img: '/assets/auria_bag2.png', tag: 'Novo' },
      { name: 'Bolsa Delicate (Modelo)', price: 'R$ 1.980,00', img: '/assets/auria_hero.png' }
    ]
  },
  forno: {
    name: 'Forno Napolitano',
    logo: 'FORNO',
    isSerif: false,
    themeColor: '#0a0503',
    headerBg: 'bg-white',
    headerTextColor: 'text-[#1d1d1f]',
    headerLinks: ['MENU', 'LOCALIZAÇÃO', 'RESERVA', 'DELIVERY'],
    headerButtons: ['PEDIR AGORA'],
    heroImg: '/assets/forno_hero.png',
    heroTitle: <>A Verdadeira Arte<br />da Pizza</>,
    heroSubtitle: 'Fermentação natural de 48h, ingredientes artesanais italianos e forno napolitano.',
    heroBtnBg: 'bg-[#ef4444] hover:bg-[#dc2626] border-transparent text-white',
    heroBtnText: 'Ver Cardápio',
    heroTextColor: 'text-white',
    heroSubtitleColor: 'text-zinc-200',
    heroGradient: 'from-[#0a0503]/70 via-[#0a0503]/25 to-transparent',
    bottomTitle: 'Menu Destaques',
    bottomBg: 'bg-[#fbfbfd]',
    bottomTextColor: 'text-[#1d1d1f]',
    bottomBorder: 'border-zinc-200',
    products: [
      { name: 'Pizza Margherita Premium', price: 'R$ 49,90', img: '/assets/pizza.png', tag: 'Artesanal' },
      { name: 'Calabresa Gourmet', price: 'R$ 54,90', img: '/assets/pizza.png', tag: 'Destaque' },
      { name: 'Forno Napolitano (Modelo)', price: 'R$ 58,90', img: '/assets/forno_hero.png' }
    ]
  }
};

export default function ImpressiveWorks() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const brands = ['auria', 'forno', 'vega'];

      brands.forEach((key) => {
        // Ativar perspectiva no container do mockup
        gsap.set(`#mockup-container-${key}`, { perspective: 1500, transformStyle: 'preserve-3d' });

        // Timeline do GSAP para animar o encaixe lateral de cada mockup no scroll
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: `#mockup-container-${key}`,
            start: 'top 50%',
            end: 'top 15%',
            scrub: 1.5,
          }
        });

        tl.fromTo(`#hero-${key}`,
          { x: -250, rotationY: 12, transformOrigin: 'right center', opacity: 0 },
          { x: 0, rotationY: 0, opacity: 1, ease: 'power3.out', duration: 1.4 }
        )
          .fromTo(`#products-${key}`,
            { x: 250, rotationY: -12, transformOrigin: 'left center', opacity: 0 },
            { x: 0, rotationY: 0, opacity: 1, ease: 'power3.out', duration: 1.4 },
            '-=1.0'
          );

        // Animação de surgimento do bloco de texto ao lado
        gsap.fromTo(`#text-container-${key}`,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: `#text-container-${key}`,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      });

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

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-bg-base py-20 overflow-hidden"
      id="impressive-works"
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="font-semibold text-xs md:text-sm tracking-widest text-text-muted uppercase block mb-3">✦ Impacto Visual</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-title tracking-tight leading-tight mb-4">
            Não desenvolvemos <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">sites comuns</span>.
          </h2>
          <p className="text-text-muted text-sm sm:text-base md:text-lg leading-relaxed">
            Cada site que entregamos é pensado para destacar o seu produto e converter visitas em vendas. Simples assim.
          </p>
        </div>

        {/* Blocos Verticais: Mockup na Esquerda, Texto Conceitual na Direita */}
        <div className="flex flex-col gap-28 md:gap-36 mb-32">

          {/* Bloco 1: Auria Luxury */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
            {/* Lado Esquerdo: Mockup */}
            <div
              id="mockup-container-auria"
              className="lg:col-span-7 w-full h-[580px] sm:h-[680px] md:h-[740px] lg:h-[720px] xl:h-[800px] relative"
            >
              <div
                style={{
                  backgroundColor: '#160d0a'
                }}
                className="rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-zinc-300/10 flex flex-col h-full overflow-hidden"
              >
                {/* Browser Top Bar */}
                <div
                  className="h-9 border-b flex items-center px-4 gap-1.5 shrink-0 rounded-t-[22px] transition-colors duration-500"
                  style={{
                    backgroundColor: '#160d0a',
                    borderBottomColor: 'rgba(255,255,255,0.05)'
                  }}
                >
                  <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                  <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                  <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
                  <div
                    className="mx-auto text-[8px] sm:text-[9px] text-zinc-500 font-medium tracking-wide px-5 py-0.5 rounded border select-none"
                    style={{
                      backgroundColor: '#221511',
                      borderColor: 'rgba(255,255,255,0.08)',
                      color: '#71717a'
                    }}
                  >
                    aurialuxury.store
                  </div>
                </div>

                {/* Content */}
                <div className="relative w-full flex-grow flex flex-col rounded-b-[22px] overflow-hidden" style={{ backgroundColor: '#1e130f' }}>

                  {/* Header */}
                  <div className="relative z-30 bg-[#160d0a] border-b border-[#2c1b15]/10 py-2 px-4 flex justify-between items-center text-[#e8dcd0] transition-colors duration-500">
                    <span className="font-serif text-[10px] md:text-xs font-bold uppercase flex items-center gap-1">
                      Auria
                    </span>
                    <ul className="hidden xl:flex gap-4 text-[7px] font-bold tracking-wider opacity-90">
                      {brandsData.auria.headerLinks.map(link => <li key={link} className="hover:opacity-70 transition-opacity cursor-pointer">{link}</li>)}
                    </ul>
                    <div className="flex gap-2 text-[7px] font-bold">
                      {brandsData.auria.headerButtons.map((btn) => (
                        <span key={btn} className="cursor-pointer hover:opacity-80 transition-opacity">
                          {btn}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hero (Encaixe GSAP da Esquerda) */}
                  <div id="hero-auria" className="relative w-full flex-grow overflow-hidden flex items-center bg-[#1e130f]">
                    {/* Imagem posicionada à direita para evitar cortes drásticos e manter a proporção */}
                    <div className="absolute inset-y-0 right-0 w-1/2 sm:w-[55%] h-full">
                      <img
                        src={brandsData.auria.heroImg}
                        alt="Auria Luxury"
                        className="w-full h-full object-cover object-[center_18%] brightness-[0.85]"
                      />
                      {/* Gradiente de fade para suavizar a borda esquerda da foto da modelo com o fundo escuro */}
                      <div className="absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#1e130f] to-transparent z-10" />
                    </div>
                    {/* Gradiente geral sob o texto para garantir contraste */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1e130f] via-[#1e130f]/40 to-transparent pointer-events-none z-10" />

                    <div className="relative z-20 p-4 sm:p-5 text-white max-w-[180px] sm:max-w-[220px]">
                      <h2 className="text-xs sm:text-sm md:text-base font-light tracking-tight leading-tight mb-1 uppercase font-serif">
                        {brandsData.auria.heroTitle}
                      </h2>
                      <p className="text-[7px] sm:text-[8px] font-normal leading-relaxed mb-3 opacity-90 text-[#cfa890]">
                        {brandsData.auria.heroSubtitle}
                      </p>
                      <button className="text-[7px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border transition-all bg-[#2c1b15] hover:bg-[#38221a] border-[#3e271e] text-[#e8dcd0]">
                        {brandsData.auria.heroBtnText}
                      </button>
                    </div>
                  </div>

                  {/* Products/Bottom (Encaixe GSAP da Direita) */}
                  <div id="products-auria" className="relative z-20 bg-white p-4 sm:p-5 text-zinc-900 border-t border-[#2c1b15]/10 rounded-b-[22px] transition-colors duration-500">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-serif text-[8px] md:text-[9px] font-bold tracking-wider uppercase">Em Destaque</h3>
                      <div className="flex gap-1">
                        <button className="w-4 h-4 border border-zinc-200 rounded-full flex items-center justify-center text-[7px] hover:bg-zinc-50 select-none">&lt;</button>
                        <button className="w-4 h-4 border border-zinc-200 rounded-full flex items-center justify-center text-[7px] hover:bg-zinc-50 select-none">&gt;</button>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {brandsData.auria.products.map((prod, idx) => (
                        <div key={idx} className="flex flex-col group cursor-pointer">
                          <div className="aspect-[4/5] w-full rounded-lg bg-zinc-50 border border-zinc-100 overflow-hidden mb-1 relative">
                            <img src={prod.img} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            {prod.tag && (
                              <span className="absolute top-1 left-1 text-[5px] font-extrabold uppercase tracking-widest px-1 py-0.5 rounded bg-zinc-900 text-white scale-90">
                                {prod.tag}
                              </span>
                            )}
                          </div>
                          <span className="text-[6px] font-bold uppercase tracking-wide text-zinc-400">{prod.price}</span>
                          <span className="text-[7px] sm:text-[8px] font-bold truncate mt-0.5 text-[#18181b]">
                            {prod.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lado Direito: Texto */}
            <div id="text-container-auria" className="lg:col-span-5 flex flex-col justify-center">
              <span className="font-semibold text-xs tracking-widest text-text-muted uppercase block mb-3">✦ Experiência & Valor</span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-title tracking-tight leading-tight mb-4">
                Sua homepage não serve apenas para <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">vender produtos</span>.
              </h3>
              <p className="text-text-muted text-sm sm:text-base md:text-lg leading-relaxed">
                Um design sob medida destaca seus produtos na tela do jeito que eles merecem, tornando a jornada de compra leve, agradável e envolvente.
              </p>
            </div>
          </div>

          {/* Bloco 2: Forno Napolitano */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
            {/* Lado Esquerdo: Mockup */}
            <div
              id="mockup-container-forno"
              className="lg:col-span-7 w-full h-[580px] sm:h-[680px] md:h-[740px] lg:h-[720px] xl:h-[800px] relative order-first lg:order-last"
            >
              <div
                style={{
                  backgroundColor: '#efefef'
                }}
                className="rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-zinc-300/10 flex flex-col h-full overflow-hidden"
              >
                {/* Browser Top Bar */}
                <div
                  className="h-9 border-b flex items-center px-4 gap-1.5 shrink-0 rounded-t-[22px] transition-colors duration-500"
                  style={{
                    backgroundColor: '#efefef',
                    borderBottomColor: 'rgba(0,0,0,0.05)'
                  }}
                >
                  <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                  <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                  <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
                  <div
                    className="mx-auto text-[8px] sm:text-[9px] text-zinc-500 font-medium tracking-wide px-5 py-0.5 rounded border select-none"
                    style={{
                      backgroundColor: '#ffffff',
                      borderColor: 'rgba(0,0,0,0.08)',
                      color: '#a1a1aa'
                    }}
                  >
                    fornonapolitano.store
                  </div>
                </div>

                {/* Content */}
                <div className="relative w-full flex-grow flex flex-col rounded-b-[22px] overflow-hidden" style={{ backgroundColor: '#0a0503' }}>

                  {/* Header */}
                  <div className="relative z-30 bg-white border-b border-zinc-200 py-2 px-4 flex justify-between items-center text-[#1d1d1f] transition-colors duration-500">
                    <span className="font-sans font-black tracking-tighter text-[10px] md:text-xs uppercase flex items-center gap-1">
                      <span className="text-[#ef4444] font-bold mr-0.5">🔥</span>FORNO
                    </span>
                    <ul className="hidden xl:flex gap-4 text-[7px] font-bold tracking-wider opacity-90">
                      {brandsData.forno.headerLinks.map(link => <li key={link} className="hover:opacity-70 transition-opacity cursor-pointer">{link}</li>)}
                    </ul>
                    <div className="flex gap-2 text-[7px] font-bold">
                      {brandsData.forno.headerButtons.map((btn) => (
                        <span key={btn} className="cursor-pointer hover:opacity-80 transition-opacity bg-[#ef4444] text-white px-2 py-0.5 rounded font-bold">
                          {btn}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hero (Encaixe GSAP da Esquerda) */}
                  <div id="hero-forno" className="relative w-full flex-grow overflow-hidden flex items-center bg-black">
                    <img src={brandsData.forno.heroImg} alt="Forno Napolitano" className="absolute inset-0 w-full h-full object-cover brightness-[0.85]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0503]/70 via-[#0a0503]/25 to-transparent" />
                    <div className="relative z-10 p-4 sm:p-5 text-white max-w-[200px] sm:max-w-[240px]">
                      <h2 className="text-xs sm:text-sm md:text-base font-black tracking-tight leading-tight mb-1 uppercase font-sans">
                        {brandsData.forno.heroTitle}
                      </h2>
                      <p className="text-[7px] sm:text-[8px] font-normal leading-relaxed mb-3 opacity-90 text-zinc-200">
                        {brandsData.forno.heroSubtitle}
                      </p>
                      <button className="text-[7px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border transition-all bg-[#ef4444] hover:bg-[#dc2626] border-transparent text-white">
                        {brandsData.forno.heroBtnText}
                      </button>
                    </div>
                  </div>

                  {/* Products/Bottom (Encaixe GSAP da Direita) */}
                  <div id="products-forno" className="relative z-20 bg-[#fbfbfd] p-4 sm:p-5 text-[#1d1d1f] border-t border-zinc-200 rounded-b-[22px] transition-colors duration-500">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-serif text-[8px] md:text-[9px] font-bold tracking-wider uppercase">Menu Destaques</h3>
                      <div className="flex gap-1">
                        <button className="w-4 h-4 border border-zinc-200 rounded-full flex items-center justify-center text-[7px] hover:bg-zinc-50 select-none">&lt;</button>
                        <button className="w-4 h-4 border border-zinc-200 rounded-full flex items-center justify-center text-[7px] hover:bg-zinc-50 select-none">&gt;</button>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {brandsData.forno.products.map((prod, idx) => (
                        <div key={idx} className="flex flex-col group cursor-pointer">
                          <div className="aspect-[4/5] w-full rounded-lg bg-zinc-50 border border-zinc-100 overflow-hidden mb-1 relative">
                            <img src={prod.img} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            {prod.tag && (
                              <span className="absolute top-1 left-1 text-[5px] font-extrabold uppercase tracking-widest px-1 py-0.5 rounded bg-zinc-900 text-white scale-90">
                                {prod.tag}
                              </span>
                            )}
                          </div>
                          <span className="text-[6px] font-bold uppercase tracking-wide text-zinc-400">{prod.price}</span>
                          <span className="text-[7px] sm:text-[8px] font-bold truncate mt-0.5 text-[#1d1d1f]">
                            {prod.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lado Direito (Texto na Esquerda em Desktop) */}
            <div id="text-container-forno" className="lg:col-span-5 flex flex-col justify-center order-last lg:order-first">
              <span className="font-semibold text-xs tracking-widest text-text-muted uppercase block mb-3">✦ Desejo Visual</span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-title tracking-tight leading-tight mb-4">
                O cliente compra aquilo que o <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">impressiona no que está vendo</span>.
              </h3>
              <p className="text-text-muted text-sm sm:text-base md:text-lg leading-relaxed">
                Uma apresentação encantadora desperta o desejo logo no primeiro olhar, transmitindo a qualidade e a credibilidade que seu produto merece.
              </p>
            </div>
          </div>

          {/* Bloco 3: Vega Shoes */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
            {/* Lado Esquerdo: Mockup */}
            <div 
              id="mockup-container-vega"
              className="lg:col-span-7 w-full h-[580px] sm:h-[680px] md:h-[740px] lg:h-[720px] xl:h-[800px] relative"
            >
              <div
                style={{
                  backgroundColor: '#f3f4f6'
                }}
                className="rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-zinc-300/10 flex flex-col h-full overflow-hidden"
              >
                {/* Browser Top Bar */}
                <div 
                  className="h-9 border-b flex items-center px-4 gap-1.5 shrink-0 rounded-t-[22px] transition-colors duration-500"
                  style={{ 
                    backgroundColor: '#f3f4f6', 
                    borderBottomColor: '#e5e7eb' 
                  }}
                >
                  <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                  <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                  <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
                  <div 
                    className="mx-auto text-[8px] sm:text-[9px] text-zinc-400 font-medium tracking-wide px-5 py-0.5 rounded border select-none"
                    style={{ 
                      backgroundColor: '#ffffff', 
                      borderColor: '#e5e7eb', 
                      color: '#9ca3af' 
                    }}
                  >
                    vegashoes.com
                  </div>
                </div>

                {/* Content */}
                <div className="relative w-full flex-grow flex flex-col rounded-b-[22px] overflow-hidden bg-white">
                  
                  {/* Hero (Encaixe GSAP da Esquerda) */}
                  <div id="hero-vega" className="relative w-full flex-grow overflow-hidden flex items-center bg-[#f5f5f0]">
                    <img 
                      src="/assets/vega_hero.png" 
                      alt="Vega Shoes Hero" 
                      className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.92]" 
                    />
                    {/* Gradiente lateral para legibilidade do texto */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/60 via-[#1a1a1a]/10 to-transparent pointer-events-none z-10" />
                    <div className="relative z-20 p-4 sm:p-5 text-white max-w-[200px] sm:max-w-[230px]">
                      <p className="text-[7px] sm:text-[8px] font-bold tracking-widest uppercase mb-1 opacity-70">Nova Coleção</p>
                      <h2 className="text-xs sm:text-sm md:text-base font-black tracking-tight leading-tight mb-2 uppercase">
                        Gigantes<br />VEGA.
                      </h2>
                      <p className="text-[7px] sm:text-[8px] font-normal leading-relaxed mb-3 opacity-80">
                        A revolução do estilo está aqui.
                      </p>
                      <button className="text-[7px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border transition-all bg-white text-zinc-900 border-white hover:bg-zinc-100">
                        Shop Agora ↗
                      </button>
                    </div>
                  </div>

                  {/* Products/Bottom (Encaixe GSAP da Direita) */}
                  <div id="products-vega" className="relative z-20 bg-white border-t border-zinc-100 rounded-b-[22px] overflow-hidden shrink-0 h-[130px] sm:h-[170px]">
                    <img 
                      src="/assets/veja_2.png" 
                      alt="Vega Shoes Destaques" 
                      className="w-full h-full object-cover object-top" 
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Lado Direito: Texto */}
            <div id="text-container-vega" className="lg:col-span-5 flex flex-col justify-center">
              <span className="font-semibold text-xs tracking-widest text-text-muted uppercase block mb-3">✦ Conexão & Desejo</span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-title tracking-tight leading-tight mb-4">
                Sua vitrine virtual precisa de <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">impacto e escala</span>.
              </h3>
              <p className="text-text-muted text-sm sm:text-base md:text-lg leading-relaxed">
                Um design imponente atrai a atenção imediata e valoriza cada produto. Criamos layouts que transformam a rolagem em uma experiência de descoberta inesquecível.
              </p>
            </div>
          </div>

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
                  <span className="text-[10px] tracking-wider text-text-muted font-bold uppercase bg-zinc-100 px-3 py-1 rounded-full">
                    {sol.badge}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold text-title mb-3 tracking-tight">
                  {sol.title}
                </h3>
                <p className="text-text-muted text-sm sm:text-base leading-relaxed mb-6">
                  {sol.description}
                </p>
              </div>
              <div className="flex items-center text-xs font-semibold text-tertiary gap-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
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

const solutions = [
  {
    title: 'Homepages de Alto Padrão',
    description: 'Landing pages e websites institucionais rápidos, responsivos e projetados sob medida para consolidar a autoridade digital da sua marca.',
    badge: 'Marcas Únicas',
    icon: (
      <svg className="w-6 h-6 text-tertiary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
