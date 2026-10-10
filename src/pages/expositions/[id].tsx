import ReadingLayout from '~/lib/components/ReadingLayout';
import type { NavLink } from '~/lib/content';
import { getExpositions, getFlatEntry } from '~/lib/content';

export const getStaticPaths = async () => {
  const expositions = await getExpositions();
  const paths = expositions.map(({ slug }) => ({ params: { id: slug } }));
  return { paths, fallback: false };
};

export async function getStaticProps({ params }: { params: { id: string } }) {
  const expositions = await getExpositions();
  const index = expositions.findIndex(({ slug }) => slug === params.id);
  const link = (i: number): NavLink =>
    expositions[i]
      ? {
          title: expositions[i].title,
          href: `/expositions/${expositions[i].slug}`,
        }
      : null;

  return {
    props: {
      article: await getFlatEntry('expositions', params.id),
      prev: link(index - 1),
      next: link(index + 1),
    },
  };
}

export default function Article({
  article,
  prev,
  next,
}: {
  article: { title: string; readTime: number; content: string };
  prev: NavLink;
  next: NavLink;
}) {
  return (
    <ReadingLayout
      eyebrow="New Testament exposition"
      title={article.title}
      readTime={article.readTime}
      content={article.content}
      back={{ label: 'All expositions', href: '/expositions' }}
      prev={prev}
      next={next}
    />
  );
}
