import { Loader } from '../../Components/Loader/Loader.tsx';
import { GenresList } from '../../Components/GenresList/GenresList.tsx';
import { FilmCardList } from '../../Components/FilmCardList/FilmCardList.tsx';
import { ShowMoreButton } from '../../Components/ShowMoreButton/ShowMoreButton.tsx';
import { useFilms } from '../../Hooks/films.ts';
import { useCurrentGenreSelector } from '../../Store/Films/selectors.ts';
import { filterFilms } from '../../Helpers/filterFilms.ts';
import { extractAllGenres } from '../../Helpers/extractAllGenres.ts';
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
