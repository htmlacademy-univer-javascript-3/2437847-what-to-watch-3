import { FILMS } from './Films.ts';

type useFilmProps = {
  id: number;
};

export const useFilm = ({ id }: useFilmProps) => FILMS[id - 1];
