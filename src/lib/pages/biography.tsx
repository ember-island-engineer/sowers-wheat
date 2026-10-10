import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import { FaBookOpen, FaDownload } from 'react-icons/fa';

const PDF_PATH = '/books/naturally-supernatural.pdf';

const Biography = () => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="70vh"
      mb={8}
      w="full"
    >
      <NextSeo
        title="Naturally Supernatural"
        description="The Life and Faith Journey of Adrian & Mae Chua, by Vinny Tan."
      />
      <Flex
        bg="#F3E9D9"
        w="full"
        p={9}
        justify="center"
        align="center"
        gap={{ base: 8, md: 14 }}
        flexDir={{ base: 'column', md: 'row' }}
      >
        <Flex
          direction="column"
          align="center"
          justify="space-between"
          bg="white"
          w={{ base: '220px', md: '280px' }}
          h={{ base: '311px', md: '396px' }}
          flexShrink={0}
          py={{ base: 12, md: 16 }}
          px={4}
          borderRadius="sm"
          boxShadow="xl"
          textAlign="center"
        >
          <Box>
            <Heading fontSize={{ base: '2xl', md: '3xl' }} lineHeight="short">
              Naturally Supernatural
            </Heading>
            <Text mt={3} fontSize={{ base: 'xs', md: 'sm' }}>
              The Life and Faith Journey of Adrian & Mae Chua
            </Text>
          </Box>
          <Text fontSize={{ base: 'sm', md: 'md' }}>Vinny Tan</Text>
        </Flex>
        <Box w={{ md: '45%', base: 'full' }}>
          <Heading fontSize={{ md: '4xl', base: '3xl' }} fontWeight="light">
            Naturally Supernatural
          </Heading>
          <Text mt={1} mb={5} fontStyle="italic">
            The Life and Faith Journey of Adrian & Mae Chua — by Vinny Tan
          </Text>
          <Text mb={2}>
            This biography tells the story of Adrian and Mae Chua, the founders
            of Sower’s Wheat. It follows Adrian from a Buddhist childhood shaped
            by superstition and a fast-paced career in insurance, through his
            call to live by faith, and on to more than thirty years of ministry,
            provision and mission together with Mae and their daughter Rachael.
          </Text>
          <Text mb={2}>
            Written by Vinny Tan, whom Adrian and Mae mentored in marriage, the
            book draws on notes kept across decades of ministry, recorded
            interviews and many conversations along the way, and closes with a
            section of personal accounts, <i>In Their Own Words</i>.
          </Text>
          <Text mb={6} fontSize="sm" color="gray.600">
            174 pages · PDF · 3.1 MB
          </Text>
          <Stack direction={{ base: 'column', sm: 'row' }} spacing={3}>
            <Button
              as={Link}
              href={PDF_PATH}
              isExternal
              leftIcon={<Icon as={FaBookOpen} />}
              bgColor="#5E6D55"
              color="white"
              _hover={{ bgColor: '#4C5A45', textDecoration: 'none' }}
            >
              Read online
            </Button>
            <Button
              as="a"
              href={PDF_PATH}
              download="Naturally-Supernatural.pdf"
              leftIcon={<Icon as={FaDownload} />}
              variant="outline"
              borderColor="#5E6D55"
              color="#5E6D55"
            >
              Download PDF
            </Button>
          </Stack>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Biography;
