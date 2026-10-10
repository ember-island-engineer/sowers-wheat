import type { ComponentStyleConfig } from '@chakra-ui/react';

export const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: 'full',
    fontWeight: '700',
    letterSpacing: '0.01em',
  },
  variants: {
    solid: {
      bg: 'brand.500',
      color: 'white',
      _hover: { bg: 'brand.600', _disabled: { bg: 'brand.500' } },
      _active: { bg: 'brand.700' },
    },
    outline: {
      borderColor: 'brand.500',
      color: 'brand.600',
      _hover: { bg: 'brand.50' },
      _active: { bg: 'brand.100' },
    },
    light: {
      bg: 'white',
      color: 'brand.700',
      _hover: { bg: 'cream.100' },
      _active: { bg: 'cream.200' },
    },
  },
  defaultProps: {
    variant: 'solid',
  },
};
