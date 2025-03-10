import { comments } from '../../mocks/comments';
import { Comment, Comments } from '../../types/comment';
import { percentsRating } from '../../utils/utils';
import dayjs from 'dayjs';
import ReviewsForm from './reviews-form';

const MAX_COMMENTS = 10;

type ReviewsProps = {
  offerId: string;
  isAuth: boolean;
}

type ReviewsItemProps = {
  comment: Comment;
}

type ReviewDateProps = {
  reviewDate: string;
}

function ReviewDate({reviewDate}: ReviewDateProps) {
  return (
    <>
      {dayjs(reviewDate).format('MMMM YYYY')}
    </>
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
        <time className="reviews__time" dateTime={comment.date}>
          <ReviewDate reviewDate={comment.date} />
        </time>
      </div>
    </li>
  );
}

function Reviews ({offerId, isAuth}: ReviewsProps) {
  const offerComments: Comments = comments.filter((comment) => comment.id === offerId);
  const reviewsAmount = offerComments.length;
  offerComments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  offerComments.slice(0, MAX_COMMENTS);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
      Reviews · <span className="reviews__amount">{reviewsAmount}</span>
      </h2>
      <ul className="reviews__list">
        {offerComments.map((comment) => (
          <ReviewsItem key={comment.date} comment={comment} />
        ))}
      </ul>

      {isAuth && <ReviewsForm />}

    </section>
  );
}

export default Reviews;
