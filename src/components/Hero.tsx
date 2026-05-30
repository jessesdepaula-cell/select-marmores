'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { QuickContactButton } from './QuickContact';

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const wrap = useRef<HTMLDivElement>(null);

  // Cursor-driven parallax for the 3D panel
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 18, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 80, damping: 18, mass: 0.4 });

  const rotateY    = useTransform(sx, [-1, 1], [-10, 10]);
  const rotateX    = useTransform(sy, [-1, 1], [6, -6]);
  const glareX     = useTransform(sx, [-1, 1], [10, 90]);
  const glareY     = useTransform(sy, [-1, 1], [10, 90]);
  const orbShift   = useTransform(sx, [-1, 1], [-20, 20]);
  const orbShiftR  = useTransform(sx, [-1, 1], [20, -20]);
  const rightRY    = useTransform(sx, [-1, 1], [4, 22]);
  const rightRX    = useTransform(sy, [-1, 1], [-4, 4]);
  const leftRY     = useTransform(sx, [-1, 1], [-22, -4]);
  const leftRX     = useTransform(sy, [-1, 1], [4, -4]);
  const glareBg    = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.55), transparent 60%)`;

  function onMove(e: React.MouseEvent) {
    const r = wrap.current?.getBoundingClientRect();
    if (!r) return;
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    mx.set(x * 2 - 1);
    my.set(y * 2 - 1);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <section
      id="topo"
      ref={wrap}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative min-h-[100svh] flex items-center overflow-hidden isolate bg-[#f6f3ee] pt-24"
    >
      {/* Ambient red & warm blobs */}
      <motion.div
        aria-hidden
        style={{ x: orbShift }}
        className="absolute -top-32 -left-24 w-[55vw] max-w-[680px] aspect-square rounded-full
                   bg-[radial-gradient(circle_at_center,rgba(180,30,30,0.20),rgba(180,30,30,0)_70%)]
                   blur-3xl pointer-events-none -z-10"
      />
      <motion.div
        aria-hidden
        style={{ x: orbShiftR }}
        className="absolute -bottom-40 -right-24 w-[55vw] max-w-[700px] aspect-square rounded-full
                   bg-[radial-gradient(circle_at_center,rgba(120,75,45,0.18),rgba(120,75,45,0)_70%)]
                   blur-3xl pointer-events-none -z-10"
      />

      {/* Grain overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.07] mix-blend-multiply -z-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'><filter id='n'><feTurbulence baseFrequency='0.85' numOctaves='2'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full grid lg:grid-cols-[1.05fr_0.95fr] items-center gap-12 lg:gap-14">
        {/* Text column */}
        <div className="relative z-10 max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="eyebrow"
          >
            Marmoraria · Goiânia
          </motion.span>

          <h1 className="mt-6 font-serif tracking-tight leading-[1.02] text-[clamp(2.6rem,6vw,5.25rem)]">
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.1 }}
              className="block"
            >
              Você seleciona
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.25 }}
              className="block"
            >
              a pedra.
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease, delay: 0.4 }}
              className="block italic font-light accent"
            >
              Entregamos a obra-prima.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.6 }}
            className="mt-7 text-[var(--ink-soft)] text-base sm:text-lg max-w-xl leading-relaxed"
          >
            Mármore, granito, quartzito, ônix e ultracompactos. Curadoria de
            chapas, projeto, corte e instalação — tudo executado pela nossa equipe.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.75 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <QuickContactButton
              origem="cta_hero"
              className="btn"
              title="Pedido de orçamento"
              subtitle="Deixe nome e telefone — abrimos o WhatsApp pra agilizar."
              cta="Quero meu orçamento"
              waMessage="Olá! Vim pelo site da Select Mármores e quero um orçamento."
            >
              Faça um orçamento <ArrowRight size={16} />
            </QuickContactButton>
            <a href="#materiais" className="btn-outline">Ver materiais</a>
          </motion.div>

          {/* Mini KPIs */}
          <motion.dl
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.95 }}
            className="mt-12 grid grid-cols-3 gap-6 max-w-md border-t border-[var(--line)] pt-6"
          >
            <KPI n="+12" l="Anos" />
            <KPI n="+60" l="Pedras" />
            <KPI n="+800" l="Obras" />
          </motion.dl>
        </div>

        {/* 3D Slab column */}
        <div
          className="relative z-10 h-[70vh] max-h-[640px] flex items-center justify-center"
          style={{ perspective: 1400 }}
        >
          {/* Decorative back arc (behind the slab) */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease, delay: 0.4 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-[85%] h-[85%] rounded-full
                       bg-gradient-to-br from-[#b41e1e] via-[#7a1414] to-[#3a0808]
                       blur-2xl opacity-30"
          />

          {/* Floating geometric ring */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0, rotate: -30 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 1.4, ease, delay: 0.6 }}
            className="absolute right-2 top-6 w-40 h-40 sm:w-52 sm:h-52 rounded-full border border-[var(--ink)]/15"
            style={{ borderStyle: 'solid' }}
          />

          {/* Main 3D slab */}
          <motion.div
            initial={{ opacity: 0, y: 60, rotateX: 12, rotateY: -15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
            transition={{ duration: 1.1, ease, delay: 0.55 }}
            style={{
              rotateY,
              rotateX,
              transformStyle: 'preserve-3d',
              boxShadow:
                '0 60px 80px -40px rgba(0,0,0,0.45), 0 30px 60px -30px rgba(180,30,30,0.25)',
            }}
            className="relative w-[78%] max-w-[460px] aspect-[3/4] rounded-t-[55%] overflow-hidden bg-[#1a0606]"
          >
            <Image
              src="/brand/onyx-miele.jpg"
              alt=""
              fill
              priority
              sizes="(max-width: 1024px) 80vw, 460px"
              className="object-cover"
            />
            {/* Inner shadow for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 pointer-events-none" />

            {/* Reactive glare */}
            <motion.div
              aria-hidden
              className="absolute inset-0 pointer-events-none mix-blend-soft-light"
              style={{ background: glareBg }}
            />

            {/* Bottom label */}
            <div className="absolute bottom-5 left-5 right-5 text-white/90">
              <div className="text-[10px] tracking-[0.35em] uppercase opacity-70">
                Estoque
              </div>
              <div className="font-serif text-xl mt-1">Ônix Mel · destaque</div>
            </div>

            {/* Top-edge highlight to suggest 3D bevel */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-white/40" />
          </motion.div>

          {/* Floating accent slab (front-right) */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: 30, rotateY: -20 }}
            animate={{ opacity: 1, x: 0, y: 0, rotateY: 0 }}
            transition={{ duration: 1.1, ease, delay: 0.85 }}
            style={{
              rotateY: rightRY,
              rotateX: rightRX,
              transformStyle: 'preserve-3d',
              boxShadow: '0 40px 60px -30px rgba(0,0,0,.4)',
            }}
            className="absolute -right-4 sm:-right-2 bottom-4 w-[36%] max-w-[170px] aspect-[3/5] rounded-t-[55%] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#e9cfb5] via-[#c79574] to-[#5b2f1f]" />
            <div
              className="absolute inset-0 opacity-50 mix-blend-overlay"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 700'><filter id='n'><feTurbulence baseFrequency='0.6' numOctaves='2' seed='3'/><feColorMatrix values='0 0 0 0 0.6 0 0 0 0 0.3 0 0 0 0 0.2 0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
              }}
            />
            <div className="absolute top-0 inset-x-0 h-[1px] bg-white/40" />
            <div className="absolute inset-x-0 bottom-0 p-3 text-white">
              <div className="text-[8px] tracking-[0.3em] uppercase opacity-80">Coleção</div>
              <div className="font-serif text-sm">Travertino</div>
            </div>
          </motion.div>

          {/* Floating accent slab (back-left) */}
          <motion.div
            initial={{ opacity: 0, x: -40, y: 20, rotateY: 20 }}
            animate={{ opacity: 1, x: 0, y: 0, rotateY: 0 }}
            transition={{ duration: 1.1, ease, delay: 1.0 }}
            style={{
              rotateY: leftRY,
              rotateX: leftRX,
              transformStyle: 'preserve-3d',
              boxShadow: '0 40px 60px -30px rgba(0,0,0,.45)',
            }}
            className="absolute -left-3 sm:-left-1 top-8 w-[32%] max-w-[150px] aspect-[2/3] rounded-t-[55%] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#2b0808] via-[#7a1414] to-[#1a0303]" />
            <div
              className="absolute inset-0 opacity-55 mix-blend-overlay"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 600'><filter id='n'><feTurbulence baseFrequency='0.55' numOctaves='2' seed='8'/><feColorMatrix values='0 0 0 0 0.95 0 0 0 0 0.85 0 0 0 0 0.85 0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'linear-gradient(115deg, transparent 30%, rgba(255,220,220,.22) 33%, transparent 36%, transparent 65%, rgba(255,220,220,.15) 67%, transparent 70%)',
              }}
            />
            <div className="absolute top-0 inset-x-0 h-[1px] bg-white/40" />
            <div className="absolute inset-x-0 bottom-0 p-3 text-white">
              <div className="text-[8px] tracking-[0.3em] uppercase opacity-80">Coleção</div>
              <div className="font-serif text-sm">Mármore Borgonha</div>
            </div>
          </motion.div>

          {/* Floor reflection */}
          <div
            aria-hidden
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[70%] h-8 rounded-full
                       bg-black/25 blur-2xl"
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-[var(--muted)]"
      >
        <span>Role para descobrir</span>
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-block w-px h-6 bg-[var(--ink)]/30"
        />
      </motion.div>
    </section>
  );
}

function KPI({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="font-serif text-2xl accent">{n}</div>
      <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--muted)] mt-1">{l}</div>
    </div>
  );
}
