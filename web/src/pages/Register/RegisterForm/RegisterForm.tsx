import { useState } from 'react';
import styles from './RegisterForm.module.css';

import { useHistory } from 'react-router';
import * as Yup from 'yup';
import { axiosInstance as axios } from '../../../axios';

import { Input } from '../../../components/Form/Input/Input';

import { Formik, Form } from 'formik';

export const RegisterForm = () => {
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(false);
  const history = useHistory();

  const initialValues = {
    email: '',
    username: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
  });

  const onSubmit = async (values: any) => {
    try {
      setSubmitDisabled(true);
      await axios.post('/auth/register', values);
      setSubmitDisabled(false);
      history.push('/');
    } catch (e) {
      history.replace('/register');
    }
  };

  return (
    <div className={styles.RegisterForm}>
      <h1>Register</h1>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form noValidate>
            <Input type='email' name='email' id='email' label='Email' />
            <Input type='text' name='username' id='username' label='Username' />
            <Input
              type='password'
              name='password'
              id='password'
              label='Password'
            />
            <button type='submit' disabled={submitDisabled}>
              {submitDisabled ? 'Registering...' : 'Register'}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
