import classNames from 'classnames';
import { useAppDispatch } from '../../Hools/store.ts';
import { setGenre } from '../../Store/actions.ts';
import { ButtonStyle } from '../../Helpers/ButtonStyle.ts';

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
