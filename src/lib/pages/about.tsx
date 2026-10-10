import {
  Box,
  Flex,
  Grid,
  Heading,
  Icon,
  Image,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { NextSeo } from 'next-seo';
import { FiArrowRight } from 'react-icons/fi';

import PageHeader, { Eyebrow } from '~/lib/components/PageHeader';

const FACTS = [
  { label: 'Founded', value: '1998' },
  { label: 'Married', value: '30+ years' },
  {
    label: 'Books published',
    value: 'Call of God · God’s Intended Intimacy',
  },
  {
    label: 'Ministered in',
    value:
      'Singapore, Southeast Asia, China, Japan, Taiwan, South Africa, North America and Brazil',
  },
];

const About = () => {
  return (
    <Box>
      <NextSeo title="About" />
      <PageHeader
        eyebrow="About us"
        title="Adrian & Mae Chua"
        description="Founders of Sower’s Wheat, a ministry with the burden to teach the full counsel of God’s Word."
      />
      <Grid
        maxW="6xl"
        mx="auto"
        px={{ base: 4, md: 8 }}
        py={{ base: 12, md: 20 }}
        templateColumns={{ base: '1fr', md: '0.85fr 1.15fr' }}
        gap={{ base: 10, md: 16 }}
        alignItems="start"
      >
        <Box position={{ md: 'sticky' }} top={{ md: '110px' }}>
          <Image
            src="/assets/about.jpeg"
            alt="Mae, Adrian and Rachael Chua"
            borderRadius="2xl"
            boxShadow="lg"
            w="full"
            maxW={{ base: 'sm', md: 'full' }}
            mx="auto"
          />
          <Stack
            mt={8}
            spacing={0}
            bg="white"
            borderRadius="xl"
            border="1px solid"
            borderColor="cream.300"
          >
            {FACTS.map((fact, index) => (
              <Box
                key={fact.label}
                px={5}
                py={4}
                borderTop={index ? '1px solid' : undefined}
                borderColor="cream.200"
              >
                <Text
                  fontSize="xs"
                  fontWeight="bold"
                  letterSpacing="0.12em"
                  textTransform="uppercase"
                  color="gold.600"
                >
                  {fact.label}
                </Text>
                <Text mt={1} color="brand.800">
                  {fact.value}
                </Text>
              </Box>
            ))}
          </Stack>
        </Box>

        <Stack
          spacing={12}
          fontSize={{ base: 'md', md: 'lg' }}
          lineHeight="1.8"
        >
          <Box>
            <Eyebrow>Our family</Eyebrow>
            <Heading mt={3} size="lg" fontWeight="normal" color="brand.800">
              A marriage built on God’s Word
            </Heading>
            <Text mt={4}>
              Adrian is happily married to his wife Mae for more than 30 years
              and together they have a lovely adult daughter, Rachael. Both
              Adrian and Mae are PE Certified Facilitators.
            </Text>
          </Box>

          <Box>
            <Eyebrow>The ministry</Eyebrow>
            <Heading mt={3} size="lg" fontWeight="normal" color="brand.800">
              Sower’s Wheat
            </Heading>
            <Text mt={4}>
              Adrian Chua is the founder of Sower’s Wheat, a ministry with the
              burden to teach the full counsel of God’s Word, so as to equip and
              prepare the saints for the works in God’s ministry. He founded
              Sower’s Wheat in 1998 and since then, this ministry has published
              two books – Call of God and God’s Intended Intimacy, as well as
              many articles that offered exponential book and topical studies
              into the Word of God, including a series that gave a panoramic
              view of the whole New Testament. All his written works can be
              found in this website.
            </Text>
          </Box>

          <Box>
            <Eyebrow>Living by faith</Eyebrow>
            <Heading mt={3} size="lg" fontWeight="normal" color="brand.800">
              Ministering in the nations
            </Heading>
            <Text mt={4}>
              Prior to setting up Sower’s Wheat, Adrian served as a pastoral
              ministry worker in a Methodist church for 3 years, from 1994 to
              1996. In 1997, God called him out to live by faith and wait upon
              Him, Sower’s Wheat was birthed in the following year and this
              ministry has been operating by faith since then.
            </Text>
            <Text mt={4}>
              By the Grace of God, the ministry has brought him to minister in
              many nations in Southeast Asia, China, Taiwan, South Africa, North
              America and Brazil. He is also a regular speaker for YWAM FMS
              (Family Ministry School) to teach on Intimacy in Marriage.
            </Text>
            <Text mt={4}>
              Mae had worked full-time with the church for a season. Since
              leaving full-time employment, she had joined Adrian in his mission
              trips serving and supporting various ministries around the world.
              Adrian and Mae also mentored marriages and minister to families.
              Over the past years, the family had travelled together ministering
              in many nations, touching lives and bearing testimony to the
              faithfulness of God.
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
            <Image
              src="/assets/madagascar.jpeg"
              alt="Marriage seminar in Madagascar, 2018"
              borderRadius="xl"
              h="200px"
              w="full"
              objectFit="cover"
              loading="lazy"
            />
            <Image
              src="/assets/thailand.jpeg"
              alt="Foundation for Family Life seminar in Thailand"
              borderRadius="xl"
              h="200px"
              w="full"
              objectFit="cover"
              loading="lazy"
            />
          </SimpleGrid>

          <LinkBox
            p={{ base: 6, md: 8 }}
            bg="brand.800"
            color="white"
            borderRadius="2xl"
            role="group"
          >
            <Eyebrow color="gold.300">The biography</Eyebrow>
            <Heading mt={3} size="lg" fontWeight="normal">
              <LinkOverlay as={NextLink} href="/biography">
                Read their full story in <i>Naturally Supernatural</i>
              </LinkOverlay>
            </Heading>
            <Flex
              mt={4}
              align="center"
              gap={2}
              fontSize="md"
              fontWeight="bold"
              color="gold.300"
            >
              Read online
              <Icon
                as={FiArrowRight}
                transition="transform 0.2s ease"
                _groupHover={{ transform: 'translateX(4px)' }}
              />
            </Flex>
          </LinkBox>
        </Stack>
      </Grid>
    </Box>
  );
};

export default About;
