import styles from './Register.module.css';

import { Link } from 'react-router-dom';

import { RegisterForm } from './RegisterForm/RegisterForm';

export const Register = () => {
  return (
    <div className={styles.Register}>
      <RegisterForm />
      <p>
        Already have an account? <Link to='/login'>Login</Link>
      </p>
    </div>
  );
};
