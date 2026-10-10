import { Box, SimpleGrid } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';

import ArticleCard from '~/lib/components/articles/ArticleCard';
import PageHeader from '~/lib/components/PageHeader';
import type { ContentSummary } from '~/lib/content';

const Exposition = ({ expositions }: { expositions: ContentSummary[] }) => {
  return (
    <Box>
      <NextSeo title="Expositions" />
      <PageHeader
        eyebrow="Expositions"
        title="A panoramic view of the New Testament"
        description="Book-by-book studies from Matthew to Revelation, tracing the background, themes and message of each book."
      />
      <SimpleGrid
        maxW="6xl"
        mx="auto"
        px={{ base: 4, md: 8 }}
        py={{ base: 10, md: 16 }}
        columns={{ base: 1, sm: 2, lg: 3 }}
        spacing={{ base: 5, md: 7 }}
      >
        {expositions.map(({ slug, title, excerpt, readTime }, index) => (
          <ArticleCard
            key={slug}
            eyebrow={`Book ${index + 1} of ${expositions.length}`}
            href={`/expositions/${slug}`}
            title={title}
            excerpt={excerpt}
            readTime={readTime}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Exposition;
