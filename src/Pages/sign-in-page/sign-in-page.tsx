import { Footer } from '../../components/footer/footer.tsx';
import { Logo } from '../../components/logo/logo.tsx';
import { useAppDispatch } from '../../hooks/store.ts';
import { useState, MouseEvent } from 'react';
import { loginAction } from '../../store/api-actions.ts';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../app-routes.ts';

export const SignInPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authStatus = useAuthorizationStatusSelector();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    dispatch(loginAction({ email, password })).then((result) => {
      if (result.payload) {
        navigate(appRoutes.Main);
      }
    });
  };

  useEffect(() => {
    if (authStatus === AuthorizationStatus.Auth) {
      navigate(appRoutes.Main);
    }
  }, [authStatus, navigate]);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />
        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form">
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <label
                className="sign-in__label visually-hidden"
                htmlFor="user-email"
              >
                Email address
              </label>
            </div>
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <label
                className="sign-in__label visually-hidden"
                htmlFor="user-password"
              >
                Password
              </label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button
              className="sign-in__btn"
              type="submit"
              onClick={handleSubmit}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};
