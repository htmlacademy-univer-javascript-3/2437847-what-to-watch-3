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
      e.preventDefault();
      dispatch(postCommentAction({ filmId: id, ...reviewForm })).then(
        (result) => {
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
          />
          <div className="add-review__submit">
            <button
              className="add-review__btn"
              type="submit"
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
