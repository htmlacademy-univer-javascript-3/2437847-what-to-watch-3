import {MainPage} from './Pages/MainPage/MainPage.tsx';

type AppProps = {
  name: string;
  genre: string;
  releaseDate: number;
}

export const App = (props: AppProps) => (<MainPage {...props} />);
