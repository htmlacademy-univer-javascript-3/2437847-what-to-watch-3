import { describe, expect } from 'vitest';
import { films } from './films.ts';
import { fetchFilmsAction } from '../api-actions.ts';
import { createFilm } from '../../mocks/factory.ts';
import { ALL_GENRES } from '../../types/film.ts';

describe('films', () => {
  const filmsList = [createFilm(), createFilm({ genre: 'genre' })];
  const initialState = {
    isLoading: false,
    currentGenre: ALL_GENRES,
    data: [],
  };

  it('should set loading state', () => {
    expect(
      films.reducer(initialState, {
        type: fetchFilmsAction.pending.type,
      }),
    ).toEqual({
      isLoading: true,
      currentGenre: ALL_GENRES,
      data: [],
    });
  });

  it('should save film to store', () => {
    expect(
      films.reducer(initialState, {
        type: fetchFilmsAction.fulfilled.type,
        payload: filmsList,
      }),
    ).toEqual({
      isLoading: false,
      currentGenre: ALL_GENRES,
      data: filmsList,
    });
  });

  it('should set error', () => {
    expect(
      films.reducer(initialState, {
        type: fetchFilmsAction.rejected.type,
        error: { message: 'error' },
      }),
    ).toEqual({
      isLoading: false,
      data: [],
      currentGenre: ALL_GENRES,
      error: 'error',
    });
  });

  it('should set genre', () => {
    expect(
      films.reducer(initialState, {
        type: 'films/setGenre',
        payload: 'genre',
      }),
    ).toEqual({
      isLoading: false,
      data: [],
      currentGenre: 'genre',
    });
  });

  it('should not filter in action', () => {
    expect(
      films.reducer(
        {
          isLoading: false,
          data: filmsList,
          currentGenre: ALL_GENRES,
        },
        {
          type: 'films/setGenre',
          payload: 'genre',
        },
      ),
    ).toEqual({
      isLoading: false,
      data: filmsList,
      currentGenre: 'genre',
    });
  });
});
