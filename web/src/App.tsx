import { useEffect, useState } from 'react';
import './App.css';

import { useDispatch } from 'react-redux';

import { Routes } from './Routes';
import * as AuthActions from './store/auth/actions';

const App = () => {
  const dispatch = useDispatch();
  const [routes, setRoutes] = useState<JSX.Element>();

  useEffect(() => {
    dispatch(AuthActions.login());
    setRoutes(<Routes />);
  }, [dispatch]);

  return <div className='App'>{routes && routes}</div>;
};

export default App;
