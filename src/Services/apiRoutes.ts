export const ApiRoutes = {
  Films: '/films',
  PromoFilm: '/promo',
  Login: '/login',
  Logout: '/logout',
  Film: (id: string) => `/films/${id}`,
  SimilarFilms: (id: string) => `/films/${id}/similar`,
  Comments: (id: string) => `/comments/${id}`,
};
