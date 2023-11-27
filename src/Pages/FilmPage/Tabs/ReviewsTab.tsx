import { useComments } from '../../../Hooks/films.ts';
import { convertDate } from '../../../Helpers/Review.ts';
import { Loader } from '../../../Components/Loader/Loader.tsx';
import { usePathId } from '../../../Hooks/usePathId.ts';

export const ReviewsTab = () => {
  const id = usePathId();
  const { data: comments, isLoading } = useComments(id);
  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        <Loader isLoading={isLoading}>
          {comments.map((comment) => (
            <div className="review" key={comment.id}>
              <blockquote className="review__quote">
                <p className="review__text">{comment.comment}</p>

                <footer className="review__details">
                  <cite className="review__author">{comment.user}</cite>
                  <time className="review__date" dateTime="2016-12-24">
                    {convertDate(comment.date)}
                  </time>
                </footer>
              </blockquote>

              <div className="review__rating">{comment.rating}</div>
            </div>
          ))}
        </Loader>
      </div>
    </div>
  );
};
