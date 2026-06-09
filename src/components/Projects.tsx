'use client';

import { motion } from 'framer-motion';
import { Reveal } from './Reveal';
import { QuickContactButton } from './QuickContact';

const projects = [
  { tag: 'Cozinha gourmet',   title: 'Ilha monolítica em quartzito Mont Blanc',  city: 'Goiânia · GO',     tone: 'from-[#f1ece1] to-[#a89878]', image: '/projects/project_mont_blanc.png' },
  { tag: 'Cozinha',           title: 'Bancada e testeira em Calacatta',          city: 'Brasília · DF',    tone: 'from-[#ece6db] to-[#8c7a5a]', image: '/projects/project_calacatta.jpg' },
  { tag: 'Banheiro master',   title: 'Revestimento contínuo em Taj Mahal',       city: 'Goiânia · GO',     tone: 'from-[#eef0ec] to-[#a4b0a6]', image: '/projects/project_taj_mahal.jpg' },
  { tag: 'Lareira',           title: 'Volume escultural em Ônix retroiluminado', city: 'Anápolis · GO',    tone: 'from-[#3a2616] to-[#1a0f06]', image: '/projects/project_onix.jpg' },
  { tag: 'Hall comercial',    title: 'Piso paginado em Travertino Romano',       city: 'Caldas Novas · GO', tone: 'from-[#ead9ba] to-[#a0825b]', image: '/projects/project_travertino.jpg' },
  { tag: 'Spa & piscina',     title: 'Borda em quartzito Patagonia escovado',    city: 'Pirenópolis · GO', tone: 'from-[#e2e7e8] to-[#7c8e94]', image: '/projects/project_patagonia.jpg' },
  { tag: 'Banheiro',          title: 'Lavatório esculpido em Mármore Branco Siena', city: 'Goiânia · GO', tone: 'from-[#f1ead7] to-[#a99a78]', image: '/projects/project_siena.jpg' },
  { tag: 'Fachada',           title: 'Revestimento ventilado em Dekton',         city: 'Brasília · DF',    tone: 'from-[#373735] to-[#15151a]', image: '/projects/project_dekton.jpg' },
];

export default function Projects() {
  return (
    <section id="projetos" className="py-24 sm:py-32 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center">
          <Reveal><span className="eyebrow">Projetos</span></Reveal>
          <Reveal delay={1}>
            <h2 className="mt-5 font-serif text-3xl sm:text-5xl leading-tight max-w-3xl mx-auto">
              Obras que transformam
              <span className="italic accent"> ambientes.</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {projects.map((p, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className={`group relative overflow-hidden aspect-[4/5] stone-base bg-gradient-to-br ${p.tone}`}
            >
              {p.image && (
                <img
                  src={p.image}
                  alt={p.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white z-20">
                <span className="text-[10px] tracking-[0.3em] uppercase text-white/80">{p.tag}</span>
                <h3 className="mt-1.5 font-serif text-lg leading-snug">{p.title}</h3>
                <p className="mt-1 text-xs text-white/70">{p.city}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <Reveal delay={2}>
          <div className="mt-14 text-center">
            <QuickContactButton
              origem="cta_projetos"
              className="btn-outline"
              title="Quero um projeto assim"
              subtitle="Conta seu nome e telefone — abrimos o WhatsApp com nosso time."
              cta="Falar com um especialista"
              waMessage="Olá! Vi os projetos no site da Select Mármores e quero fazer algo parecido."
            >
              Quero um projeto assim
            </QuickContactButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
