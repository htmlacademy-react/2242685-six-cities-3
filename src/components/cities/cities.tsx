import { CITIES } from '../../const';

export default function Cities () {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES.map((city) => (
            <li key={city} className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span>{city}</span>
              </a>
            </li>
          )
          )}
        </ul>
      </section>
    </div>
  );
}
