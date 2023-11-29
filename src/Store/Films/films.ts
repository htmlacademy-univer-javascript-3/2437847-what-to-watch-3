import { ALL_GENRES, FilmListType } from '../../Types/film.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchFilmsAction } from '../apiActions.ts';
import { Namespace } from '../namespace.ts';

type FilmsState = {
  isLoading: boolean;
  error?: string;
  data: Array<FilmListType>;
  currentGenre: string;
};

const initialState: FilmsState = {
  isLoading: false,
  data: [],
  currentGenre: ALL_GENRES,
};

export const films = createSlice({
  name: Namespace.Films,
  initialState,
  reducers: {
    setGenre: (state, action: PayloadAction<string>) => {
      state.currentGenre = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilmsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, value) => {
        state.isLoading = false;
        state.error = undefined;
        state.data = value.payload;
      })
      .addCase(fetchFilmsAction.rejected, (state, value) => {
        state.isLoading = false;
        state.error = value.error.message;
      });
  },
});

export const { setGenre } = films.actions;
