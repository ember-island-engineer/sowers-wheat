import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AspectRatio,
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Image,
  Link,
  Progress,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { NextSeo } from 'next-seo';

import { useProgress } from '~/lib/components/devotions/useProgress';
import PageHeader from '~/lib/components/PageHeader';
import type { DevotionSeries } from '~/lib/content';
import { seriesAnchor, sizedImage } from '~/lib/utils';

const SeriesCard = ({
  series,
  isRead,
  setRead,
}: {
  series: DevotionSeries;
} & ReturnType<typeof useProgress>) => {
  const { devotions } = series;
  const done = devotions.filter((d) => isRead(d.href)).length;
  const nextUp = devotions.find((d) => !isRead(d.href)) ?? devotions[0];
  const started = done > 0;

  return (
    <Box
      id={seriesAnchor(series.type)}
      scrollMarginTop="96px"
      bg="white"
      borderRadius="xl"
      border="1px solid"
      borderColor="cream.300"
      overflow="hidden"
    >
      <AspectRatio ratio={16 / 9}>
        <Image
          src={sizedImage(series.image, 900)}
          alt=""
          objectFit="cover"
          loading="lazy"
        />
      </AspectRatio>
      <Box p={6}>
        <Flex justify="space-between" align="baseline" gap={4}>
          <Heading size="md" color="brand.800">
            {series.title}
          </Heading>
          <Text fontSize="sm" color="muted" whiteSpace="nowrap">
            {devotions.length} devotions
          </Text>
        </Flex>
        <Flex mt={4} align="center" gap={3}>
          <Progress
            flex="1"
            value={(done / devotions.length) * 100}
            size="sm"
            borderRadius="full"
            bg="cream.200"
            sx={{ '& > div': { bg: 'gold.400' } }}
            aria-label={`${done} of ${devotions.length} read`}
          />
          <Text fontSize="xs" color="muted" whiteSpace="nowrap">
            {done}/{devotions.length} read
          </Text>
        </Flex>
        <Button
          as={NextLink}
          href={nextUp.href}
          mt={5}
          size="sm"
          variant={started ? 'solid' : 'outline'}
        >
          {started ? 'Continue reading' : 'Start series'}
        </Button>
        <Accordion allowToggle mt={4}>
          <AccordionItem border="none">
            <AccordionButton
              px={0}
              py={2}
              fontSize="sm"
              fontWeight="bold"
              color="brand.600"
              _hover={{ bg: 'transparent', color: 'brand.800' }}
            >
              <Box flex="1" textAlign="left">
                All devotions in this series
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel px={0} pb={0}>
              <Stack spacing={0}>
                {devotions.map((devotion, index) => (
                  <Flex
                    key={devotion.id}
                    align="center"
                    gap={3}
                    py={2.5}
                    borderTop="1px solid"
                    borderColor="cream.200"
                  >
                    <Checkbox
                      colorScheme="brand"
                      isChecked={isRead(devotion.href)}
                      onChange={(e) => setRead(devotion.href, e.target.checked)}
                      aria-label={`Mark “${devotion.title}” as read`}
                    />
                    <Text
                      fontSize="xs"
                      color="muted"
                      w="6"
                      textAlign="right"
                      flexShrink={0}
                    >
                      {index + 1}
                    </Text>
                    <Link
                      as={NextLink}
                      href={devotion.href}
                      flex="1"
                      fontSize="sm"
                      color={isRead(devotion.href) ? 'muted' : 'ink'}
                      _hover={{ color: 'brand.600' }}
                    >
                      {devotion.title}
                    </Link>
                    <Text fontSize="xs" color="muted" whiteSpace="nowrap">
                      {devotion.readTime} min
                    </Text>
                  </Flex>
                ))}
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </Box>
  );
};

const Devotions = ({ series }: { series: DevotionSeries[] }) => {
  const progress = useProgress();
  const total = series.reduce((sum, s) => sum + s.devotions.length, 0);

  return (
    <Box>
      <NextSeo title="Devotions" />
      <PageHeader
        eyebrow="Devotions"
        title="Daily devotions, one step at a time"
        description={`${series.length} devotional series and ${total} readings on marriage, relationships, faith and walking with God. Tick each one off as you go — your progress is saved on this device.`}
      />
      <SimpleGrid
        maxW="6xl"
        mx="auto"
        px={{ base: 4, md: 8 }}
        py={{ base: 10, md: 16 }}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 5, md: 7 }}
        alignItems="start"
      >
        {series.map((s) => (
          <SeriesCard
            key={s.type}
            series={s}
            isRead={progress.isRead}
            setRead={progress.setRead}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Devotions;
