import { useState, ReactEventHandler, Fragment, FormEventHandler, useRef } from 'react';
// import { useDispatch } from 'react-redux';
import { fetchCommentsAction, postCommentAction } from '../../store/api-actions';
import { useParams } from 'react-router-dom';
import { store } from '../../store';
import { processErrorHandle } from '../../services/process-error-handle';

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
  const [review, setReview] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {id} = useParams();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextChange: TChangeHandler = (evt) => {
    const {value} = evt.currentTarget;
    setReview(value);
  };

  const handleRatingChange: TChangeHandler = (evt) => {
    const {value} = evt.currentTarget;
    setRating(Number(value));
  };

  const handleReviewFormSubmit: FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();
    setIsLoading(true);

    store.dispatch(postCommentAction([id, {comment: review, rating}]))
      .then(() => {
        store.dispatch(fetchCommentsAction(id));
        setReview('');
        setRating(0);
        if (textareaRef.current) {
          textareaRef.current.value = '';
        }
      })
      .catch((error) => {
        processErrorHandle(String(error));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  // action="#"
  return (
    <form className="reviews__form form" method="post" onSubmit={handleReviewFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>

      {!isLoading && <ReviewsRatingForm onStarClick={handleRatingChange} />}

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        defaultValue={''}
        onChange={handleTextChange}
        disabled={isLoading}
        ref={textareaRef}
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
          disabled={isLoading || rating === 0 || review.length < 50 || review.length > 300}
        >
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

export default ReviewsForm;
