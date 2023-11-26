import { useCurrentFilmSelector } from '../../../Store/selectors.ts';

export const OverviewTab = () => {
  const { film } = useCurrentFilmSelector();

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{film?.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">Very good</span>
          <span className="film-rating__count">
            {film?.scoresCount} ratings
          </span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{film?.description}</p>

        <p className="film-card__director">
          <strong>Director: {film?.director}</strong>
        </p>

        <p className="film-card__starring">
          <strong>
            Starring: {film?.starring.map((actor) => actor).join(', ')}
          </strong>
        </p>
      </div>
    </>
  );
};
