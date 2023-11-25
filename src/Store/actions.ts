import { createAction } from '@reduxjs/toolkit';
import { FilmType } from '../Types/film.ts';
import { AuthorizationStatus } from '../Types/auth.ts';

export const setGenre = createAction<string>('films/setGenre');

export const setFilms = createAction<Array<FilmType>>('films/setFilms');

export const setLoadingFilms = createAction<boolean>('films/setLoadingFilms');

export const setAuthorizationStatus = createAction<AuthorizationStatus>(
  'user/setAuthorizationStatus',
);

export const setAvatarLink = createAction<string>('user/setAvatarLink');
