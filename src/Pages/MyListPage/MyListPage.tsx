import { Footer } from '../../Components/Footer/Footer.tsx';
import { Header } from '../../Components/Header/Header.tsx';
import { FilmCardList } from '../../Components/FilmCardList/FilmCardList.tsx';
import { FilmCardProps } from '../../Components/FilmCard/FilmCard.tsx';

type MyListPageProps = {
  films: FilmCardProps[];
};

export const MyListPage = ({ films }: MyListPageProps) => (
  <div className="user-page">
    <Header>
      <h1 className="page-title user-page__title">
        My list <span className="user-page__film-count">9</span>
      </h1>
    </Header>

    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <FilmCardList films={films} />
    </section>
    <Footer />
  </div>
);
