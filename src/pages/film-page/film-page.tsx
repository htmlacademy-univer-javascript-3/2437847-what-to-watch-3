import { Footer } from '../../components/footer/footer.tsx';
import { Header } from '../../components/header/header.tsx';
import { Tabs } from '../../components/tabs/tabs.tsx';
import { Tab } from '../../components/tabs/tab.tsx';
import { OverviewTab } from './tabs/overview-tab.tsx';
import { DetailsTab } from './tabs/details-tab.tsx';
import { ReviewsTab } from './tabs/reviews-tab.tsx';
import { Link } from 'react-router-dom';
import { appRoutes } from '../../app-routes.ts';
import { FilmCardList } from '../../components/film-card-list/film-card-list.tsx';
import { useFilm, useSimilarFilms } from '../../hooks/films.ts';
import { NotFoundStyles } from './not-found-styles.ts';
import { Loader } from '../../components/loader/loader.tsx';
import { AuthorizationStatus } from '../../types/auth.ts';
import { usePathId } from '../../hooks/use-path-id.ts';
import { useAuthorizationStatusSelector } from '../../store/user/selectors.ts';
import { FavouriteButton } from '../../components/favourite-button/favourite-button.tsx';
import { PlayButton } from '../../components/play-button/play-button.tsx';

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
                    <PlayButton filmId={id} />
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
