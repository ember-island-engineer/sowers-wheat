const description =
  'Devotions, articles and New Testament expositions by Adrian and Mae Chua — restoring intimacy in marriages through Biblical principles.';

/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: 'Sower’s Wheat',
  titleTemplate: '%s | Sower’s Wheat',
  defaultTitle: 'Sower’s Wheat',
  description,
  openGraph: {
    url: 'https://sowerswheat.com',
    title: 'Sower’s Wheat',
    description,
    images: [
      {
        url: 'https://sowerswheat.com/assets/madagascar.jpeg',
        alt: 'Adrian and Mae Chua at a marriage seminar in Madagascar',
      },
    ],
    site_name: 'Sower’s Wheat',
  },
};

export default defaultSEOConfig;
