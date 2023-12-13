import { Footer } from '../../Components/Footer/Footer.tsx';
import { Header } from '../../Components/Header/Header.tsx';
import { FilmCardList } from '../../Components/FilmCardList/FilmCardList.tsx';
import { useFavouriteFilms } from '../../Hooks/films.ts';

export const MyListPage = () => {
  const { data: films } = useFavouriteFilms();
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
