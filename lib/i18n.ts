export const LANGS = ['ko', 'en', 'lo'] as const;
export type Lang = typeof LANGS[number];

export const LANG_LABEL: Record<Lang, string> = {
  ko: 'KOR',
  en: 'ENG',
  lo: 'LAO',
};

export function normalizeLang(input?: string): Lang {
  if (input === 'eng') return 'en';
  if (input === 'laos') return 'lo';
  if (input === 'kr') return 'ko';
  return (LANGS as readonly string[]).includes(input ?? '') ? (input as Lang) : 'ko';
}
