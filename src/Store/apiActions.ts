import { AxiosError, AxiosInstance } from 'axios';
import { AppDispatch, State } from '../Types/state.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  setAuthorizationStatus,
  setAvatarLink,
  setComments,
  setErrorMessageFilm,
  setFilm,
  setFilms,
  setLoadingComments,
  setLoadingFilm,
  setLoadingFilms,
  setLoadingPromoFilm,
  setLoadingSimilarFilms,
  setPromoFilm,
  setSimilarFilms,
} from './actions.ts';
import {
  AddCommentType,
  CommentType,
  FilmListType,
  FilmType,
  PromoFilmType,
  SimilarFilmType,
} from '../Types/film.ts';
import { ApiRoutes } from '../Services/apiRoutes.ts';
import { AuthData, AuthorizationStatus, UserData } from '../Types/auth.ts';
import { dropToken, saveToken } from '../Services/token.ts';
import { ErrorType } from '../Types/error.ts';

export const fetchFilmsAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFilms', async (_arg, { dispatch, extra: api }) => {
  dispatch(setLoadingFilms(true));
  const { data } = await api.get<FilmListType[]>(ApiRoutes.Films);
  dispatch(setLoadingFilms(false));
  dispatch(setFilms(data));
});

export const fetchFilmAction = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFilms', async (filmId, { dispatch, extra: api }) => {
  dispatch(setLoadingFilm(true));
  try {
    const { data } = await api.get<FilmType>(ApiRoutes.Film(filmId));
    dispatch(setLoadingFilm(false));
    dispatch(setErrorMessageFilm(''));
    dispatch(setFilm(data));
  } catch (error) {
    const err = error as AxiosError<ErrorType>;
    dispatch(setLoadingFilm(false));
    dispatch(setErrorMessageFilm(err.response?.data.message));
  }
});

export const fetchPromoFilmAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchPromoFilm', async (_arg, { dispatch, extra: api }) => {
  dispatch(setLoadingPromoFilm(true));
  const { data } = await api.get<PromoFilmType>(ApiRoutes.PromoFilm);
  dispatch(setLoadingPromoFilm(false));
  dispatch(setPromoFilm(data));
});

export const fetchSimilarFilmsAction = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchSimilarFilms', async (filmId, { dispatch, extra: api }) => {
  dispatch(setLoadingSimilarFilms(true));
  const { data } = await api.get<SimilarFilmType[]>(
    ApiRoutes.SimilarFilms(filmId),
  );
  dispatch(setLoadingSimilarFilms(false));
  dispatch(setSimilarFilms(data));
});

export const fetchCommentsAction = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchComments', async (filmId, { dispatch, extra: api }) => {
  dispatch(setLoadingComments(true));
  const { data } = await api.get<CommentType[]>(ApiRoutes.Comments(filmId));
  dispatch(setLoadingComments(false));
  dispatch(setComments(data));
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
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  try {
    const { data: user } = await api.get<UserData>(ApiRoutes.Login);
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(setAvatarLink(user.avatarUrl));
  } catch {
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
  }
});

export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/login', async ({ email, password }, { dispatch, extra: api }) => {
  const {
    data: { avatarUrl, token },
  } = await api.post<UserData>(ApiRoutes.Login, { email, password });
  saveToken(token);
  dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
  dispatch(setAvatarLink(avatarUrl));
});

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  await api.delete(ApiRoutes.Logout);
  dropToken();
  dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
});
