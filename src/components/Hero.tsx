import Image from 'next/image';

export default function Hero() {
  return (
    <section
      id="topo"
      className="relative min-h-[100svh] flex flex-col justify-end pt-24 pb-12 bg-[#f4f1ec] overflow-hidden isolate"
    >
      {/* Decorative arch composition */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
        <div className="relative w-full max-w-6xl h-[78%] flex items-end justify-center gap-3 sm:gap-5 px-5 sm:px-8">

          {/* Left arch — burgundy marble */}
          <div className="hidden sm:block relative w-[22%] aspect-[2/5] rounded-t-full overflow-hidden shadow-[0_30px_60px_-30px_rgba(0,0,0,.4)]">
            <div className="absolute inset-0 bg-gradient-to-b from-[#3a0d0d] via-[#7a1e1e] to-[#2a0808]" />
            <div
              className="absolute inset-0 opacity-50 mix-blend-overlay"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 1000'><filter id='n'><feTurbulence baseFrequency='0.7' numOctaves='2' seed='4'/><feColorMatrix values='0 0 0 0 0.95 0 0 0 0 0.9 0 0 0 0 0.9 0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(115deg, transparent 30%, rgba(255,220,220,.18) 33%, transparent 35%, transparent 60%, rgba(255,220,220,.15) 62%, transparent 64%)",
              }}
            />
          </div>

          {/* Center arch — main, taller, with user's onyx photo */}
          <div className="relative w-[56%] sm:w-[44%] aspect-[3/5] rounded-t-full overflow-hidden shadow-[0_40px_80px_-30px_rgba(0,0,0,.45)]">
            <Image
              src="/brand/onyx-miele.jpg"
              alt=""
              fill
              priority
              sizes="(max-width: 640px) 60vw, 600px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#3a0d0d]/30 via-transparent to-[#1a0606]/70" />
          </div>

          {/* Right arch — lighter rose marble */}
          <div className="hidden sm:block relative w-[22%] aspect-[2/5] rounded-t-full overflow-hidden shadow-[0_30px_60px_-30px_rgba(0,0,0,.4)]">
            <div className="absolute inset-0 bg-gradient-to-b from-[#e8d4c9] via-[#c7a193] to-[#7a4a40]" />
            <div
              className="absolute inset-0 opacity-45 mix-blend-overlay"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 1000'><filter id='n'><feTurbulence baseFrequency='0.65' numOctaves='2' seed='9'/><feColorMatrix values='0 0 0 0 0.4 0 0 0 0 0.2 0 0 0 0 0.2 0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(105deg, transparent 40%, rgba(255,255,255,.25) 43%, transparent 46%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Headline overlay (over the central arch, near bottom) */}
      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 w-full">
        <div className="text-center mt-auto">
          <span className="eyebrow">Marmoraria · Goiânia</span>
          <h1 className="mt-5 font-serif text-[2.6rem] sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-[var(--ink)]">
            Você seleciona a pedra.
            <span className="block italic font-light accent">
              Entregamos a obra-prima.
            </span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-[var(--ink-soft)] max-w-2xl mx-auto leading-relaxed">
            Mármore, granito, quartzito, ônix e ultracompactos. Curadoria de chapas,
            projeto, corte e instalação — tudo executado pela nossa equipe.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="#contato" className="btn">Faça um orçamento</a>
            <a href="#materiais" className="btn-outline">Ver materiais</a>
          </div>
        </div>
      </div>

      {/* Soft top fade so navbar reads */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#f4f1ec] to-transparent pointer-events-none" />
    </section>
  );
}
