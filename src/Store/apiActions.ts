import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../Types/state.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setFilms, setLoadingFilms } from './actions.ts';
import { FilmType } from '../Types/film.ts';
import { ApiRoutes } from '../Services/apiRoutes.ts';

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
