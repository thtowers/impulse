import React from 'react';

const profiles = [
  {
    step: '01 >',
    title: 'Tem a ideia, falta tirar do papel',
    tag: 'Novos Projetos & Ideias',
    description:
      'Você sabe o que quer criar, mas não quer perder tempo nem dinheiro tentando contratar pessoas ou errando sozinho. Ajudamos a planejar o essencial e colocamos sua ideia no ar rápido, pronta para funcionar.',
    benefit: 'Lançamento rápido para começar a testar e vender logo.',
    icon: (
      <svg className="w-5 h-5 text-tertiary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    step: '02 >',
    title: 'O sistema existe, mas travou',
    tag: 'Sistemas em Andamento',
    description:
      'Seu aplicativo ou site vive dando problemas, está lento ou as melhorias demoram semanas para sair. Entramos para organizar tudo, consertar as falhas e fazer seu sistema rodar leve e sem travar.',
    benefit: 'Mais velocidade, estabilidade e fim das dores de cabeça.',
    icon: (
      <svg className="w-5 h-5 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    step: '03 >',
    title: 'Já tentou antes e teve dor de cabeça',
    tag: 'Parceria de Confiança',
    description:
      'Cansou de prazos furados, custos que aumentam do nada ou profissionais que simplesmente desaparecem? Aqui você acompanha tudo de perto, sabe exatamente onde cada centavo foi investido e o projeto é 100% seu.',
    benefit: 'Total transparência, sem surpresas no orçamento.',
    icon: (
      <svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

export default function TargetAudience() {
  return (
    <section id="para-quem" className="relative py-24 sm:py-32 bg-bg-base overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-secondary bg-white border border-zinc-200/80 uppercase mb-4 font-mono shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            // PARA QUEM É A IMPULSE
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-title tracking-tight leading-tight mb-5">
            A solução certa para cada fase do seu negócio
          </h2>
          <p className="text-text-muted text-base sm:text-lg leading-relaxed">
            Sem palavras difíceis ou processos complicados. Cuidamos de toda a parte técnica para você focar no que mais importa: fazer seu negócio crescer.
          </p>
        </div>

        {/* Grid dos 3 Perfis de Clientes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {profiles.map((profile, index) => (
            <div
              key={index}
              className="group relative bg-white border border-zinc-200/80 hover:border-secondary/40 rounded-3xl p-8 sm:p-9 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Efeito sutil de gradiente de borda superior */}
              <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-secondary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Header do Card com Número e Tag */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="font-mono text-2xl font-black text-secondary tracking-tight group-hover:text-tertiary transition-colors">
                    {profile.step}
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-bg-base flex items-center justify-center border border-zinc-200/60 group-hover:scale-110 transition-transform">
                    {profile.icon}
                  </div>
                </div>

                <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-secondary bg-secondary/8 px-2.5 py-1 rounded-md mb-3">
                  {profile.tag}
                </span>

                <h3 className="text-title text-xl sm:text-2xl font-extrabold tracking-tight mb-4 group-hover:text-secondary transition-colors">
                  {profile.title}
                </h3>

                <p className="text-text-muted text-sm sm:text-[15px] leading-relaxed mb-6">
                  {profile.description}
                </p>
              </div>

              {/* Destaque / Benefício no rodapé do card */}
              <div className="pt-5 border-t border-zinc-100 flex items-start gap-2.5">
                <span className="text-secondary text-sm mt-0.5 font-bold">✓</span>
                <span className="text-xs font-semibold text-text-main">
                  {profile.benefit}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Banner Inferior: Pagamento Justo */}
        <div className="mt-14 p-6 sm:p-8 bg-gradient-to-r from-primary to-secondary text-white rounded-3xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-200 block mb-1">
              // PAGAMENTO JUSTO E TRANSPARENTE
            </span>
            <p className="text-lg sm:text-xl font-bold">
              Você só paga pelo que realmente é feito e entregue. Sem pacotes desnecessários ou surpresas na conta.
            </p>
          </div>
          <a
            href="#contato"
            className="whitespace-nowrap px-6 py-3 rounded-full bg-white text-primary text-xs font-bold uppercase tracking-wider hover:bg-zinc-100 transition-all shadow-sm hover:scale-105 active:scale-95"
          >
            Conversar sobre seu projeto →
          </a>
        </div>

      </div>
    </section>
  );
}
