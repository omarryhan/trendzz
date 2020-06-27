import React from 'react';
import styles from './styles.css';

const Component: React.FC<{}> = () => (
  <header className={styles.header}>
    <img src="/logo/128w/logo.png" alt="Trendzz logo" />
    <h1 className={styles.title}>
      Trendzz
    </h1>
  </header>
);

export default Component;
