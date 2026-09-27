import React from 'react';

const deliverables = [
  {
    title: 'Propriedade Intelectual 100% Sua',
    tag: 'Zero Lock-in',
    description:
      'Todo o código-fonte, arquitetura, documentação e infraestrutura pertencem à sua empresa. Sem dependência de fornecedor e sem pegadinhas contratuais.',
    icon: (
      <svg className="w-5 h-5 text-tertiary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Cobrança Apenas pelo Desenvolvido',
    tag: 'Previsibilidade Financeira',
    description:
      'Você paga pelo que é planejado, construído e aprovado. Nada de estimativas fantasiosas ou faturas surpresa no fim do mês.',
    icon: (
      <svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Arquitetura Cloud Escalável',
    tag: 'Alta Disponibilidade',
    description:
      'Soluções preparadas para suportar desde os primeiros usuários até milhões de requisições sem lentidão, custos inflacionados ou instabilidade.',
    icon: (
      <svg className="w-5 h-5 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
  {
    title: 'Design UI/UX de Alta Fidelidade',
    tag: 'Foco em Conversão',
    description:
      'Interfaces intuitivas, refinadas e focadas na experiência do usuário final. Cada tela é desenhada para reter e converter clientes.',
    icon: (
      <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Automação e Inteligência Artificial',
    tag: 'Engenharia Moderna',
    description:
      'Integrações com APIs de ponta e modelos de IA para automatizar tarefas repetitivas, atendimento ao cliente e inteligência de dados.',
    icon: (
      <svg className="w-5 h-5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Segurança, Privacidade & LGPD',
    tag: 'Conformidade Rigorosa',
    description:
      'Criptografia de dados, autenticação robusta e boas práticas para blindar as informações críticas do seu negócio contra vazamentos.',
    icon: (
      <svg className="w-5 h-5 text-sky-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

export default function TangibleDeliveries() {
  return (
    <section id="diferenciais" className="relative py-24 sm:py-32 bg-white border-t border-zinc-200/80 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Título & Proposta */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-secondary bg-bg-base border border-zinc-200 uppercase mb-4 font-mono shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            // ENTREGAS TANGÍVEIS & RESULTADOS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-title tracking-tight leading-tight mb-5">
            Do problema à solução: <br className="hidden sm:inline" />
            você recebe entregas tangíveis — não promessas
          </h2>
          <p className="text-text-muted text-base sm:text-lg leading-relaxed">
            Desenvolvemos ativos de tecnologia duradouros para sua empresa, com rigor técnico e foco contínuo no seu crescimento.
          </p>
        </div>

        {/* Grid dos 6 Diferenciais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {deliverables.map((item, idx) => (
            <div
              key={idx}
              className="group bg-bg-base hover:bg-white border border-zinc-200/80 hover:border-secondary/40 rounded-3xl p-7 sm:p-8 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-2xl bg-white border border-zinc-200/80 flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xs">
                    {item.icon}
                  </div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-secondary bg-white px-2.5 py-1 rounded-md border border-zinc-200/60">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-title text-lg sm:text-xl font-bold tracking-tight mb-3 group-hover:text-secondary transition-colors">
                  {item.title}
                </h3>

                <p className="text-text-muted text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-zinc-200/60 flex items-center text-xs font-semibold text-text-main group-hover:text-secondary transition-colors">
                <span>Garantia de Qualidade Impulse</span>
                <span className="ml-auto">→</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
