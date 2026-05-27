const steps = [
  { n: '01', title: 'Conversa inicial', desc: 'Entendemos o projeto, ambientes, prazo e referências estéticas.' },
  { n: '02', title: 'Seleção da pedra', desc: 'Visita ao depósito para marcar a chapa exata que vai entrar na sua obra.' },
  { n: '03', title: 'Projeto técnico', desc: 'Mapeamos os recortes, encaixes e direção do veio em planta executiva.' },
  { n: '04', title: 'Medição em obra', desc: 'Conferimos no local com tecnologia laser para garantir milímetros.' },
  { n: '05', title: 'Corte e acabamento', desc: 'Bancada e CNC trabalhando juntos: precisão sem perder o feito à mão.' },
  { n: '06', title: 'Instalação', desc: 'Equipe própria entrega tudo nivelado, vedado e pronto para uso.' },
];

export default function Process() {
  return (
    <section id="processo" className="py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col items-center text-center">
          <span className="gold-divider">Como trabalhamos</span>
          <h2 className="mt-5 font-serif text-3xl sm:text-4xl leading-tight max-w-2xl">
            Seis etapas para entregar
            <span className="italic"> a obra completa.</span>
          </h2>
        </div>

        <ol className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--line)] border border-[var(--line)]">
          {steps.map((s) => (
            <li key={s.n} className="bg-[var(--bg)] p-7">
              <div className="font-serif text-3xl text-[var(--gold-deep)]">{s.n}</div>
              <h3 className="mt-3 font-serif text-xl">{s.title}</h3>
              <p className="mt-2 text-sm text-[var(--ink-soft)] leading-relaxed">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
