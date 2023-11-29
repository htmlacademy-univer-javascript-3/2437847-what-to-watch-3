import { useAppSelector } from '../../Hooks/store.ts';
import { Namespace } from '../namespace.ts';

export const useAuthorizationStatusSelector = () =>
  useAppSelector((state) => state[Namespace.User].authorizationStatus);

export const useAvatarLinkSelector = () =>
  useAppSelector((state) => state[Namespace.User].avatarLink);
