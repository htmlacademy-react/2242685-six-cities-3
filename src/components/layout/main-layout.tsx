import { Outlet } from 'react-router-dom';
import Header from './header';

export default function MainLayout () {
  return (
    <div className='page page--gray page--main'>
      <Header />
      <Outlet />
    </div>
  );
}
