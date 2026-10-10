import { getExpositions } from '~/lib/content';
import Exposition from '~/lib/pages/exposition';

export const getStaticProps = async () => {
  return { props: { expositions: await getExpositions() } };
};

export default Exposition;
