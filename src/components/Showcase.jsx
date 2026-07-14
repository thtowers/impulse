import React, { useState } from 'react';

const WHATSAPP_NUMBER = '5521979362517';

const segments = [
  { id: 'joias', name: 'Joias', icon: '✨', colorClass: 'bg-[#d4af37]', colorText: 'text-[#d4af37]', colorBorder: 'border-[#d4af37]' },
  { id: 'relogios', name: 'Relógios', icon: '⌚', colorClass: 'bg-[#8e8e93]', colorText: 'text-[#8e8e93]', colorBorder: 'border-[#8e8e93]' },
  { id: 'oculos', name: 'Óculos', icon: '🕶️', colorClass: 'bg-[#1d1d1f]', colorText: 'text-[#1d1d1f]', colorBorder: 'border-[#1d1d1f]' },
  { id: 'perfumes', name: 'Perfumes', icon: '🌸', colorClass: 'bg-[#e5c1cd]', colorText: 'text-[#e5c1cd]', colorBorder: 'border-[#e5c1cd]' },
  { id: 'bolsas', name: 'Bolsas', icon: '👜', colorClass: 'bg-[#c49a6c]', colorText: 'text-[#c49a6c]', colorBorder: 'border-[#c49a6c]' },
  { id: 'acessorios', name: 'Acessórios', icon: '🔑', colorClass: 'bg-[#7d7d7d]', colorText: 'text-[#7d7d7d]', colorBorder: 'border-[#7d7d7d]' }
];

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
        title: 'Clutch Classic Gold',
        desc: 'Clutch rígida para noite em liga metálica polida brilhante, com detalhes gravados e fecho de cristal.',
        price: 3200.00,
        image: '/assets/showcase_bolsas_prod.png',
        tag: 'Festa',
        details: ['Estrutura Hardcase Rígida', 'Banho Polido Alto Brilho', 'Fecho Cristal Lapidado', 'Alça Corrente Opcional'],
        customizers: [
          { label: 'Acabamento', options: ['Polido Dourado', 'Fosco Escovado'], active: 'Polido Dourado' }
        ]
      }
    ]
  },
  acessorios: {
    brand: 'Atelier de Marroquinerie',
    tagline: 'Artigos essenciais criados para durar uma vida inteira.',
    products: [
      {
        id: 'a1',
        title: 'Carteira Minimalist Coffee',
        desc: 'Carteira pocket ultra-slim em couro legítimo cor café escuro, com bloqueio RFID e 6 compartimentos.',
        price: 450.00,
        image: '/assets/showcase_acessorios_hero.png',
        tag: 'Essencial',
        details: ['Couro Flor Integral', 'Tecnologia Bloqueio RFID', 'Capacidade 6 Cartões', 'Costura Costada Encerada'],
        customizers: [
          { label: 'Slot', options: ['Bolso CNH', 'Ultra Slim'], active: 'Bolso CNH' }
        ]
      },
      {
        id: 'a2',
        title: 'Chaveiro Leather Gold',
        desc: 'Chaveiro artesanal em couro de alta qualidade com mosquetão e argola de latão maciço.',
        price: 220.00,
        image: '/assets/showcase_acessorios_prod.png',
        tag: 'Destaque',
        details: ['Latão Maciço Natural', 'Tira de Couro Inteiriça', 'Mosquetão Prático', 'Acabamento Encerado Borda'],
        customizers: [
          { label: 'Couro', options: ['Café Escuro', 'Caramelo Natural'], active: 'Caramelo Natural' }
        ]
      }
    ]
  }
};

export default function Showcase() {
  const [activeSegment, setActiveSegment] = useState('joias');
  const [productCustomizerState, setProductCustomizerState] = useState({});
  const [addedProductIds, setAddedProductIds] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedPerfumeId, setSelectedPerfumeId] = useState('pf1');
  const [activeJewelryId, setActiveJewelryId] = useState('j1');

  const currentSegmentData = catalogData[activeSegment];
  const activeSegmentConfig = segments.find(s => s.id === activeSegment);

  const handleTabChange = (segId) => {
    setActiveSegment(segId);
    setCart([]);
    setAddedProductIds([]);
    setSelectedPerfumeId('pf1');
    setActiveJewelryId('j1');
  };

  const handleOptionSelect = (productId, label, optionValue) => {
    setProductCustomizerState(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [label]: optionValue
      }
    }));
  };

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

  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Renderizador: Joias - Editorial Minimalista (Split Screen)
  const renderJoiasLayout = () => {
    const mainProd = currentSegmentData.products[0];
    const secProd = currentSegmentData.products[1];
    
    // Editorial dinâmico: busca o produto ativo com base no estado
    const activeJewelry = currentSegmentData.products.find(p => p.id === activeJewelryId) || mainProd;

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-fade-in-up">
        {/* Coluna Editorial da Campanha */}
        <div 
          key={activeJewelry.id} 
          className="relative rounded-3xl overflow-hidden shadow-2xl h-[500px] md:h-[600px] group border border-zinc-100/80 transition-all duration-500 animate-fade-in"
        >
          <img 
            src={activeJewelry.image} 
            alt={activeJewelry.title} 
            className="w-full h-full object-cover transition-transform duration-[6000ms] group-hover:scale-105"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090d29]/90 via-[#090d29]/20 to-transparent" />
          <div className="absolute bottom-10 left-10 right-10 text-white">
            <span className="text-[10px] tracking-widest uppercase font-bold text-amber-400 block mb-2">{activeJewelry.tag}</span>
            <h3 className="text-3xl md:text-4xl font-light tracking-tight font-serif mb-3">{activeJewelry.title}</h3>
            <p className="text-zinc-300 text-xs md:text-sm max-w-md leading-relaxed font-light">
              {activeJewelry.desc}
            </p>
          </div>
        </div>

        {/* Coluna dos Produtos */}
        <div className="flex flex-col gap-8 justify-center">
          <div className="border-b border-zinc-100 pb-6 mb-2">
            <span className="text-[10px] tracking-widest font-bold uppercase text-amber-600 block mb-2">{currentSegmentData.brand}</span>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-title font-serif leading-none">O Esplendor em Detalhes</h2>
            <p className="text-text-muted text-sm mt-2">{currentSegmentData.tagline}</p>
          </div>

          {[mainProd, secProd].map(prod => {
            const isAdded = addedProductIds.includes(prod.id);
            const isActive = activeJewelryId === prod.id;
            
            return (
              <div 
                key={prod.id} 
                onMouseEnter={() => setActiveJewelryId(prod.id)}
                className={`bg-white border rounded-2xl p-6 transition-all duration-300 flex flex-col sm:flex-row gap-6 items-center cursor-pointer ${
                  isActive 
                    ? 'border-amber-500/40 shadow-lg bg-gradient-to-br from-white to-amber-50/5' 
                    : 'border-zinc-200/50 hover:border-zinc-300 shadow-sm'
                }`}
              >
                <img src={prod.image} alt={prod.title} className="w-24 h-24 object-cover rounded-xl border border-zinc-200/40 shadow-sm shrink-0" loading="lazy" />
                <div className="flex-grow text-center sm:text-left w-full">
                  <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mb-2 gap-2">
                    <h4 className="font-serif font-bold text-lg text-title leading-tight">{prod.title}</h4>
                    <span className="text-[9px] bg-amber-50 text-amber-700 font-extrabold tracking-widest uppercase px-2 py-0.5 rounded border border-amber-200/50">{prod.tag}</span>
                  </div>
                  <p className="text-text-muted text-xs leading-relaxed mb-4">{prod.desc}</p>
                  
                  {/* Detalhes de Luxo */}
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mb-4 justify-center sm:justify-start">
                    {prod.details.map(det => (
                      <span key={det} className="text-[9px] text-text-main flex items-center gap-1 font-medium font-serif">
                        <span className="text-amber-500">✦</span> {det}
                      </span>
                    ))}
                  </div>

                  {/* Customizadores e Preço */}
                  <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-zinc-100 gap-4">
                    {prod.customizers.map(cust => {
                      const isMetal = cust.label.toLowerCase() === 'metal';
                      return (
                        <div key={cust.label} className="flex items-center gap-2">
                          <span className="text-[9px] text-text-muted font-bold uppercase tracking-wider">{cust.label}:</span>
                          <div className="flex gap-2 items-center">
                            {cust.options.map(opt => {
                              const selectedOpt = productCustomizerState[prod.id]?.[cust.label] || cust.active;
                              const isSelected = selectedOpt === opt;
                              
                              if (isMetal) {
                                // Mapeamento de cor metálica com gradiente realista
                                let metalBg = 'bg-zinc-400';
                                if (opt.includes('Platina')) {
                                  metalBg = 'bg-gradient-to-tr from-zinc-400 via-zinc-100 to-zinc-300';
                                } else if (opt.includes('Branco')) {
                                  metalBg = 'bg-gradient-to-tr from-stone-300 via-zinc-50 to-stone-200';
                                } else if (opt.includes('Amarelo') || opt.includes('Ouro')) {
                                  metalBg = 'bg-gradient-to-tr from-amber-600 via-yellow-100 to-yellow-500';
                                }
                                
                                return (
                                  <button
                                    key={opt}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleOptionSelect(prod.id, cust.label, opt);
                                    }}
                                    title={opt}
                                    className={`w-5 h-5 rounded-full ${metalBg} transition-all duration-200 relative ${
                                      isSelected 
                                        ? 'ring-2 ring-amber-500 ring-offset-2 scale-110 shadow-sm' 
                                        : 'hover:scale-105 border border-zinc-300/40'
                                    }`}
                                  />
                                );
                              }
                              
                              // Lapidação (botões ovais minimalistas com fonte nobre)
                              return (
                                <button
                                  key={opt}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleOptionSelect(prod.id, cust.label, opt);
                                  }}
                                  className={`text-[9px] px-3 py-1 rounded-full font-serif transition-all duration-200 border ${
                                    isSelected 
                                      ? 'border-amber-500 text-amber-700 bg-amber-50/30 font-bold shadow-sm' 
                                      : 'bg-white border-zinc-200 text-text-muted hover:text-text-main hover:border-zinc-300'
                                  }`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                    <div className="flex items-center gap-4 ml-auto sm:ml-0">
                      <span className="font-serif font-bold text-base text-title">R$ {prod.price.toFixed(2).replace('.', ',')}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(prod);
                        }}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                          isAdded 
                            ? 'bg-amber-500/10 text-amber-700 border border-amber-500/40 scale-[1.02]' 
                            : 'bg-zinc-950 hover:bg-zinc-800 text-white'
                        }`}
                      >
                        {isAdded ? '✦ Adicionado' : 'Adicionar'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Renderizador: Relógios - Layout Magazine (Assimétrico com Recortes)
  const renderRelogiosLayout = () => {
    const mainProd = currentSegmentData.products[0];
    const secProd = currentSegmentData.products[1];
    const isAddedMain = addedProductIds.includes(mainProd.id);
    const isAddedSec = addedProductIds.includes(secProd.id);

    return (
      <div className="flex flex-col gap-16 animate-fade-in-up bg-zinc-50/50 p-6 md:p-10 rounded-3xl border border-zinc-100">
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto border-b border-zinc-200/60 pb-8">
          <span className="text-[10px] tracking-widest font-extrabold uppercase text-zinc-500 block mb-2">{currentSegmentData.brand}</span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-zinc-950 font-serif leading-tight">Mecânica da Alta Precisão</h2>
          <p className="text-zinc-500 text-xs md:text-sm mt-3 italic">"{currentSegmentData.tagline}"</p>
        </div>

        {/* Mosaico Magazine */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Card Principal Maior */}
          <div className="lg:col-span-7 flex flex-col bg-white border border-zinc-200/60 rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl">
            <div className="relative h-[320px] sm:h-[400px] overflow-hidden group">
              <img src={mainProd.image} alt={mainProd.title} className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-105" loading="lazy" />
              <span className="absolute top-4 left-4 text-[9px] bg-zinc-950/80 text-white font-bold uppercase tracking-widest px-3 py-1 rounded backdrop-blur-sm">{mainProd.tag}</span>
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold font-serif text-zinc-900 leading-snug">{mainProd.title}</h3>
                <span className="text-lg font-bold font-serif text-zinc-950">R$ {mainProd.price.toFixed(2).replace('.', ',')}</span>
              </div>
              <p className="text-zinc-500 text-xs leading-relaxed mb-6">{mainProd.desc}</p>
              
              {/* Especificações de Calibre */}
              <div className="grid grid-cols-2 gap-3 mb-6 bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                {mainProd.details.map(det => (
                  <span key={det} className="text-[9px] text-zinc-600 font-medium flex items-center gap-1.5 font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" /> {det}
                  </span>
                ))}
              </div>

              {/* Botões de Ação */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-zinc-100">
                {mainProd.customizers.map(cust => (
                  <div key={cust.label} className="flex items-center gap-2">
                    <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">{cust.label}:</span>
                    <div className="flex gap-1.5">
                      {cust.options.map(opt => {
                        const selectedOpt = productCustomizerState[mainProd.id]?.[cust.label] || cust.active;
                        const isSelected = selectedOpt === opt;
                        return (
                          <button
                            key={opt}
                            onClick={() => handleOptionSelect(mainProd.id, cust.label, opt)}
                            className={`text-[9px] px-3 py-1 rounded transition-all duration-200 font-bold ${
                              isSelected ? 'bg-zinc-900 text-white shadow-md' : 'bg-zinc-100 border border-zinc-200 text-zinc-500'
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
                  className={`w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
                    isAddedMain ? 'bg-green-600 text-white' : 'bg-zinc-950 hover:bg-zinc-900 text-white'
                  }`}
                >
                  {isAddedMain ? 'Adicionado ao Carrinho ✓' : 'Adicionar ao Carrinho'}
                </button>
              </div>
            </div>
          </div>

          {/* Bloco Secundário Deslocado */}
          <div className="lg:col-span-5 flex flex-col gap-8 lg:mt-16">
            <div className="bg-white border border-zinc-200/60 rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl">
              <div className="relative h-[240px] overflow-hidden group">
                <img src={secProd.image} alt={secProd.title} className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-105" loading="lazy" />
                <span className="absolute top-4 left-4 text-[9px] bg-zinc-950/80 text-white font-bold uppercase tracking-widest px-3 py-1 rounded backdrop-blur-sm">{secProd.tag}</span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold font-serif text-zinc-900 mb-1 leading-snug">{secProd.title}</h3>
                <span className="text-base font-bold font-serif text-zinc-900 block mb-3">R$ {secProd.price.toFixed(2).replace('.', ',')}</span>
                <p className="text-zinc-500 text-xs leading-relaxed mb-6">{secProd.desc}</p>
                
                <div className="flex flex-col gap-4 pt-4 border-t border-zinc-100">
                  {secProd.customizers.map(cust => (
                    <div key={cust.label} className="flex justify-between items-center">
                      <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">{cust.label}:</span>
                      <div className="flex gap-1.5">
                        {cust.options.map(opt => {
                          const selectedOpt = productCustomizerState[secProd.id]?.[cust.label] || cust.active;
                          const isSelected = selectedOpt === opt;
                          return (
                            <button
                              key={opt}
                              onClick={() => handleOptionSelect(secProd.id, cust.label, opt)}
                              className={`text-[9px] px-2 py-0.5 rounded transition-all duration-200 ${
                                isSelected ? 'border border-zinc-950 text-zinc-950 font-bold' : 'bg-white border border-zinc-200 text-zinc-500'
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
                    className={`w-full px-4 py-2 rounded text-xs font-bold transition-all duration-300 ${
                      isAddedSec ? 'bg-green-600 text-white' : 'bg-zinc-100 border border-zinc-200 hover:bg-zinc-900 hover:text-white text-zinc-700'
                    }`}
                  >
                    {isAddedSec ? 'Adicionado ✓' : 'Adicionar Item'}
                  </button>
                </div>
              </div>
            </div>

            {/* Citação Editorial de Fundo */}
            <div className="bg-zinc-900 text-white rounded-2xl p-6 border border-zinc-800 shadow-md">
              <span className="text-xs text-zinc-500 font-bold tracking-widest uppercase block mb-2">Maison Concept</span>
              <p className="text-zinc-300 text-xs leading-relaxed font-light italic">
                "A verdadeira sofisticação mecânica não grita. Ela reside na sobriedade de um mostrador clássico, na precisão silenciosa da mola e na costura invisível da pulseira."
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Renderizador: Óculos - Imagens Sobrepostas & Vidro Fosco
  const renderOculosLayout = () => {
    const mainProd = currentSegmentData.products[0];
    const secProd = currentSegmentData.products[1];
    const isAddedMain = addedProductIds.includes(mainProd.id);
    const isAddedSec = addedProductIds.includes(secProd.id);

    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center animate-fade-in-up">
        {/* Lado Esquerdo: Composição sobreposta de imagens */}
        <div className="lg:col-span-7 relative h-[450px] md:h-[500px] w-full shrink-0">
          {/* Imagem de Campanha Principal */}
          <div className="absolute left-0 top-0 w-2/3 h-2/3 rounded-2xl overflow-hidden shadow-xl border border-white/10 group z-10">
            <img src={mainProd.image} alt={mainProd.title} className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-105" loading="lazy" />
            <div className="absolute inset-0 bg-black/20" />
          </div>
          
          {/* Imagem de Produto Secundário Sobreposto */}
          <div className="absolute right-0 bottom-0 w-2/3 h-2/3 rounded-2xl overflow-hidden shadow-2xl border border-white/20 group z-20">
            <img src={secProd.image} alt={secProd.title} className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-105" loading="lazy" />
            <div className="absolute inset-0 bg-black/10" />
          </div>
          
          {/* Elemento de Luxo Decorativo */}
          <div className="absolute left-10 bottom-6 z-0 w-24 h-24 rounded-full bg-[#1d1d1f]/5 blur-xl pointer-events-none" />
        </div>

        {/* Lado Direito: Composição de Texto e Controles flutuantes */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div>
            <span className="text-[10px] tracking-widest font-extrabold uppercase text-zinc-950 block mb-2">{currentSegmentData.brand}</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 leading-none">Visão Arquitetônica</h2>
            <p className="text-zinc-500 text-sm mt-3 leading-relaxed">{currentSegmentData.tagline}</p>
          </div>

          {[mainProd, secProd].map((prod, index) => {
            const isAdded = index === 0 ? isAddedMain : isAddedSec;
            return (
              <div key={prod.id} className="backdrop-blur-md bg-white/70 border border-zinc-200/80 p-5 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg hover:border-zinc-300/80">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-zinc-900 text-sm">{prod.title}</h4>
                    <span className="text-[9px] text-zinc-400 font-bold block mt-0.5">{prod.tag}</span>
                  </div>
                  <span className="font-bold text-sm text-zinc-950">R$ {prod.price.toFixed(2).replace('.', ',')}</span>
                </div>
                <p className="text-zinc-500 text-[11px] leading-relaxed mb-4">{prod.desc}</p>
                
                {/* Especificações de Lente */}
                <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
                  {prod.details.map(det => (
                    <span key={det} className="text-[8px] bg-zinc-100 text-zinc-600 font-semibold px-2 py-0.5 rounded-full whitespace-nowrap">
                      ✓ {det}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-zinc-100">
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
                    onClick={() => addToCart(prod)}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all duration-300 ${
                      isAdded ? 'bg-green-600 text-white' : 'bg-zinc-900 hover:bg-zinc-800 text-white'
                    }`}
                  >
                    {isAdded ? '✓ Adicionado' : 'Adicionar +'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Renderizador: Perfumes - Hero Cinematográfico (Foco Central Total)
  const renderPerfumesLayout = () => {
    const mainProd = currentSegmentData.products[0];
    const secProd = currentSegmentData.products[1];

    const activeProduct = selectedPerfumeId === mainProd.id ? mainProd : secProd;
    const isAdded = addedProductIds.includes(activeProduct.id);

    return (
      <div className="bg-zinc-950 text-white p-8 md:p-12 rounded-3xl border border-zinc-800 shadow-2xl animate-fade-in-up">
        {/* Intro */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[9px] tracking-widest font-extrabold uppercase text-amber-500 block mb-2">{currentSegmentData.brand}</span>
          <h2 className="text-2xl md:text-3xl font-light tracking-tight text-white leading-tight font-serif">{activeProduct.title}</h2>
          <p className="text-zinc-400 text-xs mt-2 italic">"{currentSegmentData.tagline}"</p>
        </div>

        {/* Hero do Perfume Ativo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-2xl overflow-hidden h-[300px] md:h-[400px] group border border-zinc-800">
            <img 
              src={activeProduct.image} 
              alt={activeProduct.title} 
              className="w-full h-full object-cover transition-opacity duration-700 brightness-[0.9] hover:brightness-100"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent pointer-events-none" />
            <span className="absolute top-4 left-4 text-[9px] bg-amber-500/90 text-zinc-950 font-bold uppercase tracking-widest px-3 py-1 rounded backdrop-blur-sm shadow-md">
              {activeProduct.tag}
            </span>
          </div>

          <div className="flex flex-col gap-6 justify-center">
            <div>
              <h3 className="text-xl font-bold font-serif text-white mb-2 leading-snug">{activeProduct.title}</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">{activeProduct.desc}</p>
            </div>

            {/* Especificações Olfativas */}
            <div className="bg-zinc-900 border border-zinc-800/80 p-4 rounded-xl">
              <span className="text-[8px] text-amber-400 font-bold uppercase tracking-wider block mb-2">✦ Notas Olfativas de Alta Fixação:</span>
              <div className="grid grid-cols-2 gap-2">
                {activeProduct.details.map(det => (
                  <span key={det} className="text-[9px] text-zinc-300 font-light flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-amber-500" /> {det}
                  </span>
                ))}
              </div>
            </div>

            {/* Alternar Perfumes */}
            <div className="flex items-center gap-4">
              <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Alternar Coleção:</span>
              <div className="flex gap-2">
                {[mainProd, secProd].map(p => {
                  const isSelected = selectedPerfumeId === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPerfumeId(p.id)}
                      className={`text-[9px] px-3 py-1.5 rounded-full transition-all duration-300 font-bold ${
                        isSelected ? 'bg-white text-zinc-950 shadow-lg' : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400 border border-zinc-800'
                      }`}
                    >
                      {p.id === 'pf1' ? 'Amber & Sândalo' : 'Bloom'}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Preço e Botão de Adicionar */}
            <div className="flex justify-between items-center pt-6 border-t border-zinc-900">
              <span className="text-2xl font-bold font-serif text-white">R$ {activeProduct.price.toFixed(2).replace('.', ',')}</span>
              
              <div className="flex items-center gap-4">
                {activeProduct.customizers.map(cust => (
                  <div key={cust.label} className="flex items-center gap-2 bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-800">
                    <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">{cust.label}:</span>
                    <div className="flex gap-1">
                      {cust.options.map(opt => {
                        const selectedOpt = productCustomizerState[activeProduct.id]?.[cust.label] || cust.active;
                        const isSelected = selectedOpt === opt;
                        return (
                          <button
                            key={opt}
                            onClick={() => handleOptionSelect(activeProduct.id, cust.label, opt)}
                            className={`text-[8px] px-2 py-0.5 rounded transition-all duration-200 font-bold ${
                              isSelected ? 'bg-white text-zinc-950 shadow' : 'text-zinc-500 hover:text-white'
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
                    isAdded ? 'bg-green-600 text-white' : 'bg-white hover:bg-zinc-200 text-zinc-950 shadow-lg'
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

  // Renderizador: Bolsas - Galeria Premium (Carrossel Horizontal com Cards Flutuantes)
  const renderBolsasLayout = () => {
    return (
      <div className="flex flex-col gap-10 animate-fade-in-up">
        {/* Intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-100 pb-8 gap-4">
          <div>
            <span className="text-[10px] tracking-widest font-extrabold uppercase text-amber-600 block mb-2">{currentSegmentData.brand}</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-950 leading-none">Galeria Boutique</h2>
            <p className="text-zinc-500 text-sm mt-3">{currentSegmentData.tagline}</p>
          </div>
          <span className="text-[10px] text-zinc-400 font-bold tracking-widest uppercase border border-zinc-200 rounded-full px-4 py-1 block w-fit shrink-0">
            Arraste para explorar ➔
          </span>
        </div>

        {/* Linha de Cards com Altura Assimétrica */}
        <div className="flex gap-8 overflow-x-auto pb-6 snap-x select-none cursor-grab">
          {currentSegmentData.products.map((prod, index) => {
            const isAdded = addedProductIds.includes(prod.id);
            const isFirst = index === 0;

            return (
              <div 
                key={prod.id} 
                className={`snap-center shrink-0 w-[290px] sm:w-[350px] bg-zinc-50/60 rounded-3xl overflow-hidden flex flex-col justify-between shadow-lg transition-all duration-500 hover:shadow-2xl border border-zinc-200/50 hover:-translate-y-2 p-5 ${
                  isFirst ? 'h-[500px]' : 'h-[440px] mt-auto'
                }`}
              >
                <div>
                  <div className="relative rounded-2xl overflow-hidden h-[200px] mb-4 group border border-zinc-200/40 shadow-inner bg-white">
                    <img src={prod.image} alt={prod.title} className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-105" loading="lazy" />
                    <span className="absolute top-3 left-3 text-[9px] bg-zinc-950 text-white font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded shadow">
                      {prod.tag}
                    </span>
                  </div>
                  
                  <h3 className="font-serif font-bold text-zinc-900 text-lg leading-tight mb-1">{prod.title}</h3>
                  <p className="text-zinc-500 text-xs leading-relaxed mb-4 line-clamp-2">{prod.desc}</p>
                  
                  <div className="flex flex-wrap gap-x-2.5 gap-y-1 mb-4">
                    {prod.details.map(det => (
                      <span key={det} className="text-[9px] text-zinc-600 font-medium">
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
                    <span className="font-serif font-bold text-base text-zinc-900 shrink-0">R$ {prod.price.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <button
                    onClick={() => addToCart(prod)}
                    className={`w-full mt-4 py-2 rounded-full text-xs font-bold transition-all duration-300 shadow-md ${
                      isAdded ? 'bg-green-600 text-white' : 'bg-zinc-950 hover:bg-zinc-900 text-white shadow-zinc-900/10'
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

  // Renderizador: Acessórios - Vitrine Boutique (Mosaico Bento Grid)
  const renderAcessoriosLayout = () => {
    const mainProd = currentSegmentData.products[0];
    const secProd = currentSegmentData.products[1];
    const isAddedMain = addedProductIds.includes(mainProd.id);
    const isAddedSec = addedProductIds.includes(secProd.id);

    return (
      <div className="flex flex-col gap-10 animate-fade-in-up">
        {/* Intro */}
        <div className="text-center max-w-xl mx-auto border-b border-zinc-100 pb-6">
          <span className="text-[10px] tracking-widest font-extrabold uppercase text-zinc-500 block mb-2">{currentSegmentData.brand}</span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900 leading-none">Bento Vitrine</h2>
          <p className="text-zinc-500 text-xs mt-3">{currentSegmentData.tagline}</p>
        </div>

        {/* Bento Grid Mosaico */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          {/* Bloco 1: Campanha Estilo de Vida (Grande - 7 Colunas) */}
          <div className="md:col-span-7 relative rounded-3xl overflow-hidden border border-zinc-100 shadow-xl min-h-[300px] group">
            <img src={mainProd.image} alt={mainProd.title} className="w-full h-full object-cover transition-transform duration-[6000ms] group-hover:scale-105" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-8 left-8 right-8 text-white max-w-sm">
              <span className="text-[9px] bg-white/20 text-white font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded backdrop-blur mb-2 block w-fit">
                {mainProd.tag}
              </span>
              <h3 className="text-xl font-bold font-serif mb-2">{mainProd.title}</h3>
              <p className="text-zinc-300 text-[11px] leading-relaxed mb-4">{mainProd.desc}</p>
              
              <div className="flex gap-3 pt-3 border-t border-white/20 items-center justify-between">
                <span className="font-serif font-bold text-base">R$ {mainProd.price.toFixed(2).replace('.', ',')}</span>
                <button
                  onClick={() => addToCart(mainProd)}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all duration-300 ${
                    isAddedMain ? 'bg-green-600 text-white' : 'bg-white hover:bg-zinc-200 text-zinc-950'
                  }`}
                >
                  {isAddedMain ? 'Adicionado ✓' : 'Adicionar ao Carrinho'}
                </button>
              </div>
            </div>
          </div>

          {/* Bloco 2: Card Produto Quadrado (5 Colunas) */}
          <div className="md:col-span-5 bg-zinc-50 border border-zinc-200/50 rounded-3xl p-6 flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-500">
            <div>
              <div className="relative rounded-2xl overflow-hidden h-[180px] mb-4 bg-white border border-zinc-200/40">
                <img src={secProd.image} alt={secProd.title} className="w-full h-full object-cover transition-transform duration-[3000ms] hover:scale-105" loading="lazy" />
                <span className="absolute top-3 left-3 text-[9px] bg-zinc-950 text-white font-bold uppercase tracking-widest px-2.5 py-0.5 rounded shadow">
                  {secProd.tag}
                </span>
              </div>
              <h3 className="font-bold text-zinc-900 text-base leading-tight mb-1">{secProd.title}</h3>
              <p className="text-zinc-500 text-xs leading-relaxed mb-4">{secProd.desc}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {secProd.details.map(det => (
                  <span key={det} className="text-[9px] text-zinc-600 bg-white border border-zinc-200/80 px-2 py-0.5 rounded-full font-medium">
                    ✓ {det}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-200/60">
              <div className="flex justify-between items-center gap-3">
                {secProd.customizers.map(cust => (
                  <div key={cust.label} className="flex items-center gap-1.5">
                    <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">{cust.label}:</span>
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
                <span className="font-serif font-bold text-sm text-zinc-900 shrink-0">R$ {secProd.price.toFixed(2).replace('.', ',')}</span>
              </div>
              <button
                onClick={() => addToCart(secProd)}
                className={`w-full mt-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                  isAddedSec ? 'bg-green-600 text-white' : 'bg-zinc-950 hover:bg-zinc-900 text-white'
                }`}
              >
                {isAddedSec ? 'Adicionado ✓' : 'Adicionar ao Carrinho'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

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

  return (
    <section className="py-24 px-6 max-w-6xl mx-auto" id="showcase">
      <div className="text-center mb-16">
        <span className="text-tertiary font-semibold text-xs tracking-widest uppercase block mb-3">O Novo Showcase</span>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-title leading-tight">Exploração Editorial de Campanha</h2>
        <p className="text-zinc-500 text-sm mt-3 max-w-lg mx-auto">Navegue pelas nossas vitrines boutique exclusivas criadas para demonstrar identidade própria e conversão direta no WhatsApp.</p>
      </div>

      {/* Tabs de Navegação */}
      <div className="flex justify-center mb-16 overflow-x-auto pb-4 scrollbar-none">
        <div className="flex bg-zinc-200/60 border border-zinc-300/40 p-1.5 rounded-full min-w-max">
          {segments.map((seg) => {
            const isActive = activeSegment === seg.id;
            return (
              <button
                key={seg.id}
                onClick={() => handleTabChange(seg.id)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
                  isActive ? `${seg.colorClass} text-black shadow-md scale-102` : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                <span>{seg.icon}</span>
                {seg.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Caixa de Exibição Principal */}
      <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-2xl min-h-[500px]">
        {renderActiveSegmentLayout()}
      </div>

      {/* Carrinho Flutuante */}
      <div 
        key={`cart-${cartTotalCount}`}
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-lg bg-white/95 border border-zinc-200 backdrop-blur-xl rounded-2xl p-4 flex items-center justify-between shadow-2xl z-50 transition-all duration-500 ${
          cartTotalCount > 0 ? 'translate-y-0 opacity-100 animate-cart-bounce' : 'translate-y-24 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-zinc-900">Resumo do Pedido</span>
          <span className="text-xs text-zinc-500">{cartTotalCount} {cartTotalCount === 1 ? 'item' : 'itens'} selecionados</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-zinc-900 font-bold text-base font-serif">
            Total: R$ {cartTotalPrice.toFixed(2).replace('.', ',')}
          </span>
          <button
            onClick={finalizeOrder}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-green-600 hover:bg-green-500 transition-colors shadow-lg shadow-green-950/30"
          >
            Finalizar no WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
}
