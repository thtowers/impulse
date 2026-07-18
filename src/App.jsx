import React from 'react';
import Header from './components/Header';
import HeroVideo from './components/HeroVideo';
import AppleMagicWords from './components/AppleMagicWords';
import ImpressiveWorks from './components/ImpressiveWorks';
import Showcase from './components/Showcase';
import ContactCTA from './components/ContactCTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-bg-base min-h-screen text-text-main font-sans selection:bg-zinc-200 selection:text-black">
      {/* 1. Header / Barra de Navegação */}
      <Header />
      
      {/* Seção Hero de Vídeo Background */}
      <HeroVideo />
      
      {/* Seção Premium de Palavras Mágicas */}
      <AppleMagicWords />
      
      {/* Seção de Vídeo e Destaques Bento Grid */}
      <ImpressiveWorks />
      
      {/* 2. Showcase de Catálogos (Aba com 4 segmentos) - Ocultado temporariamente via comentário
      <Showcase />
      */}
      
      {/* Seção de Contato e Desenvolvimento via WhatsApp */}
      <ContactCTA />
      
      {/* 3. Rodapé */}
      <Footer />
    </div>
  );
}

export default App;
