import { useState } from 'react';
import styles from './RegisterForm.module.css';

import { useHistory } from 'react-router';
import * as Yup from 'yup';
import { axiosInstance as axios } from '../../../axios';

import { Input } from '../../../components/Form/Input/Input';

import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import * as AuthActions from '../../../store/auth/actions';

export const RegisterForm = () => {
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    username: '',
    password: '',
    confirm: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
    confirm: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Required'),
  });

  const onSubmit = async (values: any) => {
    try {
      setSubmitDisabled(true);
      await axios.post('/auth/register', values);
      setSubmitDisabled(false);
      dispatch(AuthActions.login());
      history.push('/');
    } catch (e) {
      history.replace('/register');
    }
  };

  return (
    <div className={styles.RegisterForm}>
      <h1 className={styles.formTitle}>Register</h1>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form noValidate>
            <Input
              type='email'
              name='email'
              id='email'
              label='Email'
              placeholder='Enter Email'
            />
            <Input
              type='text'
              name='username'
              id='username'
              label='Username'
              placeholder='Enter Username'
            />
            <Input
              type='password'
              name='password'
              id='password'
              label='Password'
              placeholder='Enter Password'
            />
            <Input
              type='password'
              name='confirm'
              id='confirm'
              label='Confirm Password'
              placeholder='Repeat Password'
            />
            <button
              type='submit'
              disabled={submitDisabled}
              className={styles.submit}
            >
              {submitDisabled ? 'Registering...' : 'Register'}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
