import { Star } from './Star.tsx';

type RatingProps = {
  onClick: (value: number) => void;
};
export const Rating = ({ onClick }: RatingProps) => (
  <div className="rating">
    <div className="rating__stars">
      {Array.from(Array(10).keys()).map((i) => (
        <Star key={10 - i} value={10 - i} onClick={() => onClick(10 - i)} />
      ))}
    </div>
  </div>
);
