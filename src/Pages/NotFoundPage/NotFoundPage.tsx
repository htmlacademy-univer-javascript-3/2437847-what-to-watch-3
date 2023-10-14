import { Link } from 'react-router-dom';

export const NotFoundPage = () => (
  <>
    <h1>Page not found</h1>
    <p>
      <Link to={'/'}>Go to main page</Link>
    </p>
  </>
);
