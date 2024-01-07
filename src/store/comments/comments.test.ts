import { describe } from 'vitest';
import { createComment } from '../../mocks/factory.ts';
import { comments } from './comments.ts';
import { fetchCommentsAction } from '../api-actions.ts';

describe('comments', () => {
  const comment = createComment();
  const initialState = {
    isLoading: false,
    data: [],
  };

  it('should set loading state', () => {
    expect(
      comments.reducer(initialState, {
        type: fetchCommentsAction.pending.type,
      }),
    ).toEqual({
      isLoading: true,
      data: [],
    });
  });

  it('should save comment to store', () => {
    expect(
      comments.reducer(initialState, {
        type: fetchCommentsAction.fulfilled.type,
        payload: [comment],
      }),
    ).toEqual({
      isLoading: false,
      data: [comment],
    });
  });
  it('should set error', () => {
    expect(
      comments.reducer(initialState, {
        type: fetchCommentsAction.rejected.type,
        error: { message: 'error' },
      }),
    ).toEqual({
      isLoading: false,
      data: [],
      error: 'error',
    });
  });
});
