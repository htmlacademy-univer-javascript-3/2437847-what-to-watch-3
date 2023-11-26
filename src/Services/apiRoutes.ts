export const ApiRoutes = {
  Films: '/films',
  PromoFilm: '/promo',
  Login: '/login',
  Logout: '/logout',
  Film: (id: string | undefined) => `/films/${id || ''}`,
  SimilarFilms: (id: string | undefined) => `/films/${id || ''}/similar`,
  Comments: (id: string | undefined) => `/comments/${id || ''}`,
};
