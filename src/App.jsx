import React from 'react';
import Header from './components/Header';
import HeroVideo from './components/HeroVideo';
import AppleMagicWords from './components/AppleMagicWords';
import TargetAudience from './components/TargetAudience';
import AgileProcess from './components/AgileProcess';
import ImpressiveWorks from './components/ImpressiveWorks';
import TangibleDeliveries from './components/TangibleDeliveries';
import ContactCTA from './components/ContactCTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-bg-base min-h-screen text-text-main font-sans selection:bg-zinc-200 selection:text-black">
      {/* 1. Header / Barra de Navegação */}
      <Header />
      
      {/* 2. Seção Hero de Vídeo Background */}
      <HeroVideo />
      
      {/* 3. Seção Premium de Palavras Mágicas */}
      <AppleMagicWords />

      {/* 4. Para Quem É a Impulse IT (3 Perfis de Clientes) */}
      <TargetAudience />

      {/* 5. Metodologia & Processo Ágil em 5 Passos */}
      <AgileProcess />
      
      {/* 6. Bento Grid com Trabalhos e Tecnologias */}
      <ImpressiveWorks />

      {/* 7. Entregas Tangíveis vs. Resultados de Negócio */}
      <TangibleDeliveries />
      
      {/* 8. Seção de Conversão e Diagnóstico de 30 min */}
      <ContactCTA />
      
      {/* 12. Rodapé Institucional */}
      <Footer />
    </div>
  );
}

export default App;
