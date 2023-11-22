import { ALL_GENRES, FilmType } from '../Types/film.ts';

export const filterFilms = (
  films: Array<FilmType>,
  genre: string,
): Array<FilmType> => {
  if (genre === ALL_GENRES) {
    return films;
  }

  return films.filter((film) => film.genre === genre);
};
