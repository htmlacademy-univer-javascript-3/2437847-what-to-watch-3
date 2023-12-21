import { useCurrentFilmSelector } from '../../../store/film/selectors.ts';

export const OverviewTab = () => {
  const { data } = useCurrentFilmSelector();

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{data?.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">Very good</span>
          <span className="film-rating__count">
            {data?.scoresCount} ratings
          </span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{data?.description}</p>

        <p className="film-card__director">
          <strong>Director: {data?.director}</strong>
        </p>

        <p className="film-card__starring">
          <strong>
            Starring: {data?.starring.map((actor) => actor).join(', ')}
          </strong>
        </p>
      </div>
    </>
  );
};
