import styles from './Register.module.css';

import { Link } from 'react-router-dom';

import { RegisterForm } from './RegisterForm/RegisterForm';

export const Register = () => {
  return (
    <div className={styles.Register}>
      <RegisterForm />
      <p className={styles.redirect}>
        <p className={styles.redirectText}>Already have an account?</p>

        <Link to='/login' className={styles.redirectLink}>
          Login
        </Link>
      </p>
    </div>
  );
};
