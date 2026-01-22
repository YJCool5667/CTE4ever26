'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Globe, Menu, X } from 'lucide-react';
import { useMemo, useState } from 'react';

const NAV = [
  { href: 'about', label: { ko: '회사소개', en: 'About', lo: 'ກ່ຽວກັບ' } },
  { href: 'business', label: { ko: '사업영역', en: 'Business', lo: 'ທຸລະກິດ' } },
  { href: 'impact', label: { ko: '임팩트', en: 'Impact', lo: 'ຜົນກະທົບ' } },
  { href: 'actions', label: { ko: '실행전략', en: 'Actions', lo: 'ການປະຕິບັດ' } },
  { href: 'projects', label: { ko: '프로젝트', en: 'Projects', lo: 'ໂຄງການ' } }
];

const LANGS = [
  { code: 'ko', label: 'KOR' },
  { code: 'en', label: 'ENG' },
  { code: 'lo', label: 'LAO' }
] as const;

function parseLang(pathname: string) {
  const seg = pathname.split('/')[1];
  return (seg === 'ko' || seg === 'en' || seg === 'lo') ? seg : 'ko';
}

export function SiteHeader() {
  const pathname = usePathname();
  const lang = useMemo(() => parseLang(pathname || '/ko'), [pathname]);
  const base = `/${lang}`;
  const [open, setOpen] = useState(false);

  const navItems = NAV.map((item) => {
    const label = item.label[lang as 'ko'|'en'|'lo'];
    return { ...item, label, to: `${base}/${item.href}` };
  });

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href={base} className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-emerald-500 to-sky-500" />
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight">CTE</div>
            <div className="text-xs text-slate-500">Carbon To Energy</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((n) => (
            <Link key={n.href} href={n.to} className="text-sm font-medium text-slate-700 hover:text-emerald-700">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-1 md:flex">
            <Globe className="h-4 w-4 text-slate-500" />
            {LANGS.map((l) => (
              <Link
                key={l.code}
                href={`/${l.code}${pathname?.replace(/^\/(ko|en|lo)/, '') || ''}`}
                className={`rounded-full px-2 py-1 text-xs font-semibold ${l.code === lang ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <button
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200"
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="border-t border-slate-200 bg-white md:hidden"
        >
          <div className="mx-auto max-w-7xl px-4 py-4">
            <div className="grid gap-3">
              {navItems.map((n) => (
                <Link
                  key={n.href}
                  href={n.to}
                  className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100"
                  onClick={() => setOpen(false)}
                >
                  {n.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2">
              <Globe className="h-4 w-4 text-slate-500" />
              {LANGS.map((l) => (
                <Link
                  key={l.code}
                  href={`/${l.code}${pathname?.replace(/^\/(ko|en|lo)/, '') || ''}`}
                  className={`rounded-full px-2 py-1 text-xs font-semibold ${l.code === lang ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
