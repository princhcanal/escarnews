import styles from './CreatePostForm.module.css';

import { Formik, Form, FormikHelpers, FormikProps } from 'formik';
import * as Yup from 'yup';
import { axiosInstance as axios } from '../../../axios';

import { Input } from '../../../components/Form/Input/Input';
import { FileInput } from '../../../components/Form/Input/FileInput/FileInput';
import { ChangeEvent, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

interface CreatePostFormProps {
  refresh: () => void;
}

interface FormGroup {
  title: string;
  content: string;
  image: string;
}

export const CreatePostForm = (props: CreatePostFormProps) => {
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(false);
  const imagePreviewDivRef = useRef<HTMLDivElement>(null);
  const imagePreviewRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const iconSize = '2x';

  const initialValues: FormGroup = {
    title: '',
    content: '',
    image: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    content: Yup.string().required('Required'),
    image: Yup.mixed(),
  });

  const onSubmit = async (
    values: FormGroup,
    formikHelpers: FormikHelpers<FormGroup>
  ) => {
    try {
      const { title, content, image } = values;
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('image', image);

      setSubmitDisabled(true);
      await axios.post('/posts', formData);
      setSubmitDisabled(false);
      props.refresh();
      formikHelpers.resetForm();

      if (imagePreviewRef.current) {
        imagePreviewRef.current.src = '';
      }
    } catch (e) {}
  };

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement>,
    formProps: FormikProps<FormGroup>
  ) => {
    const imagePreviewDiv = imagePreviewDivRef.current;
    const imagePreview = imagePreviewRef.current;

    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];
      formProps.setFieldValue('image', image);
      const fileReader = new FileReader();

      if (imagePreviewDiv) {
        imagePreviewDiv.style.display = 'block';
        fileReader.readAsDataURL(image);
        fileReader.onload = (e) => {
          if (imagePreview) {
            imagePreview.src = e.target?.result as string;
          }
        };
      }
    } else {
      formProps.setFieldValue('image', '');
      if (imagePreviewDiv) {
        imagePreviewDiv.style.display = 'none';
      }
      if (imagePreview) {
        imagePreview.src = '';
      }
    }
  };

  const handleRemoveImage = (formProps: FormikProps<FormGroup>) => {
    if (
      imagePreviewRef.current &&
      imagePreviewDivRef.current &&
      fileInputRef.current
    ) {
      imagePreviewDivRef.current.style.display = 'none';
      imagePreviewRef.current.removeAttribute('src');
      fileInputRef.current.value = '';
      formProps.setFieldValue('image', '');
    }
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
          {(formProps) => (
            <Form>
              <Input type='text' name='title' id='title' label='Title' />
              <Input type='text' name='content' id='content' label='Content' />
              <div ref={imagePreviewDivRef} className={styles.imageDiv}>
                <img ref={imagePreviewRef} alt='' className={styles.image} />
                <FontAwesomeIcon
                  icon={faTimesCircle}
                  className={styles.closeIcon}
                  size={iconSize}
                  onClick={() => handleRemoveImage(formProps)}
                />
              </div>
              <FileInput
                name='image'
                id='image'
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleOnChange(e, formProps)
                }
                accept='.jpg, .jpeg, .png'
                hidden
                ref={fileInputRef}
                className={styles.fileInput}
              />
              <div>
                <button
                  type='submit'
                  disabled={submitDisabled}
                  className={styles.submit}
                >
                  {submitDisabled ? 'Creating...' : 'Create Post'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
