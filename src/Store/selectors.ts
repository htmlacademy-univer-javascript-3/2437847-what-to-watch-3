import { useAppSelector } from '../Hooks/store.ts';

export const useAuthorizationStatusSelector = () =>
  useAppSelector((state) => state.user.authorizationStatus);

export const useAvatarLinkSelector = () =>
  useAppSelector((state) => state.user.avatarLink);

export const useCurrentGenreSelector = () =>
  useAppSelector((state) => state.currentGenre);

export const useAllFilmsSelector = () =>
  useAppSelector((state) => state.allFilms);

export const useCurrentFilmSelector = () =>
  useAppSelector((state) => state.currentFilm);

export const useSimilarFilmsSelector = () =>
  useAppSelector((state) => state.similarFilms);

export const useCommentsSelector = () =>
  useAppSelector((state) => state.comments);
