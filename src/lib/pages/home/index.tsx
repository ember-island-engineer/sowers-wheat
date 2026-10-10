import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  Image,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import type { IconType } from 'react-icons';
import { FaWhatsapp } from 'react-icons/fa';
import {
  FiArrowRight,
  FiBookOpen,
  FiFeather,
  FiLayers,
  FiMapPin,
} from 'react-icons/fi';
import { MdOutlineEmail } from 'react-icons/md';

import { Eyebrow } from '~/lib/components/PageHeader';
import { CONTACT } from '~/lib/layout/routes';
import { seriesAnchor, sizedImage } from '~/lib/utils';

type Props = {
  counts: {
    series: number;
    devotions: number;
    articles: number;
    expositions: number;
  };
  series: { type: string; title: string; image: string; count: number }[];
};

const NATIONS = [
  'Singapore',
  'Southeast Asia',
  'China',
  'Japan',
  'Taiwan',
  'South Africa',
  'North America',
  'Brazil',
];

const Section = ({
  children,
  bg,
  py = { base: 16, md: 24 },
}: {
  children: React.ReactNode;
  bg?: string;
  py?: object;
}) => (
  <Box as="section" bg={bg}>
    <Box maxW="6xl" mx="auto" px={{ base: 4, md: 8 }} py={py}>
      {children}
    </Box>
  </Box>
);

const SectionTitle = ({
  eyebrow,
  title,
  description,
  align = 'left',
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}) => (
  <Box
    textAlign={align}
    maxW={align === 'center' ? '2xl' : undefined}
    mx={align === 'center' ? 'auto' : undefined}
  >
    <Eyebrow>{eyebrow}</Eyebrow>
    <Heading
      mt={3}
      fontSize={{ base: '3xl', md: '4xl' }}
      fontWeight="normal"
      color="brand.800"
      lineHeight="1.15"
    >
      {title}
    </Heading>
    {description && (
      <Text mt={4} color="muted" fontSize={{ base: 'md', md: 'lg' }}>
        {description}
      </Text>
    )}
  </Box>
);

const ExploreCard = ({
  icon,
  title,
  description,
  meta,
  href,
}: {
  icon: IconType;
  title: string;
  description: string;
  meta: string;
  href: string;
}) => (
  <LinkBox
    as="article"
    display="flex"
    flexDirection="column"
    p={{ base: 6, md: 8 }}
    bg="white"
    borderRadius="xl"
    border="1px solid"
    borderColor="cream.300"
    transition="transform 0.2s ease, box-shadow 0.2s ease"
    _hover={{ transform: 'translateY(-3px)', boxShadow: 'lg' }}
    role="group"
  >
    <Flex
      align="center"
      justify="center"
      boxSize={12}
      borderRadius="full"
      bg="brand.50"
      color="brand.600"
    >
      <Icon as={icon} boxSize={5} />
    </Flex>
    <Heading mt={6} size="md" color="brand.800">
      <LinkOverlay as={NextLink} href={href}>
        {title}
      </LinkOverlay>
    </Heading>
    <Text mt={3} color="muted" lineHeight="tall" flex="1">
      {description}
    </Text>
    <Flex
      mt={6}
      align="center"
      justify="space-between"
      fontSize="sm"
      fontWeight="bold"
      color="brand.600"
    >
      <Text>{meta}</Text>
      <Icon
        as={FiArrowRight}
        transition="transform 0.2s ease"
        _groupHover={{ transform: 'translateX(4px)' }}
      />
    </Flex>
  </LinkBox>
);

const Home = ({ counts, series }: Props) => {
  const stats = [
    { value: '1998', label: 'Ministering by faith since' },
    {
      value: String(counts.devotions),
      label: `Devotions across ${counts.series} series`,
    },
    { value: String(counts.articles), label: 'Articles on everyday faith' },
    {
      value: String(counts.expositions),
      label: 'New Testament expositions',
    },
  ];

  return (
    <Box>
      {/* Hero */}
      <Box as="section" bg="cream.100" overflow="hidden">
        <Grid
          maxW="6xl"
          mx="auto"
          px={{ base: 4, md: 8 }}
          pt={{ base: 12, md: 20 }}
          pb={{ base: 16, md: 24 }}
          templateColumns={{ base: '1fr', lg: '1.05fr 1fr' }}
          gap={{ base: 12, lg: 16 }}
          alignItems="center"
        >
          <Box>
            <Eyebrow>Sower’s Wheat · Since 1998</Eyebrow>
            <Heading
              as="h1"
              mt={5}
              fontSize={{ base: '4xl', md: '6xl' }}
              fontWeight="normal"
              lineHeight="1.08"
              color="brand.800"
            >
              Restoring intimacy in marriages through{' '}
              <Box as="span" color="gold.600" fontStyle="italic">
                Biblical principles
              </Box>
            </Heading>
            <Text
              mt={6}
              fontSize={{ base: 'lg', md: 'xl' }}
              color="muted"
              lineHeight="tall"
              maxW="xl"
            >
              Devotions, articles and New Testament studies by Adrian and Mae
              Chua, teaching the full counsel of God’s Word for marriages,
              families and everyday faith.
            </Text>
            <Stack direction={{ base: 'column', sm: 'row' }} spacing={3} mt={9}>
              <Button
                as={NextLink}
                href="/devotions"
                size="lg"
                rightIcon={<Icon as={FiArrowRight} />}
              >
                Explore devotions
              </Button>
              <Button as={NextLink} href="/about" size="lg" variant="outline">
                Our story
              </Button>
            </Stack>
          </Box>
          <Box
            position="relative"
            mr={{ base: 3, md: 0 }}
            mb={{ base: 3, md: 0 }}
          >
            <Box
              position="absolute"
              inset={0}
              transform="translate(14px, 14px)"
              borderRadius="2xl"
              border="2px solid"
              borderColor="gold.300"
            />
            <AspectRatio ratio={4 / 3}>
              <Image
                src="/assets/madagascar.jpeg"
                alt="Adrian and Mae Chua with participants of a marriage seminar in Madagascar"
                objectFit="cover"
                borderRadius="2xl"
                boxShadow="xl"
              />
            </AspectRatio>
            <HStack
              position="absolute"
              left={{ base: 3, md: -6 }}
              bottom={{ base: 3, md: 8 }}
              bg="white"
              px={4}
              py={3}
              borderRadius="lg"
              boxShadow="lg"
              spacing={3}
            >
              <Flex
                align="center"
                justify="center"
                boxSize={9}
                borderRadius="full"
                bg="gold.300"
                color="brand.800"
              >
                <Icon as={FiMapPin} />
              </Flex>
              <Box lineHeight="short">
                <Text fontSize="sm" fontWeight="bold" color="brand.800">
                  Marriage seminar
                </Text>
                <Text fontSize="xs" color="muted">
                  Madagascar, 2018
                </Text>
              </Box>
            </HStack>
          </Box>
        </Grid>
      </Box>

      {/* Stats */}
      <Box as="section" bg="white" borderY="1px solid" borderColor="cream.300">
        <SimpleGrid
          maxW="6xl"
          mx="auto"
          px={{ base: 4, md: 8 }}
          py={{ base: 10, md: 12 }}
          columns={{ base: 2, md: 4 }}
          spacingY={8}
          spacingX={6}
        >
          {stats.map((stat) => (
            <Box key={stat.label} textAlign={{ base: 'left', md: 'center' }}>
              <Text
                fontFamily="heading"
                fontSize={{ base: '3xl', md: '4xl' }}
                color="brand.700"
                lineHeight="1"
              >
                {stat.value}
              </Text>
              <Text mt={2} fontSize="sm" color="muted">
                {stat.label}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      {/* Mission */}
      <Section bg="cream.50">
        <Box maxW="3xl" mx="auto" textAlign="center">
          <Text
            fontFamily="heading"
            fontSize="7xl"
            lineHeight="0.5"
            color="gold.400"
            aria-hidden
          >
            “
          </Text>
          <Text
            mt={4}
            fontFamily="heading"
            fontSize={{ base: 'xl', md: '2xl' }}
            lineHeight="1.6"
            color="brand.800"
          >
            Many of us build successful public lives but come home to an ashamed
            private life where we find our greatest enemy, our own fleshly self.
            We believe the living and powerful word sown into our lives is the
            power unto salvation to all who believe — to save us from the inside
            out and transform our lives to live Christ fulfilling lives.
          </Text>
          <Box mx="auto" mt={8} w="48px" h="2px" bg="gold.400" />
        </Box>
      </Section>

      {/* Explore */}
      <Section bg="cream.200">
        <SectionTitle
          eyebrow="Start reading"
          title="Teaching for every season"
          description="Everything Adrian has written over more than two decades of ministry, free to read."
        />
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mt={12}>
          <ExploreCard
            icon={FiLayers}
            title="Devotions"
            description="Short daily readings in series — from marriage and relationships to identity, faith and discipleship. Track your progress as you go."
            meta={`${counts.devotions} devotions`}
            href="/devotions"
          />
          <ExploreCard
            icon={FiFeather}
            title="Articles"
            description="Reflections on prayer, parenting, mentoring and contentment, applying God’s Word to the questions of ordinary life."
            meta={`${counts.articles} articles`}
            href="/articles"
          />
          <ExploreCard
            icon={FiBookOpen}
            title="Expositions"
            description="A panoramic, book-by-book study of the New Testament, from the Gospel of Matthew to the Revelation of Jesus Christ."
            meta={`${counts.expositions} books`}
            href="/expositions"
          />
        </SimpleGrid>
      </Section>

      {/* Devotion series */}
      <Section bg="cream.50">
        <Flex
          justify="space-between"
          align={{ base: 'start', md: 'end' }}
          direction={{ base: 'column', md: 'row' }}
          gap={6}
        >
          <SectionTitle
            eyebrow="Devotion series"
            title="Pick a series and begin today"
          />
          <Button
            as={NextLink}
            href="/devotions"
            variant="outline"
            rightIcon={<Icon as={FiArrowRight} />}
            flexShrink={0}
          >
            All series
          </Button>
        </Flex>
        <SimpleGrid columns={{ base: 2, md: 3, lg: 5 }} spacing={4} mt={12}>
          {series.map((s) => (
            <LinkBox
              key={s.type}
              position="relative"
              borderRadius="xl"
              overflow="hidden"
              role="group"
            >
              <AspectRatio ratio={3 / 4}>
                <Image
                  src={sizedImage(s.image, 500)}
                  alt=""
                  objectFit="cover"
                  loading="lazy"
                  transition="transform 0.4s ease"
                  _groupHover={{ transform: 'scale(1.05)' }}
                />
              </AspectRatio>
              <Flex
                position="absolute"
                inset={0}
                direction="column"
                justify="flex-end"
                p={4}
                bgGradient="linear(to-t, rgba(20,26,18,0.85), rgba(20,26,18,0.1) 60%)"
              >
                <LinkOverlay
                  as={NextLink}
                  href={`/devotions#${seriesAnchor(s.type)}`}
                  fontFamily="heading"
                  fontWeight="bold"
                  color="white"
                  lineHeight="short"
                >
                  {s.title}
                </LinkOverlay>
                <Text fontSize="xs" color="whiteAlpha.800" mt={1}>
                  {s.count} devotions
                </Text>
              </Flex>
            </LinkBox>
          ))}
        </SimpleGrid>
      </Section>

      {/* Founders + book */}
      <Section bg="white">
        <Grid
          templateColumns={{ base: '1fr', md: '0.8fr 1fr' }}
          gap={{ base: 10, md: 16 }}
          alignItems="center"
        >
          <Image
            src="/assets/about.jpeg"
            alt="Mae, Adrian and Rachael Chua"
            borderRadius="2xl"
            w="full"
            maxW={{ base: 'sm', md: 'full' }}
            mx="auto"
            boxShadow="lg"
          />
          <Box>
            <SectionTitle
              eyebrow="Meet the founders"
              title="Adrian & Mae Chua"
            />
            <Text mt={5} color="muted" fontSize="lg" lineHeight="tall">
              Married for more than 30 years, Adrian and Mae mentor marriages
              and minister to families. Adrian founded Sower’s Wheat in 1998,
              and the ministry has taken them, together with their daughter
              Rachael, to teach in many nations.
            </Text>
            <Wrap mt={6} spacing={2}>
              {NATIONS.map((nation) => (
                <WrapItem key={nation}>
                  <Text
                    fontSize="sm"
                    px={3}
                    py={1}
                    borderRadius="full"
                    bg="brand.50"
                    color="brand.700"
                  >
                    {nation}
                  </Text>
                </WrapItem>
              ))}
            </Wrap>
            <LinkBox
              mt={8}
              p={6}
              bg="cream.100"
              borderRadius="xl"
              border="1px solid"
              borderColor="cream.300"
              role="group"
            >
              <Eyebrow>The biography</Eyebrow>
              <Heading mt={2} size="md" color="brand.800">
                <LinkOverlay as={NextLink} href="/biography">
                  Naturally Supernatural
                </LinkOverlay>
              </Heading>
              <Text mt={2} fontSize="sm" color="muted">
                The life and faith journey of Adrian & Mae Chua, by Vinny Tan.
                Read it free online.
              </Text>
              <Flex
                mt={4}
                align="center"
                gap={2}
                fontSize="sm"
                fontWeight="bold"
                color="brand.600"
              >
                Read their story
                <Icon
                  as={FiArrowRight}
                  transition="transform 0.2s ease"
                  _groupHover={{ transform: 'translateX(4px)' }}
                />
              </Flex>
            </LinkBox>
            <Button
              as={NextLink}
              href="/about"
              mt={6}
              variant="link"
              color="brand.600"
              rightIcon={<Icon as={FiArrowRight} />}
            >
              More about us
            </Button>
          </Box>
        </Grid>
      </Section>

      {/* Contact */}
      <Box as="section" position="relative" overflow="hidden">
        <Image
          src="/assets/thailand.jpeg"
          alt=""
          position="absolute"
          inset={0}
          w="full"
          h="full"
          objectFit="cover"
          loading="lazy"
        />
        <Box position="absolute" inset={0} bg="rgba(32, 38, 29, 0.82)" />
        <Box
          position="relative"
          maxW="3xl"
          mx="auto"
          px={{ base: 4, md: 8 }}
          py={{ base: 20, md: 28 }}
          textAlign="center"
          color="white"
        >
          <Eyebrow color="gold.300">Get in touch</Eyebrow>
          <Heading
            mt={4}
            fontSize={{ base: '3xl', md: '5xl' }}
            fontWeight="normal"
            lineHeight="1.15"
          >
            We’d love to hear from you
          </Heading>
          <Text mt={5} fontSize="lg" color="whiteAlpha.800">
            Have a question, or would like to connect with Adrian and Mae? Send
            us a message.
          </Text>
          <Stack
            direction={{ base: 'column', sm: 'row' }}
            spacing={3}
            mt={10}
            justify="center"
          >
            <Button
              as="a"
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              variant="light"
              leftIcon={<Icon as={FaWhatsapp} />}
            >
              WhatsApp
            </Button>
            <Button
              as="a"
              href={CONTACT.email}
              size="lg"
              variant="outline"
              color="white"
              borderColor="whiteAlpha.600"
              _hover={{ bg: 'whiteAlpha.200' }}
              leftIcon={<Icon as={MdOutlineEmail} />}
            >
              Email us
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
