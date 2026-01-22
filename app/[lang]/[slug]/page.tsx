import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import {
  listStaticParams,
  readPage,
  rewriteLegacyLinks,
  type Lang,
  type Slug,
} from '@/lib/content';

export const dynamicParams = false;

/**
 * Next.js가 요구하는 params shape에 맞게
 * slug는 반드시 string으로 반환
 */
export function generateStaticParams(): { lang: Lang; slug: string }[] {
  return listStaticParams().map((p) => ({
    lang: p.lang,
    slug: p.slug!, // build-time에는 string
  }));
}

/**
 * Page 컴포넌트
 * slug는 string으로 받고, 내부에서 Slug로 사용
 */
type PageParams = {
  params: {
    lang: Lang;
    slug: string;
  };
};

export default function Page({ params }: PageParams) {
  const { lang, slug } = params;

  // 내부 로직에서만 Slug로 취급
  const { title, body } = readPage(lang, slug as Slug);
  const htmlFixed = rewriteLegacyLinks(body, lang);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        {title}
      </h1>
      <div className="mt-6 prose prose-slate max-w-none">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {htmlFixed}
        </ReactMarkdown>
      </div>
    </div>
  );
}

/**
 * Metadata도 동일한 params shape 사용
 */
export function generateMetadata({ params }: PageParams) {
  const { lang, slug } = params;
  const { title } = readPage(lang, slug as Slug);
  return { title };
}
