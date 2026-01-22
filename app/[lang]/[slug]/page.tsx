import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { listStaticParams, readPage, rewriteLegacyLinks, type Lang, type Slug } from '@/lib/content';

export const dynamicParams = false;

export function generateStaticParams() {
  return listStaticParams().map((p) => ({ lang: p.lang, slug: p.slug! }));
}

export default function Page({ params }: { params: { lang: Lang; slug: Slug } }) {
  const { title, body } = readPage(params.lang, params.slug);
  const htmlFixed = rewriteLegacyLinks(body, params.lang);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h1>
      <div className="mt-6 prose prose-slate max-w-none">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{htmlFixed}</ReactMarkdown>
      </div>
    </div>
  );
}

export function generateMetadata({ params }: { params: { lang: Lang; slug: Slug } }) {
  const { title } = readPage(params.lang, params.slug);
  return { title };
}
