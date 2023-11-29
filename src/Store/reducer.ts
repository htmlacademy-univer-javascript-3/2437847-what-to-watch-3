import { combineReducers } from '@reduxjs/toolkit';
import { promoFilm } from './PromoFilm/promoFilm.ts';
import { Namespace } from './namespace.ts';
import { film } from './Film/film.ts';
import { films } from './Films/films.ts';
import { similarFilms } from './SimilarFilms/similarFilms.ts';
import { user } from './User/user.ts';
import { comments } from './Comments/comments.ts';

export const rootReducer = combineReducers({
  [Namespace.Film]: film.reducer,
  [Namespace.Films]: films.reducer,
  [Namespace.PromoFilm]: promoFilm.reducer,
  [Namespace.SimilarFilms]: similarFilms.reducer,
  [Namespace.User]: user.reducer,
  [Namespace.Comments]: comments.reducer,
});
