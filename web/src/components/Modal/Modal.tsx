import { useEffect, useState } from 'react';
import styles from './Modal.module.css';

import { Backdrop } from '../Backdrop/Backdrop';

interface ModalProps {
  show: boolean;
  children: any;
  handleSetShow: any;
}

export const Modal = (props: ModalProps) => {
  const [show, setShow] = useState<boolean>(false);

  const classes = [styles.Modal, show && styles.show].join(' ');

  useEffect(() => {
    setShow(props.show);
  }, [props]);

  const handleSetShow = (show: boolean) => {
    props.handleSetShow(show);
    setShow(show);
  };

  return (
    <div className={classes}>
      <Backdrop show={show} handleSetShow={handleSetShow} />
      <div className={styles.card}>{props.children}</div>
    </div>
  );
};
