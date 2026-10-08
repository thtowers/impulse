import React, { Suspense, lazy } from 'react';
import Header from './components/Header';
import HeroVideo from './components/HeroVideo';

// Carregamento sob demanda (Code Splitting) para componentes abaixo da dobra
const AppleMagicWords = lazy(() => import('./components/AppleMagicWords'));
const TargetAudience = lazy(() => import('./components/TargetAudience'));
const AgileProcess = lazy(() => import('./components/AgileProcess'));
const ImpressiveWorks = lazy(() => import('./components/ImpressiveWorks'));
const TangibleDeliveries = lazy(() => import('./components/TangibleDeliveries'));
const ContactCTA = lazy(() => import('./components/ContactCTA'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
  return (
    <div className="bg-bg-base min-h-screen text-text-main font-sans selection:bg-zinc-200 selection:text-black">
      {/* 1. Header / Barra de Navegação (Crítico - Imediato) */}
      <Header />
      
      {/* 2. Seção Hero de Vídeo Background (Crítico - Imediato) */}
      <HeroVideo />
      
      {/* 3 a 8. Seções carregadas sob demanda para acelerar o carregamento inicial */}
      <Suspense fallback={null}>
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
      </Suspense>
    </div>
  );
}

export default App;
