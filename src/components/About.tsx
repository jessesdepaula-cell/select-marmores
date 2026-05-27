'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Reveal } from './Reveal';

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const yShape = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const rotShape = useTransform(scrollYProgress, [0, 1], [-12, 12]);

  return (
    <section id="sobre" ref={ref} className="relative py-24 sm:py-32 bg-[var(--bg)] overflow-hidden">
      {/* Floating decorative shapes */}
      <motion.div
        aria-hidden
        style={{ y: yShape, rotate: rotShape }}
        className="absolute -left-24 top-12 w-72 h-72 rounded-full
                   bg-[radial-gradient(circle_at_30%_30%,rgba(180,30,30,0.12),rgba(180,30,30,0)_70%)] blur-2xl"
      />
      <motion.div
        aria-hidden
        style={{ y: useTransform(yShape, (v) => -v) }}
        className="absolute -right-32 bottom-0 w-96 h-96 rounded-full
                   bg-[radial-gradient(circle_at_70%_70%,rgba(120,75,45,0.12),rgba(120,75,45,0)_70%)] blur-3xl"
      />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 text-center">
        <Reveal>
          <span className="eyebrow">Quem somos</span>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="mt-5 font-serif text-3xl sm:text-5xl leading-tight max-w-3xl mx-auto">
            A virada de chave entre o
            <span className="italic accent"> projeto e a obra-prima.</span>
          </h2>
        </Reveal>
        <Reveal delay={2}>
          <p className="mt-8 text-[var(--ink-soft)] leading-relaxed text-lg max-w-3xl mx-auto">
            Somos uma marmoraria que se comporta como um ateliê. Cada chapa é
            escolhida com você, cada recorte é projetado em planta, cada peça é
            instalada pela nossa equipe — sem terceirização, sem surpresa em obra.
          </p>
        </Reveal>
        <Reveal delay={3}>
          <p className="mt-4 text-[var(--ink-soft)] leading-relaxed max-w-2xl mx-auto">
            Atendemos arquitetos, designers e proprietários em Goiânia, Aparecida
            de Goiânia, Anápolis, Brasília e todo o Centro-Oeste.
          </p>
        </Reveal>

        <Reveal delay={4}>
          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--line)] border border-[var(--line)] max-w-4xl mx-auto">
            <Stat n="+12" label="Anos de obra" />
            <Stat n="+60" label="Pedras em estoque" />
            <Stat n="+800" label="Projetos entregues" />
            <Stat n="100%" label="Instalação própria" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="bg-white py-8 px-4">
      <div className="font-serif text-3xl sm:text-4xl accent">{n}</div>
      <div className="mt-2 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">{label}</div>
    </div>
  );
}
