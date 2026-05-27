import { Compass, Hammer, ShieldCheck, Sparkles } from 'lucide-react';

const pillars = [
  {
    icon: Compass,
    title: 'Curadoria de pedras',
    desc: 'Visitamos os depósitos com você. Você marca a chapa exata que vai entrar na sua obra.',
  },
  {
    icon: Hammer,
    title: 'Corte de precisão',
    desc: 'CNC e bancada artesanal em diálogo: encaixes milimétricos, frisos retos, recortes limpos.',
  },
  {
    icon: ShieldCheck,
    title: 'Instalação cuidadosa',
    desc: 'Equipe própria, sem terceirização. Acompanhamento da medição à última junta de rejunte.',
  },
  {
    icon: Sparkles,
    title: 'Acabamento de autor',
    desc: 'Polimento, levigado, escovado, flameado — cada superfície fica como o projeto pediu.',
  },
];

export default function About() {
  return (
    <section id="sobre" className="py-24 bg-[var(--bg-soft)]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-start">
          <div className="lg:sticky lg:top-28">
            <span className="gold-divider">Quem somos</span>
            <h2 className="mt-5 font-serif text-3xl sm:text-4xl leading-tight">
              Uma marmoraria que se comporta
              <span className="italic"> como um ateliê.</span>
            </h2>
            <p className="mt-6 text-[var(--ink-soft)] leading-relaxed">
              Atendemos arquitetos, designers e proprietários que enxergam a
              pedra como elemento de projeto — não como acabamento de catálogo.
              Nosso compromisso é com a escolha certa: o veio, o tom, a
              espessura, o casamento entre as peças.
            </p>
            <p className="mt-4 text-[var(--ink-soft)] leading-relaxed">
              Atuamos em Goiânia, Aparecida de Goiânia e cidades vizinhas, com
              entregas pontuais para todo o Centro-Oeste.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="bg-[var(--bg)] border border-[var(--line)] p-6 hover:border-[var(--gold)] transition-colors"
              >
                <p.icon size={22} className="text-[var(--gold-deep)]" />
                <h3 className="mt-4 font-serif text-xl">{p.title}</h3>
                <p className="mt-2 text-sm text-[var(--ink-soft)] leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
