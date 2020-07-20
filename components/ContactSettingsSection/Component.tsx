import React from 'react';
import styles from './styles.css';

const Component: React.FC = () => (
  <section className={styles.sectionWrapper}>
    <h2 className={styles.settingsTitle}>
      Contact
    </h2>
    <p className={styles.settingsDescription}>
      Report a bug, submit a feature request or give feedback
    </p>

    <p className={styles.settingsText}>
      Either head to this repo&apos;s
      {' '}
      <a href="https://github.com/omarryhan/trendzz/issues">
        issue tracker
      </a>
      {' '}
      or
      {' '}
      send me a tweet (or a DM)
      {' '}
      <a href="https://twitter.com/omarryhan">
        @omarryhan
      </a>
      .
    </p>
  </section>
);

export default Component;
