import { FilmType } from '../../types/film.ts';
import { fetchFilmAction } from '../api-actions.ts';
import { Namespace } from '../namespace.ts';
import { createSlice } from '@reduxjs/toolkit';

type FilmState = {
  isLoading: boolean;
  error?: string;
  data?: FilmType;
};

const initialState: FilmState = {
  isLoading: false,
  data: undefined,
};

export const film = createSlice({
  name: Namespace.Film,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilmAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFilmAction.fulfilled, (state, value) => {
        state.isLoading = false;
        state.error = undefined;
        state.data = value.payload;
      })
      .addCase(fetchFilmAction.rejected, (state, value) => {
        state.isLoading = false;
        state.error = value.error.message;
      });
  },
});
