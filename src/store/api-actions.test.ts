import { describe, expect } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { AuthData } from '../types/auth.ts';
import { State } from '../types/state.ts';
import {
  AppThunkDispatch,
  createCurrentFilm,
  createFakeToken,
  createFakeUser,
  createFilm,
  createPromoFilm,
  createComment,
  extractActionsTypes,
} from '../mocks/factory.ts';
import { createAPI } from '../services/api.ts';
import {
  checkAuthAction,
  fetchCommentsAction,
  fetchFavouriteFilmsAction,
  fetchFilmAction,
  fetchFilmsAction,
  fetchPromoFilmAction,
  fetchSimilarFilmsAction,
  loginAction,
  logoutAction,
  postCommentAction,
} from './api-actions.ts';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator();
  });

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending", "loginAction.fulfilled" when server response 200', async () => {
      const fakeUser: AuthData = createFakeUser();
      const fakeServerReplay = createFakeToken();
      mockAxiosAdapter.onPost('/login').reply(200, fakeServerReplay);

      await store.dispatch(loginAction(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        loginAction.fulfilled.type,
      ]);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending", "logoutAction.fulfilled" when server response 204', async () => {
      mockAxiosAdapter.onDelete('/logout').reply(204);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });
  });

  describe('checkAuthStatus', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" with thunk "checkAuthAction', async () => {
      mockAxiosAdapter.onGet('/login').reply(200);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet('/login').reply(400);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });
  });

  describe('fetchFilms', () => {
    it('should dispatch "fetchFilmsAction.pending", "fetchFilmsAction.fulfilled", when server response 200', async () => {
      const mockFilms = [createFilm(), createFilm()];
      mockAxiosAdapter.onGet('/films').reply(200, mockFilms);

      await store.dispatch(fetchFilmsAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFilmsFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchFilmsAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchFilmsAction.pending.type,
        fetchFilmsAction.fulfilled.type,
      ]);

      expect(fetchFilmsFulfilled.payload).toEqual(mockFilms);
    });

    it('should dispatch "fetchFilmsAction.pending", "fetchFilmsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet('/films').reply(400);

      await store.dispatch(fetchFilmsAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFilmsAction.pending.type,
        fetchFilmsAction.rejected.type,
      ]);
    });
  });

  describe('fetchFilmById', () => {
    it('should dispatch "fetchFilmAction.pending", "fetchFilmAction.fulfilled", when server response 200', async () => {
      const mockFilm = createCurrentFilm();
      mockAxiosAdapter.onGet('/films/id').reply(200, mockFilm);

      await store.dispatch(fetchFilmAction('id'));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFilmFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchFilmAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchFilmAction.pending.type,
        fetchFilmAction.fulfilled.type,
      ]);

      expect(fetchFilmFulfilled.payload).toEqual(mockFilm);
    });

    it('should dispatch "fetchFilmAction.pending", "fetchFilmAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet('/films/id').reply(400);

      await store.dispatch(fetchFilmAction('id'));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFilmAction.pending.type,
        fetchFilmAction.rejected.type,
      ]);
    });
  });

  describe('fetchSimilarFilms', () => {
    it('should dispatch "fetchSimilarFilmsAction.pending", "fetchSimilarFilmsAction.fulfilled", when server response 200', async () => {
      const mockFilms = [createFilm(), createFilm()];
      mockAxiosAdapter.onGet('/films/id/similar').reply(200, mockFilms);

      await store.dispatch(fetchSimilarFilmsAction('id'));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchSimilarFilmsFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchSimilarFilmsAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchSimilarFilmsAction.pending.type,
        fetchSimilarFilmsAction.fulfilled.type,
      ]);

      expect(fetchSimilarFilmsFulfilled.payload).toEqual(mockFilms);
    });

    it('should dispatch "fetchSimilarFilmsAction.pending", "fetchSimilarFilmsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet('/films/id/similar').reply(400);

      await store.dispatch(fetchSimilarFilmsAction('id'));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchSimilarFilmsAction.pending.type,
        fetchSimilarFilmsAction.rejected.type,
      ]);
    });
  });

  describe('fetchFavorite', () => {
    it('should dispatch "fetchFavouriteFilmsAction.pending", "fetchFavouriteFilmsAction.fulfilled", when server response 200', async () => {
      const mockFilms = [createFilm(), createFilm()];
      mockAxiosAdapter.onGet('/favorite').reply(200, mockFilms);

      await store.dispatch(fetchFavouriteFilmsAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFavoriteFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchFavouriteFilmsAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchFavouriteFilmsAction.pending.type,
        fetchFavouriteFilmsAction.fulfilled.type,
      ]);

      expect(fetchFavoriteFulfilled.payload).toEqual(mockFilms);
    });

    it('should dispatch "fetchFavouriteFilmsAction.pending", "fetchFavouriteFilmsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet('/favorite').reply(400);

      await store.dispatch(fetchFavouriteFilmsAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavouriteFilmsAction.pending.type,
        fetchFavouriteFilmsAction.rejected.type,
      ]);
    });
  });

  describe('fetchFilmPromoAction', () => {
    it('should dispatch "fetchPromoFilmAction.pending", "fetchPromoFilmAction.fulfilled", when server response 200', async () => {
      const mockFilm = createPromoFilm();
      mockAxiosAdapter.onGet('/promo').reply(200, mockFilm);

      await store.dispatch(fetchPromoFilmAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFilmPromoFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchPromoFilmAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchPromoFilmAction.pending.type,
        fetchPromoFilmAction.fulfilled.type,
      ]);

      expect(fetchFilmPromoFulfilled.payload).toEqual(mockFilm);
    });

    it('should dispatch "fetchPromoFilmAction.pending", "fetchPromoFilmAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet('/promo').reply(400);

      await store.dispatch(fetchPromoFilmAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchPromoFilmAction.pending.type,
        fetchPromoFilmAction.rejected.type,
      ]);
    });
  });

  describe('fetchFilmReviewsAction', () => {
    it('should dispatch "fetchCommentsAction.pending", "fetchCommentsAction.fulfilled", when server response 200', async () => {
      const mockReviews = [createComment(), createComment(), createComment()];
      mockAxiosAdapter.onGet('/comments/id').reply(200, mockReviews);

      await store.dispatch(fetchCommentsAction('id'));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFilmCommentsFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchCommentsAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchCommentsAction.pending.type,
        fetchCommentsAction.fulfilled.type,
      ]);

      expect(fetchFilmCommentsFulfilled.payload).toEqual(mockReviews);
    });

    it('should dispatch "fetchCommentsAction.pending", "fetchCommentsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet('/comments/id').reply(400);

      await store.dispatch(fetchCommentsAction('id'));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchCommentsAction.pending.type,
        fetchCommentsAction.rejected.type,
      ]);
    });
  });

  describe('addCommentAction', () => {
    it('should dispatch "postCommentAction.pending", "postCommentAction.fulfilled", when server response 200', async () => {
      mockAxiosAdapter.onPost('/comments/id').reply(200);

      const result = await store.dispatch(
        postCommentAction({ filmId: 'id', comment: 'lorem', rating: 8 }),
      );

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postCommentAction.pending.type,
        postCommentAction.fulfilled.type,
      ]);
      expect(result.payload).toEqual(true);
    });

    it('should dispatch "postCommentAction.pending", "postCommentAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost('/comments/id').reply(400);

      const result = await store.dispatch(
        postCommentAction({ filmId: 'id', comment: 'lorem', rating: 8 }),
      );
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postCommentAction.pending.type,
        postCommentAction.fulfilled.type,
      ]);
      expect(result.payload).toEqual(false);
    });
  });
});
