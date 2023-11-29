import { MouseEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../appRoutes.ts';

export type PlayButtonProps = {
  filmId?: string;
};

export const PlayButton = ({ filmId }: PlayButtonProps) => {
  const navigate = useNavigate();

  const handleClick = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      e.preventDefault();
      if (filmId) {
        navigate(appRoutes.Player(filmId));
      }
    },
    [filmId, navigate],
  );

  return (
    <button
      className="btn btn--play film-card__button"
      type="button"
      onClick={handleClick}
    >
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s"></use>
      </svg>
      <span>Play</span>
    </button>
  );
};
