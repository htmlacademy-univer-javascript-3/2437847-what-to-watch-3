import { describe } from 'vitest';
import { similarFilms } from './similar-films.ts';
import { fetchSimilarFilmsAction } from '../api-actions.ts';
import { createFilm } from '../../mocks/factory.ts';

describe('similar-films', () => {
  const films = [createFilm(), createFilm()];
  const initialState = {
    isLoading: false,
    data: [],
  };

  it('should set loading state', () => {
    expect(
      similarFilms.reducer(initialState, {
        type: fetchSimilarFilmsAction.pending.type,
      }),
    ).toEqual({
      isLoading: true,
      data: [],
    });
  });

  it('should save film to store', () => {
    expect(
      similarFilms.reducer(initialState, {
        type: fetchSimilarFilmsAction.fulfilled.type,
        payload: films,
      }),
    ).toEqual({
      isLoading: false,
      data: films,
    });
  });

  it('should set error', () => {
    expect(
      similarFilms.reducer(initialState, {
        type: fetchSimilarFilmsAction.rejected.type,
        error: { message: 'error' },
      }),
    ).toEqual({
      isLoading: false,
      data: [],
      error: 'error',
    });
  });
});
