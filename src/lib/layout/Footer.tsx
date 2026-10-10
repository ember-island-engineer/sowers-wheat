import {
  Box,
  Flex,
  Grid,
  HStack,
  Icon,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';

import { Logo } from './Header';
import { CONTACT, routes } from './routes';

const Footer = () => {
  return (
    <Box as="footer" bg="brand.800" color="brand.100">
      <Grid
        maxW="6xl"
        mx="auto"
        px={{ base: 4, md: 8 }}
        py={{ base: 12, md: 16 }}
        gap={{ base: 10, md: 8 }}
        templateColumns={{ base: '1fr', md: '2fr 1fr 1fr' }}
      >
        <Box maxW="sm">
          <Logo light />
          <Text mt={4} fontSize="sm" lineHeight="tall" color="brand.200">
            Teaching the full counsel of God’s Word to equip and prepare the
            saints for the work of ministry. Operating by faith since 1998.
          </Text>
        </Box>
        <Box>
          <Text
            fontSize="xs"
            fontWeight="bold"
            letterSpacing="widest"
            textTransform="uppercase"
            color="gold.300"
            mb={4}
          >
            Explore
          </Text>
          <Stack spacing={2} fontSize="sm">
            {routes.slice(1).map((route) => (
              <Link
                as={NextLink}
                key={route.path}
                href={route.path}
                _hover={{ color: 'white' }}
              >
                {route.name}
              </Link>
            ))}
          </Stack>
        </Box>
        <Box>
          <Text
            fontSize="xs"
            fontWeight="bold"
            letterSpacing="widest"
            textTransform="uppercase"
            color="gold.300"
            mb={4}
          >
            Get in touch
          </Text>
          <Stack spacing={3} fontSize="sm">
            <Link
              href={CONTACT.whatsapp}
              isExternal
              _hover={{ color: 'white' }}
            >
              <HStack>
                <Icon as={FaWhatsapp} boxSize={4} />
                <Text>WhatsApp</Text>
              </HStack>
            </Link>
            <Link href={CONTACT.email} _hover={{ color: 'white' }}>
              <HStack>
                <Icon as={MdOutlineEmail} boxSize={4} />
                <Text>{CONTACT.emailAddress}</Text>
              </HStack>
            </Link>
          </Stack>
        </Box>
      </Grid>
      <Flex
        borderTop="1px solid"
        borderColor="whiteAlpha.200"
        justify="center"
        py={6}
        px={4}
      >
        <Text fontSize="xs" color="brand.300">
          © {new Date().getFullYear()} Sower’s Wheat. All rights reserved.
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
