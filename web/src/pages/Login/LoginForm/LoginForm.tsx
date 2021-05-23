import { useState } from 'react';
import styles from './LoginForm.module.css';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { axiosInstance as axios } from '../../../axios';

import { Input } from '../../../components/Form/Input/Input';
import * as AuthActions from '../../../store/auth/actions';
import { User } from '../../../types/user';

export const LoginForm = () => {
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  });

  const onSubmit = async (values: any) => {
    try {
      setSubmitDisabled(true);
      await axios.post<User>('/auth/login', values);
      setSubmitDisabled(false);
      dispatch(AuthActions.login());
      history.push('/');
    } catch (e) {
      history.replace('/login');
    }
  };

  return (
    <div className={styles.LoginForm}>
      <h1>Login</h1>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form noValidate>
            <Input type='email' name='email' id='email' label='Email' />
            <Input
              type='password'
              name='password'
              id='password'
              label='Password'
            />
            <div>
              <button type='submit' disabled={submitDisabled}>
                {submitDisabled ? 'Logging in...' : 'Log in'}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
