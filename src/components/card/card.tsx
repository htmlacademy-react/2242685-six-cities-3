import { Offer } from '../../types/offer';
import { useLocation } from 'react-router-dom';
import { Page } from '../../const';

type CardProps = {
  offer: Offer;
  onMouseOver?: (offerId: string) => void;
  onMouseLeave?: () => void;
}

function percentsRating(rating: number) {
  return Math.round(rating) * 20;
}

function Card({offer, onMouseOver, onMouseLeave}: CardProps) {
  const location = useLocation();
  const pathname = location.pathname.slice(1); //pathname без лидирующего '/'

  let articleClassName = 'place-card';
  let divImageClassName = 'place-card__image-wrapper';
  let imageWidth = 260;
  let imageHeight = 200;

  switch (pathname) {
    case Page.Main:
      articleClassName = `cities__card ${articleClassName}`;
      divImageClassName = `cities__image-wrapper ${divImageClassName}`;
      imageWidth = 260;
      imageHeight = 200;
      break;
    case Page.Favorites:
      articleClassName = `favorites__card ${articleClassName}`;
      divImageClassName = `favorites__image-wrapper ${divImageClassName}`;
      imageWidth = 150;
      imageHeight = 110;
      break;
  }

  return (
    <article
      className={articleClassName}
      id={offer.id}
      onMouseOver={() => onMouseOver?.(offer.id)}
      onMouseLeave={() => onMouseLeave?.()}
    >
      {
        offer.isPremium ?
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
          : null
      }
      <div className={divImageClassName}>
        <a href="#">
          <img className="place-card__image" src={offer.previewImage} width={imageWidth} height={imageHeight} alt="Place image"/>
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${offer.isFavorite ? 'place-card__bookmark-button--active' : ''} button`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${percentsRating(offer.rating)}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{offer.title}</a>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default Card;
