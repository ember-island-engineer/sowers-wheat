import {
  AspectRatio,
  Box,
  Flex,
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { FiClock } from 'react-icons/fi';

import { sizedImage } from '~/lib/utils';

type Props = {
  title: string;
  href: string;
  readTime: number;
  excerpt?: string;
  imageSrc?: string;
  eyebrow?: string;
};

export const ReadTime = ({ minutes }: { minutes: number }) => (
  <Flex align="center" gap={1.5} fontSize="sm" color="muted">
    <FiClock aria-hidden />
    <Text as="span">{minutes} min read</Text>
  </Flex>
);

const ArticleCard = ({
  title,
  href,
  readTime,
  excerpt,
  imageSrc,
  eyebrow,
}: Props) => {
  return (
    <LinkBox
      as="article"
      h="full"
      display="flex"
      flexDirection="column"
      bg="white"
      borderRadius="xl"
      overflow="hidden"
      border="1px solid"
      borderColor="cream.300"
      transition="transform 0.2s ease, box-shadow 0.2s ease"
      _hover={{ transform: 'translateY(-3px)', boxShadow: 'lg' }}
      role="group"
    >
      {imageSrc && (
        <AspectRatio ratio={16 / 10} overflow="hidden">
          <Image
            src={sizedImage(imageSrc, 800)}
            alt=""
            objectFit="cover"
            loading="lazy"
            transition="transform 0.4s ease"
            _groupHover={{ transform: 'scale(1.04)' }}
          />
        </AspectRatio>
      )}
      <Flex direction="column" flex="1" p={6}>
        {eyebrow && (
          <Text
            fontSize="xs"
            fontWeight="bold"
            letterSpacing="0.14em"
            textTransform="uppercase"
            color="gold.600"
            mb={2}
          >
            {eyebrow}
          </Text>
        )}
        <Heading size="md" color="brand.800" lineHeight="short">
          <LinkOverlay as={NextLink} href={href}>
            {title}
          </LinkOverlay>
        </Heading>
        {excerpt && (
          <Text
            mt={3}
            color="muted"
            fontSize="sm"
            lineHeight="tall"
            noOfLines={3}
          >
            {excerpt}
          </Text>
        )}
        <Box mt="auto" pt={5}>
          <ReadTime minutes={readTime} />
        </Box>
      </Flex>
    </LinkBox>
  );
};

export default ArticleCard;
