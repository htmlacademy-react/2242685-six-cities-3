import { useState, ReactEventHandler, Fragment, FormEventHandler } from 'react';
import { useDispatch } from 'react-redux';
import { postComment } from '../../store/api-actions';
import { useParams } from 'react-router-dom';
import { CommentToPost } from '../../types/types';

type Rating = {
  defaultValue: number;
  id: string;
  title: string;
}

type RatingItemProps = {
  onStarClick: ReactEventHandler;
}

type TChangeHandler = ReactEventHandler<HTMLInputElement | HTMLTextAreaElement>;

const RATINGS: Rating[] = [
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

function ReviewsRatingForm ({onStarClick}: RatingItemProps) {
  return (
    <div className="reviews__rating-form form__rating">
      {RATINGS.map((rating) => (
        <Fragment key={rating.id}>
          <input
            className="form__rating-input visually-hidden"
            name="rating"
            defaultValue={rating.defaultValue}
            id={rating.id}
            type="radio"
            onChange={onStarClick}
          />
          <label
            htmlFor={rating.id}
            className="reviews__rating-label form__rating-label"
            title={rating.title}
          >
            <svg className="form__star-image" width={37} height={33}>
              <use xlinkHref="#icon-star" />
            </svg>
          </label>
        </Fragment>
      ))}
    </div>
  );
}

function ReviewsForm() {
  const [review, setReview] = useState<CommentToPost>({comment: '', rating: 0});
  const {id} = useParams();
  const dispatch = useDispatch();

  const handleReviewChange: TChangeHandler = (evt) => {
    const {name, value} = evt.currentTarget;
    setReview({...review, [name]: value});
  };

  const handleReviewFormSubmit: FormEventHandler<HTMLFormElement> = () => {
    dispatch(postComment([id, review]));
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleReviewFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>

      <ReviewsRatingForm onStarClick={handleReviewChange} />

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        defaultValue={''}
        onChange={handleReviewChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={review.rating === 0 || review.comment.length < 50 || review.comment.length > 300}
        >
Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewsForm;
