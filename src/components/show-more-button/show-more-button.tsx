type Props = {
  onClick: () => void;
};

export const ShowMoreButton = ({ onClick }: Props) => (
  <div className="catalog__more">
    <button className="catalog__button" type="button" onClick={onClick}>
      Show more
    </button>
  </div>
);
