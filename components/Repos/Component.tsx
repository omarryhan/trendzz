import React from 'react';
import styles from './styles.css';
import { Repo as RepoInterface } from '../types';
import Repo from '../Repo';

interface Props {
  repos: RepoInterface[];
  isFetchingRepos: boolean;
}

const Component: React.FC<Props> = ({ repos, isFetchingRepos }) => (
  <div className={styles.reposWrapper}>
    {
      !isFetchingRepos
        ? (
          repos.length
            ? repos.map((repo) => (
              <Repo repo={repo} key={repo.url} />
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
