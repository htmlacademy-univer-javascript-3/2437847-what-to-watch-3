import { Footer } from '../../Components/Footer/Footer.tsx';
import { Header } from '../../Components/Header/Header.tsx';
import { usePromoFilm } from '../../Hooks/films.ts';
import { AuthorizationStatus } from '../../Types/auth.ts';
import { useAuthorizationStatusSelector } from '../../Store/User/selectors.ts';
import { MainPageFilmCatalog } from './MainPageFilmCatalog.tsx';
import { FavouriteButton } from '../../Components/FavouriteButton/FavouriteButton.tsx';

export const MainPage = () => {
  const authStatus = useAuthorizationStatusSelector();
  const { data: promoFilm } = usePromoFilm();

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoFilm?.backgroundImage} alt={promoFilm?.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header />

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img
                src={promoFilm?.posterImage}
                alt={promoFilm?.name}
                width="218"
                height="327"
              />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilm?.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilm?.genre}</span>
                <span className="film-card__year">{promoFilm?.released}</span>
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
                  <FavouriteButton filmId={promoFilm?.id} />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <MainPageFilmCatalog />
        <Footer />
      </div>
    </>
  );
};
