import styles from './Navbar.module.css';

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faIdCard,
  faLink,
  faSignOutAlt,
  faUser,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';

import { axiosInstance as axios } from '../../axios';
import * as AuthActions from '../../store/auth/actions';

interface NavbarProps {
  authorized: boolean;
}

export const Navbar = (props: NavbarProps) => {
  const dispatch = useDispatch();
  const iconSize = '2x';

  const [logoutDisabled, setLogoutDisabled] = useState<boolean>(false);

  const handleLogout = async () => {
    setLogoutDisabled(true);
    await axios.post('/auth/logout');
    setLogoutDisabled(false);
    dispatch(AuthActions.logout());
  };

  const authorizedLinks = (
    <>
      <Link to='/' className={styles.link}>
        <div className={styles.linkIcon}>
          <FontAwesomeIcon
            icon={faHome}
            size={iconSize}
            className={styles.linkIcon}
          />
        </div>
        <p className={styles.linkText}>Home</p>
      </Link>

      <Link to='/profile' className={styles.link}>
        <div className={styles.linkIcon}>
          <FontAwesomeIcon
            icon={faUser}
            size={iconSize}
            className={styles.linkIcon}
          />
        </div>
        <p className={styles.linkText}>Profile</p>
      </Link>
    </>
  );

  const nonAuthorizedLinks = (
    <>
      <Link to='/login' className={styles.link}>
        <div className={styles.linkIcon}>
          <FontAwesomeIcon
            icon={faIdCard}
            size={iconSize}
            className={styles.linkIcon}
          />
        </div>
        <p className={styles.linkText}>Login</p>
      </Link>

      <Link to='/register' className={styles.link}>
        <div className={styles.linkIcon}>
          <FontAwesomeIcon
            icon={faUserPlus}
            size={iconSize}
            className={styles.linkIcon}
          />
        </div>
        <p className={styles.linkText}>Register</p>
      </Link>
    </>
  );

  return (
    <div className={styles.Navbar}>
      <div className={styles.logo}>
        <h1>
          <Link to='/' className={styles.link}>
            EscarNews
          </Link>
        </h1>
      </div>
      <div className={styles.links}>
        {props.authorized ? authorizedLinks : nonAuthorizedLinks}

        <a
          href='https://cituweb.pinnacle.com.ph/aims/students/'
          target='_blank'
          rel='noreferrer'
          className={styles.link}
        >
          <div className={styles.linkIcon}>
            <FontAwesomeIcon
              icon={faLink}
              size={iconSize}
              className={styles.linkIcon}
            />
          </div>
          <p className={styles.linkText}>Go to AIMS</p>
        </a>

        <a
          href='https://lair.education/'
          target='_blank'
          rel='noreferrer'
          className={styles.link}
        >
          <div className={styles.linkIcon}>
            <FontAwesomeIcon
              icon={faLink}
              size={iconSize}
              className={styles.linkIcon}
            />
          </div>
          <p className={styles.linkText}>Go to LAIR</p>
        </a>

        <a
          href='https://outlook.office.com/mail/inbox'
          target='_blank'
          rel='noreferrer'
          className={styles.link}
        >
          <div className={styles.linkIcon}>
            <FontAwesomeIcon
              icon={faLink}
              size={iconSize}
              className={styles.linkIcon}
            />
          </div>
          <p className={styles.linkText}>MS Outlook</p>
        </a>
        {props.authorized && (
          <button
            className={[styles.button, styles.logout].join(' ')}
            onClick={handleLogout}
            disabled={logoutDisabled}
          >
            <div className={styles.linkIcon}>
              <FontAwesomeIcon
                icon={faSignOutAlt}
                size={iconSize}
                className={styles.linkIcon}
              />
            </div>
            <p className={styles.linkText}>Logout</p>
          </button>
        )}
      </div>
    </div>
  );
};
