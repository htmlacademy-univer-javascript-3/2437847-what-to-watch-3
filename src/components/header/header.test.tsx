import { describe } from 'vitest';
import { act, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createAPI } from '../../services/api.ts';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../types/state.ts';
import { Action } from '@reduxjs/toolkit';
import { AppThunkDispatch } from '../../mocks/factory.ts';
import { Namespace } from '../../store/namespace.ts';
import { Header } from './header.tsx';
import { AuthorizationStatus } from '../../types/auth.ts';
import { logoutAction } from '../../store/api-actions.ts';

describe('header', () => {
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
      [Namespace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        avatarLink: '',
      },
    });
  });

  it('should call action logout', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>,
    );

    const signOutButton = getByText('Sign out');
    act(() => {
      signOutButton.click();
    });

    expect(store.getActions()[0].type).toEqual(logoutAction.pending.type);
  });
});
