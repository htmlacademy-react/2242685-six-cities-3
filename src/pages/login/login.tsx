import { useRef, useState, FormEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { loginAction, fetchFavoritesAction, checkAuthAction } from '../../store/api-actions';
import { AuthorizationStatus, Page, CITIES } from '../../const';
import { Link, useNavigate } from 'react-router-dom';
import { getRandomIntFromRange, handleCityClick } from '../../utils/utils';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

const PASSWORD_ERROR_TEXT = 'The password must contain at least one letter and one digit';

export default function Login() {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const randomCityName = CITIES[getRandomIntFromRange(0, CITIES.length)];

  const navigate = useNavigate();

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate(Page.Main);
    }
  }, [authorizationStatus, navigate]);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    // Проверка пароля перед отправкой
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasDigit = /\d/.test(password);

    if (!hasLetter || !hasDigit) {
      setPasswordError(PASSWORD_ERROR_TEXT);
      return;
    }

    (async () => {
      try {
        await dispatch(loginAction({
          email: loginRef.current?.value || '',
          password
        }));
        dispatch(checkAuthAction());
        dispatch(fetchFavoritesAction());
      } catch (error) {
        setPasswordError(String(error));
      }
    })();
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    // Проверка пароля
    const hasLetter = /[a-zA-Z]/.test(value);
    const hasDigit = /\d/.test(value);

    if (!hasLetter || !hasDigit) {
      setPasswordError(PASSWORD_ERROR_TEXT);
    } else {
      setPasswordError('');
    }
  };

  return (
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form
            className="login__form form"
            action="#"
            method="post"
            onSubmit={handleSubmit}
          >
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input
                ref={loginRef}
                className="login__input form__input"
                type="email"
                name="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input
                className="login__input form__input"
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            {passwordError && (
              <div className="login__error">{passwordError}</div>
            )}
            <button
              className="login__submit form__submit button"
              type="submit"
            >
              Sign in
            </button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <Link
              className="locations__item-link"
              onClick={handleCityClick(randomCityName)}
              to={Page.Main}
            >
              <span>{randomCityName}</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
