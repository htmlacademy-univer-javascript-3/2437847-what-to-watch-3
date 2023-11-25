import { useAppSelector } from '../Hools/store.ts';

export const useAuthorizationStatus = () =>
  useAppSelector((state) => state.user.authorizationStatus);

export const useAvatarLink = () =>
  useAppSelector((state) => state.user.avatarLink);

export const useCurrentGenre = () =>
  useAppSelector((state) => state.currentGenre);

export const useFilms = () => useAppSelector((state) => state.allFilms);
