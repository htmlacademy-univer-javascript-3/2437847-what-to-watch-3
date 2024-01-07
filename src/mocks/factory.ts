import { Action } from 'redux';
import { datatype, name, internet, commerce, lorem } from 'faker';
import { ThunkDispatch } from 'redux-thunk';
import { Token } from '../services/token.ts';
import { AuthData, UserData } from '../types/auth.ts';
import { State } from '../types/state';
import { createAPI } from '../services/api.ts';
import {
  CommentType,
  FilmListType,
  FilmType,
  PromoFilmType,
} from '../types/film.ts';

export type AppThunkDispatch = ThunkDispatch<
  State,
  ReturnType<typeof createAPI>,
  Action
>;

export const extractActionsTypes = (actions: Action<string>[]) =>
  actions.map(({ type }) => type);

export const createFakeUser = (): AuthData =>
  ({
    email: internet.email(),
    password: internet.password(),
  }) as AuthData;

export const createFakeToken = (): Token => datatype.uuid();

export const createUser = (): UserData =>
  ({
    email: internet.email(),
    token: datatype.uuid(),
    name: name.title(),
    avatarUrl: internet.url(),
  }) as UserData;

export const createFilm = ({ genre }: { genre?: string } = {}): FilmListType =>
  ({
    id: datatype.uuid(),
    name: name.title(),
    previewImage: internet.url(),
    previewVideoLink: internet.url(),
    genre: genre ?? name.title(),
  }) as FilmListType;

export const createCurrentFilm = (): FilmType =>
  ({
    id: datatype.uuid(),
    name: name.title(),
    posterImage: internet.url(),
    backgroundImage: internet.url(),
    videoLink: internet.url(),
    genre: name.title(),
    alt: name.title(),
    released: datatype.number(),
    isFavorite: true,
    backgroundColor: commerce.color(),
    description: lorem.words(10),
    rating: datatype.number(),
    scoresCount: datatype.number(),
    director: name.title(),
    starring: [name.title()],
    runTime: datatype.number(),
  }) as FilmType;

export const createPromoFilm = (): PromoFilmType =>
  ({
    id: datatype.uuid(),
    name: name.title(),
    posterImage: internet.url(),
    backgroundImage: internet.url(),
    videoLink: internet.url(),
    genre: name.title(),
    alt: name.title(),
    released: datatype.number(),
    isFavorite: true,
  }) as PromoFilmType;

export const createComment = (): CommentType =>
  ({
    id: datatype.uuid(),
    date: String(datatype.datetime()),
    user: name.title(),
    comment: lorem.words(10),
    rating: datatype.number(),
  }) as CommentType;
