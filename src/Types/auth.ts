export type UserData = {
  name: string;
  avatarUrl: string;
  email: string;
  token: string;
};

export enum AuthorizationStatus {
  Auth = 'auth',
  NoAuth = 'noAuth',
  Unknown = 'unknown',
}

export type AuthData = {
  email: string;
  password: string;
};
