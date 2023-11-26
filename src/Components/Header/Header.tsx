import { Logo } from '../Logo/Logo.tsx';
import { MouseEvent, ReactNode, useCallback } from 'react';
import { useAppDispatch } from '../../Hooks/store.ts';
import { AuthorizationStatus } from '../../Types/auth.ts';
import { Link } from 'react-router-dom';
import { appRoutes } from '../../appRoutes.ts';
import { logoutAction } from '../../Store/apiActions.ts';
import {
  useAuthorizationStatusSelector,
  useAvatarLinkSelector,
} from '../../Store/selectors.ts';

type HeaderProps = {
  children?: ReactNode;
};

export const Header = ({ children }: HeaderProps) => {
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
    <header className="page-header film-card__head">
      <Logo />
      {children}
      {authStatus === AuthorizationStatus.Auth ? (
        <ul className="user-block">
          <li className="user-block__item">
            <div className="user-block__avatar">
              <img src={avatarLink} alt="User avatar" width="63" height="63" />
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
