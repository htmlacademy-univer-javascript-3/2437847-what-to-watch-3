import { FilmCard, FilmCardProps } from '../FilmCard/FilmCard.tsx';
import { useState } from 'react';

type FilmCardListProps = {
  films: FilmCardProps[];
};

export const FilmCardList = ({ films }: FilmCardListProps) => {
  const [, setActiveFilm] = useState<number | null>();
  return (
    <div className="catalog__films-list">
      {films.map((film) => (
        <FilmCard
          key={film.id}
          {...film}
          onMouseEnter={() => {
            setActiveFilm(film.id);
          }}
          onMouseLeave={() => {
            setActiveFilm(null);
          }}
        />
      ))}
    </div>
  );
};
