import {
  Box,
  Flex,
  Grid,
  Heading,
  Icon,
  Link,
  LinkBox,
  LinkOverlay,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { NextSeo } from 'next-seo';
import type { ReactNode } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

import type { NavLink } from '~/lib/content';

import { ReadTime } from './articles/ArticleCard';
import { Eyebrow } from './PageHeader';

type Props = {
  title: string;
  eyebrow?: string;
  readTime: number;
  content: string;
  back: { label: string; href: string };
  prev?: NavLink;
  next?: NavLink;
  meta?: ReactNode;
  footer?: ReactNode;
};

const PagerLink = ({
  link,
  direction,
}: {
  link: NonNullable<NavLink>;
  direction: 'prev' | 'next';
}) => (
  <LinkBox
    p={5}
    bg="white"
    borderRadius="xl"
    border="1px solid"
    borderColor="cream.300"
    textAlign={direction === 'next' ? 'right' : 'left'}
    transition="border-color 0.2s ease"
    _hover={{ borderColor: 'brand.300' }}
    gridColumn={direction === 'next' ? { sm: 2 } : undefined}
  >
    <Flex
      align="center"
      gap={2}
      fontSize="sm"
      color="muted"
      justify={direction === 'next' ? 'flex-end' : 'flex-start'}
    >
      {direction === 'prev' && <Icon as={FiArrowLeft} />}
      {direction === 'prev' ? 'Previous' : 'Next'}
      {direction === 'next' && <Icon as={FiArrowRight} />}
    </Flex>
    <LinkOverlay
      as={NextLink}
      href={link.href}
      display="block"
      mt={1}
      fontFamily="heading"
      fontWeight="bold"
      color="brand.800"
    >
      {link.title}
    </LinkOverlay>
  </LinkBox>
);

const ReadingLayout = ({
  title,
  eyebrow,
  readTime,
  content,
  back,
  prev,
  next,
  meta,
  footer,
}: Props) => (
  <Box>
    <NextSeo title={title} />
    <Box bg="cream.200" borderBottom="1px solid" borderColor="cream.300">
      <Box
        maxW="3xl"
        mx="auto"
        px={{ base: 4, md: 8 }}
        pt={{ base: 8, md: 12 }}
        pb={{ base: 10, md: 14 }}
      >
        <Link
          as={NextLink}
          href={back.href}
          display="inline-flex"
          alignItems="center"
          gap={2}
          fontSize="sm"
          color="muted"
          _hover={{ color: 'brand.800' }}
        >
          <Icon as={FiArrowLeft} />
          {back.label}
        </Link>
        <Box mt={{ base: 8, md: 10 }}>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <Heading
            as="h1"
            mt={3}
            fontSize={{ base: '3xl', md: '5xl' }}
            fontWeight="normal"
            color="brand.800"
            lineHeight="1.15"
          >
            {title}
          </Heading>
          <Flex mt={5} gap={5} align="center" wrap="wrap">
            <ReadTime minutes={readTime} />
            {meta}
          </Flex>
        </Box>
      </Box>
    </Box>
    <Box maxW="3xl" mx="auto" px={{ base: 4, md: 8 }} py={{ base: 10, md: 14 }}>
      <Box
        className="article"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {footer}
      {(prev || next) && (
        <Grid
          mt={14}
          gap={4}
          templateColumns={{ base: '1fr', sm: '1fr 1fr' }}
          borderTop="1px solid"
          borderColor="cream.300"
          pt={10}
        >
          {prev && <PagerLink link={prev} direction="prev" />}
          {next && <PagerLink link={next} direction="next" />}
        </Grid>
      )}
      {!prev && !next && (
        <Text mt={14} pt={10} borderTop="1px solid" borderColor="cream.300">
          <Link
            as={NextLink}
            href={back.href}
            color="brand.600"
            fontWeight="bold"
          >
            ← {back.label}
          </Link>
        </Text>
      )}
    </Box>
  </Box>
);

export default ReadingLayout;
