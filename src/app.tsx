import { MainPage } from './pages/main-page/main-page.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NotFoundPage } from './pages/not-found-page/not-found-page.tsx';
import { SignInPage } from './pages/sign-in-page/sign-in-page.tsx';
import { MyListPage } from './pages/my-list-page/my-list-page.tsx';
import { FilmPage } from './pages/film-page/film-page.tsx';
import { AddReviewPage } from './pages/add-review-page/add-review-page.tsx';
import { PlayerPage } from './pages/player-page/player-page.tsx';
import { PrivateRoute } from './components/private-route/private-route.tsx';
import { appRoutes } from './app-routes.ts';

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path={appRoutes.Main}>
        <Route index element={<MainPage />} />
        <Route path={appRoutes.SignIn} element={<SignInPage />} />
        <Route path={appRoutes.Player(':id')} element={<PlayerPage />} />
        <Route path={appRoutes.Film(':id')} element={<FilmPage />} />
        <Route path={appRoutes.AddReview(':id')} element={<AddReviewPage />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="mylist" element={<MyListPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);
