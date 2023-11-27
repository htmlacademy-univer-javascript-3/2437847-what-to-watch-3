import { Footer } from '../../Components/Footer/Footer.tsx';
import { Header } from '../../Components/Header/Header.tsx';
import { FilmCardList } from '../../Components/FilmCardList/FilmCardList.tsx';
import { filterFilms } from '../../Helpers/filterFilms.ts';
import { extractAllGenres } from '../../Helpers/extractAllGenres.ts';
import { GenresList } from '../../Components/GenresList/GenresList.tsx';
import { useCallback, useState } from 'react';
import { ShowMoreButton } from '../../Components/ShowMoreButton/ShowMoreButton.tsx';
import { Loader } from '../../Components/Loader/Loader.tsx';
import { useFilms, usePromoFilm } from '../../Hooks/films.ts';
import { AuthorizationStatus } from '../../Types/auth.ts';
import { useCurrentGenreSelector } from '../../Store/Films/selectors.ts';
import { useAuthorizationStatusSelector } from '../../Store/User/selectors.ts';

const FILMS_PER_PAGE = 8;

export const MainPage = () => {
  const { data: allFilms, isLoading } = useFilms();
  console.log(allFilms);
  const { data: promoFilm } = usePromoFilm();
  const currentGenre = useCurrentGenreSelector();
  const films = filterFilms(allFilms, currentGenre);
  const genres = extractAllGenres(allFilms);
  const authStatus = useAuthorizationStatusSelector();
  const [countFilms, setCountFilms] = useState(FILMS_PER_PAGE);

  const handleShowMore = useCallback(() => {
    setCountFilms((prev) => prev + FILMS_PER_PAGE);
  }, [setCountFilms]);

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
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <Loader isLoading={isLoading}>
            <GenresList genres={genres} activeGenre={currentGenre} />
            <FilmCardList films={films?.slice(0, countFilms)} />
            {countFilms < films?.length && (
              <ShowMoreButton onClick={handleShowMore} />
            )}
          </Loader>
        </section>
        <Footer />
      </div>
    </>
  );
};
