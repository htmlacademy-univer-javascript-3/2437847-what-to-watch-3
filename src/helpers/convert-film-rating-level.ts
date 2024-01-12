enum FilmRatingLevel {
  BAD = 3,
  NORMAL = 5,
  GOOD = 8,
  VERY_GOOD = 10,
  AWESOME = 10,
}

export const convertFilmRatingToLevel = (rating: number): string => {
  if (rating < 3) {
    return 'Bad';
  } else if (rating >= FilmRatingLevel.BAD && rating < FilmRatingLevel.NORMAL) {
    return 'Normal';
  } else if (
    rating >= FilmRatingLevel.NORMAL &&
    rating < FilmRatingLevel.GOOD
  ) {
    return 'Good';
  } else if (
    rating >= FilmRatingLevel.GOOD &&
    rating < FilmRatingLevel.AWESOME
  ) {
    return 'Very good';
  } else if (rating === FilmRatingLevel.AWESOME) {
    return 'Awesome';
  } else {
    return '';
  }
};
