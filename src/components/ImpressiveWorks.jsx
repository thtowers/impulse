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
      { name: 'Calabresa Gourmet', price: 'R$ 54,90', img: '/assets/calabresa_gourmet.png', tag: 'Destaque' },
      { name: 'Forno Napolitano (Modelo)', price: 'R$ 58,90', img: '/assets/forno_hero.png' }
    ]
  },
  vega: {
    name: 'Vega Shoes',
    logo: 'VEGA',
    isSerif: false,
    themeColor: '#f5f5f0',
    headerBg: 'bg-[#f3f4f6]',
    headerTextColor: 'text-zinc-400',
    headerLinks: ['GIGANTES', 'TECNO', 'LOJAS'],
    headerButtons: ['COMPRAR AGORA'],
    heroImg: '/assets/vega_hero.png',
    heroTitle: <>Gigantes<br />VEGA.</>,
    heroSubtitle: 'A revolução do estilo urbano está aqui. Design tecnológico e conforto absoluto.',
    heroBtnBg: 'bg-white hover:bg-zinc-100 border-transparent text-zinc-900',
    heroBtnText: 'Shop Agora ↗',
    heroTextColor: 'text-white',
    heroSubtitleColor: 'text-zinc-300',
    heroGradient: 'from-[#1a1a1a]/60 via-[#1a1a1a]/10 to-transparent',
    bottomTitle: 'Vega Shoes Destaques',
    bottomBg: 'bg-white',
    bottomTextColor: 'text-zinc-900',
    bottomBorder: 'border-zinc-100',
    products: [
      { name: 'Veja 2 Running', price: 'R$ 890,00', img: '/assets/veja_2.png', tag: 'Tecno' },
      { name: 'Vega Urban Retro', price: 'R$ 750,00', img: '/assets/veja_2.png', tag: 'Estilo' },
      { name: 'Veja Hero Model', price: 'R$ 940,00', img: '/assets/vega_hero.png' }
    ]
  }
};

export default function ImpressiveWorks() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add("all", () => {
      const brands = ['auria', 'forno', 'vega'];

      brands.forEach((key) => {
        // Ativar perspectiva no container do mockup
        gsap.set(`#mockup-container-${key}`, { transformPerspective: 1200, transformStyle: 'preserve-3d' });

        // Timeline do GSAP para animar o encaixe lateral de cada mockup no scroll
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: `#mockup-container-${key}`,
            start: 'top 70%',
            end: 'top 25%',
            scrub: 1.2,
          }
        });

        tl.fromTo(`#hero-${key}`,
          { x: -120, rotationY: 8, transformOrigin: 'right center', opacity: 0 },
          { x: 0, rotationY: 0, opacity: 1, ease: 'power2.out', duration: 1.2 }
        )
          .fromTo(`#products-${key}`,
            { x: 120, rotationY: -8, transformOrigin: 'left center', opacity: 0 },
            { x: 0, rotationY: 0, opacity: 1, ease: 'power2.out', duration: 1.2 },
            '-=0.8'
          );

        // Animação de surgimento do bloco de texto ao lado
        gsap.fromTo(`#text-container-${key}`,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: `#text-container-${key}`,
              start: 'top 80%',
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

    // Animação autônoma para Mobile/Tablets (< 1024px)
    mm.add("(max-width: 1024px)", () => {
      const brands = ['auria', 'forno', 'vega'];

      brands.forEach((key) => {
        const tlFloating = gsap.timeline({
          repeat: -1,
          scrollTrigger: {
            trigger: `#mockup-container-${key}`,
            start: 'top 30%',
            end: 'bottom 0%',
            toggleActions: 'play pause resume pause',
          }
        });

        tlFloating
          .to(`#mockup-container-${key}`, { rotationY: 5, rotationX: 3, scale: 1.025, transformPerspective: 1200, duration: 3.5, ease: 'sine.inOut' }, 0)
          .to(`#hero-${key}`, { x: 12, y: 6, z: 30, duration: 3.5, ease: 'sine.inOut' }, 0)
          .to(`#products-${key}`, { x: -8, y: -4, z: 50, duration: 3.5, ease: 'sine.inOut' }, 0)
          .to(`#glint-${key}`, { opacity: 0.15, background: 'radial-gradient(circle 250px at 80% 20%, rgba(255,255,255,0.08), transparent 80%)', duration: 3.5, ease: 'sine.inOut' }, 0)

          .to(`#mockup-container-${key}`, { rotationY: -5, rotationX: -3, scale: 0.985, transformPerspective: 1200, duration: 4.2, ease: 'sine.inOut' }, 3.5)
          .to(`#hero-${key}`, { x: -12, y: -6, z: -10, duration: 4.2, ease: 'sine.inOut' }, 3.5)
          .to(`#products-${key}`, { x: 8, y: 4, z: -20, duration: 4.2, ease: 'sine.inOut' }, 3.5)
          .to(`#glint-${key}`, { opacity: 0.3, background: 'radial-gradient(circle 250px at 20% 80%, rgba(255,255,255,0.08), transparent 80%)', duration: 4.2, ease: 'sine.inOut' }, 3.5)

          .to(`#mockup-container-${key}`, { rotationY: 0, rotationX: 0, scale: 1, transformPerspective: 1200, duration: 3, ease: 'sine.inOut' }, 7.7)
          .to(`#hero-${key}`, { x: 0, y: 0, z: 0, duration: 3, ease: 'sine.inOut' }, 7.7)
          .to(`#products-${key}`, { x: 0, y: 0, z: 0, duration: 3, ease: 'sine.inOut' }, 7.7)
          .to(`#glint-${key}`, { opacity: 0, duration: 3, ease: 'sine.inOut' }, 7.7);
      });
    }, containerRef);

    return () => mm.revert();
  }, []);

  // Lógica do Mouse Hover Tilt 3D + Parallax de Profundidade
  const handleMouseMove = (e, containerId, innerHeroId, innerProdId, glintId) => {
    if (window.innerWidth <= 1024) return;
    const card = document.getElementById(containerId);
    const hero = document.getElementById(innerHeroId);
    const prod = document.getElementById(innerProdId);
    const glint = document.getElementById(glintId);
    if (!card) return;

    // Usamos o currentTarget (o wrapper estático) para que a área de contato não mude de tamanho/posição com a rotação, evitando flickers.
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((centerY - y) / centerY) * 7; // máx 7 graus
    const rotateY = ((x - centerX) / centerX) * 7; // máx 7 graus

    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
    card.style.transition = 'transform 0.1s ease-out, box-shadow 0.1s ease-out';
    card.style.boxShadow = '0 25px 60px rgba(0, 113, 227, 0.2), 0 0 30px rgba(41, 54, 143, 0.1)';

    if (hero) {
      hero.style.transform = `translate3d(${(x - centerX) * 0.05}px, ${(y - centerY) * 0.05}px, 20px)`;
      hero.style.transition = 'transform 0.1s ease-out';
    }
    if (prod) {
      prod.style.transform = `translate3d(${(centerX - x) * 0.04}px, ${(centerY - y) * 0.04}px, 35px)`;
      prod.style.transition = 'transform 0.1s ease-out';
    }

    if (glint) {
      glint.style.background = `radial-gradient(circle 250px at ${x}px ${y}px, rgba(255,255,255,0.08), transparent 80%)`;
      glint.style.opacity = '1';
    }
  };

  const handleMouseLeave = (containerId, innerHeroId, innerProdId, glintId) => {
    if (window.innerWidth <= 1024) return;
    const card = document.getElementById(containerId);
    const hero = document.getElementById(innerHeroId);
    const prod = document.getElementById(innerProdId);
    const glint = document.getElementById(glintId);
    if (!card) return;

    card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    card.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.25)';

    if (hero) {
      hero.style.transform = 'translate3d(0px, 0px, 0px)';
      hero.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    }
    if (prod) {
      prod.style.transform = 'translate3d(0px, 0px, 0px)';
      prod.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    }

    if (glint) {
      glint.style.opacity = '0';
      glint.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#090d29] py-28 overflow-hidden text-white border-b border-white/5"
      id="impressive-works"
    >
      {/* Raio principal — rotação 90° CW exata do bolt da logo, cruzando de lateral a lateral */}
      {/* Path original: M62 0 L18 118 L48 118 L20 220 L82 100 L52 100 Z (viewBox 100×220)        */}
      {/* Rotação 90° CW: (x,y)→(220−y, x) escalado para 300×100                               */}
      {/* Resultado: ponta esq (0,20), notch-Z em x≈139 e x≈164 (centro), ponta dir (300,62)     */}
      <div
        className="absolute left-1/2 w-[1200px] lg:w-full min-w-[1200px] lg:min-w-0 h-[700px] opacity-[0.09] pointer-events-none z-0 select-none"
        style={{ top: '5%', transform: 'translateX(-50%) rotate(-52deg)', transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 300 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Borda superior: ponta-esq → (164,82)→(164,52)→ ponta-dir               */}
          {/* Borda inferior: ponta-dir → (139,18)→(139,48)→ ponta-esq (fecha)      */}
          {/* Dois notches verticais no centro criam o Z/S da logo                   */}
          <path d="M0 20 L164 82 L164 52 L300 62 L139 18 L139 48 Z" fill="url(#ray-gradient-1)" />
          <defs>
            <linearGradient id="ray-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0071e3" stopOpacity="1" />
              <stop offset="45%" stopColor="#29368f" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Raio secundário — mesmo bolt, posicionado mais próximo do Veja Shoes */}
      <div
        className="absolute left-1/2 w-[1200px] lg:w-full min-w-[1200px] lg:min-w-0 h-[500px] opacity-[0.08] pointer-events-none z-0 select-none"
        style={{ top: '60%', transform: 'translateX(-50%) rotate(-52deg)', transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 300 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M0 20 L164 82 L164 52 L300 62 L139 18 L139 48 Z" fill="url(#ray-gradient-2)" />
          <defs>
            <linearGradient id="ray-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="1" />
              <stop offset="50%" stopColor="#29368f" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#0071e3" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Luzes decorativas difusas */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#0071e3]/8 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-purple-600/8 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-24 space-y-4">
          <span className="font-semibold text-xs md:text-sm tracking-widest text-[#0071e3] uppercase block mb-3 font-mono">✦ Impacto Visual</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Não desenvolvemos <span className="bg-gradient-to-r from-[#0071e3] to-purple-400 bg-clip-text text-transparent">sites comuns</span>.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Cada site que entregamos conta com animações modernas e um design imersivo pensado para destacar a sua marca e reter a atenção do usuário.
          </p>
        </div>

        {/* Blocos Verticais de Mockups Interativos */}
        <div className="flex flex-col gap-32 md:gap-40 mb-36">

          {/* Bloco 1: Auria Luxury */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
            {/* Lado Esquerdo: Mockup */}
            <div
              className="lg:col-span-7 w-full h-[580px] sm:h-[680px] md:h-[740px] lg:h-[720px] xl:h-[800px] relative cursor-pointer"
              onMouseMove={(e) => handleMouseMove(e, 'mockup-container-auria', 'hero-auria', 'products-auria', 'glint-auria')}
              onMouseLeave={() => handleMouseLeave('mockup-container-auria', 'hero-auria', 'products-auria', 'glint-auria')}
            >
              {/* Glow branco no mobile para destacar o mockup do fundo escuro e realçar o 3D */}
              <div className="absolute inset-8 sm:inset-16 bg-white/30 blur-[80px] lg:hidden rounded-[100px] pointer-events-none z-0" />

              <div
                id="mockup-container-auria"
                className="w-full h-full relative rounded-3xl overflow-hidden"
                style={{ boxShadow: '0 20px 50px rgba(0, 0, 0, 0.25)', transformStyle: 'preserve-3d' }}
              >
                {/* Glint Reflector */}
                <div id="glint-auria" className="absolute inset-0 pointer-events-none rounded-3xl z-30 opacity-0 transition-opacity duration-300" />

                <div className="flex flex-col h-full bg-[#160d0a] border border-white/10 rounded-3xl overflow-hidden">
                  {/* Browser Top Bar */}
                  <div className="h-9 border-b flex items-center px-4 gap-1.5 shrink-0 bg-[#160d0a] border-white/5">
                    <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                    <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                    <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
                    <div className="mx-auto text-[8px] sm:text-[9px] text-zinc-500 font-medium tracking-wide px-5 py-0.5 rounded border border-white/5 bg-[#221511]">
                      aurialuxury.store
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative w-full flex-grow flex flex-col overflow-hidden bg-[#1e130f]">
                    {/* Header */}
                    <div className="relative z-30 bg-[#160d0a] border-b border-white/5 py-2 px-4 flex justify-between items-center text-[#e8dcd0]">
                      <span className="font-serif text-[10px] md:text-xs font-bold uppercase">Auria</span>
                      <ul className="hidden xl:flex gap-4 text-[7px] font-bold tracking-wider opacity-90">
                        {brandsData.auria.headerLinks.map(link => <li key={link} className="hover:opacity-75 cursor-pointer">{link}</li>)}
                      </ul>
                      <div className="flex gap-2 text-[7px] font-bold">
                        {brandsData.auria.headerButtons.map((btn) => <span key={btn} className="cursor-pointer hover:opacity-85">{btn}</span>)}
                      </div>
                    </div>

                    {/* Hero Image e Camada do Parallax */}
                    <div id="hero-auria" className="relative w-full flex-grow overflow-hidden flex items-center bg-[#1e130f]">
                      <div className="absolute inset-y-0 right-0 w-1/2 sm:w-[55%] h-full">
                        <img
                          src={brandsData.auria.heroImg}
                          alt="Auria Luxury"
                          className="w-full h-full object-cover object-[center_18%] brightness-[0.85]"
                        />
                        <div className="absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#1e130f] to-transparent z-10" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#1e130f] via-[#1e130f]/40 to-transparent pointer-events-none z-10" />

                      <div className="relative z-20 p-5 text-white max-w-[180px] sm:max-w-[220px]">
                        <h2 className="text-xs sm:text-sm md:text-base font-light tracking-tight leading-tight mb-1 uppercase font-serif">
                          {brandsData.auria.heroTitle}
                        </h2>
                        <p className="text-[7px] sm:text-[8px] font-normal leading-relaxed mb-3 opacity-95 text-[#cfa890]">
                          {brandsData.auria.heroSubtitle}
                        </p>
                        <button className="text-[7px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border bg-[#2c1b15] border-[#3e271e] text-[#e8dcd0]">
                          {brandsData.auria.heroBtnText}
                        </button>
                      </div>
                    </div>

                    {/* Products Grid Parallax */}
                    <div id="products-auria" className="relative z-20 bg-white p-5 text-zinc-900 border-t border-zinc-100 rounded-b-3xl">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-serif text-[8px] md:text-[9px] font-bold tracking-wider uppercase text-zinc-800">Em Destaque</h3>
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
                            <span className="text-[7px] sm:text-[8px] font-bold truncate mt-0.5 text-zinc-900">{prod.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lado Direito: Texto com revelação e estilo escuro */}
            <div id="text-container-auria" className="lg:col-span-5 flex flex-col justify-center space-y-4">
              <span className="font-semibold text-xs tracking-widest text-[#0071e3] uppercase block font-mono">✦ Experiência Tridimensional</span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Criamos sites que <span className="bg-gradient-to-r from-[#0071e3] to-purple-400 bg-clip-text text-transparent">ganham vida</span>.
              </h3>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                Desenvolvemos sites com animações onde as imagens flutuam suavemente com efeito parallax e 3D tilt, criando uma experiência imersiva de toque real que envolve o seu cliente.
              </p>
            </div>
          </div>

          {/* Bloco 2: Forno Napolitano */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
            {/* Lado Esquerdo: Mockup */}
            <div
              className="lg:col-span-7 w-full h-[580px] sm:h-[680px] md:h-[740px] lg:h-[720px] xl:h-[800px] relative cursor-pointer order-first lg:order-last"
              onMouseMove={(e) => handleMouseMove(e, 'mockup-container-forno', 'hero-forno', 'products-forno', 'glint-forno')}
              onMouseLeave={() => handleMouseLeave('mockup-container-forno', 'hero-forno', 'products-forno', 'glint-forno')}
            >
              {/* Glow branco no mobile para destacar o mockup do fundo escuro e realçar o 3D */}
              <div className="absolute inset-8 sm:inset-16 bg-white/30 blur-[80px] lg:hidden rounded-[100px] pointer-events-none z-0" />

              <div
                id="mockup-container-forno"
                className="w-full h-full relative rounded-3xl overflow-hidden"
                style={{ boxShadow: '0 20px 50px rgba(0, 0, 0, 0.25)', transformStyle: 'preserve-3d' }}
              >
                {/* Glint Reflector */}
                <div id="glint-forno" className="absolute inset-0 pointer-events-none rounded-3xl z-30 opacity-0 transition-opacity duration-300" />

                <div className="flex flex-col h-full bg-[#efefef] border border-white/10 rounded-3xl overflow-hidden">
                  {/* Browser Top Bar */}
                  <div className="h-9 border-b flex items-center px-4 gap-1.5 shrink-0 bg-[#efefef] border-zinc-200">
                    <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                    <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                    <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
                    <div className="mx-auto text-[8px] sm:text-[9px] text-zinc-400 font-medium tracking-wide px-5 py-0.5 rounded border border-zinc-200 bg-white">
                      fornonapolitano.store
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative w-full flex-grow flex flex-col overflow-hidden bg-[#0a0503]">
                    {/* Header */}
                    <div className="relative z-30 bg-white border-b border-zinc-200 py-2 px-4 flex justify-between items-center text-[#1d1d1f]">
                      <span className="font-sans font-black tracking-tighter text-[10px] md:text-xs uppercase flex items-center gap-1">
                        <span className="text-[#ef4444] font-bold mr-0.5">🔥</span>FORNO
                      </span>
                      <ul className="hidden xl:flex gap-4 text-[7px] font-bold tracking-wider opacity-90">
                        {brandsData.forno.headerLinks.map(link => <li key={link} className="hover:opacity-75 cursor-pointer">{link}</li>)}
                      </ul>
                      <div className="flex gap-2 text-[7px] font-bold">
                        {brandsData.forno.headerButtons.map((btn) => (
                          <span key={btn} className="bg-[#ef4444] text-white px-2 py-0.5 rounded font-bold">{btn}</span>
                        ))}
                      </div>
                    </div>

                    {/* Hero Parallax */}
                    <div id="hero-forno" className="relative w-full flex-grow overflow-hidden flex items-center bg-black">
                      <img src={brandsData.forno.heroImg} alt="Forno Napolitano" className="absolute inset-0 w-full h-full object-cover brightness-[0.85]" />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0503]/70 via-[#0a0503]/25 to-transparent" />
                      <div className="relative z-10 p-5 text-white max-w-[200px] sm:max-w-[240px]">
                        <h2 className="text-xs sm:text-sm md:text-base font-black tracking-tight leading-tight mb-1 uppercase font-sans">
                          {brandsData.forno.heroTitle}
                        </h2>
                        <p className="text-[7px] sm:text-[8px] font-normal leading-relaxed mb-3 opacity-90 text-zinc-200">
                          {brandsData.forno.heroSubtitle}
                        </p>
                        <button className="text-[7px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border bg-[#ef4444] border-transparent text-white">
                          {brandsData.forno.heroBtnText}
                        </button>
                      </div>
                    </div>

                    {/* Products Grid Parallax */}
                    <div id="products-forno" className="relative z-20 bg-[#fbfbfd] p-5 text-[#1d1d1f] border-t border-zinc-200 rounded-b-3xl">
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
                            <span className="text-[7px] sm:text-[8px] font-bold truncate mt-0.5 text-[#1d1d1f]">{prod.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lado Direito: Texto com revelação (Na esquerda em Desktop) */}
            <div id="text-container-forno" className="lg:col-span-5 flex flex-col justify-center order-last lg:order-first space-y-4">
              <span className="font-semibold text-xs tracking-widest text-[#0071e3] uppercase block font-mono">✦ Desejo e Interação</span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Imagens que despertam o <span className="bg-gradient-to-r from-[#0071e3] to-purple-400 bg-clip-text text-transparent">desejo do cliente</span>.
              </h3>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                A combinação perfeita de imagens irresistíveis com animações imersivas. O visual ganha tanta profundidade e destaque que seus clientes vão literalmente devorar as fotos com os olhos.
              </p>
            </div>
          </div>

          {/* Bloco 3: Vega Shoes */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
            {/* Lado Esquerdo: Mockup */}
            <div
              className="lg:col-span-7 w-full h-[580px] sm:h-[680px] md:h-[740px] lg:h-[720px] xl:h-[800px] relative cursor-pointer"
              onMouseMove={(e) => handleMouseMove(e, 'mockup-container-vega', 'hero-vega', 'products-vega', 'glint-vega')}
              onMouseLeave={() => handleMouseLeave('mockup-container-vega', 'hero-vega', 'products-vega', 'glint-vega')}
            >
              {/* Glow branco no mobile para destacar o mockup do fundo escuro e realçar o 3D */}
              <div className="absolute inset-8 sm:inset-16 bg-white/30 blur-[80px] lg:hidden rounded-[100px] pointer-events-none z-0" />

              <div
                id="mockup-container-vega"
                className="w-full h-full relative rounded-3xl overflow-hidden"
                style={{ boxShadow: '0 20px 50px rgba(0, 0, 0, 0.25)', transformStyle: 'preserve-3d' }}
              >
                {/* Glint Reflector */}
                <div id="glint-vega" className="absolute inset-0 pointer-events-none rounded-3xl z-30 opacity-0 transition-opacity duration-300" />

                <div className="flex flex-col h-full bg-[#f3f4f6] border border-white/10 rounded-3xl overflow-hidden">
                  {/* Browser Top Bar */}
                  <div className="h-9 border-b flex items-center px-4 gap-1.5 shrink-0 bg-[#f3f4f6] border-[#e5e7eb]">
                    <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                    <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                    <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
                    <div className="mx-auto text-[8px] sm:text-[9px] text-zinc-400 font-medium tracking-wide px-5 py-0.5 rounded border border-white/5 bg-white">
                      vegashoes.com
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative w-full flex-grow flex flex-col overflow-hidden bg-white">
                    {/* Hero Parallax */}
                    <div id="hero-vega" className="relative w-full flex-grow overflow-hidden flex items-center bg-[#f5f5f0]">
                      <img
                        src="/assets/vega_hero.png"
                        alt="Vega Shoes Hero"
                        className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.92]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/60 via-[#1a1a1a]/10 to-transparent pointer-events-none z-10" />

                      <div className="relative z-20 p-5 text-white max-w-[200px] sm:max-w-[230px]">
                        <p className="text-[7px] sm:text-[8px] font-bold tracking-widest uppercase mb-1 opacity-70">Nova Coleção</p>
                        <h2 className="text-xs sm:text-sm md:text-base font-black tracking-tight leading-tight mb-2 uppercase text-white">
                          {brandsData.vega.heroTitle}
                        </h2>
                        <p className="text-[7px] sm:text-[8px] font-normal leading-relaxed mb-3 opacity-90 text-zinc-300">
                          {brandsData.vega.heroSubtitle}
                        </p>
                        <button className="text-[7px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border bg-white border-transparent text-zinc-900">
                          {brandsData.vega.heroBtnText}
                        </button>
                      </div>
                    </div>

                    {/* Products/Bottom Parallax */}
                    <div id="products-vega" className="relative z-20 bg-white border-t border-zinc-100 rounded-b-3xl overflow-hidden shrink-0 h-[130px] sm:h-[170px]">
                      <img
                        src="/assets/veja_2.png"
                        alt="Vega Shoes Destaques"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lado Direito: Texto com estilo escuro */}
            <div id="text-container-vega" className="lg:col-span-5 flex flex-col justify-center space-y-4">
              <span className="font-semibold text-xs tracking-widest text-[#0071e3] uppercase block font-mono">✦ Conexão Dinâmica</span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Transformamos cliques em <span className="bg-gradient-to-r from-[#0071e3] to-purple-400 bg-clip-text text-transparent">experiência imersiva</span>.
              </h3>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                Ao mesclar efeitos tridimensionais, transições de renderização de alto desempenho e tipografia fluida, entregamos sites que não são apenas visitados — eles são experimentados.
              </p>
            </div>
          </div>

        </div>

        {/* Grade de Especialidades (Bento Grid Escuro com Glassmorphism) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {solutions.map((sol, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-white/5 backdrop-blur-[20px] border border-white/10 rounded-3xl p-8 md:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.2)] hover:border-[#0071e3]/40 hover:shadow-[0_20px_50px_rgba(0,113,227,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-default"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform duration-300">
                    {sol.icon}
                  </div>
                  <span className="text-[10px] tracking-wider text-zinc-400 font-bold uppercase bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                    {sol.badge}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold text-white mb-3 tracking-tight">
                  {sol.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  {sol.description}
                </p>
              </div>
              <div className="flex items-center text-xs font-semibold text-[#0071e3] gap-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
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
      <svg className="w-6 h-6 text-[#0071e3]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-.91-8.01-2.478" />
      </svg>
    )
  },
  {
    title: 'Catálogos Virtuais',
    description: 'Estruturas interativas que exibem seus produtos com fotos imponentes. O cliente seleciona os opcionais e envia o pedido pronto direto no seu WhatsApp.',
    badge: 'Conversão Direta',
    icon: (
      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    )
  },
  {
    title: 'Links de Bio Premium',
    description: 'Uma apresentação profissional para suas redes sociais. Substitua links genéricos por uma página sofisticada e alinhada com a identidade visual do seu negócio.',
    badge: 'Redes Sociais',
    icon: (
      <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    )
  },
  {
    title: 'Projetos sob Demanda',
    description: 'Plataformas customizadas, interações 3D, simuladores e qualquer outro projeto web interativo planejado nos mínimos detalhes para impressionar seus clientes.',
    badge: 'Exclusividade',
    icon: (
      <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.973-5.904m-8.973 0L4 12l8.973-5.904m0 9.808L20 12l-8.973-5.904m0 9.808V6" />
      </svg>
    )
  }
];
