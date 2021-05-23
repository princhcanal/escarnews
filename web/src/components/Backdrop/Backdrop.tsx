import styles from './Backdrop.module.css';

interface BackdropProps {
  show: boolean;
  handleSetShow: any;
}

export const Backdrop = (props: BackdropProps) => {
  const classes = [styles.Backdrop, props.show && styles.show].join(' ');

  const handleClick = () => {
    props.handleSetShow(false);
  };

  return <div className={classes} onClick={handleClick}></div>;
};
