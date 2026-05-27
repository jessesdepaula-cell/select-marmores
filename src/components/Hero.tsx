import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="topo" className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 marble-bg overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 800'><filter id='n'><feTurbulence baseFrequency='0.7' numOctaves='2' seed='3'/><feColorMatrix values='0 0 0 0 0.69 0 0 0 0 0.55 0 0 0 0 0.34 0 0 0 0.4 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
        <div>
          <span className="gold-divider">Marmoraria de autor · Goiânia</span>
          <h1 className="mt-6 font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
            Cada pedra escolhida
            <span className="block italic text-[var(--gold-deep)]">a quatro mãos.</span>
          </h1>
          <p className="mt-6 text-lg text-[var(--ink-soft)] max-w-xl leading-relaxed">
            Selecionamos chapas de mármore, granito, quartzito e ultracompactos,
            projetamos os recortes e entregamos a obra instalada — com o veio na
            posição certa e o acabamento que sua arquitetura merece.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contato" className="btn-gold">
              Solicitar orçamento <ArrowRight size={18} />
            </a>
            <a href="#materiais" className="btn-ghost">
              Ver materiais
            </a>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-6 max-w-md">
            <div>
              <dt className="text-3xl font-serif text-[var(--ink)]">+12</dt>
              <dd className="text-xs uppercase tracking-wider text-[var(--muted)] mt-1">
                Anos de obra
              </dd>
            </div>
            <div>
              <dt className="text-3xl font-serif text-[var(--ink)]">+60</dt>
              <dd className="text-xs uppercase tracking-wider text-[var(--muted)] mt-1">
                Pedras em estoque
              </dd>
            </div>
            <div>
              <dt className="text-3xl font-serif text-[var(--ink)]">+800</dt>
              <dd className="text-xs uppercase tracking-wider text-[var(--muted)] mt-1">
                Projetos entregues
              </dd>
            </div>
          </dl>
        </div>

        <div className="relative">
          <div className="aspect-[4/5] veined shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)]">
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <div className="bg-[var(--bg)]/85 backdrop-blur-sm border border-[var(--line)] p-5">
                <span className="gold-divider !text-[10px]">Selo da casa</span>
                <p className="mt-3 font-serif text-xl leading-snug">
                  &ldquo;A pedra certa transforma um cômodo em peça de arquitetura.&rdquo;
                </p>
                <p className="mt-2 text-sm text-[var(--muted)]">— Equipe Select</p>
              </div>
            </div>
          </div>
          <div className="hidden lg:block absolute -bottom-8 -left-8 w-40 h-40 veined border border-[var(--line)]" />
        </div>
      </div>
    </section>
  );
}
