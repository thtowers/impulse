import React, { useState } from 'react';

const steps = [
  {
    step: '01',
    title: 'Reunião Inicial & Diagnóstico',
    subtitle: 'Alinhamento Estratégico',
    description:
      'Uma conversa objetiva de 30 minutos para compreender o modelo de negócio, principais gargalos e requisitos essenciais. Sem jargões confusos, focando em como a tecnologia gerará receita para você.',
    deliverable: 'Mapeamento de viabilidade e arquitetura recomendada.',
    tag: 'Etapa de Alinhamento',
  },
  {
    step: '02',
    title: 'Começamos Pequeno',
    subtitle: 'Validação sem Desperdício',
    description:
      'Em vez de tentar construir um monólito de 1 ano, priorizamos o núcleo mais valioso do produto (MVP). Isso diminui seu investimento inicial e permite validar a solução no mercado real muito antes.',
    deliverable: 'Escopo ágil focado nas principais dores do cliente.',
    tag: 'Redução de Risco',
  },
  {
    step: '03',
    title: 'Montamos o Plano & Sprints',
    subtitle: 'Previsibilidade e Transparência',
    description:
      'Estruturamos as etapas em sprints quinzenais claras. Você sabe exatamente o que será entregue a cada ciclo, com acesso irrestrito ao board de tarefas e métricas de avanço.',
    deliverable: 'Roadmap de desenvolvimento transparente e estimativas reais.',
    tag: 'Governança Ágil',
  },
  {
    step: '04',
    title: 'Primeira Entrega em Produção',
    subtitle: 'Software Real Funcionando',
    description:
      'Colocamos a primeira versão estável no ar rapidamente. Código limpo, infraestrutura cloud segura e testes automatizados para que seus usuários tenham uma experiência impecável.',
    deliverable: 'Sistema no ar, responsivo e validado por usuários reais.',
    tag: 'Entrega Rápida',
  },
  {
    step: '05',
    title: 'Evolução Contínua & Escala',
    subtitle: 'Parceria de Longo Prazo',
    description:
      'Com o produto validado, monitoramos indicadores de desempenho e implementamos novas funcionalidades conforme o volume de usuários e a demanda da sua empresa aumentam.',
    deliverable: 'Manutenção proativa, escala de infraestrutura e novas features.',
    tag: 'Crescimento Contínuo',
  },
];

export default function AgileProcess() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="metodologia" className="relative py-24 sm:py-32 bg-bg-base border-t border-zinc-200/80 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-secondary bg-white border border-zinc-200/80 uppercase mb-4 font-mono shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            // METODOLOGIA & FLUXO
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-title tracking-tight leading-tight mb-5">
            Um processo simples, ágil e colaborativo
          </h2>
          <p className="text-text-muted text-base sm:text-lg leading-relaxed">
            Sem burocracia ou semanas de reuniões sem fim. Acompanhe a transformação da sua ideia em cada etapa de forma transparente.
          </p>
        </div>

        {/* Navegação Rápida entre os 5 Passos (Desktop & Mobile) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10">
          {steps.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                activeStep === idx
                  ? 'bg-primary text-white border-primary shadow-md scale-[1.02]'
                  : 'bg-white hover:bg-zinc-50 border-zinc-200/80 text-text-main shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`font-mono text-xs font-bold ${activeStep === idx ? 'text-blue-300' : 'text-secondary'}`}>
                  PASSO {item.step}
                </span>
                <span className={`w-2 h-2 rounded-full ${activeStep === idx ? 'bg-tertiary animate-pulse' : 'bg-zinc-300'}`} />
              </div>
              <h4 className="text-xs sm:text-sm font-bold line-clamp-2">
                {item.title}
              </h4>
            </button>
          ))}
        </div>

        {/* Card de Destaque do Passo Selecionado */}
        <div className="bg-white border border-zinc-200/80 rounded-3xl p-8 sm:p-12 shadow-sm relative overflow-hidden mb-12">
          {/* Fundo decorativo sutil */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-3xl sm:text-4xl font-black text-secondary">
                  {steps[activeStep].step}
                </span>
                <div className="h-6 w-[1px] bg-zinc-300" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted bg-bg-base px-3 py-1 rounded-md border border-zinc-200/60">
                  {steps[activeStep].tag}
                </span>
              </div>

              <h3 className="text-title text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
                {steps[activeStep].title}
              </h3>
              <span className="text-xs sm:text-sm font-semibold text-secondary block mb-4">
                {steps[activeStep].subtitle}
              </span>

              <p className="text-text-muted text-sm sm:text-base leading-relaxed mb-6">
                {steps[activeStep].description}
              </p>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-bg-base border border-zinc-200/80 text-xs font-semibold text-text-main">
                <span className="text-secondary font-bold">Entrega desta etapa:</span>
                <span>{steps[activeStep].deliverable}</span>
              </div>
            </div>

            {/* Controle Próximo / Anterior */}
            <div className="flex items-center gap-3 w-full lg:w-auto justify-end pt-4 lg:pt-0 border-t lg:border-t-0 border-zinc-100">
              <button
                disabled={activeStep === 0}
                onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-bold text-text-main disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zinc-50 transition-colors"
              >
                ← Anterior
              </button>
              <button
                disabled={activeStep === steps.length - 1}
                onClick={() => setActiveStep((prev) => Math.min(steps.length - 1, prev + 1))}
                className="px-5 py-2.5 rounded-xl bg-tertiary hover:bg-tertiary-hover text-white text-xs font-bold disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-xs"
              >
                Próximo Passo →
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
