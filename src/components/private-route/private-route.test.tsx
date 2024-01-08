import { describe, it } from 'vitest';
import { PrivateRoute } from './private-route.tsx';
import { AuthorizationStatus } from '../../types/auth.ts';
import { render } from '@testing-library/react';
import { createAPI } from '../../services/api.ts';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../types/state.ts';
import { Action } from '@reduxjs/toolkit';
import { AppThunkDispatch } from '../../mocks/factory.ts';
import { Namespace } from '../../store/namespace.ts';
import { ALL_GENRES } from '../../types/film.ts';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { appRoutes } from '../../app-routes.ts';

describe('private-route', () => {
  const content = <div>content</div>;
  const signInPage = <div>sign in test text</div>;

  const axios = createAPI();
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      [Namespace.Films]: {
        isLoading: false,
        data: [],
        currentGenre: ALL_GENRES,
      },
    });
  });

  it('should render content if user is authorized', () => {
    store = mockStoreCreator({
      [Namespace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        avatarLink: '',
      },
    });
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route index element={content} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>,
    );

    expect(getByText('content')).toBeInTheDocument();
  });

  it('should redirect to login page if user is not authorized', () => {
    store = mockStoreCreator({
      [Namespace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        avatarLink: '',
      },
    });
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path={appRoutes.SignIn} element={signInPage} />
            <Route element={<PrivateRoute />}>
              <Route index element={content} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>,
    );

    expect(getByText('sign in test text')).toBeInTheDocument();
  });
});
