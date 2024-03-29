import { ALL_GENRES, FilmListType } from '../types/film.ts';

export const extractAllGenres = (films: Array<FilmListType>): Array<string> => {
  const genres = films.map((film) => film.genre);
  return [ALL_GENRES, ...new Set(genres)];
};
