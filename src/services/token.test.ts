import { describe } from 'vitest';
import { getToken, dropToken, saveToken } from './token.ts';

describe('token', () => {
  const mockToken = 'mock-token';
  const localStorageKey = 'what-to-watch-token';

  it('saveToken should save token', () => {
    saveToken(mockToken);
    expect(localStorage.getItem(localStorageKey)).toEqual(mockToken);
  });

  it('getToken should return token', () => {
    localStorage.setItem(localStorageKey, mockToken);
    expect(getToken()).toEqual(mockToken);
  });

  it('dropToken should remove token', () => {
    localStorage.setItem(localStorageKey, mockToken);
    dropToken();
    expect(localStorage.getItem(localStorageKey)).toEqual(null);
  });
});
