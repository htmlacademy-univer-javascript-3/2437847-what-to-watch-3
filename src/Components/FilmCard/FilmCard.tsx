import { Link } from 'react-router-dom';
import { appRoutes } from '../../appRoutes.ts';
import { useState } from 'react';
import { PreviewPlayer } from './PreviewPlayer.tsx';

export type FilmCardProps = {
  id: number;
  name: string;
  imgSrc: string;
  videoSrc: string;
};

export const FilmCard = ({ id, name, imgSrc, videoSrc }: FilmCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timer>();
  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter={() => {
        const interval = setInterval(() => {
          setIsPlaying(true);
        }, 1000);
        setTimer(interval);
      }}
      onMouseLeave={() => {
        clearInterval(timer);
        setIsPlaying(false);
      }}
    >
      <div className="small-film-card__image">
        <PreviewPlayer
          imgSrc={imgSrc}
          videoSrc={videoSrc}
          isPlaying={isPlaying}
        />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={appRoutes.Film(id)}>
          {name}
        </Link>
      </h3>
    </article>
  );
};
