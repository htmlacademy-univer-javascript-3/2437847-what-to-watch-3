import { createAction } from '@reduxjs/toolkit';
import {
  CommentType,
  FilmListType,
  FilmType,
  SimilarFilmType,
} from '../Types/film.ts';
import { AuthorizationStatus } from '../Types/auth.ts';

export const setGenre = createAction<string>('films/setGenre');

export const setFilms = createAction<Array<FilmListType>>('films/setFilms');
export const setLoadingFilms = createAction<boolean>('films/setLoadingFilms');

export const setAuthorizationStatus = createAction<AuthorizationStatus>(
  'user/setAuthorizationStatus',
);

export const setAvatarLink = createAction<string>('user/setAvatarLink');

export const setFilm = createAction<FilmType>('films/setFilm');
export const setLoadingFilm = createAction<boolean>('films/setLoadingFilm');
export const setErrorMessageFilm = createAction<string>(
  'films/setErrorMessage',
);

export const setSimilarFilms = createAction<Array<SimilarFilmType>>(
  'films/setSimilarFilms',
);
export const setLoadingSimilarFilms = createAction<boolean>(
  'films/setLoadingSimilarFilms',
);

export const setComments =
  createAction<Array<CommentType>>('films/setComments');
export const setLoadingComments = createAction<boolean>(
  'films/setLoadingComments',
);
