import React from 'react';
import styles from './styles.css';
import { Repo as RepoInterface } from '../types';
import Repo from '../Repo';

interface Props {
  repos: RepoInterface[];
  isFetchingRepos: boolean;
  isBigHeight?: boolean;
}

const Component: React.FC<Props> = ({ repos, isFetchingRepos, isBigHeight = false }) => (
  <div className={`${styles.reposWrapper} ${isBigHeight ? styles.reposWrapper_bigHeight : styles.reposWrapper_smallHeight}`}>
    {
      !isFetchingRepos
        ? (
          repos.length
            ? repos.map((repo, i) => (
              // some repos can show up twice
              // eslint-disable-next-line react/no-array-index-key
              <Repo repo={repo} key={`${repo.url}-${i}`} />
            ))
            : (
              <p className={styles.loadingIndicatorWrapper}>
                Found nothing :(
              </p>
            )
        )
        : (
          <p className={styles.loadingIndicatorWrapper}>
            Loading...
          </p>
        )
    }
  </div>
);

export default Component;
