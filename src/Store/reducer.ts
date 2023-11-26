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
    films: Array<FilmListType>;
  };
  user: {
    avatarLink: string;
    authorizationStatus: AuthorizationStatus;
  };
  promoFilm: { isLoading: boolean; error?: string; film?: PromoFilmType };
  currentFilm: { isLoading: boolean; error?: string; film?: FilmType };
  similarFilms: {
    isLoading: boolean;
    error?: string;
    films: Array<SimilarFilmType>;
  };
  comments: {
    isLoading: boolean;
    error?: string;
    comments: Array<CommentType>;
  };
};

const initialState: state = {
  currentGenre: ALL_GENRES,
  allFilms: { isLoading: false, films: [] },
  user: {
    authorizationStatus: AuthorizationStatus.Unknown,
    avatarLink: '',
  },
  promoFilm: { isLoading: false, film: undefined },
  currentFilm: { isLoading: false, film: undefined },
  similarFilms: { isLoading: false, films: [] },
  comments: { isLoading: false, comments: [] },
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
    })
    .addCase(setFilm, (state, value) => {
      state.currentFilm.film = value.payload;
    })
    .addCase(setLoadingFilm, (state, value) => {
      state.currentFilm.isLoading = value.payload;
    })
    .addCase(setSimilarFilms, (state, value) => {
      state.similarFilms.films = value.payload;
    })
    .addCase(setLoadingSimilarFilms, (state, value) => {
      state.similarFilms.isLoading = value.payload;
    })
    .addCase(setComments, (state, value) => {
      state.comments.comments = value.payload;
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
      state.promoFilm.film = value.payload;
    });
});

export { reducer };
