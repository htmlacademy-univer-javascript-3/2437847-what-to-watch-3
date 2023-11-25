import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../Types/state.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  setAuthorizationStatus,
  setAvatarLink,
  setFilms,
  setLoadingFilms,
} from './actions.ts';
import { FilmType } from '../Types/film.ts';
import { ApiRoutes } from '../Services/apiRoutes.ts';
import { AuthData, AuthorizationStatus, UserData } from '../Types/auth.ts';
import { dropToken, saveToken } from '../Services/token.ts';

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
  const { data } = await api.get<FilmType[]>(ApiRoutes.Films);
  dispatch(setLoadingFilms(false));
  dispatch(setFilms(data));
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
  console.log(token);
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
