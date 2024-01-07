import { ALL_GENRES, FilmListType } from '../types/film.ts';

export const filterFilms = (
  films: Array<FilmListType>,
  genre: string,
): Array<FilmListType> => {
  if (genre === ALL_GENRES) {
    return films;
  }

  return films.filter((film) => film.genre === genre);
};
