import { Footer } from '../../Components/Footer/Footer.tsx';
import { Header } from '../../Components/Header/Header.tsx';
import { Tabs } from '../../Components/Tabs/Tabs.tsx';
import { Tab } from '../../Components/Tabs/Tab.tsx';
import { OverviewTab } from './Tabs/OverviewTab.tsx';
import { DetailsTab } from './Tabs/DetailsTab.tsx';
import { ReviewsTab } from './Tabs/ReviewsTab.tsx';
import { Link } from 'react-router-dom';
import { appRoutes } from '../../appRoutes.ts';
import { FilmCardList } from '../../Components/FilmCardList/FilmCardList.tsx';
import { useFilm, useSimilarFilms } from '../../Hooks/films.ts';
import { NotFoundStyles } from './NotFoundStyles.ts';
import { Loader } from '../../Components/Loader/Loader.tsx';
import { AuthorizationStatus } from '../../Types/auth.ts';
import { usePathId } from '../../Hooks/usePathId.ts';
import { useAuthorizationStatusSelector } from '../../Store/User/selectors.ts';
import { FavouriteButton } from '../../Components/FavouriteButton/FavouriteButton.tsx';

export const FilmPage = () => {
  const id = usePathId();
  const authStatus = useAuthorizationStatusSelector();
  const { data: film, error, isLoading } = useFilm(id);
  const { data: similarFilms } = useSimilarFilms(id);

  return (
    <Loader isLoading={isLoading} height={'100vh'} backgroundColor={'#e1b0b2'}>
      <div>
        <section className="film-card film-card--full">
          <div className="film-card__hero">
            <div
              className="film-card__bg"
              style={{ backgroundColor: film?.backgroundColor }}
            >
              <img src={film?.backgroundImage} alt={film?.name} />
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <Header />

            {!error ? (
              <div className="film-card__wrap">
                <div className="film-card__desc">
                  <h2 className="film-card__title">{film?.name}</h2>
                  <p className="film-card__meta">
                    <span className="film-card__genre">{film?.genre}</span>
                    <span className="film-card__year">{film?.released}</span>
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
                    {authStatus === AuthorizationStatus.Auth && (
                      <FavouriteButton filmId={id} />
                    )}
                    {authStatus === AuthorizationStatus.Auth && (
                      <Link
                        to={appRoutes.AddReview(id)}
                        className="btn film-card__button"
                      >
                        Add review
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div style={NotFoundStyles}> {error} </div>
            )}
          </div>

          {!error && (
            <div className="film-card__wrap film-card__translate-top">
              <div className="film-card__info">
                <div className="film-card__poster film-card__poster--big">
                  <img
                    src={film?.posterImage}
                    alt={film?.name}
                    width="218"
                    height="327"
                  />
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
          )}
        </section>
        {!error && (
          <div className="page-content">
            <section className="catalog catalog--like-this">
              <h2 className="catalog__title">More like this</h2>
              <FilmCardList films={similarFilms} />
            </section>
            <Footer />
          </div>
        )}
      </div>
    </Loader>
  );
};
