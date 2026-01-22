'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LANG_LABEL, Lang, LANGS } from '../lib/i18n';
import { Menu, X } from 'lucide-react';
import { useMemo, useState } from 'react';

const NAV: { key: string; href: (lang: Lang) => string; label: Record<Lang,string> }[] = [
  { key: 'about', href: (l) => `/${l}/about/`, label: { ko: '회사소개', en: 'About', lo: 'About' } },
  { key: 'business', href: (l) => `/${l}/business/`, label: { ko: '사업', en: 'Business', lo: 'Business' } },
  { key: 'impact', href: (l) => `/${l}/impact/`, label: { ko: '임팩트', en: 'Impact', lo: 'Impact' } },
  { key: 'actions', href: (l) => `/${l}/actions/`, label: { ko: '액션', en: 'Actions', lo: 'Actions' } },
  { key: 'projects', href: (l) => `/${l}/projects/`, label: { ko: '프로젝트', en: 'Projects', lo: 'Projects' } },
];

export function Header({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const switchPath = useMemo(() => {
    // Replace leading /{lang}/ with the new locale
    const parts = (pathname ?? '/').split('/').filter(Boolean);
    const currentLang = parts[0] as Lang | undefined;
    const rest = parts.slice(1);
    return (to: Lang) => `/${to}/${rest.join('/')}${rest.length ? '/' : ''}`;
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href={`/${lang}/`} className="flex items-center gap-3">
          <img src="/images/CTE_blue_ver1.png" alt="CTE" className="h-9 w-auto" />
          <div className="hidden sm:block">
            <div className="text-sm font-semibold text-gray-900">CTE</div>
            <div className="text-xs text-gray-500">Climate-Tech Energy</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((n) => (
            <Link key={n.key} href={n.href(lang)} className="text-sm font-medium text-gray-700 hover:text-gray-900">
              {n.label[lang]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 rounded-full border border-black/10 bg-white px-2 py-1 md:flex">
            {LANGS.map((l) => (
              <Link
                key={l}
                href={switchPath(l)}
                className={`rounded-full px-2 py-1 text-xs font-semibold ${l === lang ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                {LANG_LABEL[l]}
              </Link>
            ))}
          </div>

          <button
            className="inline-flex items-center justify-center rounded-lg border border-black/10 p-2 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-black/5 bg-white md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4">
            <div className="grid gap-3">
              {NAV.map((n) => (
                <Link key={n.key} href={n.href(lang)} className="rounded-lg px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50" onClick={() => setOpen(false)}>
                  {n.label[lang]}
                </Link>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              {LANGS.map((l) => (
                <Link
                  key={l}
                  href={switchPath(l)}
                  className={`flex-1 rounded-lg border px-3 py-2 text-center text-xs font-semibold ${l === lang ? 'border-gray-900 bg-gray-900 text-white' : 'border-black/10 text-gray-700'}`}
                  onClick={() => setOpen(false)}
                >
                  {LANG_LABEL[l]}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
