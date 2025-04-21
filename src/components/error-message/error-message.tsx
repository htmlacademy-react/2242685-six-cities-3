import { useAppSelector } from '../../hooks/state';
import { getError } from '../../store/app-data/selectors';
import './error-message.css';

export default function ErrorMessage() {
  const error = useAppSelector(getError);

  return (error)
    ? <div className='error-message'>{error}</div>
    : null;

}
