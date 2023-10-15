import { Header } from '../../Components/Header/Header.tsx';
import { appRoutes } from '../../appRoutes.ts';
import { Link } from 'react-router-dom';
import { AddReviewForm } from '../../Components/AddReviewForm/AddReviewForm.tsx';

export type AddReviewPageProps = {
  id: number;
  name: string;
  imgSrc: string;
  bgImgSrc: string;
};

export const AddReviewPage = ({
  id,
  name,
  imgSrc,
  bgImgSrc,
}: AddReviewPageProps) => (
  <section className="film-card film-card--full">
    <div className="film-card__header">
      <div className="film-card__bg">
        <img src={bgImgSrc} alt={name} />
      </div>

      <h1 className="visually-hidden">WTW</h1>
      <Header>
        <nav className="breadcrumbs">
          <ul className="breadcrumbs__list">
            <li className="breadcrumbs__item">
              <Link to={appRoutes.Film(id)} className="breadcrumbs__link">
                {name}
              </Link>
            </li>
            <li className="breadcrumbs__item">
              <a className="breadcrumbs__link">Add review</a>
            </li>
          </ul>
        </nav>
      </Header>

      <div className="film-card__poster film-card__poster--small">
        <img src={imgSrc} alt={name} width="218" height="327" />
      </div>
    </div>

    <AddReviewForm />
  </section>
);
