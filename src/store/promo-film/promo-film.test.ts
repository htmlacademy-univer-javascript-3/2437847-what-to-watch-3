import { describe } from 'vitest';
import { promoFilm } from './promo-film.ts';
import { fetchPromoFilmAction } from '../api-actions.ts';
import { createPromoFilm } from '../../mocks/factory.ts';

describe('promo-film', () => {
  const promoFilmItem = createPromoFilm();
  const initialState = {
    isLoading: false,
    data: undefined,
  };

  it('should set loading state', () => {
    expect(
      promoFilm.reducer(initialState, {
        type: fetchPromoFilmAction.pending.type,
      }),
    ).toEqual({
      isLoading: true,
      data: undefined,
    });
  });

  it('should save promoFilm to store', () => {
    expect(
      promoFilm.reducer(initialState, {
        type: fetchPromoFilmAction.fulfilled.type,
        payload: promoFilmItem,
      }),
    ).toEqual({
      isLoading: false,
      data: promoFilmItem,
    });
  });

  it('should set error', () => {
    expect(
      promoFilm.reducer(initialState, {
        type: fetchPromoFilmAction.rejected.type,
        error: { message: 'error' },
      }),
    ).toEqual({
      isLoading: false,
      data: undefined,
      error: 'error',
    });
  });
});
