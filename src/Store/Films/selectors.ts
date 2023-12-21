import { useAppSelector } from '../../hooks/store.ts';
import { Namespace } from '../namespace.ts';

export const useAllFilmsSelector = () =>
  useAppSelector((state) => state[Namespace.Films]);

export const useCurrentGenreSelector = () =>
  useAppSelector((state) => state[Namespace.Films].currentGenre);
