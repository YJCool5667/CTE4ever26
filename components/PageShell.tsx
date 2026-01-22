import { Header } from './Header';
import { Footer } from './Footer';
import { Lang } from '../lib/i18n';

export function PageShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header lang={lang} />
      <main className="pt-16">{children}</main>
      <Footer lang={lang} />
    </div>
  );
}
