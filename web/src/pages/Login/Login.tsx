import styles from './Login.module.css';

import { Link } from 'react-router-dom';

import { LoginForm } from './LoginForm/LoginForm';

export const Login = () => {
  return (
    <div className={styles.Login}>
      <LoginForm />
      <p>
        Don't have an account? <Link to='/register'>Register</Link>{' '}
      </p>
    </div>
  );
};
