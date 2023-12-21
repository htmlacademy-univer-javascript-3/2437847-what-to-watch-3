import { Logo } from '../logo/logo.tsx';
import { MouseEvent, ReactNode, useCallback } from 'react';
import { useAppDispatch } from '../../hooks/store.ts';
import { AuthorizationStatus } from '../../types/auth.ts';
import { Link } from 'react-router-dom';
import { appRoutes } from '../../app-routes.ts';
import { logoutAction } from '../../store/api-actions.ts';
import {
  useAuthorizationStatusSelector,
  useAvatarLinkSelector,
} from '../../store/user/selectors.ts';
import classNames from 'classnames';

type HeaderProps = {
  children?: ReactNode;
  isMyListPage?: boolean;
};

export const Header = ({ children, isMyListPage }: HeaderProps) => {
  const authStatus = useAuthorizationStatusSelector();
  const avatarLink = useAvatarLinkSelector();
  const dispatch = useAppDispatch();
  const signOutHandler = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();
      dispatch(logoutAction());
    },
    [dispatch],
  );

  return (
    <header
      className={classNames(
        'page-header',
        isMyListPage ? 'user-page__head' : 'film-card__head',
      )}
    >
      <Logo />
      {children}
      {authStatus === AuthorizationStatus.Auth ? (
        <ul className="user-block">
          <li className="user-block__item">
            <div className="user-block__avatar">
              <Link to={appRoutes.MyList}>
                <img
                  src={avatarLink}
                  alt="User avatar"
                  width="63"
                  height="63"
                />
              </Link>
            </div>
          </li>
          <li className="user-block__item">
            <a onClick={signOutHandler} className="user-block__link">
              Sign out
            </a>
          </li>
        </ul>
      ) : (
        <div className="user-block">
          <Link to={appRoutes.SignIn} className="user-block__link">
            Sign in
          </Link>
        </div>
      )}
    </header>
  );
};
