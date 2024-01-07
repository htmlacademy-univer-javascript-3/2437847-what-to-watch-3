import { FilmListType } from '../../types/film.ts';
import { createSlice } from '@reduxjs/toolkit';
import { fetchFavouriteFilmsAction } from '../api-actions.ts';
import { Namespace } from '../namespace.ts';

type FavouriteFilmsState = {
  isLoading: boolean;
  error?: string;
  data: Array<FilmListType>;
};

const initialState: FavouriteFilmsState = {
  isLoading: false,
  data: [],
};

export const favouriteFilms = createSlice({
  name: Namespace.FavouriteFilms,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavouriteFilmsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFavouriteFilmsAction.fulfilled, (state, value) => {
        state.isLoading = false;
        state.error = undefined;
        state.data = value.payload;
      })
      .addCase(fetchFavouriteFilmsAction.rejected, (state, value) => {
        state.isLoading = false;
        state.error = value.error.message;
      });
  },
});
