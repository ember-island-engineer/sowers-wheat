import { Box, Heading, Text } from '@chakra-ui/react';
import type { ReactNode } from 'react';

type Props = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
};

export const Eyebrow = ({
  children,
  color = 'gold.600',
}: {
  children: ReactNode;
  color?: string;
}) => (
  <Text
    fontSize="xs"
    fontWeight="bold"
    letterSpacing="0.16em"
    textTransform="uppercase"
    color={color}
  >
    {children}
  </Text>
);

const PageHeader = ({ eyebrow, title, description }: Props) => (
  <Box bg="cream.200" borderBottom="1px solid" borderColor="cream.300">
    <Box
      maxW="6xl"
      mx="auto"
      px={{ base: 4, md: 8 }}
      pt={{ base: 12, md: 20 }}
      pb={{ base: 10, md: 16 }}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Heading
        as="h1"
        mt={3}
        fontSize={{ base: '4xl', md: '5xl' }}
        fontWeight="normal"
        color="brand.800"
        lineHeight="1.1"
      >
        {title}
      </Heading>
      {description && (
        <Text
          mt={4}
          maxW="2xl"
          fontSize={{ base: 'md', md: 'lg' }}
          color="muted"
          lineHeight="tall"
        >
          {description}
        </Text>
      )}
    </Box>
  </Box>
);

export default PageHeader;
