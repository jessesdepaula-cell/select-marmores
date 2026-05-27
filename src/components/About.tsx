export default function About() {
  return (
    <section id="sobre" className="py-24 sm:py-32 bg-[var(--bg)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 text-center">
        <span className="eyebrow">Quem somos</span>
        <h2 className="mt-5 font-serif text-3xl sm:text-5xl leading-tight max-w-3xl mx-auto">
          A virada de chave entre o
          <span className="italic accent"> projeto e a obra-prima.</span>
        </h2>
        <p className="mt-8 text-[var(--ink-soft)] leading-relaxed text-lg max-w-3xl mx-auto">
          Somos uma marmoraria que se comporta como um ateliê. Cada chapa é
          escolhida com você, cada recorte é projetado em planta, cada peça é
          instalada pela nossa equipe — sem terceirização, sem surpresa em obra.
        </p>
        <p className="mt-4 text-[var(--ink-soft)] leading-relaxed max-w-2xl mx-auto">
          Atendemos arquitetos, designers e proprietários em Goiânia, Aparecida
          de Goiânia, Anápolis, Brasília e todo o Centro-Oeste.
        </p>

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--line)] border border-[var(--line)] max-w-4xl mx-auto">
          <Stat n="+12" label="Anos de obra" />
          <Stat n="+60" label="Pedras em estoque" />
          <Stat n="+800" label="Projetos entregues" />
          <Stat n="100%" label="Instalação própria" />
        </div>
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
