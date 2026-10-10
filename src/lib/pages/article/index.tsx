import { Box, SimpleGrid } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';

import ArticleCard from '~/lib/components/articles/ArticleCard';
import PageHeader from '~/lib/components/PageHeader';
import type { ContentSummary } from '~/lib/content';

type Props = {
  articles: (ContentSummary & { image: string | null })[];
};

const Articles = ({ articles }: Props) => {
  return (
    <Box>
      <NextSeo title="Articles" />
      <PageHeader
        eyebrow="Articles"
        title="Reflections for everyday faith"
        description="Teaching on prayer, parenting, mentoring, identity and walking in love, written to help you apply God’s Word to ordinary life."
      />
      <SimpleGrid
        maxW="6xl"
        mx="auto"
        px={{ base: 4, md: 8 }}
        py={{ base: 10, md: 16 }}
        columns={{ base: 1, sm: 2, lg: 3 }}
        spacing={{ base: 5, md: 7 }}
      >
        {articles.map(({ slug, title, excerpt, readTime, image }) => (
          <ArticleCard
            key={slug}
            href={`/articles/${slug}`}
            title={title}
            excerpt={excerpt}
            imageSrc={image ?? undefined}
            readTime={readTime}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Articles;
