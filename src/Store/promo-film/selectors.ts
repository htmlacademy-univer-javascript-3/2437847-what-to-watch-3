import { useAppSelector } from '../../hooks/store.ts';
import { Namespace } from '../namespace.ts';

export const usePromoFilmSelector = () =>
  useAppSelector((state) => state[Namespace.PromoFilm]);
