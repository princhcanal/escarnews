import { useField } from 'formik';
import styles from './Input.module.css';

type InputType = 'text' | 'email' | 'password' | 'number' | 'file';

interface InputProps {
  type: InputType;
  name: string;
  id?: string;
  label?: string;
  placeholder?: string;
  onChange?: any;
  accept?: string;
}

export const Input = ({ label, onChange, ...props }: InputProps) => {
  const [field, meta] = useField(props);

  return (
    <div className={styles.Input}>
      <label className={styles.label}>{label}</label>
      <input {...props} {...field} className={styles.input} />
      <p className={styles.error}>
        {meta.touched && meta.error ? meta.error : ''}
      </p>
    </div>
  );
};
