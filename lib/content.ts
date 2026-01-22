import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export type Lang = 'ko' | 'en' | 'lo';

export const LANGS: Lang[] = ['ko', 'en', 'lo'];
export const SLUGS = ['index', 'about', 'business', 'impact', 'actions', 'projects', 'contact', 'partnership'] as const;
export type Slug = (typeof SLUGS)[number];

const CONTENT_DIR = path.join(process.cwd(), 'content');

export function getPagePath(lang: Lang, slug: Slug) {
  const file = slug === 'index' ? 'index.md' : `${slug}.md`;
  return path.join(CONTENT_DIR, lang, file);
}

export function readPage(lang: Lang, slug: Slug): { title: string; body: string } {
  const p = getPagePath(lang, slug);
  const raw = fs.readFileSync(p, 'utf8');
  const { data, content } = matter(raw);
  return {
    title: String(data.title ?? ''),
    body: content
  };
}

export function listStaticParams() {
  const params: { lang: Lang; slug?: Slug }[] = [];
  for (const lang of LANGS) {
    // home route uses page.tsx; not /index
    for (const slug of SLUGS) {
      if (slug === 'index') continue;
      params.push({ lang, slug });
    }
  }
  return params;
}

export function rewriteLegacyLinks(html: string, lang: Lang) {
  // converts about.html -> /{lang}/about
  const map: Record<string, string> = {
    'index.html': `/${lang}`,
    'about.html': `/${lang}/about`,
    'business.html': `/${lang}/business`,
    'impact.html': `/${lang}/impact`,
    'actions.html': `/${lang}/actions`,
    'projects.html': `/${lang}/projects`,
    'contact.html': `/${lang}/contact`,
    'partnership.html': `/${lang}/partnership`
  };

  let out = html;
  for (const [from, to] of Object.entries(map)) {
    out = out.replaceAll(`href=\"${from}\"`, `href=\"${to}\"`);
    out = out.replaceAll(`href='${from}'`, `href='${to}'`);
    out = out.replaceAll(`href=\"eng/${from}\"`, `href=\"/en/${to.split('/').pop()}\"`);
    out = out.replaceAll(`href=\"laos/${from}\"`, `href=\"/lo/${to.split('/').pop()}\"`);
  }
  return out;
}
