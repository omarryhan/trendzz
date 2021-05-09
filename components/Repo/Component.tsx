import React from 'react';
import { Repository } from 'github-trending-scrape';
import WithSlide from '../WithSlide';
import { isRepoOpened, markRepoAsOpened, toggleOpenedState } from '../../actions/repo';
import styles from './styles.css';
import Star from '../../public/star_github.svg';

const Component: React.FC<{repo: Repository, canMarkAsRead: boolean}> = (
  { repo, canMarkAsRead },
) => {
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
    <WithSlide
      onSlide={() => {
        toggleOpenedState(repo.url);
        setIsRepoOpenedState(!isRepoOpenedState);
      }}
      turnedOff={!canMarkAsRead}
    >
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
          className={
            `${styles.repoButton} ${isRepoOpenedState ? styles.isOpenedOpacity : ''}`
          }
        >
          <div className={styles.repoNameRow}>
            <div className={styles.avatarWrapper}>
              <img
                src={repo.avatar}
                alt="Author's avatar"
                className={styles.avatar}
                style={{
                  // stylelint-disable-next-line value-keyword-case
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
              <h2
                className={
                  styles.authorName
                }
              >
                {`${repo.author}/`}
              </h2>
              <h2
                className={
                  styles.repoName
                }
              >
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
              <p className={styles.repoDescription}>
                {repo.description}
              </p>
            </a>
          </div>

          <div className={styles.repoPropertiesRow}>
            <div
              className={styles.repoPropertyColumn}
              style={{ minWidth: '65px' }}
            >
              <div className={
                styles.propertIconWrapper
              }
              >
                <Star />
              </div>
              <p className={styles.repoProperty}>
                {repo.stars}
              </p>
            </div>

            <div className={styles.repoPropertyColumn}>
              <div className={styles.propertIconWrapper}>
                <span
                  style={{
                    // inline because of this dynamic property
                    // stylelint-disable-next-line value-keyword-case
                    backgroundColor: repo.languageColor,
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
    </WithSlide>
  );
};

export default Component;
