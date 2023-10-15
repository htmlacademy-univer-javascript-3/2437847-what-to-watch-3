import { Star } from './Star.tsx';

type RatingProps = {
  onClick: (value: number) => void;
};
export const Rating = ({ onClick }: RatingProps) => {
  return (
    <div className="rating">
      <div className="rating__stars">
        {[...Array(10)].map((_, i) => (
          <Star key={10 - i} value={10 - i} onClick={() => onClick(10 - i)} />
        ))}
      </div>
    </div>
  );
};
