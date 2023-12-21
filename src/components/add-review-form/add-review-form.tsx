import { MouseEvent, useCallback, useState } from 'react';
import { useAppDispatch } from '../../hooks/store.ts';
import { useNavigate } from 'react-router-dom';
import { usePathId } from '../../hooks/use-path-id.ts';
import { postCommentAction } from '../../store/api-actions.ts';
import { appRoutes } from '../../app-routes.ts';
import { Rating } from '../rating/rating.tsx';

export type ReviewForm = {
  rating: number;
  comment: string;
};

export const AddReviewForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const id = usePathId();
  const [reviewForm, setReviewForm] = useState<ReviewForm>({
    rating: 0,
    comment: '',
  });

  const handleChange = useCallback(
    (nextValue: Partial<ReviewForm>) => {
      setReviewForm((prevValue) => prevValue && { ...prevValue, ...nextValue });
    },
    [setReviewForm],
  );

  const handleSubmit = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      setDisabled(true);
      e.preventDefault();
      dispatch(postCommentAction({ filmId: id, ...reviewForm })).then(
        (result) => {
          setDisabled(false);
          if (result.payload) {
            navigate(appRoutes.Film(id));
          }
        },
      );
    },
    [dispatch, reviewForm, id, navigate],
  );

  return (
    <div className="add-review">
      <form action="#" className="add-review__form">
        <Rating
          onClick={(value: number) => {
            handleChange({
              rating: value,
            });
          }}
          disabled={disabled}
        />
        <div className="add-review__text">
          <textarea
            className="add-review__textarea"
            name="review-text"
            id="review-text"
            placeholder="Review text"
            value={reviewForm.comment}
            onChange={(e) => {
              handleChange({
                comment: e.target.value,
              });
            }}
            disabled={disabled}
          />
          <div className="add-review__submit">
            <button
              className="add-review__btn"
              type="submit"
              disabled={
                reviewForm.comment.length < 50 ||
                reviewForm.comment.length > 400 ||
                reviewForm.rating === 0 ||
                disabled
              }
              onClick={handleSubmit}
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
