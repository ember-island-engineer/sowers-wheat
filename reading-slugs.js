/** Public reading URLs are independent of the numbered source filenames. */
const readingSlug = (name) =>
  name
    .replace(/\.html$/i, '')
    .replace(/^\d+\)\s*-?/, '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&(?:amp;)?/g, ' and ')
    .replace(/['’]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

module.exports = { readingSlug };
