import { useAppSelector } from '../../Hooks/store.ts';
import { Namespace } from '../namespace.ts';

export const usePromoFilmSelector = () =>
  useAppSelector((state) => state[Namespace.PromoFilm]);
