import React from 'react';
import ReactLoading from 'react-loading';
import styles from './styles.css';
import { Repo as RepoInterface } from '../types';
import Repo from '../Repo';
import MarkAllAsReadButton from '../MarkAllAsReadButton';
import { markRepoAsOpened } from '../../actions/repo';

interface Props {
  repos: RepoInterface[];
  isFetchingRepos: boolean;
  isBigHeight?: boolean;
  EmptyPlaceholder: React.FC;
  canMarkAsRead?: boolean
}

const LoadingWrapper: React.FC = () => (
  <div className={styles.loadingIndicatorWrapper}>
    <ReactLoading type="spin" width="40px" color="#666" />
  </div>
);

const Component: React.FC<Props> = ({
  repos, isFetchingRepos, isBigHeight = false, EmptyPlaceholder, canMarkAsRead = false,
}) => {
  const [allMarkedAsRead, setAllMarkedAsRead] = React.useState(false);

  return (
    <div className={`${styles.reposWrapper} ${isBigHeight ? styles.reposWrapper_bigHeight : styles.reposWrapper_smallHeight}`}>
      {
        !isFetchingRepos
          ? (
            repos.length && !allMarkedAsRead
              ? (
                <>
                  {(repos.map((repo, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                    <Repo repo={repo} key={`${repo.url}-${i}`} canMarkAsRead={canMarkAsRead} />
                  )))}
                  {
                    canMarkAsRead
                      ? (
                        <MarkAllAsReadButton action={() => {
                          repos.map((repo) => {
                            markRepoAsOpened(repo.url);
                          });
                          setAllMarkedAsRead(true);
                        }}
                        />
                      )
                      : null
                  }
                </>
              )
              : typeof window !== 'undefined'
                ? (
                  <div className={styles.loadingIndicatorWrapper}>
                    <EmptyPlaceholder />
                  </div>
                )
                : <LoadingWrapper />
          )
          : <LoadingWrapper />
      }
    </div>
  );
};

export default Component;
