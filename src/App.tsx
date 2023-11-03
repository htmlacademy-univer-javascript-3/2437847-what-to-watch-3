import { MainPage } from './Pages/MainPage/MainPage.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NotFoundPage } from './Pages/NotFoundPage/NotFoundPage.tsx';
import { SignInPage } from './Pages/SignInPage/SignInPage.tsx';
import { MyListPage } from './Pages/MyListPage/MyListPage.tsx';
import { FilmPage } from './Pages/FilmPage/FilmPage.tsx';
import {
  AddReviewPage,
  AddReviewPageProps,
} from './Pages/AddReviewPage/AddReviewPage.tsx';
import { PlayerPage, PlayerPageProps } from './Pages/PlayerPage/PlayerPage.tsx';
import { PrivateRoute } from './Components/PrivateRoute/PrivateRoute.tsx';
import { FilmCardProps } from './Components/FilmCard/FilmCard.tsx';
import { appRoutes } from './appRoutes.ts';

type AppProps = {
  name: string;
  genre: string;
  releaseDate: number;
  films: FilmCardProps[];
  review: AddReviewPageProps;
  player: PlayerPageProps;
};

export const App = (props: AppProps) => (
  <BrowserRouter>
    <Routes>
      <Route path={appRoutes.Main}>
        <Route index element={<MainPage {...props} />} />
        <Route path={appRoutes.SignIn} element={<SignInPage />} />
        <Route
          path={appRoutes.Player(':id')}
          element={<PlayerPage {...props.player} />}
        />
        <Route path={appRoutes.Film(':id')} element={<FilmPage />} />
        <Route
          path={appRoutes.AddReview(':id')}
          element={<AddReviewPage {...props.review} />}
        />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="mylist" element={<MyListPage films={props.films} />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);