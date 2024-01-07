import { Star } from './star.tsx';

const MAX_RATING = 10;

type RatingProps = {
  onClick: (value: number) => void;
  disabled?: boolean;
};

export const Rating = ({ onClick, disabled }: RatingProps) => (
  <div className="rating">
    <div className="rating__stars">
      {Array.from(Array(MAX_RATING).keys()).map((i) => (
        <Star
          key={MAX_RATING - i}
          value={MAX_RATING - i}
          onClick={() => onClick(MAX_RATING - i)}
          disabled={disabled}
        />
      ))}
    </div>
  </div>
);
