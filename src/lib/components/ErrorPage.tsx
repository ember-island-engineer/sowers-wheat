import { Box, Button, Heading, Image, Stack, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { NextSeo } from 'next-seo';

type Props = {
  code: string;
  title: string;
  description: string;
};

const ErrorPage = ({ code, title, description }: Props) => (
  <Box bg="cream.100" minH="65vh" display="flex" alignItems="center">
    <NextSeo title={title} />
    <Box
      maxW="xl"
      mx="auto"
      px={{ base: 4, md: 8 }}
      py={{ base: 16, md: 24 }}
      textAlign="center"
    >
      <Image
        src="/assets/logo-192.png"
        alt=""
        boxSize="72px"
        mx="auto"
        opacity={0.9}
      />
      <Text
        mt={6}
        fontSize="xs"
        fontWeight="bold"
        letterSpacing="0.16em"
        textTransform="uppercase"
        color="gold.600"
      >
        Error {code}
      </Text>
      <Heading
        as="h1"
        mt={3}
        fontSize={{ base: '3xl', md: '4xl' }}
        fontWeight="normal"
        color="brand.800"
      >
        {title}
      </Heading>
      <Text mt={4} color="muted" fontSize="lg">
        {description}
      </Text>
      <Stack
        direction={{ base: 'column', sm: 'row' }}
        spacing={3}
        mt={8}
        justify="center"
      >
        <Button as={NextLink} href="/">
          Back to home
        </Button>
        <Button as={NextLink} href="/devotions" variant="outline">
          Browse devotions
        </Button>
      </Stack>
    </Box>
  </Box>
);

export default ErrorPage;
