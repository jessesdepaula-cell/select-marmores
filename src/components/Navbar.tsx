'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { QuickContactButton } from './QuickContact';

const links = [
  { href: '#sobre',     label: 'Quem somos' },
  { href: '#materiais', label: 'Materiais' },
  { href: '#projetos',  label: 'Projetos' },
  { href: '#depoimentos', label: 'Depoimentos' },
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
          ? 'bg-white/95 backdrop-blur border-b border-[var(--line)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between">
        <a href="#topo" aria-label="Select Mármores" className="flex items-center">
          <Image
            src="/brand/logo.png"
            alt="Select Mármores"
            width={140}
            height={40}
            priority
            className={scrolled ? 'invert' : 'invert brightness-0'}
            style={{ filter: scrolled ? 'invert(1) brightness(0)' : 'invert(0) brightness(0)' }}
          />
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm text-[var(--ink-soft)]">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-[var(--ink)] transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="/entrar"
            className="text-sm text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
          >
            Entrar
          </a>
          <QuickContactButton
            origem="cta_navbar"
            className="inline-flex btn !py-2.5 !px-5 text-xs"
            title="Pedido de orçamento"
            subtitle="Deixe nome e telefone — abrimos o WhatsApp pra agilizar."
            cta="Quero meu orçamento"
            waMessage="Olá! Vim pelo site da Select Mármores e quero um orçamento."
          >
            Faça um orçamento
          </QuickContactButton>
        </div>

        <button
          aria-label="Menu"
          className="md:hidden p-2 -mr-2 text-[var(--ink)]"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-[var(--line)]">
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
            <a
              href="/entrar"
              onClick={() => setOpen(false)}
              className="py-1 text-[var(--ink-soft)]"
            >
              Entrar
            </a>
            <QuickContactButton
              origem="cta_navbar"
              onClick={() => setOpen(false)}
              className="btn mt-2"
              title="Pedido de orçamento"
              subtitle="Deixe nome e telefone — abrimos o WhatsApp pra agilizar."
              cta="Quero meu orçamento"
              waMessage="Olá! Vim pelo site da Select Mármores e quero um orçamento."
            >
              Faça um orçamento
            </QuickContactButton>
          </div>
        </div>
      )}
    </header>
  );
}
