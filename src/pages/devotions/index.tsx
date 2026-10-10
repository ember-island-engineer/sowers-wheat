import imageMap from '../../lib/data/devotions-map.json';
import { getDevotionSeries } from '~/lib/content';
import Devotions from '~/lib/pages/devotions';

export const getStaticProps = async () => {
  return { props: { series: await getDevotionSeries(imageMap) } };
};

export default Devotions;
