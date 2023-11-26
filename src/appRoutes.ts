export const appRoutes = {
  Main: '/',
  SignIn: '/login',
  MyList: '/mylist',
  Film: (id: string | undefined) => `/films/${id || ''}`,
  Player: (id: string | undefined) => `/player/${id || ''}`,
  AddReview: (id: string | undefined) => `/films/${id || ''}/review`,
};
