import ErrorPage from '~/lib/components/ErrorPage';

const Page404 = () => (
  <ErrorPage
    code="404"
    title="Page not found"
    description="The page you’re looking for may have moved or no longer exists."
  />
);

export default Page404;
