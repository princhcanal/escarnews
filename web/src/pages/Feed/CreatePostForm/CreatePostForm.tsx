import styles from './CreatePostForm.module.css';

import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { axiosInstance as axios } from '../../../axios';

import { Input } from '../../../components/Form/Input/Input';
import { useState } from 'react';

interface CreatePostFormProps {
  refresh: () => void;
}

interface FormGroup {
  title: string;
  content: string;
}

export const CreatePostForm = (props: CreatePostFormProps) => {
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(false);

  const initialValues: FormGroup = {
    title: '',
    content: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    content: Yup.string().required('Required'),
  });

  const onSubmit = async (
    values: FormGroup,
    formikHelpers: FormikHelpers<FormGroup>
  ) => {
    try {
      setSubmitDisabled(true);
      await axios.post('/posts', values);
      setSubmitDisabled(false);
      props.refresh();
      formikHelpers.resetForm();
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
