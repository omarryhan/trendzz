import React from 'react';
import { isRepoOpened, markRepoAsOpened } from '../../actions/repo';
import { Repo } from '../types';
import styles from './styles.css';
import Star from '../../public/star_github.svg';

const Component: React.FC<{repo: Repo}> = ({ repo }) => {
  const [isRepoOpenedState, setIsRepoOpenedState] = React.useState(false);

  React.useEffect(() => {
    const effect = async () => {
      const isRepoOpenedResponse = await isRepoOpened(repo.url);
      if (isRepoOpenedResponse !== isRepoOpenedState) {
        setIsRepoOpenedState(isRepoOpenedResponse);
      }
    };
    effect();
  }, [
    isRepoOpenedState,
    repo.url,
  ]);

  return (
    <div
      className={styles.repoWrapper}
    >
      <button
        onClick={
          function redirect(): void {
            setIsRepoOpenedState(true);
            markRepoAsOpened(repo.url);
            window.open(repo.url, '_blank');
          }
        }
        type="button"
        title={`${repo.url}`}
        className={styles.repoButton}
      >
        <div className={styles.repoNameRow}>
          <div className={styles.avatarWrapper}>
            <img
              src={repo.avatar}
              alt="Author's avatar"
              className={styles.avatar}
              style={{
                // stylelint-disable-next-line value-keyword-case
                opacity: isRepoOpenedState ? '0.6' : '1',
              }}
            />
          </div>
          <a
            href={repo.url}
            className={styles.noStyleAnchor}
            target="_blank"
            rel="noreferrer"
            onClick={(e): void => {
              setIsRepoOpenedState(true);
              markRepoAsOpened(repo.url);
              e.preventDefault();
            }}
          >
            <h2 className={`${styles.authorName} ${isRepoOpenedState ? styles.authorName_opened : ''}`}>
              {`${repo.author}/`}
            </h2>
            <h2 className={`${styles.repoName} ${isRepoOpenedState ? styles.repoName_opened : ''}`}>
              {repo.name}
            </h2>
          </a>
        </div>

        <div className={styles.repoDescriptionRow}>
          <a
            href={repo.url}
            className={styles.noStyleAnchor}
            target="_blank"
            rel="noreferrer"
            onClick={(e): void => {
              setIsRepoOpenedState(true);
              markRepoAsOpened(repo.url);
              e.preventDefault();
            }}
          >
            <p className={`${styles.repoDescription} ${isRepoOpenedState ? styles.repoDescription_opened : ''}`}>
              {repo.description}
            </p>
          </a>
        </div>

        <div className={styles.repoPropertiesRow}>
          <div className={styles.repoPropertyColumn} style={{ minWidth: '65px' }}>
            <div className={styles.propertIconWrapper}>
              <Star />
            </div>
            <p className={`${styles.repoProperty} ${isRepoOpenedState ? styles.repoProperty_opened : ''}`}>
              {repo.stars}
            </p>
          </div>

          <div className={styles.repoPropertyColumn}>
            <div className={styles.propertIconWrapper}>
              <span style={{
                // stylelint-disable-next-line value-keyword-case
                backgroundColor: repo.languageColor,
                // inline because of this dynamic property
              }}
              />
            </div>
            <p className={`${styles.repoProperty} ${isRepoOpenedState ? styles.repoProperty_opened : ''}`}>
              {repo.language}
            </p>
          </div>
        </div>
      </button>
    </div>
  );
};

export default Component;
