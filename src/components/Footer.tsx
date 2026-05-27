import { AtSign, MapPin, Phone, Mail } from 'lucide-react';

const WHATSAPP_DISPLAY = process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY ?? '(62) 9465-0630';

export default function Footer() {
  return (
    <footer className="bg-[#0f0d0b] text-[#cfc3a8] py-14">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 font-serif text-xl">
            <span className="inline-block w-2.5 h-2.5 rotate-45 bg-[var(--gold)]" />
            <span>SELECT MÁRMORES</span>
          </div>
          <p className="mt-4 text-sm text-[#a89c80] max-w-xs leading-relaxed">
            Marmoraria de autor. Pedras nobres, projeto, corte e instalação — do
            risco do arquiteto à última junta da obra.
          </p>
        </div>

        <div>
          <h4 className="font-serif text-base text-[#e8dcc1]">Navegar</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="#sobre" className="hover:text-white">Sobre</a></li>
            <li><a href="#materiais" className="hover:text-white">Materiais</a></li>
            <li><a href="#projetos" className="hover:text-white">Projetos</a></li>
            <li><a href="#processo" className="hover:text-white">Processo</a></li>
            <li><a href="#contato" className="hover:text-white">Contato</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-base text-[#e8dcc1]">Contato</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <Phone size={15} className="mt-0.5 text-[var(--gold)]" />
              <span>WhatsApp · {WHATSAPP_DISPLAY}</span>
            </li>
            <li className="flex items-start gap-2">
              <Mail size={15} className="mt-0.5 text-[var(--gold)]" />
              <span>contato@selectmarmores.com.br</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={15} className="mt-0.5 text-[var(--gold)]" />
              <span>Aparecida de Goiânia, GO</span>
            </li>
            <li className="flex items-start gap-2">
              <AtSign size={15} className="mt-0.5 text-[var(--gold)]" />
              <a href="https://instagram.com/selectmarmores" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Instagram · @selectmarmores
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-base text-[#e8dcc1]">Horário</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>Seg. a sex. · 8h às 18h</li>
            <li>Sábado · 8h às 13h</li>
            <li>Visitas ao showroom com hora marcada</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 mt-12 pt-6 border-t border-[#2a2620] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-[#857a62]">
        <p>© {new Date().getFullYear()} Select Mármores. Todos os direitos reservados.</p>
        <a href="/dashboard" className="hover:text-white">Área interna</a>
      </div>
    </footer>
  );
}
