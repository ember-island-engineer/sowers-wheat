import imageMap from '../lib/data/devotions-map.json';
import { getArticles, getDevotionSeries, getExpositions } from '~/lib/content';
import Home from '~/lib/pages/home';

export const getStaticProps = async () => {
  const [series, articles, expositions] = await Promise.all([
    getDevotionSeries(imageMap),
    getArticles(),
    getExpositions(),
  ]);

  return {
    props: {
      counts: {
        series: series.length,
        devotions: series.reduce((sum, s) => sum + s.devotions.length, 0),
        articles: articles.length,
        expositions: expositions.length,
      },
      series: series.map(({ type, title, image, devotions }) => ({
        type,
        title,
        image,
        count: devotions.length,
      })),
    },
  };
};

export default Home;
