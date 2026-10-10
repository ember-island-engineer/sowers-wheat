import { Button, Flex, Icon } from '@chakra-ui/react';
import { FiCheck } from 'react-icons/fi';

import imageMap from '../../../lib/data/devotions-map.json';
import { useProgress } from '~/lib/components/devotions/useProgress';
import ReadingLayout from '~/lib/components/ReadingLayout';
import type { NavLink } from '~/lib/content';
import { getDevotion, getDevotionSeries } from '~/lib/content';
import { seriesAnchor } from '~/lib/utils';

export const getStaticPaths = async () => {
  const series = await getDevotionSeries(imageMap);
  const paths = series.flatMap(({ type, devotions }) =>
    devotions.map(({ id }) => ({ params: { type, id } }))
  );
  return { paths, fallback: false };
};

export async function getStaticProps({
  params,
}: {
  params: { id: string; type: string };
}) {
  return {
    props: {
      type: params.type,
      href: `/devotions/${params.type}/${params.id}`,
      devotion: await getDevotion(params.type, params.id),
    },
  };
}

type Props = {
  type: string;
  href: string;
  devotion: {
    title: string;
    seriesTitle: string;
    position: number;
    total: number;
    readTime: number;
    content: string;
    prev: NavLink;
    next: NavLink;
  };
};

export default function Devotion({ type, href, devotion }: Props) {
  const { isRead, setRead } = useProgress();
  const done = isRead(href);

  return (
    <ReadingLayout
      eyebrow={`${devotion.seriesTitle} · ${devotion.position} of ${devotion.total}`}
      title={devotion.title}
      readTime={devotion.readTime}
      content={devotion.content}
      back={{
        label: `${devotion.seriesTitle} series`,
        href: `/devotions#${seriesAnchor(type)}`,
      }}
      prev={devotion.prev}
      next={devotion.next}
      footer={
        <Flex mt={10} justify="center">
          <Button
            variant={done ? 'solid' : 'outline'}
            leftIcon={done ? <Icon as={FiCheck} /> : undefined}
            onClick={() => setRead(href, !done)}
          >
            {done ? 'Marked as read' : 'Mark as read'}
          </Button>
        </Flex>
      }
    />
  );
}
