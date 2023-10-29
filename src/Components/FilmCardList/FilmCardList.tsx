import { FilmCard, FilmCardProps } from '../FilmCard/FilmCard.tsx';

type FilmCardListProps = {
  films: FilmCardProps[];
};

export const FilmCardList = ({ films }: FilmCardListProps) => (
  <div className="catalog__films-list">
    {films.map((film) => (
      <FilmCard key={film.id} {...film} />
    ))}
  </div>
);
