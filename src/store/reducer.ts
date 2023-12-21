import { combineReducers } from '@reduxjs/toolkit';
import { promoFilm } from './promo-film/promo-film.ts';
import { Namespace } from './namespace.ts';
import { film } from './film/film.ts';
import { films } from './films/films.ts';
import { similarFilms } from './similar-films/similar-films.ts';
import { favouriteFilms } from './favourite-films/favourite-films.ts';
import { user } from './user/user.ts';
import { comments } from './comments/comments.ts';

export const rootReducer = combineReducers({
  [Namespace.Film]: film.reducer,
  [Namespace.Films]: films.reducer,
  [Namespace.PromoFilm]: promoFilm.reducer,
  [Namespace.SimilarFilms]: similarFilms.reducer,
  [Namespace.FavouriteFilms]: favouriteFilms.reducer,
  [Namespace.User]: user.reducer,
  [Namespace.Comments]: comments.reducer,
});
