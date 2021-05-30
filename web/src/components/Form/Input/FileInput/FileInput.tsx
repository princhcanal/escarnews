import { forwardRef } from 'react';
import styles from './FileInput.module.css';

import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent } from 'react';

interface FileInputProps {
  name: string;
  id?: string;
  label?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  accept: string;
  hidden?: boolean;
  ref?: React.RefObject<HTMLInputElement>;
  className?: string;
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (
    { label, onChange, ...props }: FileInputProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const iconSize = '2x';
    const classes = [styles.FileInput, props.className].join(' ');

    return (
      <div className={classes}>
        <label htmlFor={props.name} className={styles.label}>
          {label}
          <FontAwesomeIcon icon={faImage} size={iconSize} />
        </label>
        <input
          type='file'
          onChange={onChange}
          autoComplete='off'
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
