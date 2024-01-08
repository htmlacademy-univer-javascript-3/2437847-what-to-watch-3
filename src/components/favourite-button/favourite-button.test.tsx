import { describe } from 'vitest';
import { FavouriteButton } from './favourite-button.tsx';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createAPI } from '../../services/api.ts';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../types/state.ts';
import { Action } from '@reduxjs/toolkit';
import { AppThunkDispatch, createFilm } from '../../mocks/factory.ts';
import { Namespace } from '../../store/namespace.ts';

describe('favourite-button', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  const favouriteFilm = createFilm();

  beforeEach(() => {
    store = mockStoreCreator({
      [Namespace.FavouriteFilms]: {
        data: [favouriteFilm],
        isLoading: false,
      },
    });
  });

  it('should render correctly with isFavourite film', () => {
    mockAxiosAdapter.onGet('/favorite').reply(200, [favouriteFilm]);

    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <FavouriteButton filmId={favouriteFilm.id} />
        </BrowserRouter>
      </Provider>,
    );
    const elem = getByTestId('favorite-svg');
    expect(elem).toHaveAttribute('xlink:href', '#in-list');
  });

  it('should render correctly with not isFavourite film', () => {
    mockAxiosAdapter.onGet('/favorite').reply(200, []);

    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <FavouriteButton filmId={'1'} />
        </BrowserRouter>
      </Provider>,
    );

    const elem = getByTestId('favorite-svg');
    expect(elem).toHaveAttribute('xlink:href', '#add');
  });
});
