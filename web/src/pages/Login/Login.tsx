import styles from './Login.module.css';

import { Link } from 'react-router-dom';

import { LoginForm } from './LoginForm/LoginForm';

export const Login = () => {
  return (
    <div className={styles.Login}>
      <LoginForm />
      <p className={styles.redirect}>
        <p className={styles.redirectText}>Don't have an account?</p>
        <Link to='/register' className={styles.redirectLink}>
          Register
        </Link>{' '}
      </p>
    </div>
  );
};
