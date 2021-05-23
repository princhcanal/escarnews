import styles from './Navbar.module.css';

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faSignOutAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from 'react-tooltip';

import { axiosInstance as axios } from '../../axios';
import * as AuthActions from '../../store/auth/actions';
import { isMobile } from '../../util/isMobile';

export const Navbar = () => {
  const dispatch = useDispatch();

  const [logoutDisabled, setLogoutDisabled] = useState<boolean>(false);

  const handleLogout = async () => {
    setLogoutDisabled(true);
    await axios.post('/auth/logout');
    setLogoutDisabled(false);
    dispatch(AuthActions.logout());
  };

  return (
    <div className={styles.Navbar}>
      <div className={styles.logo}>
        <h1>
          <Link to='/'>EscarNews</Link>
        </h1>
      </div>
      <div className={styles.links}>
        <button data-tip='Go to feed' className={styles.button}>
          <Link to='/'>
            <FontAwesomeIcon icon={faHome} size='2x' />
          </Link>
        </button>
        <button data-tip='Go to profile page' className={styles.button}>
          <Link to='/profile'>
            <FontAwesomeIcon icon={faUser} size='2x' />
          </Link>
        </button>
        <button
          onClick={handleLogout}
          disabled={logoutDisabled}
          data-tip='Logout'
          className={styles.button}
        >
          <FontAwesomeIcon icon={faSignOutAlt} size='2x' />
        </button>
      </div>
      <ReactTooltip disable={isMobile} />
    </div>
  );
};
