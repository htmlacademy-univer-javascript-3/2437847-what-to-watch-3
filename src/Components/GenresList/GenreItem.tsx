import classNames from 'classnames';
import { useAppDispatch } from '../../Hools/store.ts';
import { setGenre } from '../../Store/action.ts';

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
      <a
        href="#"
        className="catalog__genres-link"
        onClick={(event) => {
          dispatch(setGenre(genre));
          event.preventDefault();
        }}
      >
        {genre}
      </a>
    </li>
  );
};
