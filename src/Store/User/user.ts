import { createSlice } from '@reduxjs/toolkit';
import { loginAction, logoutAction, checkAuthAction } from '../apiActions.ts';
import { Namespace } from '../namespace.ts';
import { AuthorizationStatus } from '../../Types/auth.ts';

type UserState = {
  avatarLink: string;
  authorizationStatus: AuthorizationStatus;
};

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  avatarLink: '',
};

export const user = createSlice({
  name: Namespace.User,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthAction.fulfilled, (state, value) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.avatarLink = value.payload.avatarUrl;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, value) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.avatarLink = value.payload.avatarUrl;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  },
});
