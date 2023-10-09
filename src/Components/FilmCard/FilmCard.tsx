export const FilmCard = () => (
  <article className="small-film-card catalog__films-card">
    <div className="small-film-card__image">
      <img
        src="img/we-need-to-talk-about-kevin.jpg"
        alt="We need to talk about Kevin"
        width="280"
        height="175"
      />
    </div>
    <h3 className="small-film-card__title">
      <a className="small-film-card__link" href="film-page.html">We need to talk about Kevin</a>
    </h3>
  </article>
);
