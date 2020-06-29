import React from 'react';
import { Repo } from '../types';
import styles from './styles.css';
import Star from '../../public/star.svg';

const Component: React.FC<{repo: Repo}> = ({ repo }) => (
  <div
    className={styles.repoWrapper}
  >
    <button
      onClick={
        function redirect(): void {
          window.open(repo.url, '_blank');
        }
      }
      type="button"
      title={`${repo.url}`}
      className={styles.repoButton}
    >
      <div className={styles.repoNameRow}>
        <h2 className={styles.repoName}>
          {repo.name}
        </h2>
      </div>

      <div className={styles.repoDescriptionRow}>
        <p className={styles.repoDescription}>
          {repo.description}
        </p>
      </div>

      <div className={styles.repoPropertiesRow}>
        <div className={styles.avatarWrapper}>
          <img src={repo.avatar} alt="Author's avatar" className={styles.avatar} />
        </div>
        <h3 className={styles.authorName}>
          {repo.author}
        </h3>
        <div className={styles.starWrapper}>
          <Star />
        </div>
        <p className={styles.repoProperty}>
          {repo.stars}
        </p>
        <span style={{
          // stylelint-disable-next-line value-keyword-case
          backgroundColor: repo.languageColor, // inline because of this dynamic property
          borderRadius: '50%',
          width: '15px',
          height: '15px',
          marginRight: '5px',
        }}
        />
        <p className={styles.repoProperty}>
          {repo.language}
        </p>
      </div>
    </button>
  </div>
);

export default Component;
