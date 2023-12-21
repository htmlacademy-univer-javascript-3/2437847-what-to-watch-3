import { PromoFilmType } from '../../types/film.ts';
import { fetchPromoFilmAction } from '../api-actions.ts';
import { Namespace } from '../namespace.ts';
import { createSlice } from '@reduxjs/toolkit';

type PromoFilmState = {
  isLoading: boolean;
  error?: string;
  data?: PromoFilmType;
};

const initialState: PromoFilmState = {
  isLoading: false,
  data: undefined,
};

export const promoFilm = createSlice({
  name: Namespace.PromoFilm,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPromoFilmAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPromoFilmAction.fulfilled, (state, value) => {
        state.isLoading = false;
        state.error = undefined;
        state.data = value.payload;
      })
      .addCase(fetchPromoFilmAction.rejected, (state, value) => {
        state.isLoading = false;
        state.error = value.error.message;
      });
  },
});
