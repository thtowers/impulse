import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';

// Número do WhatsApp oficial da agência para onde as conversões de pedidos serão direcionadas
const WHATSAPP_NUMBER = '5521979362517';

/**
 * Definição dos segmentos de produtos (Categorias do Catálogo)
 * Cada segmento tem um ID único, ícone emoji, e classes de estilização exclusivas
 */
const segments = [
  { id: 'joias', name: 'Joias', icon: '✨', colorClass: 'bg-[#d4af37]', colorText: 'text-[#d4af37]', colorBorder: 'border-[#d4af37]' },
  { id: 'relogios', name: 'Relógios', icon: '⌚', colorClass: 'bg-[#8e8e93]', colorText: 'text-[#8e8e93]', colorBorder: 'border-[#8e8e93]' },
  { id: 'oculos', name: 'Óculos', icon: '🕶️', colorClass: 'bg-[#1d1d1f]', colorText: 'text-[#1d1d1f]', colorBorder: 'border-[#1d1d1f]' },
  { id: 'perfumes', name: 'Perfumes', icon: '🌸', colorClass: 'bg-[#e5c1cd]', colorText: 'text-[#e5c1cd]', colorBorder: 'border-[#e5c1cd]' },
  { id: 'bolsas', name: 'Bolsas', icon: '👜', colorClass: 'bg-[#c49a6c]', colorText: 'text-[#c49a6c]', colorBorder: 'border-[#c49a6c]' },
  { id: 'acessorios', name: 'Acessórios', icon: '🔑', colorClass: 'bg-[#7d7d7d]', colorText: 'text-[#7d7d7d]', colorBorder: 'border-[#7d7d7d]' }
];

/**
 * Banco de Dados de Produtos do Catálogo Editorial
 * Organizado por categorias para exibir a grande diversidade de criação da Impulse
 */
const catalogData = {
  joias: {
    brand: 'Aurum Fine Jewelry',
    tagline: 'A lapidação perfeita do metal e a raridade das gemas em criações eternas.',
    products: [
      {
        id: 'j1',
        title: 'Colar Esmeralda Imperial',
        desc: 'Corrente em ouro amarelo 18k com pendente selecionado de esmeralda lapidação gota cercada por brilhantes.',
        price: 8900.00,
        image: '/assets/showcase_joias_hero.png',
        tag: 'Coleção Exclusiva',
        details: ['Esmeralda Natural 1.2 Quilates', 'Ouro Amarelo 18k Certificado', 'Lapidação Artesanal Gota', 'Corrente Veneziana 45cm'],
        customizers: [
          { label: 'Lapidação', options: ['Gota', 'Esmeralda', 'Oval'], active: 'Gota' }
        ]
      },
      {
        id: 'j2',
        title: 'Anel Solitário Diamond Aura',
        desc: 'Anel em platina 950 com cravação central de diamante solitário lapidação brilhante com micro-pavê de brilhantes no aro.',
        price: 12500.00,
        image: '/assets/showcase_joias_prod.png',
        tag: 'Destaque',
        details: ['Diamante Central 0.8 Quilates', 'Platina 950 Pureza Máxima', 'Cravação Manual Exclusiva', 'Garantia Eterna de Autenticidade'],
        customizers: [
          { label: 'Metal', options: ['Platina 950', 'Ouro Branco 18k'], active: 'Platina 950' }
        ]
      }
    ]
  },
  relogios: {
    brand: 'Chronos Manufacture',
    tagline: 'Engenharia mecânica de alta precisão e estética atemporal.',
    products: [
      {
        id: 'r1',
        title: 'Cronógrafo Chronos Noir',
        desc: 'Relógio esportivo com caixa de aço escovado revestido em DLC preto, mostrador de safira e movimento automático suíço.',
        price: 18200.00,
        image: '/assets/showcase_relogios_hero.png',
        tag: 'Edição Limitada',
        details: ['Movimento Calibre Impulse-9', 'Caixa 42mm Aço DLC', 'Vidro de Safira Antirreflexo', 'Resistência a Água 100m'],
        customizers: [
          { label: 'Pulseira', options: ['Aço Escovado', 'Borracha FKM'], active: 'Aço Escovado' }
        ]
      },
      {
        id: 'r2',
        title: 'Classic Leather Ouro Rose',
        desc: 'Relógio social minimalista ultra-fino em ouro rose 18k, mostrador off-white e pulseira de couro de jacaré.',
        price: 9400.00,
        image: '/assets/showcase_relogios_prod.png',
        tag: 'Clássico',
        details: ['Espessura Ultra-Fina 6.8mm', 'Ouro Rose 18k Maciço', 'Pulseira Couro Jacaré', 'Movimento Corda Manual'],
        customizers: [
          { label: 'Mostrador', options: ['Preto Opaco', 'Branco Creme'], active: 'Branco Creme' }
        ]
      }
    ]
  },
  oculos: {
    brand: 'Visio Eyewear',
    tagline: 'Design arquitetônico e proteção máxima em acetato italiano e titânio.',
    products: [
      {
        id: 'o1',
        title: 'Óculos de Sol Noir Acetato',
        desc: 'Óculos de sol em acetato italiano premium polido à mão, lentes polarizadas com proteção UVA/UVB.',
        price: 1850.00,
        image: '/assets/showcase_oculos_hero.png',
        tag: 'Campanha',
        details: ['Acetato Italiano Premium', 'Lentes Polarizadas G-15', 'Dobradiças de 5 Dentes', 'Proteção 100% UV'],
        customizers: [
          { label: 'Lente', options: ['G-15 Polarizada', 'Degradê Dark'], active: 'G-15 Polarizada' }
        ]
      },
      {
        id: 'o2',
        title: 'Armação Retrô Gold',
        desc: 'Armação oftálmica ultra-leve de titânio banhado a ouro 24k com ponte dupla e plaquetas macias.',
        price: 1450.00,
        image: '/assets/showcase_oculos_prod.png',
        tag: 'Conceito',
        details: ['Estrutura 100% Titânio', 'Banho Ouro 24k Nobre', 'Peso Reduzido 12g', 'Hastes Flexíveis'],
        customizers: [
          { label: 'Tamanho', options: ['Médio (48)', 'Grande (50)'], active: 'Médio (48)' }
        ]
      }
    ]
  },
  perfumes: {
    brand: 'Maison des Parfums',
    tagline: 'Alquimia olfativa com matérias-primas raras em frascos esculturais.',
    products: [
      {
        id: 'pf1',
        title: 'Essência Amber & Sândalo',
        desc: 'Extrato de perfume com notas intensas de âmbar gris, sândalo da Índia, baunilha de Madagascar e especiarias.',
        price: 780.00,
        image: '/assets/showcase_perfumes_hero.png',
        tag: 'Unissex',
        details: ['Concentração Extrait', 'Notas Sândalo & Âmbar', 'Fixação Prolongada 12h+', 'Frasco Cristal Geométrico'],
        customizers: [
          { label: 'Volume', options: ['50ml', '100ml'], active: '100ml' }
        ]
      },
      {
        id: 'pf2',
        title: 'Eau de Parfum Bloom',
        desc: 'Fragrância floral e delicada com notas de topo de bergamota siciliana, coração de jasmim sambac.',
        price: 690.00,
        image: '/assets/showcase_perfumes_prod.png',
        tag: 'Femme',
        details: ['Eau de Parfum Premium', 'Notas Florais & Cítricas', 'Ingredientes 100% Orgânicos', 'Frasco Lapidado Detalhado'],
        customizers: [
          { label: 'Concentração', options: ['Eau de Parfum', 'Extrait'], active: 'Eau de Parfum' }
        ]
      }
    ]
  },
  bolsas: {
    brand: 'Auria Leathergoods',
    tagline: 'Formas puras e design autoral em couro de curtume ético.',
    products: [
      {
        id: 'b1',
        title: 'Bolsa Matelassê Noir',
        desc: 'Bolsa de ombro estruturada em couro legítimo matelassê acolchoado com alça de corrente metálica banhada a ouro.',
        price: 4800.00,
        image: '/assets/showcase_bolsas_hero.png',
        tag: 'Must Have',
        details: ['Couro Legítimo Curtido', 'Costura Matelassê Premium', 'Alça Corrente Ouro', 'Bolso Traseiro Invisível'],
        customizers: [
          { label: 'Alça', options: ['Corrente Dourada', 'Couro Removível'], active: 'Corrente Dourada' }
        ]
      },
      {
        id: 'b2',
        title: 'Bolsa Tote Tan Desert',
        desc: 'Bolsa de mão espaçosa em couro granulado cor caramelo, interior sem forro e fechamento com mosquetão metálico.',
        price: 3900.00,
        image: '/assets/showcase_bolsas_prod.png',
        tag: 'Essencial',
        details: ['Couro Bovino Granulado', 'Costuras Reforçadas', 'Dimensões 35x28x15cm', 'Produção sob Demanda'],
        customizers: [
          { label: 'Cor', options: ['Caramelo', 'Preto Clássico'], active: 'Caramelo' }
        ]
      }
    ]
  },
  acessorios: {
    brand: 'Minimalist Objects',
    tagline: 'Acessórios funcionais criados com metais nobres e engenharia de precisão.',
    products: [
      {
        id: 'a1',
        title: 'Porta Cartões Titanium',
        desc: 'Carteira ultra-fina em titânio aeroespacial anodizado com bloqueio RFID e clipe metálico para cédulas.',
        price: 950.00,
        image: '/assets/showcase_acessorios_hero.png',
        tag: 'Tecnologia',
        details: ['Titânio Grau 5 Aeroespacial', 'Bloqueio RFID Integrado', 'Capacidade até 12 Cartões', 'Espessura de Apenas 6mm'],
        customizers: [
          { label: 'Cor Metal', options: ['Cinza Fosco', 'Azul Titânio'], active: 'Cinza Fosco' }
        ]
      },
      {
        id: 'a2',
        title: 'Chaveiro Mosquetão Loop',
        desc: 'Chaveiro inteligente em latão maciço com trava de rosca de alta segurança e tira de couro curtido.',
        price: 320.00,
        image: '/assets/showcase_acessorios_prod.png',
        tag: 'Cotidiano',
        details: ['Latão Maciço Usinado', 'Tira em Couro Vegano', 'Trava Rosca Rápida', 'Anel Divisor Integrado'],
        customizers: [
          { label: 'Tira', options: ['Couro Natural', 'Preto Fosco'], active: 'Couro Natural' }
        ]
      }
    ]
  }
};

export default function Showcase() {
  // --- ESTADOS DO COMPONENTE ---
  
  // Segmento ativo na navegação de abas (ex: 'joias', 'relogios', etc.)
  const [activeSegment, setActiveSegment] = useState('joias');
  // Objeto contendo as opções selecionadas de customização por produto (ex: tamanho, metal, alça)
  const [productCustomizerState, setProductCustomizerState] = useState({});
  // Lista de IDs dos produtos recentemente adicionados para controlar micro-efeitos de loading nos botões
  const [addedProductIds, setAddedProductIds] = useState([]);
  // Itens colocados na sacola de compras antes da conversão no WhatsApp
  const [cart, setCart] = useState([]);
  // ID do perfume ativo selecionado no layout organic spotlight da aba de Perfumes
  const [selectedPerfumeId, setSelectedPerfumeId] = useState('pf1');
  // ID da joia em foco na galeria split screen da aba de Joias
  const [activeJewelryId, setActiveJewelryId] = useState('j1');

  // Dados do segmento atualmente em exibição
  const currentSegmentData = catalogData[activeSegment];

  // --- EFEITOS E TRANSIÇÕES ---

  // Dispara uma animação de fade-in e slide-up sutil usando GSAP toda vez que a aba de categoria é alterada
  useEffect(() => {
    gsap.fromTo('#showcase-content-wrapper',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );
  }, [activeSegment]);

  // --- MANIPULADORES DE EVENTOS ---

  // Gerencia a mudança de abas limpando a sacola anterior e restaurando estados de exibição internos
  const handleTabChange = (segId) => {
    setActiveSegment(segId);
    setCart([]);
    setAddedProductIds([]);
    setSelectedPerfumeId('pf1');
    setActiveJewelryId('j1');
  };

  // Salva a opção de customização escolhida (ex: metal selecionado: 'Platina') para o respectivo produto
  const handleOptionSelect = (productId, label, optionValue) => {
    setProductCustomizerState(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [label]: optionValue
      }
    }));
  };

  // Insere um item na sacola de compras local e exibe um feedback visual rápido "Adicionado" por 1 segundo
  const addToCart = (product) => {
    const selectedOptions = {};
    product.customizers.forEach(c => {
      const selected = productCustomizerState[product.id]?.[c.label] || c.active;
      selectedOptions[c.label] = selected;
    });

    const optionsString = Object.entries(selectedOptions)
      .map(([k, v]) => `${k}: ${v}`)
      .join(', ');

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(
        item => item.id === product.id && item.options === optionsString
      );

      // Gatilho de animação temporária de feedback de sucesso no botão
      setAddedProductIds(prev => [...prev, product.id]);
      setTimeout(() => {
        setAddedProductIds(prev => prev.filter(id => id !== product.id));
      }, 1000);

      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += 1;
        return newCart;
      } else {
        return [...prevCart, {
          id: product.id,
          name: product.title,
          price: product.price,
          options: optionsString,
          quantity: 1,
          segment: activeSegment
        }];
      }
    });
  };

  // Converte a sacola em uma mensagem formatada e envia o link direto para o WhatsApp do lojista
  const finalizeOrder = () => {
    if (cart.length === 0) return;

    const segmentLabel = segments.find(s => s.id === activeSegment)?.name || 'Loja';
    let message = `*NOVO PEDIDO (${segmentLabel.toUpperCase()} - DEMO IMPULSE)*\n\n`;

    cart.forEach(item => {
      message += `• *${item.quantity}x ${item.name}*\n`;
      if (item.options) {
        message += `  _${item.options}_\n`;
      }
      const itemSubtotal = item.price * item.quantity;
      message += `  Subtotal: R$ ${itemSubtotal.toFixed(2).replace('.', ',')}\n\n`;
    });

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `*Total do Pedido:* R$ ${totalPrice.toFixed(2).replace('.', ',')}\n\n`;
    message += `_Pedido gerado demonstrativamente no site do portfólio da Impulse._`;

    const encodedText = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`, '_blank');
  };

  // Cálculos de soma para exibição na sacola flutuante de checkout
  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // ========================================================
  // RENDERIZADORES DE LAYOUT EXCLUSIVOS (Diversidade Impulse)
  // ========================================================

  /**
   * 1. JOIAS: Layout Editorial Split Screen (Boutique de Ouro Clássica)
   * Apresenta um poster de alta resolução na esquerda que se altera conforme
   * o usuário navega na lista de detalhes das peças do lado direito.
   */
  const renderJoiasLayout = () => {
    const mainProd = currentSegmentData.products[0];
    const secProd = currentSegmentData.products[1];
    const activeJewelry = currentSegmentData.products.find(p => p.id === activeJewelryId) || mainProd;

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Lado Esquerdo: Poster da Campanha com Zoom Lento */}
        <div className="relative rounded-[32px] overflow-hidden shadow-2xl h-[520px] lg:h-[620px] group border border-amber-100 bg-[#faf9f6]">
          <img 
            src={activeJewelry.image} 
            alt={activeJewelry.title} 
            className="w-full h-full object-cover transition-transform duration-[6000ms] group-hover:scale-105"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090d29]/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-10 left-10 right-10 text-white">
            <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#d4af37] block mb-2">{activeJewelry.tag}</span>
            <h3 className="text-3xl lg:text-4xl font-light tracking-tight font-serif mb-3 leading-tight">{activeJewelry.title}</h3>
            <p className="text-zinc-300 text-xs leading-relaxed max-w-sm font-light">
              {activeJewelry.desc}
            </p>
          </div>
        </div>

        {/* Lado Direito: Informações Editoriais e Lista de Produtos */}
        <div className="space-y-8 flex flex-col justify-center">
          <div className="border-b border-amber-200/30 pb-6">
            <span className="text-[10px] tracking-widest font-extrabold uppercase text-[#d4af37] block mb-2">{currentSegmentData.brand}</span>
            <h2 className="text-3xl font-serif text-[#090d29] tracking-tight leading-none">Coleção Aurum</h2>
            <p className="text-zinc-500 text-sm mt-3 leading-relaxed">{currentSegmentData.tagline}</p>
          </div>

          <div className="space-y-6">
            {[mainProd, secProd].map(prod => {
              const isAdded = addedProductIds.includes(prod.id);
              const isActive = activeJewelryId === prod.id;
              return (
                <div 
                  key={prod.id}
                  onMouseEnter={() => setActiveJewelryId(prod.id)}
                  className={`border rounded-2xl p-6 transition-all duration-300 flex gap-6 items-center cursor-pointer ${
                    isActive 
                      ? 'border-[#d4af37] bg-white shadow-xl translate-x-2' 
                      : 'border-zinc-200/60 bg-transparent hover:border-zinc-300'
                  }`}
                >
                  <img src={prod.image} alt={prod.title} className="w-20 h-20 object-cover rounded-xl border border-zinc-200 shadow-sm shrink-0" />
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-1.5">
                      <h4 className="font-serif font-bold text-base text-[#090d29]">{prod.title}</h4>
                      <span className="text-[10px] font-mono text-[#d4af37] font-semibold">R$ {prod.price.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 mb-4">
                      {prod.details.slice(0, 2).map(d => (
                        <span key={d} className="text-[9px] text-zinc-500 font-serif flex items-center gap-1">
                          <span className="text-[#d4af37]">✦</span> {d}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        {prod.customizers.map(cust => (
                          <div key={cust.label} className="flex items-center gap-1">
                            <span className="text-[8px] text-zinc-400 font-bold uppercase">{cust.label}:</span>
                            <span className="text-[9px] font-serif font-bold text-zinc-700">{productCustomizerState[prod.id]?.[cust.label] || cust.active}</span>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(prod);
                        }}
                        className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all duration-300 ${
                          isAdded ? 'bg-green-600 text-white' : 'bg-[#090d29] hover:bg-[#d4af37] text-white hover:text-[#090d29]'
                        }`}
                      >
                        {isAdded ? 'Adicionado ✓' : 'Adicionar'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  /**
   * 2. RELÓGIOS: Layout Technical Bento Grid (Dark Mode Tecnológico de Titânio)
   * Altera a caixa inteira para um design escuro de fibra de carbono/titânio.
   * Apresenta dados e especificações em fontes monospace lembrando interfaces cronométricas.
   */
  const renderRelogiosLayout = () => {
    const mainProd = currentSegmentData.products[0];
    const secProd = currentSegmentData.products[1];
    const isAddedMain = addedProductIds.includes(mainProd.id);
    const isAddedSec = addedProductIds.includes(secProd.id);

    return (
      <div className="flex flex-col gap-12">
        {/* Cabeçalho Cronológico */}
        <div className="text-center max-w-2xl mx-auto border-b border-white/10 pb-6">
          <span className="text-[9px] tracking-widest font-mono text-cyan-400 block mb-2">{currentSegmentData.brand}</span>
          <h2 className="text-3xl font-mono text-white tracking-tight uppercase">SYSTEM TIME</h2>
          <p className="text-zinc-400 text-xs font-mono mt-2">{currentSegmentData.tagline}</p>
        </div>

        {/* Bento Grid de Aço */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Card Principal do Cronógrafo (Grande - 7 Colunas) */}
          <div className="lg:col-span-7 bg-[#030612] border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xl">
            <div className="relative rounded-2xl overflow-hidden h-[240px] md:h-[280px] mb-6 group border border-white/5 bg-black/45">
              <img src={mainProd.image} alt={mainProd.title} className="w-full h-full object-cover transition-transform duration-[4000ms] group-hover:scale-105" />
              <span className="absolute top-4 left-4 text-[9px] bg-cyan-400 text-zinc-950 font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded shadow">{mainProd.tag}</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-mono font-bold text-white uppercase">{mainProd.title}</h3>
                <span className="text-sm font-mono font-bold text-cyan-400">R$ {mainProd.price.toFixed(2).replace('.', ',')}</span>
              </div>
              <p className="text-zinc-400 text-xs font-light leading-relaxed">{mainProd.desc}</p>
              
              {/* Painel de Telemetria de Calibre */}
              <div className="grid grid-cols-2 gap-2.5 bg-black/40 p-4 rounded-xl border border-white/5 font-mono text-[9px] text-zinc-400">
                {mainProd.details.map(d => (
                  <span key={d} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-cyan-400" /> {d}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-white/5 gap-4">
                {mainProd.customizers.map(cust => (
                  <div key={cust.label} className="flex items-center gap-2">
                    <span className="text-[9px] font-mono text-zinc-500 font-bold uppercase">{cust.label}:</span>
                    <div className="flex gap-1">
                      {cust.options.map(opt => {
                        const selectedOpt = productCustomizerState[mainProd.id]?.[cust.label] || cust.active;
                        const isSelected = selectedOpt === opt;
                        return (
                          <button
                            key={opt}
                            onClick={() => handleOptionSelect(mainProd.id, cust.label, opt)}
                            className={`text-[9px] font-mono px-3 py-1 rounded transition-all duration-200 ${
                              isSelected ? 'bg-cyan-400 text-zinc-950 font-bold' : 'bg-white/5 border border-white/10 text-zinc-400'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => addToCart(mainProd)}
                  className={`px-5 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-300 ${
                    isAddedMain ? 'bg-green-600 text-white' : 'bg-cyan-400 hover:bg-cyan-300 text-zinc-950 shadow-md shadow-cyan-400/10'
                  }`}
                >
                  {isAddedMain ? 'ADDED ✓' : 'ADD TO BAG'}
                </button>
              </div>
            </div>
          </div>

          {/* Card Secundário (Pequeno - 5 Colunas) */}
          <div className="lg:col-span-5 bg-[#030612] border border-white/5 rounded-3xl p-6 flex flex-col justify-between shadow-xl">
            <div className="space-y-4">
              <div className="relative rounded-xl overflow-hidden h-[160px] mb-4 bg-black/45 border border-white/5">
                <img src={secProd.image} alt={secProd.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 text-[8px] bg-white/10 text-white font-mono uppercase px-2 py-0.5 rounded border border-white/10">{secProd.tag}</span>
              </div>
              <h3 className="text-md font-mono font-bold text-white uppercase">{secProd.title}</h3>
              <p className="text-zinc-400 text-xs font-light leading-relaxed">{secProd.desc}</p>
              
              <div className="flex justify-between items-center py-3 border-t border-white/5">
                <span className="text-sm font-mono text-zinc-500">Subtotal</span>
                <span className="text-md font-mono font-bold text-white">R$ {secProd.price.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>

            <div className="space-y-4">
              {secProd.customizers.map(cust => (
                <div key={cust.label} className="flex justify-between items-center">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase">{cust.label}:</span>
                  <div className="flex gap-1.5">
                    {cust.options.map(opt => {
                      const selectedOpt = productCustomizerState[secProd.id]?.[cust.label] || cust.active;
                      const isSelected = selectedOpt === opt;
                      return (
                        <button
                          key={opt}
                          onClick={() => handleOptionSelect(secProd.id, cust.label, opt)}
                          className={`text-[8px] font-mono px-2 py-0.5 rounded transition-all duration-200 ${
                            isSelected ? 'bg-white text-zinc-950 font-bold' : 'bg-transparent border border-white/10 text-zinc-500'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
              <button
                onClick={() => addToCart(secProd)}
                className={`w-full py-2.5 rounded-xl text-xs font-mono font-bold transition-all duration-300 ${
                  isAddedSec ? 'bg-green-600 text-white shadow-md' : 'bg-white/5 border border-white/10 hover:bg-white hover:text-zinc-950 text-white'
                }`}
              >
                {isAddedSec ? 'ADDED ✓' : 'ADD TO BAG'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /**
   * 3. ÓCULOS: Layout Asymmetric Concept (Minimalismo Nórdico & Espaço Vazio)
   * Disposição limpa com espaço de respiro assimétrico onde os dois produtos 
   * aparecem deslocados intencionalmente no eixo vertical para criar vanguarda.
   */
  const renderOculosLayout = () => {
    const mainProd = currentSegmentData.products[0];
    const secProd = currentSegmentData.products[1];
    const isAddedMain = addedProductIds.includes(mainProd.id);
    const isAddedSec = addedProductIds.includes(secProd.id);

    return (
      <div className="space-y-16 py-4">
        {/* Intro Conceitual */}
        <div className="max-w-xl">
          <span className="text-[10px] tracking-widest font-extrabold uppercase text-zinc-900 block mb-2">{currentSegmentData.brand}</span>
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 leading-none">Design Arquitetônico</h2>
          <p className="text-zinc-500 text-sm mt-3 leading-relaxed">{currentSegmentData.tagline}</p>
        </div>

        {/* Mosaico Assimétrico */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          
          {/* Bloco do Produto 1: Deslocado para Baixo */}
          <div className="md:mt-12 bg-[#f8f9fa] border border-zinc-200/40 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
            <div className="relative rounded-2xl overflow-hidden h-[220px] mb-6 bg-white border border-zinc-200/60 shadow-inner">
              <img src={mainProd.image} alt={mainProd.title} className="w-full h-full object-cover transition-transform duration-[3000ms] hover:scale-102" />
              <span className="absolute top-4 left-4 text-[9px] bg-zinc-950 text-white font-bold uppercase tracking-widest px-3 py-1 rounded shadow">{mainProd.tag}</span>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-zinc-900 leading-snug">{mainProd.title}</h3>
              <p className="text-zinc-500 text-xs leading-relaxed">{mainProd.desc}</p>
              
              <div className="flex justify-between items-center pt-4 border-t border-zinc-200/50">
                <span className="font-extrabold text-zinc-900 text-base">R$ {mainProd.price.toFixed(2).replace('.', ',')}</span>
                <div className="flex items-center gap-3">
                  {mainProd.customizers.map(cust => (
                    <div key={cust.label} className="flex gap-1.5 items-center">
                      <span className="text-[9px] text-zinc-400 uppercase font-bold">{cust.label}:</span>
                      <div className="flex gap-1">
                        {cust.options.map(opt => {
                          const selectedOpt = productCustomizerState[mainProd.id]?.[cust.label] || cust.active;
                          const isSelected = selectedOpt === opt;
                          return (
                            <button
                              key={opt}
                              onClick={() => handleOptionSelect(mainProd.id, cust.label, opt)}
                              className={`text-[8px] px-2 py-0.5 rounded transition-all duration-200 ${
                                isSelected ? 'bg-zinc-900 text-white' : 'bg-white border border-zinc-200 text-zinc-500'
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => addToCart(mainProd)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 shrink-0 ${
                      isAddedMain ? 'bg-green-600 text-white' : 'bg-zinc-950 hover:bg-zinc-900 text-white'
                    }`}
                  >
                    {isAddedMain ? '✓' : 'Adicionar'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bloco do Produto 2: Alinhado no Topo */}
          <div className="bg-[#f8f9fa] border border-zinc-200/40 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
            <div className="relative rounded-2xl overflow-hidden h-[220px] mb-6 bg-white border border-zinc-200/60 shadow-inner">
              <img src={secProd.image} alt={secProd.title} className="w-full h-full object-cover transition-transform duration-[3000ms] hover:scale-102" />
              <span className="absolute top-4 left-4 text-[9px] bg-zinc-950 text-white font-bold uppercase tracking-widest px-3 py-1 rounded shadow">{secProd.tag}</span>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-zinc-900 leading-snug">{secProd.title}</h3>
              <p className="text-zinc-500 text-xs leading-relaxed">{secProd.desc}</p>
              
              <div className="flex justify-between items-center pt-4 border-t border-zinc-200/50">
                <span className="font-extrabold text-zinc-900 text-base">R$ {secProd.price.toFixed(2).replace('.', ',')}</span>
                <div className="flex items-center gap-3">
                  {secProd.customizers.map(cust => (
                    <div key={cust.label} className="flex gap-1.5 items-center">
                      <span className="text-[9px] text-zinc-400 uppercase font-bold">{cust.label}:</span>
                      <div className="flex gap-1">
                        {cust.options.map(opt => {
                          const selectedOpt = productCustomizerState[secProd.id]?.[cust.label] || cust.active;
                          const isSelected = selectedOpt === opt;
                          return (
                            <button
                              key={opt}
                              onClick={() => handleOptionSelect(secProd.id, cust.label, opt)}
                              className={`text-[8px] px-2 py-0.5 rounded transition-all duration-200 ${
                                isSelected ? 'bg-zinc-900 text-white' : 'bg-white border border-zinc-200 text-zinc-500'
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => addToCart(secProd)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 shrink-0 ${
                      isAddedSec ? 'bg-green-600 text-white' : 'bg-zinc-950 hover:bg-zinc-900 text-white'
                    }`}
                  >
                    {isAddedSec ? '✓' : 'Adicionar'}
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  };

  /**
   * 4. PERFUMES: Layout Organic Spotlight (Sensorial & Luz Fluida)
   * Apresenta o frasco selecionado sob um holofote de gradiente de luz circular.
   * Seletores rápidos de volume e notas olfativas com design romântico e pastéis.
   */
  const renderPerfumesLayout = () => {
    const mainProd = currentSegmentData.products[0];
    const secProd = currentSegmentData.products[1];
    const activeProduct = selectedPerfumeId === mainProd.id ? mainProd : secProd;
    const isAdded = addedProductIds.includes(activeProduct.id);

    return (
      <div className="flex flex-col gap-10">
        {/* Intro */}
        <div className="text-center max-w-xl mx-auto">
          <span className="text-[9px] tracking-widest font-extrabold uppercase text-[#e5c1cd] block mb-2">{currentSegmentData.brand}</span>
          <h2 className="text-3xl font-serif text-zinc-950 leading-tight">Alquimia Sensorial</h2>
          <p className="text-zinc-500 text-xs mt-2 italic">"{currentSegmentData.tagline}"</p>
        </div>

        {/* Spotlight Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Esquerda: Holofote circular sobre o vidro do Frasco */}
          <div className="lg:col-span-6 relative rounded-[32px] overflow-hidden h-[340px] md:h-[440px] flex items-center justify-center bg-gradient-to-tr from-[#faf0f2] via-[#fee1e8] to-white border border-[#e5c1cd]/20">
            {/* Círculo luminoso de fundo para simular passagem da luz */}
            <div className="absolute w-72 h-72 rounded-full bg-white/60 blur-3xl pointer-events-none z-0" />
            <img 
              src={activeProduct.image} 
              alt={activeProduct.title} 
              className="relative z-10 w-2/3 h-2/3 object-contain transition-transform duration-700 hover:scale-105"
            />
            <span className="absolute top-4 left-4 text-[9px] bg-white text-zinc-800 border border-[#e5c1cd]/40 font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
              {activeProduct.tag}
            </span>
          </div>

          {/* Direita: Notas Olfativas & Alternador da Coleção */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h3 className="text-2xl font-serif text-zinc-900 mb-2">{activeProduct.title}</h3>
              <p className="text-zinc-500 text-xs leading-relaxed">{activeProduct.desc}</p>
            </div>

            {/* Ficha Técnica Olfativa */}
            <div className="bg-white/50 border border-[#e5c1cd]/20 p-5 rounded-2xl">
              <span className="text-[9px] text-[#e5c1cd] font-bold uppercase tracking-wider block mb-3 font-serif">✦ Acorde & Fixação:</span>
              <div className="grid grid-cols-2 gap-2">
                {activeProduct.details.map(d => (
                  <span key={d} className="text-[10px] text-zinc-600 font-light flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e5c1cd]" /> {d}
                  </span>
                ))}
              </div>
            </div>

            {/* Alternar entre as Duas Coleções */}
            <div className="flex items-center gap-4">
              <span className="text-[9px] text-zinc-400 font-bold uppercase font-mono">Fragrância:</span>
              <div className="flex gap-2">
                {[mainProd, secProd].map(p => {
                  const isSelected = selectedPerfumeId === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPerfumeId(p.id)}
                      className={`text-[9px] px-4 py-2 rounded-full transition-all duration-300 font-bold ${
                        isSelected 
                          ? 'bg-[#e5c1cd] text-zinc-950 shadow-md' 
                          : 'bg-white border border-zinc-200 text-zinc-500'
                      }`}
                    >
                      {p.id === 'pf1' ? 'Amber & Sândalo' : 'Bloom'}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Preço e Compra Directa */}
            <div className="flex justify-between items-center pt-6 border-t border-[#e5c1cd]/20">
              <span className="text-2xl font-bold font-serif text-zinc-900">R$ {activeProduct.price.toFixed(2).replace('.', ',')}</span>
              
              <div className="flex items-center gap-3">
                {activeProduct.customizers.map(cust => (
                  <div key={cust.label} className="flex items-center gap-1.5">
                    <span className="text-[8px] text-zinc-400 uppercase font-bold">{cust.label}:</span>
                    <div className="flex gap-1">
                      {cust.options.map(opt => {
                        const selectedOpt = productCustomizerState[activeProduct.id]?.[cust.label] || cust.active;
                        const isSelected = selectedOpt === opt;
                        return (
                          <button
                            key={opt}
                            onClick={() => handleOptionSelect(activeProduct.id, cust.label, opt)}
                            className={`text-[8px] px-2 py-0.5 rounded transition-all duration-200 ${
                              isSelected ? 'bg-zinc-900 text-white' : 'bg-white border border-zinc-200 text-zinc-500'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => addToCart(activeProduct)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
                    isAdded ? 'bg-green-600 text-white shadow-lg shadow-green-200/50' : 'bg-zinc-950 hover:bg-[#e5c1cd] text-white hover:text-zinc-950 shadow-md'
                  }`}
                >
                  {isAdded ? 'Adicionado ✓' : 'Adicionar ao Pedido'}
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    );
  };

  /**
   * 5. BOLSAS: Layout Masonry Gallery (Moda & Textura de Couro)
   * Disposição estilo Pinterest/Alvenaria com cartões verticais de proporções 
   * diferentes e cores terrosas imitando a pigmentação natural do couro curtido.
   */
  const renderBolsasLayout = () => {
    return (
      <div className="flex flex-col gap-10">
        {/* Intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-200/30 pb-6 gap-4">
          <div>
            <span className="text-[10px] tracking-widest font-extrabold uppercase text-[#c49a6c] block mb-2">{currentSegmentData.brand}</span>
            <h2 className="text-3xl font-serif text-zinc-950 leading-none">Mosaico de Estilo</h2>
            <p className="text-zinc-500 text-sm mt-3">{currentSegmentData.tagline}</p>
          </div>
          <span className="text-[10px] text-zinc-400 font-bold tracking-widest font-mono uppercase bg-zinc-100 border border-zinc-200 rounded-full px-4 py-1.5 block w-fit shrink-0">
            Coleção sob Medida
          </span>
        </div>

        {/* Galeria Vertical Masonry */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {currentSegmentData.products.map((prod, index) => {
            const isAdded = addedProductIds.includes(prod.id);
            const isFirst = index === 0;

            return (
              <div 
                key={prod.id} 
                className={`bg-[#fdfdfc] border border-zinc-200/40 rounded-3xl p-6 flex flex-col justify-between shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ${
                  isFirst ? 'md:h-[530px]' : 'md:h-[470px] md:mt-12'
                }`}
              >
                <div>
                  <div className="relative rounded-2xl overflow-hidden h-[220px] mb-4 group border border-zinc-200/40 bg-white">
                    <img src={prod.image} alt={prod.title} className="w-full h-full object-cover transition-transform duration-[6000ms] group-hover:scale-105" />
                    <span className="absolute top-3 left-3 text-[9px] bg-zinc-950 text-white font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded shadow">
                      {prod.tag}
                    </span>
                  </div>
                  
                  <h3 className="font-serif font-bold text-zinc-950 text-lg leading-tight mb-2">{prod.title}</h3>
                  <p className="text-zinc-500 text-xs leading-relaxed mb-4 line-clamp-2">{prod.desc}</p>
                  
                  <div className="flex flex-wrap gap-x-2.5 gap-y-1 mb-4">
                    {prod.details.map(det => (
                      <span key={det} className="text-[9px] text-[#c49a6c] bg-[#c49a6c]/10 border border-[#c49a6c]/20 px-2 py-0.5 rounded-full font-medium">
                        ✓ {det}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-200/50">
                  <div className="flex justify-between items-center gap-3">
                    {prod.customizers.map(cust => (
                      <div key={cust.label} className="flex items-center gap-1.5">
                        <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">{cust.label}:</span>
                        <div className="flex gap-1">
                          {cust.options.map(opt => {
                            const selectedOpt = productCustomizerState[prod.id]?.[cust.label] || cust.active;
                            const isSelected = selectedOpt === opt;
                            return (
                              <button
                                key={opt}
                                onClick={() => handleOptionSelect(prod.id, cust.label, opt)}
                                className={`text-[8px] px-2 py-0.5 rounded transition-all duration-200 ${
                                  isSelected ? 'bg-zinc-950 text-white' : 'bg-white border border-zinc-200 text-zinc-500'
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                    <span className="font-serif font-bold text-base text-zinc-950 shrink-0">R$ {prod.price.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <button
                    onClick={() => addToCart(prod)}
                    className={`w-full mt-4 py-2.5 rounded-full text-xs font-bold transition-all duration-300 shadow-md ${
                      isAdded ? 'bg-green-600 text-white' : 'bg-zinc-950 hover:bg-[#c49a6c] text-white hover:text-zinc-950'
                    }`}
                  >
                    {isAdded ? 'Adicionado ✓' : 'Adicionar ao Carrinho'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  /**
   * 6. ACESSÓRIOS: Layout Responsivo Bento Box (Adaptação Inteligente)
   * Renderiza layouts completamente diferentes com base na largura da tela:
   * - Desktop: Bento Grid assimétrica de 12 colunas com cards de tamanhos variados.
   * - Mobile: Layout de cartões verticais empilhados simplificados de alta usabilidade.
   */
  const renderAcessoriosLayout = () => {
    const mainProd = currentSegmentData.products[0];
    const secProd = currentSegmentData.products[1];
    const isAddedMain = addedProductIds.includes(mainProd.id);
    const isAddedSec = addedProductIds.includes(secProd.id);

    return (
      <div className="flex flex-col gap-10">
        {/* ========================================================
            6A. BENTO VITRINE - DESKTOP LAYOUT (Exibição para Telas Grandes)
            ======================================================== */}
        <div className="hidden md:flex flex-col gap-8">
          {/* Cabeçalho de Engenharia Industrial */}
          <div className="border-b border-zinc-200/60 pb-6 flex justify-between items-end">
            <div>
              <span className="text-[10px] tracking-widest font-extrabold uppercase text-[#7d7d7d] block mb-2">{currentSegmentData.brand}</span>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900 leading-none font-serif">Bento Vitrine — Desktop</h2>
              <p className="text-zinc-500 text-sm mt-3">{currentSegmentData.tagline}</p>
            </div>
            <span className="text-[9px] font-mono text-zinc-400 tracking-wider">ASYMMETRIC GRID</span>
          </div>

          {/* Mosaico Bento Box Assimétrico */}
          <div className="grid grid-cols-12 gap-6 items-stretch">
            {/* Bloco 1: Porta Cartões Titanium (Grande - Ocupa 7 de 12 Colunas) */}
            <div className="col-span-7 bg-[#FAF9F5] border border-zinc-200/40 rounded-[32px] p-6 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="grid grid-cols-12 gap-6 items-center">
                <div className="col-span-5 rounded-2xl overflow-hidden h-[220px] bg-white border border-zinc-200/60">
                  <img src={mainProd.image} alt={mainProd.title} className="w-full h-full object-cover transition-transform duration-[4000ms] hover:scale-105" />
                </div>
                <div className="col-span-7 space-y-4">
                  <span className="text-[9px] bg-zinc-950 text-white font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">{mainProd.tag}</span>
                  <h3 className="text-lg font-bold text-zinc-900 leading-tight">{mainProd.title}</h3>
                  <p className="text-zinc-500 text-xs leading-relaxed">{mainProd.desc}</p>
                  
                  {/* Especificações de Calibre Industrial em Fonte Monospace */}
                  <div className="grid grid-cols-2 gap-2 text-[9px] font-mono text-zinc-500 border-t border-zinc-200/60 pt-3">
                    {mainProd.details.slice(0, 4).map(d => (
                      <span key={d} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" /> {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Seletor de Opcionais de Metal */}
              <div className="flex justify-between items-center pt-4 border-t border-zinc-200/60 mt-6 gap-4">
                {mainProd.customizers.map(cust => (
                  <div key={cust.label} className="flex items-center gap-2">
                    <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">{cust.label}:</span>
                    <div className="flex gap-1">
                      {cust.options.map(opt => {
                        const selectedOpt = productCustomizerState[mainProd.id]?.[cust.label] || cust.active;
                        const isSelected = selectedOpt === opt;
                        return (
                          <button
                            key={opt}
                            onClick={() => handleOptionSelect(mainProd.id, cust.label, opt)}
                            className={`text-[8px] px-2 py-0.5 rounded transition-all duration-200 ${
                              isSelected ? 'bg-zinc-950 text-white font-bold shadow' : 'bg-white border border-zinc-200 text-zinc-500'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-base font-bold text-zinc-900">R$ {mainProd.price.toFixed(2).replace('.', ',')}</span>
                  <button
                    onClick={() => addToCart(mainProd)}
                    className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                      isAddedMain ? 'bg-green-600 text-white shadow-md' : 'bg-zinc-950 hover:bg-zinc-800 text-white'
                    }`}
                  >
                    {isAddedMain ? 'Adicionado ✓' : 'Adicionar'}
                  </button>
                </div>
              </div>
            </div>

            {/* Bloco 2: Chaveiro Mosquetão Loop (Médio - Ocupa 5 de 12 Colunas) */}
            <div className="col-span-5 bg-[#FAF9F5] border border-zinc-200/40 rounded-[32px] p-6 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-500">
              <div>
                <div className="relative rounded-2xl overflow-hidden h-[150px] mb-4 bg-white border border-zinc-200/60">
                  <img src={secProd.image} alt={secProd.title} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 text-[8px] bg-zinc-950 text-white font-bold uppercase px-2 py-0.5 rounded">{secProd.tag}</span>
                </div>
                <h3 className="font-bold text-zinc-900 text-base leading-tight mb-2">{secProd.title}</h3>
                <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2">{secProd.desc}</p>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  {secProd.details.slice(0, 2).map(d => (
                    <span key={d} className="text-[8px] text-zinc-500 bg-white border border-zinc-200 px-2 py-0.5 rounded-full">
                      ✓ {d}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-200/60 mt-4 space-y-4">
                <div className="flex justify-between items-center">
                  {secProd.customizers.map(cust => (
                    <div key={cust.label} className="flex items-center gap-1.5">
                      <span className="text-[9px] text-zinc-400 font-bold uppercase">{cust.label}:</span>
                      <div className="flex gap-1">
                        {cust.options.map(opt => {
                          const selectedOpt = productCustomizerState[secProd.id]?.[cust.label] || cust.active;
                          const isSelected = selectedOpt === opt;
                          return (
                            <button
                              key={opt}
                              onClick={() => handleOptionSelect(secProd.id, cust.label, opt)}
                              className={`text-[8px] px-2 py-0.5 rounded transition-all duration-200 ${
                                isSelected ? 'bg-zinc-950 text-white' : 'bg-white border border-zinc-200 text-zinc-500'
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                  <span className="font-bold text-sm text-zinc-900">R$ {secProd.price.toFixed(2).replace('.', ',')}</span>
                </div>
                <button
                  onClick={() => addToCart(secProd)}
                  className={`w-full py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
                    isAddedSec ? 'bg-green-600 text-white shadow-md' : 'bg-zinc-950 hover:bg-zinc-800 text-white'
                  }`}
                >
                  {isAddedSec ? 'Adicionado ✓' : 'Adicionar ao Carrinho'}
                </button>
              </div>
            </div>

            {/* Bloco 3: Card Conceitual de Vidro (Ocupa 5 Colunas) */}
            <div className="col-span-5 bg-zinc-900 text-white rounded-[32px] p-6 flex flex-col justify-center border border-zinc-800 shadow-md">
              <span className="text-[9px] text-zinc-500 font-mono tracking-widest uppercase mb-2 block">CONCEITO & FILOSOFIA</span>
              <p className="text-zinc-300 text-xs leading-relaxed font-light italic">
                "A geometria é a fundação da beleza duradoura. Nossos acessórios de titânio e latão são esculpidos sob tolerâncias micrométricas para resistir ao tempo e servir como extensão da sua identidade diária."
              </p>
            </div>

            {/* Bloco 4: Telemetria de Produção e Garantia Eterna (Ocupa 7 Colunas) */}
            <div className="col-span-7 bg-white border border-zinc-200/60 rounded-[32px] p-6 flex items-center justify-between shadow-sm">
              <div className="space-y-2">
                <span className="text-[9px] text-[#7d7d7d] font-bold uppercase tracking-wider block">PROCESSO FABRIL</span>
                <h4 className="text-zinc-900 text-sm font-bold">Corte CNC & Acabamento Manual</h4>
                <p className="text-zinc-500 text-[11px] leading-relaxed max-w-sm">Tolerância de 0.02mm com anodização física de alta resistência e couro curtido vegetal sem solventes químicos nocivos.</p>
              </div>
              <div className="flex flex-col items-center gap-1 bg-[#FAF9F5] border border-zinc-200/60 rounded-2xl p-4 shadow-sm text-center shrink-0">
                <span className="text-xl">🛡️</span>
                <span className="text-[8px] text-zinc-950 font-bold uppercase font-mono tracking-wider">GARANTIA ETERNA</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            6B. BENTO VITRINE - MOBILE LAYOUT (Exibição para Telas Pequenas)
            ======================================================== */}
        <div className="flex md:hidden flex-col gap-6">
          {/* Cabeçalho Mobile */}
          <div className="border-b border-zinc-200/60 pb-4">
            <span className="text-[9px] tracking-widest font-extrabold uppercase text-[#7d7d7d] block mb-1">{currentSegmentData.brand}</span>
            <h2 className="text-xl font-extrabold text-zinc-900 leading-none font-serif">Bento Vitrine — Mobile</h2>
            <p className="text-zinc-500 text-xs mt-2">{currentSegmentData.tagline}</p>
          </div>

          {/* Cards de Exibição Verticais */}
          <div className="flex flex-col gap-6">
            {[mainProd, secProd].map((prod, idx) => {
              const isAdded = idx === 0 ? isAddedMain : isAddedSec;
              return (
                <div key={prod.id} className="bg-white border border-zinc-200/60 rounded-[32px] p-5 shadow-md flex flex-col gap-4">
                  <div className="relative rounded-2xl overflow-hidden h-[180px] bg-white border border-zinc-200/40">
                    <img src={prod.image} alt={prod.title} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 text-[8px] bg-zinc-950 text-white font-mono font-bold uppercase px-2.5 py-0.5 rounded shadow">
                      {prod.tag}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-zinc-900 text-base mb-1">{prod.title}</h3>
                    <p className="text-zinc-500 text-xs leading-relaxed">{prod.desc}</p>
                  </div>

                  {/* Ficha Monospace Compacta */}
                  <div className="flex flex-wrap gap-2 py-2 border-y border-zinc-200/60">
                    {prod.details.slice(0, 2).map(d => (
                      <span key={d} className="text-[8px] text-zinc-500 bg-zinc-100 border border-zinc-200/40 px-2.5 py-0.5 rounded-full font-mono">
                        ■ {d}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center gap-2 pt-2">
                    {prod.customizers.map(cust => (
                      <div key={cust.label} className="flex items-center gap-1.5">
                        <span className="text-[8px] text-zinc-400 uppercase font-bold">{cust.label}:</span>
                        <span className="text-[9px] font-bold text-zinc-900">{productCustomizerState[prod.id]?.[cust.label] || cust.active}</span>
                      </div>
                    ))}
                    <span className="font-bold text-base text-zinc-950">R$ {prod.price.toFixed(2).replace('.', ',')}</span>
                  </div>

                  <button
                    onClick={() => addToCart(prod)}
                    className={`w-full py-3 rounded-full text-xs font-bold transition-all duration-300 shadow-md ${
                      isAdded ? 'bg-green-600 text-white' : 'bg-zinc-950 text-white shadow-zinc-950/10'
                    }`}
                  >
                    {isAdded ? 'Adicionado ✓' : 'Adicionar ao Carrinho'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // --- SELETOR DE LAYOUT ATIVO ---
  const renderActiveSegmentLayout = () => {
    switch (activeSegment) {
      case 'joias':
        return renderJoiasLayout();
      case 'relogios':
        return renderRelogiosLayout();
      case 'oculos':
        return renderOculosLayout();
      case 'perfumes':
        return renderPerfumesLayout();
      case 'bolsas':
        return renderBolsasLayout();
      case 'acessorios':
        return renderAcessoriosLayout();
      default:
        return renderJoiasLayout();
    }
  };

  // --- TEMA DINÂMICO DE CONTAINER ---
  // Altera as cores de fundo, bordas e sombras do painel principal para combinar com cada categoria
  const getContainerClass = () => {
    switch (activeSegment) {
      case 'relogios':
        return 'bg-zinc-950 text-white border border-white/5 rounded-3xl p-6 md:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.45)] transition-all duration-500';
      case 'joias':
        return 'bg-[#faf9f6] text-zinc-900 border border-amber-200/30 rounded-3xl p-6 md:p-10 shadow-2xl transition-all duration-500';
      case 'perfumes':
        return 'bg-gradient-to-b from-[#fefbfb] to-[#fdf0f2] border border-[#e5c1cd]/20 rounded-3xl p-6 md:p-10 shadow-2xl transition-all duration-500 text-zinc-900';
      case 'bolsas':
        return 'bg-[#fcfcfa] border border-[#c49a6c]/10 rounded-3xl p-6 md:p-10 shadow-2xl transition-all duration-500 text-zinc-900';
      default:
        return 'bg-white border border-zinc-200/60 rounded-3xl p-6 md:p-10 shadow-2xl transition-all duration-500 text-zinc-900';
    }
  };

  return (
    <section className="py-28 px-6 max-w-6xl mx-auto" id="showcase">
      {/* Cabeçalho da Seção */}
      <div className="text-center mb-16 space-y-4">
        <span className="text-tertiary font-semibold text-xs tracking-widest uppercase block font-mono">✦ O Novo Showcase</span>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-title leading-tight">Exploração Editorial de Campanha</h2>
        <p className="text-zinc-500 text-sm max-w-xl mx-auto leading-relaxed">Selecione uma categoria abaixo para ver como a Impulse projeta identidades totalmente exclusivas, layouts responsivos e checkout de alta conversão.</p>
      </div>

      {/* Abas de Navegação (Pills Arredondados com micro-transição) */}
      <div className="flex justify-center mb-16 overflow-x-auto pb-4 scrollbar-none">
        <div className="flex bg-zinc-100 border border-zinc-200/60 p-1.5 rounded-full min-w-max">
          {segments.map((seg) => {
            const isActive = activeSegment === seg.id;
            return (
              <button
                key={seg.id}
                onClick={() => handleTabChange(seg.id)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
                  isActive 
                    ? 'bg-zinc-900 text-white shadow-md' 
                    : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/40'
                }`}
              >
                <span>{seg.icon}</span>
                {seg.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Caixa de Exibição com Transição Dinâmica e Suporte GSAP */}
      <div className={getContainerClass()}>
        <div id="showcase-content-wrapper">
          {renderActiveSegmentLayout()}
        </div>
      </div>

      {/* Sacola Flutuante com Efeito Glassmorphism de Alta Fidelidade */}
      <div 
        key={`cart-${cartTotalCount}`}
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-lg bg-white/95 border border-zinc-200/80 backdrop-blur-2xl rounded-2xl p-5 flex items-center justify-between shadow-[0_30px_60px_rgba(0,0,0,0.12)] z-50 transition-all duration-500 ${
          cartTotalCount > 0 ? 'translate-y-0 opacity-100 animate-cart-bounce' : 'translate-y-24 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col">
          <span className="text-sm font-bold text-zinc-900">Resumo da Sacola</span>
          <span className="text-xs text-zinc-500 font-mono mt-0.5">{cartTotalCount} {cartTotalCount === 1 ? 'item selecionado' : 'itens selecionados'}</span>
        </div>
        
        <div className="flex items-center gap-5">
          <span className="text-zinc-900 font-bold font-mono text-base">
            R$ {cartTotalPrice.toFixed(2).replace('.', ',')}
          </span>
          <button
            onClick={finalizeOrder}
            className="flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all duration-300 animate-pulse"
          >
            <span>Finalizar Compra</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
