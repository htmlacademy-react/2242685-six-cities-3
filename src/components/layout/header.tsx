import { Link } from 'react-router-dom';
import { Page, AuthorizationStatus } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks/state';
import { memo } from 'react';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getFavorites } from '../../store/app-data/selectors';
import { logoutAction } from '../../store/api-actions';
import { getUserData } from '../../store/user-process/selectors';

function Header () {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const userData = useAppSelector(getUserData);
  const email = userData?.email;
  const avatarUrl = userData?.avatarUrl;
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;
  const favorites = useAppSelector(getFavorites);
  const favoritesCount = favorites?.length;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={Page.Main} >
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width={81}
                height={41}
              />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">

              {isAuth ?
                <>
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to={Page.Favorites}
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                        <img
                          src={avatarUrl}
                          alt="Аватар пользователя"
                        />
                      </div>
                      <span className="header__user-name user__name">
                        {email}
                      </span>
                      <span className="header__favorite-count">{favoritesCount}</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <Link
                      className="header__nav-link"
                      onClick={(evt) => {
                        evt.preventDefault();
                        dispatch(logoutAction());
                      } }
                      to={Page.Main}
                    >
                      <span className="header__signout">Sign out</span>
                    </Link>
                  </li>
                </>
                :
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={Page.Login}>
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>}

            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

const MemorizedHeader = memo(Header);

export default MemorizedHeader;
