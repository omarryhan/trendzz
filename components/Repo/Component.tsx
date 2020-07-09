import React from 'react';
import { Repo } from '../types';
import styles from './styles.css';
import Star from '../../public/star_github.svg';

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
        <div className={styles.avatarWrapper}>
          <img src={repo.avatar} alt="Author's avatar" className={styles.avatar} />
        </div>
        <a href={repo.url} className={styles.noStyleAnchor} target="_blank" rel="noreferrer" onClick={(e): void => e.preventDefault()}>
          <h2 className={styles.authorName}>
            {`${repo.author}/`}
          </h2>
          <h2 className={styles.repoName}>
            {repo.name}
          </h2>
        </a>
      </div>

      <div className={styles.repoDescriptionRow}>
        <a href={repo.url} className={styles.noStyleAnchor} target="_blank" rel="noreferrer" onClick={(e): void => e.preventDefault()}>
          <p className={styles.repoDescription}>
            {repo.description}
          </p>
        </a>
      </div>

      <div className={styles.repoPropertiesRow}>
        <div className={styles.repoPropertyColumn} style={{ minWidth: '65px' }}>
          <div className={styles.propertIconWrapper}>
            <Star />
          </div>
          <p className={styles.repoProperty}>
            {repo.stars}
          </p>
        </div>

        <div className={styles.repoPropertyColumn}>
          <div className={styles.propertIconWrapper}>
            <span style={{
              // stylelint-disable-next-line value-keyword-case
              backgroundColor: repo.languageColor, // inline because of this dynamic property
            }}
            />
          </div>
          <p className={styles.repoProperty}>
            {repo.language}
          </p>
        </div>
      </div>
    </button>
  </div>
);

export default Component;
