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
import { GenresList } from './genres-list.tsx';
import { ALL_GENRES } from '../../types/film.ts';

describe('genres-list', () => {
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

  it('should call action to save genre in store', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <GenresList genres={[ALL_GENRES, 'genre']} activeGenre={ALL_GENRES} />
        </BrowserRouter>
      </Provider>,
    );

    const genre = getByText('genre');
    act(() => {
      genre.click();
    });

    expect(store.getActions()).toEqual([
      {
        payload: 'genre',
        type: 'films/setGenre',
      },
    ]);
  });
});
