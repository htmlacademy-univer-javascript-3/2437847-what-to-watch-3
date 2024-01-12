import { Footer } from '../../components/footer/footer.tsx';
import { Header } from '../../components/header/header.tsx';
import { FilmCardList } from '../../components/film-card-list/film-card-list.tsx';
import { useFavouriteFilms } from '../../hooks/films.ts';
import { useEffect } from 'react';

export const MyListPage = () => {
  const { data: films, fetchFavouriteFilms } = useFavouriteFilms();
  useEffect(() => {
    fetchFavouriteFilms();
  }, []);
  return (
    <div className="user-page">
      <Header isMyListPage>
        <h1 className="page-title user-page__title">
          My list <span className="user-page__film-count">{films.length}</span>
        </h1>
      </Header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmCardList films={films} />
      </section>
      <Footer />
    </div>
  );
};
