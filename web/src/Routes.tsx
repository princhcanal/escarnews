import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from './store';
import { Feed } from './pages/Feed/Feed';
import { Profile } from './pages/Profile/Profile';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { Navbar } from './components/Navbar/Navbar';

export const Routes = () => {
  const isLoggedIn = useSelector<RootState, boolean>(
    (state) => state.auth.isLoggedIn
  );

  const noAuthRoutes = (
    <div className='layout'>
      <div className='navbar'>
        <Navbar authorized={isLoggedIn} />
      </div>
      <div className='content'>
        <Switch>
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Redirect to='/login' />
        </Switch>
      </div>
    </div>
  );

  const authRoutes = (
    <div className='layout'>
      <div className='navbar'>
        <Navbar authorized={isLoggedIn} />
      </div>
      <main className='content'>
        <Switch>
          <Route path='/profile' component={Profile} />
          <Route path='/' component={Feed} />
          <Redirect to='/' />
        </Switch>
      </main>
    </div>
  );

  return isLoggedIn ? authRoutes : noAuthRoutes;
};
