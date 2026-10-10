import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Image,
  Link,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';

import DonateModal from '~/lib/components/DonateModal';

import { isActiveRoute, routes } from './routes';

export const Logo = ({ light = false }: { light?: boolean }) => (
  <Link
    as={NextLink}
    href="/"
    display="flex"
    alignItems="center"
    gap={3}
    _hover={{ textDecoration: 'none' }}
  >
    <Image src="/assets/logo-192.png" alt="" w="44px" h="44px" />
    <Text
      fontFamily="heading"
      fontWeight="bold"
      fontSize="xl"
      color={light ? 'white' : 'brand.800'}
      whiteSpace="nowrap"
    >
      Sower’s Wheat
    </Text>
  </Link>
);

const Header = () => {
  const { pathname, events } = useRouter();
  const donate = useDisclosure();
  const menu = useDisclosure();

  useEffect(() => {
    events.on('routeChangeStart', menu.onClose);
    return () => events.off('routeChangeStart', menu.onClose);
  }, [events, menu.onClose]);

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex="sticky"
      bg="rgba(253, 251, 247, 0.92)"
      backdropFilter="saturate(180%) blur(10px)"
      borderBottom="1px solid"
      borderColor="cream.300"
    >
      <Flex
        maxW="6xl"
        mx="auto"
        px={{ base: 4, md: 8 }}
        h={{ base: '64px', md: '76px' }}
        align="center"
        justify="space-between"
      >
        <Logo />
        <HStack as="nav" spacing={1} display={{ base: 'none', lg: 'flex' }}>
          {routes.map((route) => {
            const active = isActiveRoute(pathname, route.path);
            return (
              <Link
                as={NextLink}
                key={route.path}
                href={route.path}
                px={3}
                py={2}
                fontSize="sm"
                fontWeight={active ? '700' : '500'}
                color={active ? 'brand.800' : 'muted'}
                position="relative"
                _hover={{ color: 'brand.800', textDecoration: 'none' }}
                _after={{
                  content: '""',
                  position: 'absolute',
                  left: 3,
                  right: 3,
                  bottom: 0,
                  height: '2px',
                  borderRadius: 'full',
                  bg: active ? 'gold.400' : 'transparent',
                }}
              >
                {route.name}
              </Link>
            );
          })}
        </HStack>
        <HStack spacing={2}>
          <Button size={{ base: 'sm', md: 'md' }} onClick={donate.onOpen}>
            Donate
          </Button>
          <IconButton
            aria-label="Open menu"
            icon={<HiOutlineMenuAlt3 size={22} />}
            variant="ghost"
            color="brand.800"
            display={{ base: 'inline-flex', lg: 'none' }}
            onClick={menu.onOpen}
          />
        </HStack>
      </Flex>

      <Drawer isOpen={menu.isOpen} onClose={menu.onClose} placement="right">
        <DrawerOverlay />
        <DrawerContent bg="cream.50">
          <DrawerCloseButton mt={3} />
          <DrawerBody pt={20} px={6}>
            <Stack as="nav" spacing={1}>
              {routes.map((route) => {
                const active = isActiveRoute(pathname, route.path);
                return (
                  <Link
                    as={NextLink}
                    key={route.path}
                    href={route.path}
                    fontFamily="heading"
                    fontSize="2xl"
                    py={2}
                    color={active ? 'brand.800' : 'muted'}
                    fontWeight={active ? '700' : '400'}
                    borderLeft="3px solid"
                    borderColor={active ? 'gold.400' : 'transparent'}
                    pl={4}
                    _hover={{ textDecoration: 'none', color: 'brand.800' }}
                  >
                    {route.name}
                  </Link>
                );
              })}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <DonateModal isOpen={donate.isOpen} onClose={donate.onClose} />
    </Box>
  );
};

export default Header;
