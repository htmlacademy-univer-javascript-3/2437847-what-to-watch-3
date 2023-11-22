import { ALL_GENRES, FilmType } from '../Types/film.ts';

export const extractAllGenres = (films: Array<FilmType>): Array<string> => {
  const genres = films.map((film) => film.genre);
  return [ALL_GENRES, ...new Set(genres)];
};
