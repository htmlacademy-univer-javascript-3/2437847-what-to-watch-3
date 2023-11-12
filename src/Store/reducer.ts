import { createReducer } from '@reduxjs/toolkit';
import { setFilms, setGenre } from './action.ts';
import { FILMS } from '../Mocks/Films.ts';
import { FilmType } from '../Types/film.ts';

type state = {
  currentGenre: string;
  allFilms: Array<FilmType>;
};

const initialState: state = {
  currentGenre: 'All genres',
  allFilms: FILMS,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGenre, (state, value) => {
      state.currentGenre = value.payload;
    })
    .addCase(setFilms, (state, value) => {
      state.allFilms = value.payload;
    });
});

export { reducer };
