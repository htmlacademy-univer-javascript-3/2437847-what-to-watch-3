import { FilmType } from '../Types/film.ts';

export const filterFilms = (
  films: Array<FilmType>,
  genre: string,
): Array<FilmType> => {
  if (genre === 'All genres') {
    return films;
  }

  return films.filter((film) => film.genre === genre);
};
