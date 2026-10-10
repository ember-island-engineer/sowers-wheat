import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { FaPaypal } from 'react-icons/fa';

import { CONTACT } from '~/lib/layout/routes';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const DonateModal = ({ isOpen, onClose }: Props) => (
  <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
    <ModalOverlay bg="blackAlpha.500" backdropFilter="blur(2px)" />
    <ModalContent borderRadius="2xl" mx={4}>
      <ModalCloseButton />
      <ModalBody px={8} pt={10} pb={8} textAlign="center">
        <Heading size="lg" color="brand.800">
          Support the ministry
        </Heading>
        <Text mt={2} color="muted" fontSize="sm">
          Sower’s Wheat has operated by faith since 1998. Thank you for
          partnering with us.
        </Text>
        <Box
          mt={6}
          mx="auto"
          w="200px"
          p={3}
          bg="white"
          borderRadius="xl"
          border="1px solid"
          borderColor="cream.300"
        >
          <Image src="/paynow.png" alt="PayNow QR code" w="100%" />
        </Box>
        <Text mt={2} fontSize="sm" color="muted">
          Scan with any PayNow-enabled banking app
        </Text>
        <Flex align="center" my={6} gap={3}>
          <Divider borderColor="cream.300" />
          <Text fontSize="sm" color="muted">
            or
          </Text>
          <Divider borderColor="cream.300" />
        </Flex>
        <Button
          as="a"
          href={CONTACT.paypal}
          target="_blank"
          rel="noopener noreferrer"
          w="full"
          variant="outline"
          leftIcon={<Icon as={FaPaypal} />}
        >
          Give with PayPal
        </Button>
      </ModalBody>
    </ModalContent>
  </Modal>
);

export default DonateModal;
