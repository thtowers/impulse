import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-bg-base py-16 px-6 text-center">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-6">
        <img src="/assets/logo_atual.png" alt="Impulse Logo" className="h-[40px] w-auto opacity-80" />
        <ul className="flex gap-6 text-text-muted text-xs font-medium">
          <li><a href="#magic-words" className="hover:text-text-main transition-colors">Início</a></li>
          <li><a href="#showcase" className="hover:text-text-main transition-colors">Catálogos</a></li>
        </ul>
        <p className="text-text-muted text-[10px] tracking-wide">
          &copy; 2026 Impulse Agência Digital. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
