import { createReducer } from '@reduxjs/toolkit';
import {
  setAuthorizationStatus,
  setAvatarLink,
  setFilms,
  setGenre,
  setLoadingFilms,
} from './actions.ts';
import { ALL_GENRES, FilmType } from '../Types/film.ts';
import { AuthorizationStatus } from '../Types/auth.ts';

type state = {
  currentGenre: string;
  allFilms: { isLoading: boolean; isError: boolean; films: Array<FilmType> };
  user: {
    avatarLink: string;
    authorizationStatus: AuthorizationStatus;
  };
};

const initialState: state = {
  currentGenre: ALL_GENRES,
  allFilms: { isLoading: false, isError: false, films: [] },
  user: {
    authorizationStatus: AuthorizationStatus.Unknown,
    avatarLink: '',
  },
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGenre, (state, value) => {
      state.currentGenre = value.payload;
    })
    .addCase(setFilms, (state, value) => {
      state.allFilms.films = value.payload;
    })
    .addCase(setLoadingFilms, (state, value) => {
      state.allFilms.isLoading = value.payload;
    })
    .addCase(setAuthorizationStatus, (state, value) => {
      state.user.authorizationStatus = value.payload;
    })
    .addCase(setAvatarLink, (state, value) => {
      state.user.avatarLink = value.payload;
    });
});

export { reducer };
