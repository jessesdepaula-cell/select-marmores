'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#materiais', label: 'Materiais' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#processo', label: 'Processo' },
  { href: '#contato', label: 'Contato' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all ${
        scrolled
          ? 'bg-[var(--bg)]/90 backdrop-blur border-b border-[var(--line)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#topo" className="flex items-center gap-2 font-serif text-lg tracking-wide">
          <span className="inline-block w-2.5 h-2.5 rotate-45 bg-[var(--gold)]" />
          <span className="font-medium">SELECT</span>
          <span className="text-[var(--muted)] font-light">MÁRMORES</span>
        </a>

        <nav className="hidden md:flex items-center gap-7 text-sm text-[var(--ink-soft)]">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-[var(--ink)] transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <a href="#contato" className="hidden md:inline-flex btn-gold !py-2.5 !px-5 text-sm">
          Solicitar orçamento
        </a>

        <button
          aria-label="Menu"
          className="md:hidden p-2 -mr-2"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[var(--bg)] border-t border-[var(--line)]">
          <div className="px-5 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-1 text-[var(--ink-soft)]"
              >
                {l.label}
              </a>
            ))}
            <a href="#contato" onClick={() => setOpen(false)} className="btn-gold mt-2">
              Solicitar orçamento
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
