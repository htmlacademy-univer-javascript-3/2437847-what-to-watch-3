export const appRoutes = {
  Main: '/',
  SignIn: '/login',
  MyList: '/mylist',
  Film: (id: string | undefined) => `/films/${id || ''}`,
  Player: (id: string | undefined) => `/player/${id || ''}`,
  AddReview: (id: number | undefined) => `/films/${id || ''}/review`,
};
