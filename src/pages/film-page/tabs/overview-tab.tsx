import { useCurrentFilmSelector } from '../../../store/film/selectors.ts';
import { FilmRating } from '../../../components/film-rating/film-rating.tsx';

export const OverviewTab = () => {
  const { data } = useCurrentFilmSelector();

  return (
    <>
      <FilmRating rating={data?.rating} scoresCount={data?.scoresCount} />

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
