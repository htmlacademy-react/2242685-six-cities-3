import { Offer } from '../../types/types';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { AuthorizationStatus, Page } from '../../const';
import { handleFavoriteButtonClick, percentsRating } from '../../utils/utils';
import { useAppSelector } from '../../hooks/state';
import { memo } from 'react';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

type CardProps = {
  offer: Offer;
  onCardHover?: (offerId: string) => void;
  originalPage: Page;
}

function Card({offer, onCardHover, originalPage}: CardProps) {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();
  const location = useLocation();
  let pathname = location.pathname;
  const slashIndex = pathname.indexOf('/');

  if (slashIndex !== -1) {
    pathname = pathname.substring(0, slashIndex);
  }

  const offerLink = `${Page.Offer}/${offer.id}`;

  let articleClassName = 'place-card';
  let divImageClassName = 'place-card__image-wrapper';
  let imageWidth = 260;
  let imageHeight = 200;

  switch (originalPage) {
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
    case Page.Offer:
      articleClassName = `near-places__card ${articleClassName}`;
      divImageClassName = `near-places__image-wrapper ${divImageClassName}`;
      imageWidth = 260;
      imageHeight = 200;
      break;
  }

  return (
    <article
      className={articleClassName}
      id={offer.id}
      onMouseOver={() => onCardHover?.(offer.id)}
    >
      {
        offer.isPremium ?
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
          : null
      }
      <div className={divImageClassName}>
        <Link to={offerLink}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={imageWidth}
            height={imageHeight}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${offer.isFavorite && authorizationStatus === AuthorizationStatus.Auth ? 'place-card__bookmark-button--active' : ''} button`}
            type="button"
            onClick={handleFavoriteButtonClick(offer.id, Number(!offer.isFavorite), authorizationStatus, navigate)}
          >
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
          <Link to={offerLink}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

const MemorizedCard = memo(Card);

export default MemorizedCard;
