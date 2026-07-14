import React, { useState } from 'react';

const WHATSAPP_NUMBER = '5521979362517';

const segments = [
  { id: 'pizza', label: 'Pizzaria', icon: '🍕' },
  { id: 'joia', label: 'Joalheria', icon: '✨' },
  { id: 'doce', label: 'Confeitaria', icon: '🍰' },
  { id: 'barbeiro', label: 'Barbearia', icon: '💈' }
];

const colorOptions = [
  { id: 'orange', value: '#e76f51' },
  { id: 'gold', value: '#d4af37' },
  { id: 'coral', value: '#ffb5a7' },
  { id: 'wood', value: '#c49a6c' }
];

const segmentData = {
  pizza: {
    banner: '/assets/pizza.png',
    prodImg: '/assets/pizza.png',
    prodName: 'Pizza de Calabresa',
    prodDesc: 'Molho artesanal, mussarela premium, calabresa defumada.',
    prodPrice: 'R$ 44,90'
  },
  joia: {
    banner: '/assets/joia.png',
    prodImg: '/assets/joia.png',
    prodName: 'Colar Delicate Gold',
    prodDesc: 'Colar de ouro 18k com ponto de luz de diamante lapidado.',
    prodPrice: 'R$ 289,00'
  },
  doce: {
    banner: '/assets/doce.png',
    prodImg: '/assets/doce.png',
    prodName: 'Box Brigadeiro Gourmet',
    prodDesc: 'Caixa luxo com 12 brigadeiros trufados decorados.',
    prodPrice: 'R$ 64,90'
  },
  barbeiro: {
    banner: '/assets/barbeiro.png',
    prodImg: '/assets/barbeiro.png',
    prodName: 'Pomada Modeladora Oak',
    prodDesc: 'Fixação forte e efeito matte natural para o dia a dia.',
    prodPrice: 'R$ 49,90'
  }
};

export default function Simulator() {
  const [shopName, setShopName] = useState('Bella Italia');
  const [activeSegment, setActiveSegment] = useState('pizza');
  const [activeColor, setActiveColor] = useState('orange');

  const selectedColorHex = colorOptions.find(c => c.id === activeColor)?.value || '#e76f51';
  const mockData = segmentData[activeSegment];

  // Gera o link do WhatsApp para o CTA final
  const getWhatsAppLink = () => {
    const segmentFriendly = segments.find(s => s.id === activeSegment)?.label || '';
    const colorFriendly = activeColor.charAt(0).toUpperCase() + activeColor.slice(1);
    
    const message = `Olá! Usei o simulador no site da Impulse para a loja *${shopName || 'Minha Loja Digital'}* no segmento *${segmentFriendly}* (cor temática *${colorFriendly}*). Gostaria de solicitar um orçamento para o meu catálogo oficial!`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section className="py-24 px-6 max-w-6xl mx-auto" id="simulator">
      <div className="text-center mb-16">
        <span className="text-secondary font-semibold text-xs tracking-widest uppercase block mb-3">O Simulador</span>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-title">Configure seu catálogo agora</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Formulário de Configuração */}
        <div className="bg-white border border-zinc-200/80 rounded-3xl p-8 md:p-10 shadow-xl backdrop-blur-xl">
          
          <div className="mb-6">
            <label htmlFor="sim-shop-name" className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2">
              Nome da sua Loja:
            </label>
            <input 
              type="text" 
              id="sim-shop-name" 
              className="w-full bg-zinc-50 border border-zinc-200 text-text-main rounded-xl px-5 py-3.5 focus:bg-white focus:border-tertiary focus:outline-none transition-all duration-200 text-sm"
              placeholder="Ex: Hamburgueria Real" 
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2">
              Escolha o Segmento:
            </label>
            <div className="grid grid-cols-2 gap-3">
              {segments.map(seg => {
                const isSelected = activeSegment === seg.id;
                return (
                  <button
                    key={seg.id}
                    onClick={() => setActiveSegment(seg.id)}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all duration-200 ${
                      isSelected
                        ? 'border-tertiary bg-tertiary/10 text-tertiary shadow-sm'
                        : 'border-zinc-200 bg-zinc-50/50 text-text-muted hover:text-text-main hover:border-zinc-300 hover:bg-zinc-50'
                    }`}
                  >
                    <span className="text-xl mb-1">{seg.icon}</span>
                    <span className="text-xs font-medium">{seg.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2">
              Cor Principal (Visual):
            </label>
            <div className="flex gap-4">
              {colorOptions.map(color => {
                const isSelected = activeColor === color.id;
                return (
                  <button
                    key={color.id}
                    onClick={() => setActiveColor(color.id)}
                    className={`w-11 h-11 rounded-full flex items-center justify-center border-2 transition-all duration-200`}
                    style={{ 
                      borderColor: isSelected ? 'var(--color-tertiary)' : 'transparent',
                    }}
                  >
                    <span 
                      className="w-8 h-8 rounded-full block" 
                      style={{ backgroundColor: color.value }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <a 
            href={getWhatsAppLink()} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full block py-4 text-center font-semibold text-sm text-white bg-tertiary hover:bg-tertiary-hover rounded-full transition-all duration-200 shadow-md shadow-tertiary/10 hover:-translate-y-0.5"
          >
            Encomendar Catálogo Oficial
          </a>
        </div>

        {/* Pré-visualização do Dispositivo (Phone Mockup) */}
        <div className="flex justify-center items-center">
          <div className="w-[310px] h-[620px] bg-white border-[10px] border-black rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col">
            
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-b-xl z-20" />

            <div className="flex-grow flex flex-col p-4 pt-6 overflow-y-auto no-scrollbar">
              
              <header className="text-center py-4 border-b border-zinc-100">
                <div className="font-bold text-text-main text-base tracking-tight">{shopName || 'Minha Loja'}</div>
                <div className="text-[10px] text-text-muted mt-0.5">Catálogo Digital WhatsApp</div>
              </header>

              <div className="w-full h-28 rounded-xl overflow-hidden mt-4">
                <img src={mockData.banner} alt="Mock Banner" className="w-full h-full object-cover" />
              </div>

              <h4 className="text-[11px] font-bold uppercase tracking-wider text-text-muted mt-5 mb-3">Mais Vendidos</h4>

              <div className="bg-zinc-50 border border-zinc-100 rounded-xl p-3 flex gap-3 items-center shadow-sm">
                <img src={mockData.prodImg} alt="Mock Product" className="w-14 h-14 rounded-lg object-cover" />
                <div className="flex-grow min-w-0">
                  <div className="font-bold text-xs text-text-main truncate">{mockData.prodName}</div>
                  <div className="text-[9px] text-text-muted line-clamp-2 mt-0.5 leading-normal">{mockData.prodDesc}</div>
                  <div className="font-bold text-xs mt-1.5" style={{ color: selectedColorHex }}>{mockData.prodPrice}</div>
                </div>
                <button 
                  className="px-2.5 py-1.5 rounded-full font-bold text-[10px] transition-colors"
                  style={{ 
                    backgroundColor: selectedColorHex, 
                    color: activeColor === 'coral' ? '#000' : '#fff' 
                  }}
                >
                  +
                </button>
              </div>

              <div className="mt-auto pt-6">
                <button className="w-full bg-[#25d366] hover:bg-[#20ba5a] text-white font-bold text-xs py-3 rounded-full flex items-center justify-center gap-2 transition-colors">
                  <span>Finalizar no WhatsApp</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
