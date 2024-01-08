import { useFavouriteFilms } from '../../hooks/films.ts';
import { useAppDispatch } from '../../hooks/store.ts';
import { MouseEvent, useCallback, useEffect } from 'react';
import { postFavouriteFilmAction } from '../../store/api-actions.ts';

export type FavouriteButtonProps = {
  filmId?: string;
};

export const FavouriteButton = ({ filmId }: FavouriteButtonProps) => {
  const { data: films, fetchFavouriteFilms } = useFavouriteFilms();
  useEffect(() => {
    fetchFavouriteFilms();
  }, [fetchFavouriteFilms]);
  const isFavourite = films.some((film) => film.id === filmId);

  const dispatch = useAppDispatch();
  const handleClick = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      e.preventDefault();
      if (filmId) {
        dispatch(
          postFavouriteFilmAction({
            filmId: filmId,
            status: !isFavourite,
          }),
        ).then(() => {
          fetchFavouriteFilms();
        });
      }
    },
    [dispatch, filmId, isFavourite, fetchFavouriteFilms],
  );

  return (
    <button
      className='btn btn--list film-card__button'
      type='button'
      onClick={handleClick}
    >
      <svg viewBox='0 0 19 20' width='19' height='20'>
        <use
          xlinkHref={isFavourite ? '#in-list' : '#add'}
          data-testid={'favorite-svg'}
        />
      </svg>
      <span>My list</span>
      <span className='film-card__count'>{films.length}</span>
    </button>
  );
};
