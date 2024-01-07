import { describe } from 'vitest';
import { film } from './film.ts';
import { fetchFilmAction } from '../api-actions.ts';
import { createCurrentFilm } from '../../mocks/factory.ts';

describe('film', () => {
  const filmItem = createCurrentFilm();
  const initialState = {
    isLoading: false,
    data: undefined,
  };

  it('should set loading state', () => {
    expect(
      film.reducer(initialState, {
        type: fetchFilmAction.pending.type,
      }),
    ).toEqual({
      isLoading: true,
      data: undefined,
    });
  });

  it('should save film to store', () => {
    expect(
      film.reducer(initialState, {
        type: fetchFilmAction.fulfilled.type,
        payload: filmItem,
      }),
    ).toEqual({
      isLoading: false,
      data: filmItem,
    });
  });

  it('should set error', () => {
    expect(
      film.reducer(initialState, {
        type: fetchFilmAction.rejected.type,
        error: { message: 'error' },
      }),
    ).toEqual({
      isLoading: false,
      data: undefined,
      error: 'error',
    });
  });
});
