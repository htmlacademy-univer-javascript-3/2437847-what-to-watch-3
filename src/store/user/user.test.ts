import { describe } from 'vitest';
import { user } from './user.ts';
import { loginAction, logoutAction, checkAuthAction } from '../api-actions.ts';
import { createUser } from '../../mocks/factory.ts';
import { AuthorizationStatus } from '../../types/auth.ts';

describe('user', () => {
  const userItem = createUser();
  const initialState = {
    authorizationStatus: AuthorizationStatus.Unknown,
    avatarLink: '',
  };

  it('checkAuthAction.fulfilled: should set authorization status', () => {
    expect(
      user.reducer(initialState, {
        type: checkAuthAction.fulfilled.type,
        payload: userItem,
      }),
    ).toEqual({
      authorizationStatus: AuthorizationStatus.Auth,
      avatarLink: userItem.avatarUrl,
    });
  });

  it('checkAuthAction.rejected: should set authorization status', () => {
    expect(
      user.reducer(initialState, {
        type: checkAuthAction.rejected.type,
      }),
    ).toEqual({
      authorizationStatus: AuthorizationStatus.NoAuth,
      avatarLink: '',
    });
  });

  it('loginAction.fulfilled: should set authorization status', () => {
    expect(
      user.reducer(initialState, {
        type: loginAction.fulfilled.type,
        payload: userItem,
      }),
    ).toEqual({
      authorizationStatus: AuthorizationStatus.Auth,
      avatarLink: userItem.avatarUrl,
    });
  });

  it('loginAction.rejected: should set authorization status', () => {
    expect(
      user.reducer(initialState, {
        type: loginAction.rejected.type,
      }),
    ).toEqual({
      authorizationStatus: AuthorizationStatus.NoAuth,
      avatarLink: '',
    });
  });

  it('logoutAction.fulfilled: should set authorization status', () => {
    expect(
      user.reducer(initialState, {
        type: logoutAction.fulfilled.type,
      }),
    ).toEqual({
      authorizationStatus: AuthorizationStatus.NoAuth,
      avatarLink: '',
    });
  });

  it('logoutAction.rejected: should set authorization status', () => {
    expect(
      user.reducer(initialState, {
        type: logoutAction.rejected.type,
      }),
    ).toEqual({
      authorizationStatus: AuthorizationStatus.NoAuth,
      avatarLink: '',
    });
  });
});
