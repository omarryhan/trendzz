import React from 'react';
import styles from './styles.css';

interface Props {
  action: () => void | Promise<void>
}

const Component: React.FC<Props> = ({ action }) => (
  <div className={styles.buttonWrapper}>
    <button className={styles.button} type="button" onClick={action}>
      Mark all as read
    </button>
  </div>
);

export default Component;
