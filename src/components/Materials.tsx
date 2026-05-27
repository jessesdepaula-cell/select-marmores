'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from './Reveal';

type Stone = { name: string; tone: string };
type Category = { id: string; label: string; items: Stone[] };

const categories: Category[] = [
  {
    id: 'marmore',
    label: 'Mármore',
    items: [
      { name: 'Carrara', tone: 'from-[#f6f3ec] to-[#cfc8b8]' },
      { name: 'Calacatta', tone: 'from-[#f3ede2] to-[#a89878]' },
      { name: 'Estatuário', tone: 'from-[#f4f1ea] to-[#c0b6a0]' },
      { name: 'Crema Marfil', tone: 'from-[#f1e8d3] to-[#c2a878]' },
      { name: 'Emperador', tone: 'from-[#6b4d33] to-[#3d2a1c]' },
      { name: 'Travertino Romano', tone: 'from-[#ede1cb] to-[#b2956b]' },
      { name: 'Pighês', tone: 'from-[#ecebe6] to-[#b8b3a4]' },
      { name: 'Botticino', tone: 'from-[#f1ead7] to-[#b59e6e]' },
    ],
  },
  {
    id: 'granito',
    label: 'Granito',
    items: [
      { name: 'Preto São Gabriel', tone: 'from-[#2c2823] to-[#0d0c0a]' },
      { name: 'Branco Itaúnas',   tone: 'from-[#e8e6df] to-[#a8a59a]' },
      { name: 'Verde Ubatuba',    tone: 'from-[#1d2920] to-[#0a120c]' },
      { name: 'Vermelho Capão',   tone: 'from-[#5b1a18] to-[#2a0a09]' },
      { name: 'Amarelo Ornamental', tone: 'from-[#d2a463] to-[#7a5a1f]' },
      { name: 'Branco Siena',     tone: 'from-[#eee9dc] to-[#aea486]' },
      { name: 'Azul Bahia',       tone: 'from-[#1a3f6b] to-[#0b1e36]' },
      { name: 'Marrom Imperial',  tone: 'from-[#4a2f1a] to-[#1f120a]' },
    ],
  },
  {
    id: 'quartzito',
    label: 'Quartzito',
    items: [
      { name: 'Taj Mahal',       tone: 'from-[#f3eee0] to-[#bdae87]' },
      { name: 'Mont Blanc',      tone: 'from-[#f4f3ee] to-[#b8b4a5]' },
      { name: 'Patagonia',       tone: 'from-[#e2dfd6] to-[#7c736a]' },
      { name: 'Azul Macaúbas',   tone: 'from-[#2c4d6a] to-[#13283c]' },
      { name: 'Iceberg',         tone: 'from-[#eaeef0] to-[#9ab0b8]' },
      { name: 'Mediterrâneo',    tone: 'from-[#dfe6e8] to-[#7d8d92]' },
      { name: 'Sahara',          tone: 'from-[#ead9ba] to-[#a0825b]' },
      { name: 'Cristallo',       tone: 'from-[#f1ede4] to-[#bdae95]' },
    ],
  },
  {
    id: 'onix',
    label: 'Ônix',
    items: [
      { name: 'Ônix Mel',     tone: 'from-[#e8c982] to-[#6b3f0e]' },
      { name: 'Ônix Verde',   tone: 'from-[#7c8f5a] to-[#2d3a18]' },
      { name: 'Ônix Branco',  tone: 'from-[#f3ecd9] to-[#b7a877]' },
      { name: 'Ônix Lemon',   tone: 'from-[#f3e69b] to-[#a78318]' },
      { name: 'Verde Guatemala', tone: 'from-[#2a4631] to-[#0e1c14]' },
      { name: 'Sodalita Azul',   tone: 'from-[#1f3e6e] to-[#0a1830]' },
    ],
  },
  {
    id: 'quartzo',
    label: 'Quartzo',
    items: [
      { name: 'Branco Absoluto', tone: 'from-[#f7f6f1] to-[#cfcdc4]' },
      { name: 'Cinza Concreto',  tone: 'from-[#bcbab5] to-[#6f6e6a]' },
      { name: 'Calacatta Quartzo', tone: 'from-[#f3eee2] to-[#aea08b]' },
      { name: 'Silestone Eternal', tone: 'from-[#efece4] to-[#a89e8b]' },
      { name: 'Bianco Crystal',    tone: 'from-[#f4f3ee] to-[#cac6b8]' },
      { name: 'Negro Tebas',       tone: 'from-[#22201d] to-[#0b0a09]' },
    ],
  },
  {
    id: 'ultracompacto',
    label: 'Lâmina Ultracompacta',
    items: [
      { name: 'Dekton® Aura',    tone: 'from-[#f4f1ea] to-[#bdb6a4]' },
      { name: 'Dekton® Kelya',   tone: 'from-[#41403d] to-[#1a1a18]' },
      { name: 'Neolith® Calacatta', tone: 'from-[#f3eee3] to-[#b4a78a]' },
      { name: 'Neolith® Iron Moss', tone: 'from-[#3b3d35] to-[#181a15]' },
      { name: 'Porcelânico Sahara', tone: 'from-[#eadab5] to-[#9f7c3e]' },
      { name: 'Porcelânico Concreto', tone: 'from-[#c1bfb9] to-[#74716b]' },
    ],
  },
];

export default function Materials() {
  const [active, setActive] = useState(categories[0].id);
  const current = categories.find((c) => c.id === active)!;

  return (
    <section id="materiais" className="py-24 sm:py-32 bg-[var(--bg-soft)]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center">
          <Reveal>
            <span className="eyebrow">Materiais</span>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-5 font-serif text-3xl sm:text-5xl leading-tight max-w-3xl mx-auto">
              Mais de 60 pedras nobres
              <span className="italic accent"> para a sua obra.</span>
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-6 text-[var(--ink-soft)] max-w-xl mx-auto">
              Clássicos italianos, exóticos brasileiros e ultracompactos de última
              geração — todos prontos para serem vistos pessoalmente.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`text-xs uppercase tracking-[0.2em] px-5 py-2.5 border transition-colors ${
                active === c.id
                  ? 'bg-[var(--red)] text-white border-[var(--red)]'
                  : 'bg-white text-[var(--ink-soft)] border-[var(--line)] hover:border-[var(--red)] hover:text-[var(--red)]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {current.items.map((s, i) => (
              <motion.figure
                key={s.name}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className={`group relative aspect-square overflow-hidden border border-[var(--line)] stone-base bg-gradient-to-br ${s.tone} transition-shadow hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.35)]`}
              >
                <figcaption className="absolute inset-x-0 bottom-0 bg-white py-3 px-4 border-t border-[var(--line)]">
                  <span className="text-sm font-medium text-[var(--ink)]">{s.name}</span>
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
        </AnimatePresence>

        <p className="mt-10 text-center text-sm text-[var(--muted)]">
          E muito mais. Acima são apenas alguns destaques da nossa curadoria.
        </p>
      </div>
    </section>
  );
}
