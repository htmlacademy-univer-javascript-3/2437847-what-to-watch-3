import { describe } from 'vitest';
import { Rating } from './rating.tsx';
import { act, render } from '@testing-library/react';

describe('rating', () => {
  it('should set rating correctly', () => {
    let currentRating = 0;
    const onClick = (value: number) => {
      currentRating = value;
    };

    const { getByTestId } = render(<Rating onClick={onClick} />);

    act(() => {
      for (let i = 1; i <= 10; i++) {
        getByTestId(`star-${i}`).click();
        expect(currentRating).toBe(i);
      }
    });
  });
});
