import { useAppSelector } from '../../Hooks/store.ts';
import { Namespace } from '../namespace.ts';

export const useCommentsSelector = () =>
  useAppSelector((state) => state[Namespace.Comments]);
