// import { useState } from 'react';

type Star = {
  defaultValue: number;
  id: string;
  title: string;
}

type StarItemProps = {
  star: Star;
}

const Stars: Star[] = [
  {
    defaultValue: 5,
    id: '5-stars',
    title: 'perfect'
  },
  {
    defaultValue: 4,
    id: '4-stars',
    title: 'good'
  },
  {
    defaultValue: 3,
    id: '3-stars',
    title: 'not bad'
  },
  {
    defaultValue: 2,
    id: '2-stars',
    title: 'badly'
  },
  {
    defaultValue: 1,
    id: '1-star',
    title: 'terribly'
  },
];

function StarItem ({star}: StarItemProps) {
  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        defaultValue={star.defaultValue}
        id={star.id}
        type="radio"
      />
      <label
        htmlFor={star.id}
        className="reviews__rating-label form__rating-label"
        title={star.title}
      >
        <svg className="form__star-image" width={37} height={33}>
          <use xlinkHref="#icon-star" />
        </svg>
      </label>
    </>
  );
}

function ReviewsForm () {
  // const [rating, setRating] = useState(0);
  // const [text, setText] = useState('');

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
Your review
      </label>
      <div className="reviews__rating-form form__rating">

        {Stars.map((star) => (
          <StarItem key={star.defaultValue} star={star} />
        ))}

      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        defaultValue={''}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={false} //???
        >
Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewsForm;
