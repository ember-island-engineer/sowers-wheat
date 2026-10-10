import { extendTheme } from '@chakra-ui/react';

import { colors } from './colors';
import { components } from './components';
import { config } from './config';
import { fonts } from './fonts';

const customTheme = extendTheme({
  fonts,
  colors,
  config,
  components,
  styles: {
    global: {
      body: {
        bg: 'cream.50',
        color: 'ink',
        WebkitFontSmoothing: 'antialiased',
      },
      '::selection': {
        bg: 'gold.300',
      },
      // long-form content rendered from the HTML files in src/lib/data
      '.article': {
        fontSize: { base: '1.0625rem', md: '1.125rem' },
        lineHeight: 1.8,
        color: 'ink',
        overflowWrap: 'break-word',
      },
      '.article > :first-child': {
        marginTop: 0,
      },
      '.article p': {
        marginBottom: '1.15em',
      },
      // the source documents use <h1> for section headings
      '.article h1, .article h2, .article h3, .article h4': {
        fontFamily: 'heading',
        fontWeight: 700,
        color: 'brand.800',
        lineHeight: 1.3,
        marginTop: '1.9em',
        marginBottom: '0.6em',
      },
      '.article h1': { fontSize: '1.5em' },
      '.article h2': { fontSize: '1.3em' },
      '.article h3': { fontSize: '1.15em' },
      '.article h4': { fontSize: '1.05em' },
      '.article strong': { fontWeight: 700 },
      '.article ul, .article ol': {
        paddingLeft: '1.5em',
        marginBottom: '1.15em',
      },
      '.article li': { marginBottom: '0.4em' },
      '.article a': {
        color: 'brand.600',
        textDecoration: 'underline',
        textUnderlineOffset: '2px',
      },
      '.article img': {
        maxWidth: '100%',
        height: 'auto',
        borderRadius: 'md',
        marginY: '1.5em',
      },
      '.article table': {
        display: 'block',
        overflowX: 'auto',
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '1.15em',
        fontSize: '0.95em',
      },
      '.article td, .article th': {
        border: '1px solid',
        borderColor: 'cream.300',
        padding: '0.5em 0.75em',
        verticalAlign: 'top',
      },
      '.article sup': { lineHeight: 0 },
    },
  },
});

export default customTheme;
