import { useState } from 'react';
import styles from './EditPostForm.module.css';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { axiosInstance as axios } from '../../../axios';

import { Post } from '../../../types/post';
import { Input } from '../../Form/Input/Input';

interface EditPostFormProps {
  refresh: () => void;
  post: Post;
}

interface FormGroup {
  title: string;
  content: string;
}

export const EditPostForm = (props: EditPostFormProps) => {
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(false);

  const initialValues: FormGroup = {
    title: props.post.title,
    content: props.post.content,
  };

  const validationSchema = Yup.object({
    title: Yup.string(),
    content: Yup.string(),
  });

  const onSubmit = async (values: FormGroup) => {
    try {
      setSubmitDisabled(true);
      await axios.patch(`/posts/${props.post.id}`, values);
      setSubmitDisabled(false);
      props.refresh();
    } catch (e) {}
  };

  return (
    <div className={styles.EditPostForm}>
      <h1>Edit Post</h1>
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
                {submitDisabled ? 'Updating...' : 'Update Post'}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
