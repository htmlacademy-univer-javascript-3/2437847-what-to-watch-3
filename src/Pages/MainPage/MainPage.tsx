import { Footer } from '../../Components/Footer/Footer.tsx';
import { Header } from '../../Components/Header/Header.tsx';
import { FilmCardList } from '../../Components/FilmCardList/FilmCardList.tsx';
import { useAppSelector } from '../../Hools/store.ts';
import { filterFilms } from '../../Helpers/filterFilms.ts';
import { extractAllGenres } from '../../Helpers/extractAllGenres.ts';
import { GenresList } from '../../Components/GenresList/GenresList.tsx';
import { useCallback, useState } from 'react';
import { ShowMoreButton } from '../../Components/ShowMoreButton/ShowMoreButton.tsx';

const FILM_STEPS = 8;

type MainProps = {
  name: string;
  genre: string;
  releaseDate: number;
};

export const MainPage = ({ name, genre, releaseDate }: MainProps) => {
  const { allFilms, currentGenre } = useAppSelector((state) => state);
  const films = filterFilms(allFilms, currentGenre);
  const genres = extractAllGenres(allFilms);
  const [countFilms, setCountFilms] = useState(FILM_STEPS);
  const handleShowMore = useCallback(() => {
    setCountFilms((prev) => prev + FILM_STEPS);
  }, [setCountFilms]);

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img
            src="img/bg-the-grand-budapest-hotel.jpg"
            alt="The Grand Budapest Hotel"
          />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header />

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img
                src="img/the-grand-budapest-hotel-poster.jpg"
                alt="The Grand Budapest Hotel poster"
                width="218"
                height="327"
              />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{releaseDate}</span>
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList genres={genres} activeGenre={currentGenre} />
          <FilmCardList films={films.slice(0, countFilms)} />
          {countFilms < films.length && (
            <ShowMoreButton onClick={handleShowMore} />
          )}
        </section>
        <Footer />
      </div>
    </>
  );
};
