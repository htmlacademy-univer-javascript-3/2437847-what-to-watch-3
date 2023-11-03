import { Footer } from '../../Components/Footer/Footer.tsx';
import { Header } from '../../Components/Header/Header.tsx';
import { Tabs } from '../../Components/Tabs/Tabs.tsx';
import { Tab } from '../../Components/Tabs/Tab.tsx';
import { OverviewTab } from './Tabs/OverviewTab.tsx';
import { DetailsTab } from './Tabs/DetailsTab.tsx';
import { ReviewsTab } from './Tabs/ReviewsTab.tsx';
import { Link, useParams } from 'react-router-dom';
import { useFilm } from '../../Mocks/useFilm.ts';
import { appRoutes } from '../../appRoutes.ts';
import { FilmCardList } from '../../Components/FilmCardList/FilmCardList.tsx';
import { useFilms } from '../../Mocks/useFilms.tsx';

export const FilmPage = () => {
  const { id } = useParams();
  const film = useFilm({ id: Number(id) });
  const films = useFilms();

  return (
    <div>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.imgSrc} alt={film.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header />

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">Drama</span>
                <span className="film-card__year">2014</span>
              </p>

              <div className="film-card__buttons">
                <button
                  className="btn btn--play film-card__button"
                  type="button"
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button
                  className="btn btn--list film-card__button"
                  type="button"
                >
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
                <Link
                  to={appRoutes.AddReview(id || '')}
                  className="btn film-card__button"
                >
                  Add review
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film.imgSrc} alt={film.name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <Tabs>
                <Tab name="Overview" content={<OverviewTab />} />
                <Tab name="Details" content={<DetailsTab />} />
                <Tab name="Reviews" content={<ReviewsTab />} />
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmCardList films={films} />
        </section>
        <Footer />
      </div>
    </div>
  );
};
