import { Rating } from '../Rating/Rating.tsx';
import { MouseEvent, useCallback, useState } from 'react';
import { postCommentAction } from '../../Store/apiActions.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../Hooks/store.ts';
import { appRoutes } from '../../appRoutes.ts';

export type ReviewForm = {
  rating: number;
  comment: string;
};

export const AddReviewForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
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
    async (e: MouseEvent<HTMLElement>) => {
      e.preventDefault();
      const result = await dispatch(
        postCommentAction({ filmId: id!, ...reviewForm }),
      );
      if (!(result as any).error) {
        navigate(appRoutes.Film(id!));
      }
    },
    [dispatch, reviewForm, id],
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
