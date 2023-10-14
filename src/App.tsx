import { MainPage } from './Pages/MainPage/MainPage.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NotFoundPage } from './Pages/NotFoundPage/NotFoundPage.tsx';
import { SignInPage } from './Pages/SignInPage/SignInPage.tsx';
import { MyListPage } from './Pages/MyListPage/MyListPage.tsx';
import { FilmPage } from './Pages/FilmPage/FilmPage.tsx';
import { AddReviewPage } from './Pages/AddReviewPage/AddReviewPage.tsx';
import { PlayerPage } from './Pages/PlayerPage/PlayerPage.tsx';
import { PrivateRoute } from './Components/PrivateRoute/PrivateRoute.tsx';

type AppProps = {
  name: string;
  genre: string;
  releaseDate: number;
};

export const App = (props: AppProps) => (
  <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<MainPage {...props} />} />
        <Route path="login" element={<SignInPage />} />
        <Route path="/player/:id" element={<PlayerPage />} />
        <Route path="films/:id">
          <Route index element={<FilmPage />} />
          <Route path="review" element={<AddReviewPage />} />
        </Route>
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="mylist" element={<MyListPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);
