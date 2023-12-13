import { MainPage } from './Pages/MainPage/MainPage.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NotFoundPage } from './Pages/NotFoundPage/NotFoundPage.tsx';
import { SignInPage } from './Pages/SignInPage/SignInPage.tsx';
import { MyListPage } from './Pages/MyListPage/MyListPage.tsx';
import { FilmPage } from './Pages/FilmPage/FilmPage.tsx';
import { AddReviewPage } from './Pages/AddReviewPage/AddReviewPage.tsx';
import { PlayerPage } from './Pages/PlayerPage/PlayerPage.tsx';
import { PrivateRoute } from './Components/PrivateRoute/PrivateRoute.tsx';
import { appRoutes } from './appRoutes.ts';

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
