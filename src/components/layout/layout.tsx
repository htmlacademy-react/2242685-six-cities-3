import {Outlet, useLocation} from 'react-router-dom';
import {Page} from '../../const';
import { Link } from 'react-router-dom';

function Layout () {
  const location = useLocation();
  const pathname = location.pathname.slice(1); //pathname без лидирующего '/'

  let topDivClassName = 'page';
  let shouldRenderHeaderNav = true;

  switch (pathname) {
    case Page.Main:
      topDivClassName += ' page--gray page--main';
      break;
    case Page.Login:
      topDivClassName += ' page--gray page--login';
      shouldRenderHeaderNav = false;
      break;
  }

  return (
    <div className={topDivClassName}>
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
            {
              shouldRenderHeaderNav ? (
                <nav className="header__nav">
                  <ul className="header__nav-list">
                    <li className="header__nav-item user">
                      <a
                        className="header__nav-link header__nav-link--profile"
                        href="#"
                      >
                        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                        <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                        </span>
                        <span className="header__favorite-count">3</span>
                      </a>
                    </li>
                    <li className="header__nav-item">
                      <a className="header__nav-link" href="#">
                        <span className="header__signout">Sign out</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              ) : null
            }
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}

export default Layout;
