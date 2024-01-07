import { FilmListType } from '../../types/film.ts';
import { fetchSimilarFilmsAction } from '../api-actions.ts';
import { Namespace } from '../namespace.ts';
import { createSlice } from '@reduxjs/toolkit';

type SimilarFilmsState = {
  isLoading: boolean;
  error?: string;
  data: Array<FilmListType>;
};

const initialState: SimilarFilmsState = {
  isLoading: false,
  data: [],
};

export const similarFilms = createSlice({
  name: Namespace.SimilarFilms,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSimilarFilmsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSimilarFilmsAction.fulfilled, (state, value) => {
        state.isLoading = false;
        state.error = undefined;
        state.data = value.payload;
      })
      .addCase(fetchSimilarFilmsAction.rejected, (state, value) => {
        state.isLoading = false;
        state.error = value.error.message;
      });
  },
});
