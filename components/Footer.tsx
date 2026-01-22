import Link from 'next/link';
import { Lang } from '../lib/i18n';

export function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="border-t border-black/5 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <img src="/images/CTE_blue_ver1.png" alt="CTE" className="h-10 w-auto" />
            <p className="mt-3 text-sm text-gray-600">
              Climate-Tech Energy — Renewable Energy & Carbon Credit Development.
            </p>
          </div>
          <div className="text-sm text-gray-600">
            <div className="font-semibold text-gray-900">Contact</div>
            <div className="mt-2">Email: info@ctoe.co.kr</div>
            <div>Web: ctoe.co.kr</div>
          </div>
          <div className="text-sm">
            <div className="font-semibold text-gray-900">Links</div>
            <div className="mt-2 grid gap-2 text-gray-600">
              <Link href={`/${lang}/contact/`} className="hover:text-gray-900">Contact</Link>
              <Link href={`/${lang}/partnership/`} className="hover:text-gray-900">Partnership</Link>
            </div>
          </div>
        </div>
        <div className="mt-8 text-xs text-gray-500">© {new Date().getFullYear()} CTE. All rights reserved.</div>
      </div>
    </footer>
  );
}
