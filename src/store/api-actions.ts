import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state.ts';
import {
  AddCommentType,
  CommentType,
  FilmListType,
  FilmType,
  PromoFilmType,
} from '../types/film.ts';
import { ApiRoutes } from '../services/api-routes.ts';
import { AuthData, UserData } from '../types/auth.ts';
import { dropToken, saveToken } from '../services/token.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchFilmsAction = createAsyncThunk<
  FilmListType[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFilms', async (_arg, { extra: api }) => {
  const { data } = await api.get<FilmListType[]>(ApiRoutes.Films);
  return data;
});

export const fetchFilmAction = createAsyncThunk<
  FilmType,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFilm', async (filmId, { extra: api }) => {
  const { data } = await api.get<FilmType>(ApiRoutes.Film(filmId));
  return data;
});

export const fetchPromoFilmAction = createAsyncThunk<
  PromoFilmType,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchPromoFilm', async (_arg, { extra: api }) => {
  const { data } = await api.get<PromoFilmType>(ApiRoutes.PromoFilm);
  return data;
});

export const fetchSimilarFilmsAction = createAsyncThunk<
  FilmListType[],
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchSimilarFilms', async (filmId, { extra: api }) => {
  const { data } = await api.get<FilmListType[]>(
    ApiRoutes.SimilarFilms(filmId),
  );
  return data;
});

export const fetchFavouriteFilmsAction = createAsyncThunk<
  FilmListType[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFavouriteFilms', async (_arg, { extra: api }) => {
  const { data } = await api.get<FilmListType[]>(ApiRoutes.FavoriteFilms);
  return data;
});

export const fetchCommentsAction = createAsyncThunk<
  CommentType[],
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchComments', async (filmId, { extra: api }) => {
  const { data } = await api.get<CommentType[]>(ApiRoutes.Comments(filmId));
  return data;
});

export const postCommentAction = createAsyncThunk<
  boolean,
  { filmId: string } & AddCommentType,
  {
    state: State;
    extra: AxiosInstance;
  }
>('data/postComment', async ({ filmId, ...comment }, { extra: api }) => {
  try {
    await api.post<CommentType>(ApiRoutes.Comments(filmId), comment);
    return true;
  } catch {
    return false;
  }
});

export const postFavouriteFilmAction = createAsyncThunk<
  boolean,
  { filmId: string; status: boolean },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/postFavouriteFilm', async ({ filmId, status }, { extra: api }) => {
  try {
    await api.post(ApiRoutes.FavoriteFilm(filmId, status));
    return true;
  } catch {
    return false;
  }
});

export const checkAuthAction = createAsyncThunk<
  UserData,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { extra: api }) => {
  const { data } = await api.get<UserData>(ApiRoutes.Login);
  return data;
});

export const loginAction = createAsyncThunk<
  UserData,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/login', async ({ email, password }, { extra: api }) => {
  const { data } = await api.post<UserData>(ApiRoutes.Login, {
    email,
    password,
  });
  saveToken(data.token);
  return data;
});

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { extra: api }) => {
  await api.delete(ApiRoutes.Logout);
  dropToken();
});
