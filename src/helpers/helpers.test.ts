import { describe } from 'vitest';
import { convertFilmRatingToLevel } from './convert-film-rating-level.ts';
import { convertToHoursAndMinutes } from './convert-time.ts';
import { extractAllGenres } from './extract-all-genres.ts';
import { filterFilms } from './filter-films.ts';
import { createFilm } from '../mocks/factory.ts';

describe('helpers', () => {
  const films = [createFilm(), createFilm(), createFilm({ genre: 'genre' })];

  it('convertFilmRatingToLevel should return correct level', () => {
    expect(convertFilmRatingToLevel(0)).toEqual('Bad');
    expect(convertFilmRatingToLevel(3)).toEqual('Normal');
    expect(convertFilmRatingToLevel(5)).toEqual('Good');
    expect(convertFilmRatingToLevel(8)).toEqual('Very good');
    expect(convertFilmRatingToLevel(10)).toEqual('Awesome');
  });

  it('convertToHoursAndMinutes should return correct time', () => {
    expect(convertToHoursAndMinutes(0)).toEqual('0m');
    expect(convertToHoursAndMinutes(30)).toEqual('30m');
    expect(convertToHoursAndMinutes(60)).toEqual('1h 0m');
    expect(convertToHoursAndMinutes(120)).toEqual('2h 0m');
    expect(convertToHoursAndMinutes(121)).toEqual('2h 1m');
  });

  it('extractAllGenres should return correct genres', () => {
    const genres = films.map((film) => film.genre);
    expect(extractAllGenres(films)).toEqual(['All genres', ...genres]);
  });

  it('filterFilms should return correct films', () => {
    expect(filterFilms(films, 'genre')).toEqual([films[2]]);
    expect(filterFilms(films, 'All genres')).toEqual(films);
  });
});
