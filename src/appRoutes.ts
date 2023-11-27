export const appRoutes = {
  Main: '/',
  SignIn: '/login',
  MyList: '/mylist',
  Film: (id: string) => `/films/${id}`,
  Player: (id: string) => `/player/${id}`,
  AddReview: (id: string) => `/films/${id}/review`,
};
