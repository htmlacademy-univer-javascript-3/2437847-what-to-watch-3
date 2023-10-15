type StarProps = {
  value: number;
  onClick: () => void;
};

export const Star = ({ value, onClick }: StarProps) => (
  <>
    <input
      className="rating__input"
      id={`star-${value}`}
      type="radio"
      name="rating"
      value={value}
      onClick={onClick}
    />
    <label className="rating__label" htmlFor={`star-${value}`}>
      Rating {value}
    </label>
  </>
);
