const projects = [
  { tag: 'Residencial', title: 'Bancada monolítica em quartzito Mont Blanc', city: 'Goiânia · GO', tone: 'from-[#f1ece1] to-[#d8cdb5]' },
  { tag: 'Cozinha gourmet', title: 'Ilha de Calacatta com testeira esculpida', city: 'Brasília · DF', tone: 'from-[#ece6db] to-[#a7967a]' },
  { tag: 'Banheiro master', title: 'Revestimento contínuo em Taj Mahal', city: 'Goiânia · GO', tone: 'from-[#eef0ec] to-[#bcc4b8]' },
  { tag: 'Lareira', title: 'Volume escultural em Ônix retroiluminado', city: 'Anápolis · GO', tone: 'from-[#f3e6cc] to-[#b48a3f]' },
  { tag: 'Hall comercial', title: 'Piso paginado em Travertino romano', city: 'Caldas Novas · GO', tone: 'from-[#f0e6d2] to-[#c9b489]' },
  { tag: 'Spa & piscina', title: 'Borda em quartzito Patagonia escovado', city: 'Pirenópolis · GO', tone: 'from-[#e8edee] to-[#9eb2b6]' },
];

export default function Projects() {
  return (
    <section id="projetos" className="py-24 bg-[var(--bg-soft)]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <span className="gold-divider">Projetos</span>
            <h2 className="mt-5 font-serif text-3xl sm:text-4xl leading-tight max-w-xl">
              Obras recentes que assinamos
              <span className="italic"> com orgulho.</span>
            </h2>
          </div>
          <a href="#contato" className="btn-ghost shrink-0">Quero algo assim</a>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <article
              key={i}
              className="group relative overflow-hidden border border-[var(--line)] aspect-[4/5] bg-[var(--bg)]"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${p.tone}`} />
              <div
                className="absolute inset-0 opacity-25 mix-blend-overlay"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 700'><filter id='n'><feTurbulence baseFrequency='0.75' numOctaves='3'/><feColorMatrix values='0 0 0 0 0.6 0 0 0 0 0.45 0 0 0 0 0.25 0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/55 via-black/15 to-transparent text-white">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#e9d4a8]">
                  {p.tag}
                </span>
                <h3 className="mt-1 font-serif text-lg leading-snug">{p.title}</h3>
                <p className="mt-1 text-xs text-white/75">{p.city}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
