import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { QuickContactProvider } from '@/components/QuickContact';

const GOOGLE_ADS_ID = 'AW-18174528312';

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
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ADS_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
