import Image from 'next/image';

export default function Hero() {
  return (
    <section id="topo" className="relative min-h-[100svh] flex items-center text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/brand/onyx-miele.jpg"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
      </div>

      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-32 text-center">
        <span className="eyebrow !text-white/80">Marmoraria · Goiânia</span>
        <h1 className="mt-6 font-serif text-4xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
          Você seleciona a pedra.
          <span className="block italic font-light">Entregamos a obra-prima.</span>
        </h1>
        <p className="mt-8 text-base sm:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
          Mármore, granito, quartzito, ônix e ultracompactos. Curadoria de chapas,
          projeto, corte e instalação — tudo executado pela nossa equipe.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a href="#contato" className="btn-light">Faça um orçamento</a>
          <a href="#materiais" className="btn-outline !border-white !text-white hover:!bg-white hover:!text-[var(--ink)]">Ver materiais</a>
        </div>
      </div>

      {/* Bottom indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-xs uppercase tracking-[0.3em]">
        Role para descobrir
      </div>
    </section>
  );
}
