import React from 'react';
import styles from './styles.css';

const Component: React.FC = ({ children }) => (
  <div className={styles.settingsWrapper}>
    <section className={styles.sectionWrapper}>
      <h1 className={styles.settingsTitle}>
        Settings
      </h1>
    </section>
    {children}
  </div>
);

export default Component;
