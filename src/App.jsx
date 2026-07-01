import React from 'react';
import Header from './components/Header';
import HeroVideo from './components/HeroVideo';
import AppleMagicWords from './components/AppleMagicWords';
import ImpressiveWorks from './components/ImpressiveWorks';
import Showcase from './components/Showcase';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-[#f5f5f7] min-h-screen text-[#1d1d1f] font-sans selection:bg-zinc-200 selection:text-black">
      {/* 1. Header / Barra de Navegação */}
      <Header />
      
      {/* Seção Hero de Vídeo Background */}
      <HeroVideo />
      
      {/* Seção Premium de Palavras Mágicas */}
      <AppleMagicWords />
      
      {/* Seção de Vídeo e Destaques Bento Grid */}
      <ImpressiveWorks />
      
      {/* 2. Showcase de Catálogos (Aba com 4 segmentos) */}
      <Showcase />
      
      {/* 3. Rodapé */}
      <Footer />
    </div>
  );
}

export default App;
