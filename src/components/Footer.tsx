'use client';

import Image from 'next/image';
import { AtSign, MapPin, Phone, Mail } from 'lucide-react';
import { QuickContactButton } from './QuickContact';

const WHATSAPP_DISPLAY = process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY ?? '(62) 9465-0630';

export default function Footer() {
  return (
    <footer className="bg-[#0d0d0d] text-white/75 py-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <Image
            src="/brand/logo.png"
            alt="Select Mármores"
            width={150}
            height={42}
            className="opacity-90"
          />
          <p className="mt-6 text-sm text-white/55 max-w-xs leading-relaxed">
            Marmoraria de autor. Curadoria, projeto, corte e instalação — do
            risco do arquiteto à última junta da obra.
          </p>
        </div>

        <div>
          <h4 className="font-serif text-base text-white">Navegar</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="#sobre" className="hover:text-white">Quem somos</a></li>
            <li><a href="#materiais" className="hover:text-white">Materiais</a></li>
            <li><a href="#projetos" className="hover:text-white">Projetos</a></li>
            <li><a href="#depoimentos" className="hover:text-white">Depoimentos</a></li>
            <li><a href="#contato" className="hover:text-white">Contato</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-base text-white">Contato</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <Phone size={15} className="mt-0.5 text-white/60" />
              <QuickContactButton
                origem="cta_footer"
                className="hover:text-white text-left"
                title="Falar com a Select"
                subtitle="Deixe nome e telefone — abrimos o WhatsApp em seguida."
                cta="Abrir WhatsApp"
                waMessage="Olá! Vim pelo site da Select Mármores."
              >
                {WHATSAPP_DISPLAY}
              </QuickContactButton>
            </li>
            <li className="flex items-start gap-2">
              <Mail size={15} className="mt-0.5 text-white/60" />
              <a href="mailto:contato@selectmarmores.com.br" className="hover:text-white">
                contato@selectmarmores.com.br
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={15} className="mt-0.5 text-white/60" />
              <span>Av. Uru, Qd. 91<br />Aparecida de Goiânia, GO</span>
            </li>
            <li className="flex items-start gap-2">
              <AtSign size={15} className="mt-0.5 text-white/60" />
              <a href="https://instagram.com/selectmarmores" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                @selectmarmores
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-base text-white">Horário</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>Seg. a sex. · 8h às 18h</li>
            <li>Sábado · 8h às 13h</li>
            <li className="text-white/55 mt-2">Visita ao showroom com hora marcada</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-white/40">
        <p>© {new Date().getFullYear()} Select Mármores. Todos os direitos reservados.</p>
        <a href="/dashboard" className="hover:text-white">Área interna</a>
      </div>
    </footer>
  );
}
