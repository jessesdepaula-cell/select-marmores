const groups = [
  {
    name: 'Mármores',
    color: 'from-[#f5efe3] to-[#e6dac4]',
    items: ['Carrara', 'Calacatta', 'Estatuário', 'Travertino', 'Crema Marfil', 'Emperador'],
  },
  {
    name: 'Granitos',
    color: 'from-[#3a342f] to-[#1b1815]',
    dark: true,
    items: ['Preto São Gabriel', 'Verde Ubatuba', 'Branco Itaúnas', 'Vermelho Capão Bonito'],
  },
  {
    name: 'Quartzitos',
    color: 'from-[#eef1ee] to-[#c8d3d0]',
    items: ['Taj Mahal', 'Mont Blanc', 'Patagonia', 'Azul Macaúbas', 'Iceberg'],
  },
  {
    name: 'Ônix & Exóticas',
    color: 'from-[#f0e7d8] to-[#c9a87a]',
    items: ['Ônix Mel', 'Ônix Verde', 'Ônix Branco', 'Sodalita Azul'],
  },
  {
    name: 'Ultracompactos',
    color: 'from-[#e8e4dd] to-[#b8b1a4]',
    items: ['Dekton®', 'Neolith®', 'Silestone®', 'Lâminas porcelânicas'],
  },
  {
    name: 'Quartzo',
    color: 'from-[#f6f4ef] to-[#d6cdb8]',
    items: ['Branco absoluto', 'Cinza concreto', 'Calacatta sintético'],
  },
];

export default function Materials() {
  return (
    <section id="materiais" className="py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col items-center text-center">
          <span className="gold-divider">Materiais</span>
          <h2 className="mt-5 font-serif text-3xl sm:text-4xl leading-tight max-w-2xl">
            Mais de 60 pedras nobres
            <span className="italic"> para a sua obra.</span>
          </h2>
          <p className="mt-5 text-[var(--ink-soft)] max-w-xl">
            Nossa curadoria reúne clássicos italianos, exóticos brasileiros e os
            ultracompactos de última geração. Tudo pronto para ser visto pessoalmente.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {groups.map((g) => (
            <div
              key={g.name}
              className="group relative overflow-hidden border border-[var(--line)] aspect-[4/5]"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${g.color}`} />
              <div className="absolute inset-0 opacity-[0.25] mix-blend-overlay"
                   style={{
                     backgroundImage:
                       "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2'/><feColorMatrix values='0 0 0 0 0.1 0 0 0 0 0.08 0 0 0 0 0.06 0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
                   }}
              />
              <div className={`relative h-full flex flex-col justify-between p-6 ${g.dark ? 'text-[#f6ecd9]' : 'text-[var(--ink)]'}`}>
                <div>
                  <span className={`text-[10px] tracking-[0.25em] uppercase ${g.dark ? 'text-[#d6c4a3]' : 'text-[var(--gold-deep)]'}`}>
                    Coleção
                  </span>
                  <h3 className="mt-2 font-serif text-2xl">{g.name}</h3>
                </div>
                <ul className="space-y-1 text-sm">
                  {g.items.map((i) => (
                    <li key={i} className={g.dark ? 'text-[#e8dcc1]' : 'text-[var(--ink-soft)]'}>· {i}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="#contato" className="btn-ghost">Quero ver pessoalmente</a>
        </div>
      </div>
    </section>
  );
}
