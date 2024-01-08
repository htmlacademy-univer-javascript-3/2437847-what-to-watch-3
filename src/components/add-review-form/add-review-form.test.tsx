import { describe } from 'vitest';
import { AddReviewForm } from './add-review-form.tsx';
import { act, fireEvent, render } from '@testing-library/react';
import { store } from '../../store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

describe('add-review-form', () => {
  it('should button disabled on empty form', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <AddReviewForm />
        </BrowserRouter>
      </Provider>,
    );
    const submitButton = getByText('Post');

    expect(submitButton).toHaveAttribute('disabled');
  });

  it('should button disabled on empty comment', () => {
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <AddReviewForm />
        </BrowserRouter>
      </Provider>,
    );
    const submitButton = getByText('Post');
    const ratingButton = getByTestId('star-1');

    act(() => {
      ratingButton.click();
    });
    expect(submitButton).toHaveAttribute('disabled');
  });

  it('should button enabled on filled form', () => {
    const { getByText, getByTestId, getByPlaceholderText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <AddReviewForm />
        </BrowserRouter>
      </Provider>,
    );
    const submitButton = getByText('Post');
    const ratingButton = getByTestId('star-1');
    const commentInput = getByPlaceholderText('Review text');

    act(() => {
      ratingButton.click();
      fireEvent.change(commentInput, { target: { value: 'a'.repeat(100) } });
    });
    expect(submitButton).not.toHaveAttribute('disabled');
  });
});
