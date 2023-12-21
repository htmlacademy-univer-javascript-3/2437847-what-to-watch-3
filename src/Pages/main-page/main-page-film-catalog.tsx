import { Loader } from '../../components/loader/loader.tsx';
import { GenresList } from '../../components/genres-list/genres-list.tsx';
import { FilmCardList } from '../../components/film-card-list/film-card-list.tsx';
import { ShowMoreButton } from '../../components/show-more-button/show-more-button.tsx';
import { useFilms } from '../../hooks/films.ts';
import { useCurrentGenreSelector } from '../../store/films/selectors.ts';
import { filterFilms } from '../../helpers/filter-films.ts';
import { extractAllGenres } from '../../helpers/extract-all-genres.ts';
import { useCallback, useState } from 'react';

const FILMS_PER_PAGE = 8;

export const MainPageFilmCatalog = () => {
  const { data: allFilms, isLoading } = useFilms();
  const currentGenre = useCurrentGenreSelector();
  const films = filterFilms(allFilms, currentGenre);
  const genres = extractAllGenres(allFilms);
  const [countFilms, setCountFilms] = useState(FILMS_PER_PAGE);

  const handleShowMore = useCallback(() => {
    setCountFilms((prev) => prev + FILMS_PER_PAGE);
  }, [setCountFilms]);

  return (
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
  );
};
