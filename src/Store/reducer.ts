import { createReducer } from '@reduxjs/toolkit';
import { setFilms, setGenre, setLoadingFilms } from './actions.ts';
import { ALL_GENRES, FilmType } from '../Types/film.ts';

type state = {
  currentGenre: string;
  allFilms: { isLoading: boolean; isError: boolean; films: Array<FilmType> };
};

const initialState: state = {
  currentGenre: ALL_GENRES,
  allFilms: { isLoading: false, isError: false, films: [] },
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGenre, (state, value) => {
      state.currentGenre = value.payload;
    })
    .addCase(setFilms, (state, value) => {
      state.allFilms.films = value.payload;
    })
    .addCase(setLoadingFilms, (state, value) => {
      state.allFilms.isLoading = value.payload;
    });
});

export { reducer };
