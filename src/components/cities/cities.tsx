import { Link } from 'react-router-dom';
import { CITIES } from '../../const';
import { Page } from '../../const';
import { useAppDispatch } from '../../hooks/state';
import { selectCity } from '../../store/action';

type citiesProps = {
  cities: typeof CITIES;
}

export default function Cities ({cities}: citiesProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">

          {cities.map((cityName) => (
            <li key={cityName} className="locations__item" >
              <Link
                className="locations__item-link tabs__item"
                to={Page.Main}
                onClick={
                  (evt) => {
                    evt.preventDefault();
                    dispatch(selectCity(cityName));
                  }
                }
              >
                <span>{cityName}</span>
              </Link>
            </li>
          )
          )}

        </ul>
      </section>
    </div>
  );
}
