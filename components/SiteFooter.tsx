import Link from 'next/link';

export function SiteFooter({ lang }: { lang: 'ko'|'en'|'lo' }) {
  const copy = {
    ko: {
      tagline: '라오스 탄소중립, 지속가능한 에너지 솔루션',
      contact: '문의',
      privacy: '개인정보처리방침',
      terms: '이용약관'
    },
    en: {
      tagline: 'Carbon-neutral solutions for Laos, sustainable energy',
      contact: 'Contact',
      privacy: 'Privacy Policy',
      terms: 'Terms'
    },
    lo: {
      tagline: 'ການແກ້ໄຂພະລັງງານຢືນຍົງແລະຄາບອນກາງໃນລາວ',
      contact: 'ຕິດຕໍ່',
      privacy: 'ນະໂຍບາຍຄວາມເປັນສ່ວນຕົວ',
      terms: 'ເງື່ອນໄຂ'
    }
  }[lang];

  return (
    <footer className="mt-16 border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <div className="text-sm font-semibold">CTE</div>
            <div className="mt-2 text-sm text-slate-600">{copy.tagline}</div>
            <div className="mt-4 text-xs text-slate-500">© {new Date().getFullYear()} CTE. All rights reserved.</div>
          </div>

          <div className="flex gap-6 md:justify-end">
            <Link href={`/${lang}/contact`} className="text-sm font-semibold text-slate-700 hover:text-emerald-700">
              {copy.contact}
            </Link>
            <Link href="#" className="text-sm font-semibold text-slate-700 hover:text-emerald-700">
              {copy.privacy}
            </Link>
            <Link href="#" className="text-sm font-semibold text-slate-700 hover:text-emerald-700">
              {copy.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
