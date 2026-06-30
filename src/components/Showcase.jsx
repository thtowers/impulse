import React, { useState } from 'react';

const WHATSAPP_NUMBER = '5521979362517';

const segments = [
  { id: 'pizza', name: 'Pizzaria', icon: '🍕', colorClass: 'bg-[#e76f51]', colorText: 'text-[#e76f51]', colorBorder: 'border-[#e76f51]' },
  { id: 'joia', name: 'Joalheria', icon: '✨', colorClass: 'bg-[#d4af37]', colorText: 'text-[#d4af37]', colorBorder: 'border-[#d4af37]' },
  { id: 'doce', name: 'Confeitaria', icon: '🍰', colorClass: 'bg-[#ffb5a7]', colorText: 'text-[#ffb5a7]', colorBorder: 'border-[#ffb5a7]' },
  { id: 'barbeiro', name: 'Barbearia', icon: '💈', colorClass: 'bg-[#c49a6c]', colorText: 'text-[#c49a6c]', colorBorder: 'border-[#c49a6c]' }
];

const catalogData = {
  pizza: {
    brand: 'Bella Italia Pizzaria',
    tagline: 'Forno à lenha e ingredientes artesanais importados.',
    categories: [
      { id: 'all', name: 'Todos' },
      { id: 'salgada', name: 'Pizzas Salgadas' },
      { id: 'doce', name: 'Pizzas Doces' },
      { id: 'bebida', name: 'Bebidas' }
    ],
    products: [
      {
        id: 'p1',
        category: 'salgada',
        title: 'Pizza Margherita Premium',
        desc: 'Molho de tomate pelado, mussarela de búfala fresca, azeite extra virgem e folhas de manjericão fresco.',
        price: 49.90,
        image: '/assets/pizza.png',
        tag: 'Destaque',
        customizers: [
          { label: 'Tamanho', options: ['Pequena', 'Média', 'Grande'], active: 'Média' },
          { label: 'Borda', options: ['Sem borda', 'Catupiry original'], active: 'Sem borda' }
        ]
      },
      {
        id: 'p2',
        category: 'salgada',
        title: 'Calabresa Gourmet',
        desc: 'Molho artesanal, mussarela curada, calabresa defumada especial fatiada fina e anéis de cebola roxa.',
        price: 54.90,
        image: '/assets/pizza.png',
        tag: 'Artesanal',
        customizers: [
          { label: 'Tamanho', options: ['Pequena', 'Média', 'Grande'], active: 'Média' }
        ]
      },
      {
        id: 'p3',
        category: 'doce',
        title: 'Chocolate com Morango',
        desc: 'Base de chocolate ao leite belga cremoso salpicada com morangos frescos e raspas de chocolate branco.',
        price: 42.90,
        image: '/assets/pizza.png',
        customizers: [
          { label: 'Tamanho', options: ['Broto', 'Grande'], active: 'Broto' }
        ]
      },
      {
        id: 'p4',
        category: 'bebida',
        title: 'Coca-Cola Lata 350ml',
        desc: 'Refrigerante Coca-Cola super gelado para acompanhar o seu pedido.',
        price: 10.00,
        image: '/assets/pizza.png',
        customizers: []
      }
    ]
  },
  joia: {
    brand: 'Aura Joalheria',
    tagline: 'Design autoral e lapidação perfeita em metais nobres.',
    categories: [
      { id: 'all', name: 'Todos' },
      { id: 'colar', name: 'Colares' },
      { id: 'anel', name: 'Anéis' }
    ],
    products: [
      {
        id: 'j1',
        category: 'colar',
        title: 'Colar Delicate Diamond',
        desc: 'Corrente veneziana fina banhada a ouro com pendente de cristal zircônia brilhante lapidação facetada.',
        price: 189.00,
        image: '/assets/joia.png',
        tag: 'Mais Vendido',
        customizers: [
          { label: 'Material', options: ['Prata 950', 'Ouro 18k'], active: 'Prata 950' }
        ]
      },
      {
        id: 'j2',
        category: 'anel',
        title: 'Anel Classic Solitaire',
        desc: 'Anel clássico delicado com cravação de zircônia solitária no topo. O toque de elegância atemporal.',
        price: 249.00,
        image: '/assets/joia.png',
        tag: 'Exclusivo',
        customizers: [
          { label: 'Aro', options: ['14', '16', '18'], active: '16' }
        ]
      }
    ]
  },
  doce: {
    brand: 'Petit Sweet Confeitaria',
    tagline: 'Alta doceria gourmet, adoçando seus melhores momentos.',
    categories: [
      { id: 'all', name: 'Todos' },
      { id: 'brigadeiro', name: 'Brigadeiros' },
      { id: 'caixa', name: 'Caixas de Presente' }
    ],
    products: [
      {
        id: 'd1',
        category: 'caixa',
        title: 'Box Collection 12un',
        desc: 'Seleção exclusiva de brigadeiros gourmet trufados com confeitos belgas Callebaut e lascas de ouro.',
        price: 69.00,
        image: '/assets/doce.png',
        tag: 'Gourmet',
        customizers: [
          { label: 'Embalagem', options: ['Box Preta', 'Box Laço Ouro'], active: 'Box Preta' }
        ]
      },
      {
        id: 'd2',
        category: 'brigadeiro',
        title: 'Pistache Belga',
        desc: 'Brigadeiro de pistache fresco com casquinha crocante de pistache granulado e toque flor de sal.',
        price: 6.00,
        image: '/assets/doce.png',
        customizers: []
      }
    ]
  },
  barbeiro: {
    brand: 'Oak & Ash Barber Shop',
    tagline: 'Estilo e cuidados especiais para o homem contemporâneo.',
    categories: [
      { id: 'all', name: 'Todos' },
      { id: 'finalizador', name: 'Finalizadores' },
      { id: 'barba', name: 'Óleos & Balms' }
    ],
    products: [
      {
        id: 'b1',
        category: 'finalizador',
        title: 'Pomada Matte Clay Oak',
        desc: 'Pomada de modelar à base de argila natural. Alta fixação de penteados sem brilho, fácil de lavar.',
        price: 49.90,
        image: '/assets/barbeiro.png',
        tag: 'Best Seller',
        customizers: [
          { label: 'Fixação', options: ['Forte Matte', 'Extra Forte'], active: 'Forte Matte' }
        ]
      },
      {
        id: 'b2',
        category: 'barba',
        title: 'Óleo Hidratante Blend',
        desc: 'Formulado com óleos orgânicos de sândalo e argan. Hidrata profundamente a barba e acalma a pele.',
        price: 39.90,
        image: '/assets/barbeiro.png',
        customizers: []
      }
    ]
  }
};

export default function Showcase() {
  const [activeSegment, setActiveSegment] = useState('pizza');
  const [categoryFilters, setCategoryFilters] = useState({
    pizza: 'all',
    joia: 'all',
    doce: 'all',
    barbeiro: 'all'
  });
  
  // Customização dinâmica local de opções dos produtos
  const [productCustomizerState, setProductCustomizerState] = useState({});

  const [cart, setCart] = useState([]);

  const currentSegmentData = catalogData[activeSegment];
  const activeCategory = categoryFilters[activeSegment];
  const activeSegmentConfig = segments.find(s => s.id === activeSegment);

  const handleTabChange = (segId) => {
    setActiveSegment(segId);
    // Limpa carrinho ao mudar de demonstração para simular cada catálogo isolado
    setCart([]);
  };

  const handleCategoryFilter = (catId) => {
    setCategoryFilters(prev => ({ ...prev, [activeSegment]: catId }));
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
    // Busca customizações do produto escolhido no state local ou usa as padrões do objeto
    const selectedOptions = {};
    product.customizers.forEach(c => {
      const selected = productCustomizerState[product.id]?.[c.label] || c.active;
      selectedOptions[c.label] = selected;
    });

    const optionsString = Object.entries(selectedOptions)
      .map(([k, v]) => `${k}: ${v}`)
      .join(', ');

    // Adiciona ao carrinho em React
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(
        item => item.id === product.id && item.options === optionsString
      );

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

  // Enviar pedido via WhatsApp
  const finalizeOrder = () => {
    if (cart.length === 0) return;

    const segmentLabel = segments.find(s => s.id === activeSegment)?.name || 'Loja';
    let message = `*NOVO PEDIDO (${segmentLabel.toUpperCase()} - DEMO)*\n\n`;

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

  // Filtragem dos produtos exibidos
  const filteredProducts = currentSegmentData.products.filter(
    prod => activeCategory === 'all' || prod.category === activeCategory
  );

  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <section className="py-24 px-6 max-w-6xl mx-auto" id="showcase">
      <div className="text-center mb-16">
        <span className="text-blue-600 font-semibold text-xs tracking-widest uppercase block mb-3">O Showcase</span>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900">Escolha um segmento e experimente</h2>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-12 overflow-x-auto pb-4">
        <div className="flex bg-zinc-200/60 border border-zinc-300/40 p-1.5 rounded-full min-w-max">
          {segments.map((seg) => {
            const isActive = activeSegment === seg.id;
            return (
              <button
                key={seg.id}
                onClick={() => handleTabChange(seg.id)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                  isActive ? `${seg.colorClass} text-black shadow-md` : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <span>{seg.icon}</span>
                {seg.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Caixa Exibidora do Catálogo */}
      <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 md:p-10 shadow-xl backdrop-blur-2xl min-h-[500px]">
        
        {/* Header Interno do Catálogo */}
        <div className="border-b border-zinc-100 pb-8 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">{currentSegmentData.brand}</h3>
            <p className="text-zinc-500 text-sm mt-1">{currentSegmentData.tagline}</p>
          </div>
          
          {/* Filtros Internos */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {currentSegmentData.categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCategoryFilter(cat.id)}
                className={`text-xs px-4 py-2 rounded-full border transition-all duration-200 whitespace-nowrap ${
                  activeCategory === cat.id
                    ? `${activeSegmentConfig.colorBorder} ${activeSegmentConfig.colorText} bg-white/5`
                    : 'border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-300'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Grade de Produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(prod => (
            <div key={prod.id} className="bg-zinc-50/50 border border-zinc-100 rounded-2xl overflow-hidden flex flex-col hover:border-zinc-200 transition-all duration-300 group">
              <div className="relative h-48 w-full overflow-hidden">
                <img 
                  src={prod.image} 
                  alt={prod.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy" 
                />
                {prod.tag && (
                  <span className={`absolute top-4 left-4 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-md text-white ${activeSegmentConfig.colorClass}`}>
                    {prod.tag}
                  </span>
                )}
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <h4 className="text-lg font-semibold text-zinc-900 mb-2">{prod.title}</h4>
                <p className="text-zinc-500 text-xs leading-relaxed mb-4 flex-grow">{prod.desc}</p>

                {/* Opções Customizáveis */}
                {prod.customizers.map(cust => (
                  <div key={cust.label} className="mb-3">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-2">
                      {cust.label}:
                    </span>
                    <div className="flex gap-2">
                      {cust.options.map(opt => {
                        const selectedOpt = productCustomizerState[prod.id]?.[cust.label] || cust.active;
                        const isSelected = selectedOpt === opt;
                        return (
                          <button
                            key={opt}
                            onClick={() => handleOptionSelect(prod.id, cust.label, opt)}
                            className={`text-[10px] px-3 py-1.5 rounded transition-all duration-200 ${
                              isSelected
                                ? `${activeSegmentConfig.colorBorder} ${activeSegmentConfig.colorText} bg-zinc-100 border`
                                : 'bg-white border border-zinc-200 text-zinc-500 hover:text-zinc-900'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {/* Preço e Adicionar */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-100">
                  <span className={`font-bold text-lg ${activeSegmentConfig.colorText}`}>
                    R$ {prod.price.toFixed(2).replace('.', ',')}
                  </span>
                  <button
                    onClick={() => addToCart(prod)}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-zinc-100 border border-zinc-200 text-zinc-700 hover:bg-zinc-900 hover:text-white transition-all duration-300"
                    aria-label="Adicionar item"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carrinho Flutuante */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-lg bg-white/95 border border-zinc-200 backdrop-blur-xl rounded-2xl p-4 flex items-center justify-between shadow-xl z-50 transition-all duration-500 ${
        cartTotalCount > 0 ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'
      }`}>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-zinc-900">Resumo do Pedido</span>
          <span className="text-xs text-zinc-500">{cartTotalCount} {cartTotalCount === 1 ? 'item' : 'itens'} adicionados</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-zinc-900 font-bold text-base">
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
