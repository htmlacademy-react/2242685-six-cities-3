import { Link } from 'react-router-dom';
import { Page, AuthorizationStatus } from '../../const';
import { logoutAction } from '../../store/api-actions';
import { useAppSelector, useAppDispatch } from '../../hooks/state';

export default function Header () {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const email = useAppSelector((state) => state.email);

  // if (authorizationStatus === AuthorizationStatus.Auth) {отображаем email и кнопку Sign out}
  // else {отображаем кнопку Sign in - разметка ниже}
  //   <li class="header__nav-item user">
  //   <a class="header__nav-link header__nav-link--profile" href="#">
  //     <div class="header__avatar-wrapper user__avatar-wrapper"></div>
  //     <span class="header__login">Sign in</span>
  //   </a>
  // </li>

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to="/" >
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
              <li className="header__nav-item user">
                <Link
                  className="header__nav-link header__nav-link--profile"
                  to={`/${Page.Favorites}`}
                >
                  <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                  <span className="header__user-name user__name">
                    {email}
                  </span>
                  <span className="header__favorite-count">3</span>
                </Link>
              </li>
              <li className="header__nav-item">
                <Link
                  className="header__nav-link"
                  onClick={(evt) => {
                    evt.preventDefault();
                    dispatch(logoutAction());
                  }}
                  to={Page.Main}
                >
                  <span className="header__signout">Sign out</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
