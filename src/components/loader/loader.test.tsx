import { describe } from 'vitest';
import { Loader } from './loader.tsx';
import { render } from '@testing-library/react';

describe('loader', () => {
  const content = <div data-testid={'loader-content'}>content</div>;

  it('should not render content on loading', () => {
    const { queryByTestId } = render(<Loader isLoading>{content}</Loader>);
    expect(queryByTestId('loader-content')).toBeNull();
  });

  it('should render content on not loading', () => {
    const { getByTestId } = render(
      <Loader isLoading={false}>{content}</Loader>,
    );
    expect(getByTestId('loader-content')).toBeInTheDocument();
  });
});
