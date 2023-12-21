import { useAppSelector } from '../../hooks/store.ts';
import { Namespace } from '../namespace.ts';

export const useCurrentFilmSelector = () =>
  useAppSelector((state) => state[Namespace.Film]);
