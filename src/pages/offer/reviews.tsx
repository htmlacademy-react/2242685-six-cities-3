import { Comment } from '../../types/types';
import { percentsRating } from '../../utils/utils';
import ReviewsForm from './reviews-form';
import { memo, useEffect } from 'react';
import { fetchCommentsAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { AuthorizationStatus } from '../../const';
import { getComments, getFormattedComments } from '../../store/app-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

type ReviewsProps = {
  currentOfferId: string | undefined;
}

type ReviewsItemProps = {
  comment: Comment;
}

type ReviewDateProps = {
  reviewDate: Date;
}

function ReviewDate({reviewDate}: ReviewDateProps) {
  const monthName = reviewDate.toLocaleString('en-US', { month: 'long' });
  const fullYear = reviewDate.getFullYear();
  return (
    <time className="reviews__time" dateTime={reviewDate.toISOString()}>
      {`${monthName} ${fullYear}`}
    </time>
  );
}

function ReviewsItem ({comment}: ReviewsItemProps) {
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={comment.user.avatarUrl}
            width={54}
            height={54}
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{comment.user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${percentsRating(comment.rating)}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment.comment}
        </p>

        <ReviewDate reviewDate={new Date(comment.date)} />

      </div>
    </li>
  );
}

const MemorizedReviewsItem = memo(ReviewsItem);

function Reviews ({currentOfferId}: ReviewsProps) {
  const comments = useAppSelector(getComments);
  const commentsToDisplay = useAppSelector(getFormattedComments);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentOfferId) {
      dispatch(fetchCommentsAction(currentOfferId));
    }
  }, [dispatch, currentOfferId]);

  const reviewsAmount = comments?.length || 0;

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
      Reviews · <span className="reviews__amount">{reviewsAmount}</span>
      </h2>
      <ul className="reviews__list">
        {commentsToDisplay?.map((comment) => (
          <MemorizedReviewsItem key={comment.commentId} comment={comment} />
        ))}
      </ul>

      {authorizationStatus === AuthorizationStatus.Auth && <ReviewsForm />}

    </section>
  );
}

const MemorizedReviews = memo(Reviews);

export default MemorizedReviews;
