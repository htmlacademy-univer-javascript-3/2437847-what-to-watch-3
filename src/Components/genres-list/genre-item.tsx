import classNames from 'classnames';
import { useAppDispatch } from '../../hooks/store.ts';

import { ButtonStyle } from '../../helpers/button-style.ts';
import { setGenre } from '../../store/films/films.ts';

type GenreItemProps = {
  genre: string;
  isActive?: boolean;
};

export const GenreItem = ({ genre, isActive }: GenreItemProps) => {
  const dispatch = useAppDispatch();

  return (
    <li
      className={classNames('catalog__genres-item', {
        'catalog__genres-item--active': isActive,
      })}
    >
      <button
        style={ButtonStyle}
        className="catalog__genres-link"
        onClick={() => {
          dispatch(setGenre(genre));
        }}
      >
        {genre}
      </button>
    </li>
  );
};
