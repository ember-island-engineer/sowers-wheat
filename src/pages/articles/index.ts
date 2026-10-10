import imageMap from '../../lib/data/image-map.json';
import { getArticles } from '~/lib/content';
import Articles from '~/lib/pages/article';

export const getStaticProps = async () => {
  const articles = (await getArticles()).map((article) => ({
    ...article,
    image: (imageMap as Record<string, string>)[article.title] ?? null,
  }));
  return { props: { articles } };
};

export default Articles;
