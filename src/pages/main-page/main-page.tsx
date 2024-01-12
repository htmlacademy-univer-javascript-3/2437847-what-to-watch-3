import { Footer } from '../../components/footer/footer.tsx';
import { Header } from '../../components/header/header.tsx';
import { usePromoFilm } from '../../hooks/films.ts';
import { AuthorizationStatus } from '../../types/auth.ts';
import { useAuthorizationStatusSelector } from '../../store/user/selectors.ts';
import { MainPageFilmCatalog } from './main-page-film-catalog.tsx';
import { FavouriteButton } from '../../components/favourite-button/favourite-button.tsx';
import { PlayButton } from '../../components/play-button/play-button.tsx';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../app-routes.ts';

export const MainPage = () => {
  const authStatus = useAuthorizationStatusSelector();
  const { data: promoFilm } = usePromoFilm();
  const navigate = useNavigate();

  const handlePosterClick = () => {
    if (promoFilm) {
      navigate(appRoutes.Film(promoFilm.id));
    }
  };

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
            <div className="film-card__poster" onClick={handlePosterClick}>
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
                <PlayButton filmId={promoFilm?.id} />
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
