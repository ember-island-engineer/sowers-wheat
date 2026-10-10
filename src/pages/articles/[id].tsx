import fs from 'fs/promises';

import ReadingLayout from '~/lib/components/ReadingLayout';
import { getFlatEntry } from '~/lib/content';

export const getStaticPaths = async () => {
  const articleFiles = await fs.readdir('src/lib/data/articles');
  const paths = articleFiles.map((filename) => ({
    params: { id: filename.split('.html')[0] },
  }));
  return { paths, fallback: false };
};

export async function getStaticProps({ params }: { params: { id: string } }) {
  return { props: { article: await getFlatEntry('articles', params.id) } };
}

export default function Article({
  article,
}: {
  article: { title: string; readTime: number; content: string };
}) {
  return (
    <ReadingLayout
      eyebrow="Article"
      title={article.title}
      readTime={article.readTime}
      content={article.content}
      back={{ label: 'All articles', href: '/articles' }}
    />
  );
}
