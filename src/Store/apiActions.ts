import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../Types/state.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AddCommentType,
  CommentType,
  FilmListType,
  FilmType,
  PromoFilmType,
  SimilarFilmType,
} from '../Types/film.ts';
import { ApiRoutes } from '../Services/apiRoutes.ts';
import { AuthData, UserData } from '../Types/auth.ts';
import { dropToken, saveToken } from '../Services/token.ts';

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
  SimilarFilmType[],
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchSimilarFilms', async (filmId, { extra: api }) => {
  const { data } = await api.get<SimilarFilmType[]>(
    ApiRoutes.SimilarFilms(filmId),
  );
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
