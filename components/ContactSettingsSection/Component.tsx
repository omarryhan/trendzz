import React from 'react';
import styles from './styles.css';

const Component: React.FC<{}> = () => (
  <section className={styles.sectionWrapper}>
    <h2 className={styles.settingsTitle}>
      Contact
    </h2>
    <p className={styles.settingsDescription}>
      If you want to report a bug, submit a feature request or say a simple thank you
    </p>

    <p className={styles.settingsText}>
      Either head to:
      {' '}
      <a href="https://github.com/omarryhan/trendzz/issues">
        github.com/omarryhan/trendzz/issues
      </a>
      <br />
      Or send me a tweet (or a DM)
      {' '}
      <a href="https://twitter.com/omarryhan">
        @omarryhan
      </a>
    </p>
  </section>
);

export default Component;
