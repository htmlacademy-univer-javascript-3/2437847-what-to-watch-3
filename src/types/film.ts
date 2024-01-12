export type FilmListType = {
  id: string;
  name: string;
  genre: string;
  previewImage: string;
  previewVideoLink: string;
};

export type FilmType = {
  id: string;
  name: string;
  posterImage: string;
  backgroundImage: string;
  backgroundColor: string;
  videoLink: string;
  description: string;
  rating: number;
  scoresCount: number;
  director: string;
  starring: string[];
  runTime: number;
  genre: string;
  released: number;
  isFavorite: boolean;
};

export type PromoFilmType = {
  id: string;
  name: string;
  posterImage: string;
  backgroundImage: string;
  videoLink: string;
  genre: string;
  released: number;
  isFavorite: boolean;
};

export type CommentType = {
  id: string;
  date: string;
  user: string;
  comment: string;
  rating: number;
};

export type AddCommentType = {
  comment: string;
  rating: number;
};

export const ALL_GENRES = 'All genres';
