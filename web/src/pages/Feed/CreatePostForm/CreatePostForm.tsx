import styles from './CreatePostForm.module.css';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { axiosInstance as axios } from '../../../axios';

import { Input } from '../../../components/Form/Input/Input';
import { useState } from 'react';

export const CreatePostForm = () => {
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(false);

  const initialValues = {
    title: '',
    content: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    content: Yup.string().required('Required'),
  });

  const onSubmit = async (values: any) => {
    try {
      setSubmitDisabled(true);
      await axios.post('/posts', values);
      setSubmitDisabled(false);
      window.location.reload();
    } catch (e) {}
  };

  return (
    <div className={styles.CreatePostForm}>
      <h1>Create Post</h1>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <Input type='text' name='title' id='title' label='Title' />
            <Input type='text' name='content' id='content' label='Content' />
            <div>
              <button type='submit' disabled={submitDisabled}>
                {submitDisabled ? 'Creating...' : 'Create Post'}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
