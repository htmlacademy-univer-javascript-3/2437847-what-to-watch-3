import { createReducer } from '@reduxjs/toolkit';
import {
  setAuthorizationStatus,
  setAvatarLink,
  setComments,
  setErrorMessageFilm,
  setFilm,
  setFilms,
  setGenre,
  setLoadingComments,
  setLoadingFilm,
  setLoadingFilms,
  setLoadingPromoFilm,
  setLoadingSimilarFilms,
  setPromoFilm,
  setSimilarFilms,
} from './actions.ts';
import {
  ALL_GENRES,
  CommentType,
  FilmListType,
  FilmType,
  PromoFilmType,
  SimilarFilmType,
} from '../Types/film.ts';
import { AuthorizationStatus } from '../Types/auth.ts';

type state = {
  currentGenre: string;
  allFilms: {
    isLoading: boolean;
    error?: string;
    data: Array<FilmListType>;
  };
  user: {
    avatarLink: string;
    authorizationStatus: AuthorizationStatus;
  };
  promoFilm: { isLoading: boolean; error?: string; data?: PromoFilmType };
  currentFilm: { isLoading: boolean; error?: string; data?: FilmType };
  similarFilms: {
    isLoading: boolean;
    error?: string;
    data: Array<SimilarFilmType>;
  };
  comments: {
    isLoading: boolean;
    error?: string;
    data: Array<CommentType>;
  };
};

const initialState: state = {
  currentGenre: ALL_GENRES,
  allFilms: { isLoading: false, data: [] },
  user: {
    authorizationStatus: AuthorizationStatus.Unknown,
    avatarLink: '',
  },
  promoFilm: { isLoading: false, data: undefined },
  currentFilm: { isLoading: false, data: undefined },
  similarFilms: { isLoading: false, data: [] },
  comments: { isLoading: false, data: [] },
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGenre, (state, value) => {
      state.currentGenre = value.payload;
    })
    .addCase(setFilms, (state, value) => {
      state.allFilms.data = value.payload;
    })
    .addCase(setLoadingFilms, (state, value) => {
      state.allFilms.isLoading = value.payload;
    })
    .addCase(setAuthorizationStatus, (state, value) => {
      state.user.authorizationStatus = value.payload;
    })
    .addCase(setAvatarLink, (state, value) => {
      state.user.avatarLink = value.payload;
    })
    .addCase(setFilm, (state, value) => {
      state.currentFilm.data = value.payload;
    })
    .addCase(setLoadingFilm, (state, value) => {
      state.currentFilm.isLoading = value.payload;
    })
    .addCase(setSimilarFilms, (state, value) => {
      state.similarFilms.data = value.payload;
    })
    .addCase(setLoadingSimilarFilms, (state, value) => {
      state.similarFilms.isLoading = value.payload;
    })
    .addCase(setComments, (state, value) => {
      state.comments.data = value.payload;
    })
    .addCase(setLoadingComments, (state, value) => {
      state.comments.isLoading = value.payload;
    })
    .addCase(setErrorMessageFilm, (state, value) => {
      state.currentFilm.error = value.payload;
    })
    .addCase(setLoadingPromoFilm, (state, value) => {
      state.promoFilm.isLoading = value.payload;
    })
    .addCase(setPromoFilm, (state, value) => {
      state.promoFilm.data = value.payload;
    });
});

export { reducer };
