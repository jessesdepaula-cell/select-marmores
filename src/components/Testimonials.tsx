'use client';

import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const items = [
  {
    name: 'Camila A.',
    role: 'Arquiteta · Goiânia',
    quote:
      'Atendimento sob medida do início ao fim. Visitamos o depósito, marcamos a chapa, acompanhamos o corte. A obra ficou exatamente como o projeto previa.',
  },
  {
    name: 'Rafael M.',
    role: 'Proprietário · Brasília',
    quote:
      'Equipe técnica, paciente, profissional. Indicaram a melhor pedra para a função sem empurrar o que sobrava em estoque. Instalação impecável.',
  },
  {
    name: 'Letícia & Bruno',
    role: 'Casa em Aparecida de Goiânia',
    quote:
      'A bancada da cozinha virou o ponto alto da reforma. O veio do quartzito foi posicionado como tínhamos sonhado — todo mundo que entra na casa repara.',
  },
  {
    name: 'Estúdio Linha',
    role: 'Escritório de design',
    quote:
      'Parceria contínua há três anos. Sempre que precisamos de uma pedra fora do comum, a Select acha. E o nível de acabamento sustenta nosso padrão de entrega.',
  },
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  const t = items[i];
  const prev = () => setI((v) => (v - 1 + items.length) % items.length);
  const next = () => setI((v) => (v + 1) % items.length);

  return (
    <section id="depoimentos" className="py-24 sm:py-32 bg-[var(--bg-soft)]">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
        <span className="eyebrow">Depoimentos</span>
        <h2 className="mt-5 font-serif text-3xl sm:text-5xl leading-tight">
          Quem confiou
          <span className="italic accent"> conta.</span>
        </h2>

        <div className="mt-14 relative">
          <div className="flex justify-center mb-6">
            {Array.from({ length: 5 }).map((_, k) => (
              <Star key={k} size={18} fill="var(--red)" stroke="var(--red)" />
            ))}
          </div>
          <blockquote className="font-serif text-xl sm:text-2xl leading-relaxed text-[var(--ink)] max-w-3xl mx-auto">
            “{t.quote}”
          </blockquote>
          <div className="mt-8">
            <div className="font-medium">{t.name}</div>
            <div className="text-sm text-[var(--muted)] mt-1">{t.role}</div>
          </div>

          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              aria-label="Anterior"
              className="w-10 h-10 border border-[var(--line)] hover:bg-[var(--red)] hover:text-white hover:border-[var(--red)] transition-colors flex items-center justify-center"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-1.5">
              {items.map((_, k) => (
                <button
                  key={k}
                  onClick={() => setI(k)}
                  aria-label={`Depoimento ${k + 1}`}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    k === i ? 'bg-[var(--red)]' : 'bg-[var(--line)]'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Próximo"
              className="w-10 h-10 border border-[var(--line)] hover:bg-[var(--red)] hover:text-white hover:border-[var(--red)] transition-colors flex items-center justify-center"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
