import { useAppSelector } from '../../hooks/store.ts';
import { Namespace } from '../namespace.ts';
import { State } from '../../types/state.ts';

export const useSimilarFilmsSelector = () =>
  useAppSelector((state: State) => state[Namespace.SimilarFilms]);
