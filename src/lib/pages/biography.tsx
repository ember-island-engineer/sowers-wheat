import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import { FiBookOpen, FiDownload } from 'react-icons/fi';

import { Eyebrow } from '~/lib/components/PageHeader';

const PDF_PATH = '/books/naturally-supernatural.pdf';
const COVER_PATH = '/assets/naturally-supernatural-cover.jpg';

const BookCover = () => (
  <Image
    src={COVER_PATH}
    alt="Front cover of Naturally Supernatural: The story of Adrian & Mae Chua"
    htmlWidth={901}
    htmlHeight={1350}
    w={{ base: '230px', md: '300px' }}
    h="auto"
    borderRadius="sm"
    boxShadow="0 30px 60px -20px rgba(32, 38, 29, 0.45), 0 10px 20px -10px rgba(32, 38, 29, 0.25)"
    transform={{ md: 'rotate(-2deg)' }}
  />
);

const Biography = () => {
  return (
    <Box bg="cream.200">
      <NextSeo
        title="Naturally Supernatural"
        description="The Life and Faith Journey of Adrian & Mae Chua, by Vinny Tan."
      />
      <Grid
        maxW="6xl"
        mx="auto"
        px={{ base: 4, md: 8 }}
        py={{ base: 14, md: 24 }}
        templateColumns={{ base: '1fr', md: 'auto 1fr' }}
        gap={{ base: 12, md: 20 }}
        alignItems="center"
        justifyItems={{ base: 'center', md: 'stretch' }}
      >
        <BookCover />
        <Box maxW="2xl">
          <Eyebrow>The biography</Eyebrow>
          <Heading
            as="h1"
            mt={3}
            fontSize={{ base: '4xl', md: '5xl' }}
            fontWeight="normal"
            color="brand.800"
            lineHeight="1.1"
          >
            Naturally Supernatural
          </Heading>
          <Text mt={3} fontSize="lg" fontStyle="italic" color="muted">
            The Life and Faith Journey of Adrian & Mae Chua — by Vinny Tan
          </Text>
          <Stack
            mt={8}
            spacing={4}
            fontSize={{ base: 'md', md: 'lg' }}
            lineHeight="1.8"
          >
            <Text>
              This biography tells the story of Adrian and Mae Chua, the
              founders of Sower’s Wheat. It follows Adrian from a Buddhist
              childhood shaped by superstition and a fast-paced career in
              insurance, through his call to live by faith, and on to more than
              thirty years of ministry, provision and mission together with Mae
              and their daughter Rachael.
            </Text>
            <Text>
              Written by Vinny Tan, whom Adrian and Mae mentored in marriage,
              the book draws on notes kept across decades of ministry, recorded
              interviews and many conversations along the way, and closes with a
              section of personal accounts, <i>In Their Own Words</i>.
            </Text>
          </Stack>
          <HStack
            mt={8}
            spacing={6}
            fontSize="sm"
            color="muted"
            divider={<Box w="1px" h="14px" bg="cream.400" border="none" />}
          >
            <Text>174 pages</Text>
            <Text>31 chapters</Text>
            <Text>PDF · 3.1 MB</Text>
          </HStack>
          <Stack direction={{ base: 'column', sm: 'row' }} spacing={3} mt={8}>
            <Button
              as="a"
              href={PDF_PATH}
              target="_blank"
              rel="noopener"
              size="lg"
              leftIcon={<Icon as={FiBookOpen} />}
            >
              Read online
            </Button>
            <Button
              as="a"
              href={PDF_PATH}
              download="Naturally-Supernatural.pdf"
              size="lg"
              variant="outline"
              leftIcon={<Icon as={FiDownload} />}
            >
              Download PDF
            </Button>
          </Stack>
        </Box>
      </Grid>
    </Box>
  );
};

export default Biography;
