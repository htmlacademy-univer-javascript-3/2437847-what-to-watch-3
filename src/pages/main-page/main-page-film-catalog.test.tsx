import { describe, it } from 'vitest';
import { createAPI } from '../../services/api.ts';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../types/state.ts';
import { Action } from '@reduxjs/toolkit';
import { AppThunkDispatch } from '../../mocks/factory.ts';
import { Namespace } from '../../store/namespace.ts';
import { ALL_GENRES } from '../../types/film.ts';
import MockAdapter from 'axios-mock-adapter';
import { MainPageFilmCatalog } from './main-page-film-catalog.tsx';
import { act, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

describe('main-page-film-catalog', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  const prepareFilmDataForStateAndAxios = (count: number) => {
    const films = [];
    for (let i = 0; i < count; i++) {
      films.push({});
    }
    mockAxiosAdapter.onGet('/films').reply(200, films);
    store = mockStoreCreator({
      [Namespace.Films]: {
        isLoading: false,
        data: films,
        currentGenre: ALL_GENRES,
      },
    });
  };

  it('should do not render ShowMoreButton', () => {
    prepareFilmDataForStateAndAxios(0);
    const { queryByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <MainPageFilmCatalog />
        </BrowserRouter>
      </Provider>,
    );

    expect(queryByText('Show more')).toBeNull();
  });

  it('should render ShowMoreButton', () => {
    prepareFilmDataForStateAndAxios(10);
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <MainPageFilmCatalog />
        </BrowserRouter>
      </Provider>,
    );

    expect(getByText('Show more')).toBeInTheDocument();
  });

  it('should hide ShowMoreButton after click', () => {
    prepareFilmDataForStateAndAxios(10);
    const { getByText, queryByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <MainPageFilmCatalog />
        </BrowserRouter>
      </Provider>,
    );

    const showMoreButton = getByText('Show more');
    act(() => {
      showMoreButton.click();
    });

    expect(queryByText('Show more')).toBeNull();
  });

  it('should render ShowMoreButton after click', () => {
    prepareFilmDataForStateAndAxios(20);
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <MainPageFilmCatalog />
        </BrowserRouter>
      </Provider>,
    );

    const showMoreButton = getByText('Show more');
    act(() => {
      showMoreButton.click();
    });

    expect(getByText('Show more')).toBeInTheDocument();
  });
});
