import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import styles from './Welcome.module.css';

export const Welcome = () => {
  const iconSize = '5x';

  return (
    <div className={styles.Welcome}>
      <div className={styles.header}>
        <img src='logo.png' alt='' className={styles.logo} />
        <h1 className={styles.mainHeading}>Escarnews</h1>
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <h1 className={styles.heading}>
            Your place to catch up with your fellow technologians!
          </h1>
          <p className={styles.paragraph}>
            Whether you are waiting for an official Blue Memo announcement or
            just wanting to know what's up, wherever you are inside or outside
            the university, Escarnews makes it easy to be updated with the
            latest happenings and hottest news.
          </p>

          <div className={styles.links}>
            <div className={styles.application}>
              <Link to='/login' className={styles.applicationLink}>
                Login
              </Link>
              <Link to='/register' className={styles.applicationLink}>
                Register
              </Link>
            </div>
            <div className={styles.social}>
              <a href='https://www.facebook.com/CITUniversity'>
                <FontAwesomeIcon
                  icon={faFacebook}
                  size={iconSize}
                  className={styles.socialLink}
                />
              </a>
              <a href='https://www.instagram.com/cit.university/'>
                <FontAwesomeIcon
                  icon={faInstagram}
                  size={iconSize}
                  className={styles.socialLink}
                />
              </a>
              <img src='logo.png' alt='' className={styles.logo} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
