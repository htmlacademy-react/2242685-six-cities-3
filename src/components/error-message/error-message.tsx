import { useAppSelector } from '../../hooks/state';
import './error-message.css';

export default function ErrorMessage() {
  const error = useAppSelector((state) => state.error);

  return (error)
    ? <div className='error-message'>{error}</div>
    : null;

}
