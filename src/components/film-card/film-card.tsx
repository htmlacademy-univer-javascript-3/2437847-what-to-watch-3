import { Link, useNavigate } from 'react-router-dom';
import { appRoutes } from '../../app-routes.ts';
import { useState } from 'react';
import { PreviewPlayer } from './preview-player.tsx';

export type FilmCardProps = {
  id: string;
  name: string;
  previewImage: string;
  previewVideoLink: string;
};

export const FilmCard = ({
  id,
  name,
  previewImage,
  previewVideoLink,
}: FilmCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <div
        className="small-film-card__image"
        onClick={() => navigate(appRoutes.Film(id))}
      >
        <PreviewPlayer
          imgSrc={previewImage}
          videoSrc={previewVideoLink}
          isHovered={isHovered}
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
