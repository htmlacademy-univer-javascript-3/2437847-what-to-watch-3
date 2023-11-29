export const ApiRoutes = {
  Films: '/films',
  PromoFilm: '/promo',
  Login: '/login',
  Logout: '/logout',
  FavoriteFilms: `/favorite`,
  FavoriteFilm: (id: string, status: boolean) =>
    `/favorite/${id}/${status ? 1 : 0}`,
  Film: (id: string) => `/films/${id}`,
  SimilarFilms: (id: string) => `/films/${id}/similar`,
  Comments: (id: string) => `/comments/${id}`,
};
