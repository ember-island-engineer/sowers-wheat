export const routes = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Biography', path: '/biography' },
  { name: 'Devotions', path: '/devotions' },
  { name: 'Articles', path: '/articles' },
  { name: 'Expositions', path: '/expositions' },
];

export const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/send?phone=6594566907',
  email: 'mailto:sowerswheat777@gmail.com',
  emailAddress: 'sowerswheat777@gmail.com',
  paypal:
    'https://www.paypal.com/paypalme/sowerswheat?country.x=SG&locale.x=en_GB',
};

export const isActiveRoute = (pathname: string, path: string) =>
  path === '/' ? pathname === '/' : pathname.startsWith(path);
