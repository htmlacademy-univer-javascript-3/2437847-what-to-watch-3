import { FilmType } from '../Types/film.ts';

export const extractAllGenres = (films: Array<FilmType>): Array<string> => {
  const genres = films.map((film) => film.genre);
  return ['All genres', ...new Set(genres)];
};
