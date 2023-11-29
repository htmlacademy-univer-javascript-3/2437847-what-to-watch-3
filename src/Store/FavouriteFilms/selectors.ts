import { useAppSelector } from '../../Hooks/store.ts';
import { Namespace } from '../namespace.ts';
import { State } from '../../Types/state.ts';

export const useFavouriteFilmsSelector = () =>
  useAppSelector((state: State) => state[Namespace.FavouriteFilms]);