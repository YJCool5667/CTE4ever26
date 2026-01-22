import '../globals.css';
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { LANGS, type Lang } from '@/lib/content';

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  title: {
    default: 'CTE | Carbon To Energy',
    template: '%s | CTE'
  },
  description: 'CTE - Climate-Tech Carbon Credit Business Development'
};

export default function LangLayout({ children, params }: { children: React.ReactNode; params: { lang: Lang } }) {
  return (
    <html lang={params.lang}>
      <body>
        <SiteHeader />
        <main className="min-h-[70vh]">
          {children}
        </main>
        <SiteFooter lang={params.lang} />
      </body>
    </html>
  );
}
