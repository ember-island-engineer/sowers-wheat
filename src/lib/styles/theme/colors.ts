import type { DeepPartial, Theme } from '@chakra-ui/react';

/** extend additional color here */
const extendedColors: Record<string, string | Record<number, string>> = {
  // sage green, the site's signature colour (#5E6D55)
  brand: {
    50: '#F3F5F1',
    100: '#E1E7DD',
    200: '#C4CFBD',
    300: '#A3B29A',
    400: '#7F8F76',
    500: '#5E6D55',
    600: '#4D5A45',
    700: '#3E4838',
    800: '#2F372B',
    900: '#20261D',
  },
  // warm paper tones
  cream: {
    50: '#FDFBF7',
    100: '#FAF6EE',
    200: '#F3E9D9',
    300: '#E8D8BE',
    400: '#D9C3A0',
  },
  // wheat gold, taken from the logo
  gold: {
    300: '#DCC08A',
    400: '#C9A45C',
    500: '#B08A3E',
    600: '#8E6E2F',
  },
  ink: '#1F2620',
  muted: '#5B6157',
};

/** override chakra colors here */
const overridenChakraColors: DeepPartial<Theme['colors']> = {};

export const colors = {
  ...overridenChakraColors,
  ...extendedColors,
};
