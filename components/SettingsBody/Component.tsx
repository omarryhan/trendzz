import React from 'react';
import styles from './styles.css';

const Component: React.FC<{}> = ({ children }) => (
  <div className={styles.settingsWrapper}>
    {children}
  </div>
);

export default Component;
