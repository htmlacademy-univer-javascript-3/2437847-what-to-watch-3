import { FilmCard, FilmCardProps } from '../film-card/film-card.tsx';

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
