import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import './globals.css';
import { QuickContactProvider } from '@/components/QuickContact';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Select Mármores — Pedras nobres sob medida',
  description:
    'Bancadas, revestimentos e obras em mármore, granito, quartzito e ultracompactos. Seleção da pedra, projeto e instalação. Goiânia e região.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <QuickContactProvider>{children}</QuickContactProvider>
      </body>
    </html>
  );
}
