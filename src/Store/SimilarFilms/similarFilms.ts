import { SimilarFilmType } from '../../Types/film.ts';
import { createSlice } from '@reduxjs/toolkit';
import { fetchSimilarFilmsAction } from '../apiActions.ts';
import { Namespace } from '../namespace.ts';

type SimilarFilmsState = {
  isLoading: boolean;
  error?: string;
  data: Array<SimilarFilmType>;
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
