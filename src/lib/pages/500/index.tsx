import ErrorPage from '~/lib/components/ErrorPage';

const Page500 = () => (
  <ErrorPage
    code="500"
    title="Something went wrong"
    description="An error occurred on our side. Please try again in a moment."
  />
);

export default Page500;
