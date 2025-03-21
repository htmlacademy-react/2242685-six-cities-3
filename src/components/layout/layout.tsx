import { Outlet } from 'react-router-dom';
import Header from './header';

function Layout () {
  return (
    <div className='page'>
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
