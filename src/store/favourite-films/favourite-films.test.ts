import { describe } from 'vitest';
import { favouriteFilms } from './favourite-films.ts';
import { fetchFavouriteFilmsAction } from '../api-actions.ts';
import { createFilm } from '../../mocks/factory.ts';

describe('favourite-films', () => {
  const film = createFilm();
  const initialState = {
    isLoading: false,
    data: [],
  };

  it('should set loading state', () => {
    expect(
      favouriteFilms.reducer(initialState, {
        type: fetchFavouriteFilmsAction.pending.type,
      }),
    ).toEqual({
      isLoading: true,
      data: [],
    });
  });

  it('should save film to store', () => {
    expect(
      favouriteFilms.reducer(initialState, {
        type: fetchFavouriteFilmsAction.fulfilled.type,
        payload: [film],
      }),
    ).toEqual({
      isLoading: false,
      data: [film],
    });
  });

  it('should set error', () => {
    expect(
      favouriteFilms.reducer(initialState, {
        type: fetchFavouriteFilmsAction.rejected.type,
        error: { message: 'error' },
      }),
    ).toEqual({
      isLoading: false,
      data: [],
      error: 'error',
    });
  });
});
