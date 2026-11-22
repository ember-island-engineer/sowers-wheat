import ReadingLayout from '~/lib/components/ReadingLayout';
import { getArticles, getFlatEntry } from '~/lib/content';

export const getStaticPaths = async () => {
  const articles = await getArticles();
  const paths = articles.map(({ slug }) => ({
    params: { id: slug },
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
