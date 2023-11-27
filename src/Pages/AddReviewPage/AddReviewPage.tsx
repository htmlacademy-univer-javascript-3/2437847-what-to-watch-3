import { Header } from '../../Components/Header/Header.tsx';
import { appRoutes } from '../../appRoutes.ts';
import { Link } from 'react-router-dom';
import { AddReviewForm } from '../../Components/AddReviewForm/AddReviewForm.tsx';
import { Loader } from '../../Components/Loader/Loader.tsx';
import { useFilm } from '../../Hooks/films.ts';
import { usePathId } from '../../Hooks/usePathId.ts';

export const AddReviewPage = () => {
  const id = usePathId();
  const { data: film, isLoading } = useFilm(id);

  return (
    <Loader isLoading={isLoading} height={'100vh'} backgroundColor={'#e1b0b2'}>
      <section className="film-card film-card--full">
        <div className="film-card__header">
          <div className="film-card__bg">
            <img src={film?.backgroundImage} alt={film?.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>
          <Header>
            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link to={appRoutes.Film(id)} className="breadcrumbs__link">
                    {film?.name}
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>
          </Header>

          <div className="film-card__poster film-card__poster--small">
            <img
              src={film?.posterImage}
              alt={film?.name}
              width="218"
              height="327"
            />
          </div>
        </div>

        <AddReviewForm />
      </section>
    </Loader>
  );
};
