import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

function LayoutLogin () {
  const topDivClassName = 'page page--gray page--login';

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
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}

export default LayoutLogin;
