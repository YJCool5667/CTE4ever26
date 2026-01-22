import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { readPage, rewriteLegacyLinks, type Lang } from '@/lib/content';

export default function Home({ params }: { params: { lang: Lang } }) {
  const { title, body } = readPage(params.lang, 'index');
  const htmlFixed = rewriteLegacyLinks(body, params.lang);

  return (
    <article className="prose prose-slate max-w-none">
      {/* title is in content itself; keep metadata only */}
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>
        {htmlFixed}
      </ReactMarkdown>
    </article>
  );
}

export function generateMetadata({ params }: { params: { lang: Lang } }) {
  const { title } = readPage(params.lang, 'index');
  return { title };
}
