import { createAction } from '@reduxjs/toolkit';
import { FilmType } from '../Types/film.ts';

export const setGenre = createAction<string>('films/setGenre');

export const setFilms = createAction<Array<FilmType>>('films/setFilms');
