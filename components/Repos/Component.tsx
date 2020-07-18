import React from 'react';
import ReactLoading from 'react-loading';
import styles from './styles.css';
import { Repo as RepoInterface } from '../types';
import Repo from '../Repo';

interface Props {
  repos: RepoInterface[];
  isFetchingRepos: boolean;
  isBigHeight?: boolean;
  showRead?: boolean;
}

const Component: React.FC<Props> = ({
  repos, isFetchingRepos, isBigHeight = false, showRead = false,
}) => (
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
          <div className={styles.loadingIndicatorWrapper}>
            <ReactLoading type="spin" width="40px" color="#666" />
          </div>
        )
    }
  </div>
);

export default Component;
